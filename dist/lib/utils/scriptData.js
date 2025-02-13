import createDebug from 'debug';
import * as R from 'ramda';
var debug = createDebug('google-play-scraper:scriptData');

/**
* This method looks for the mapping inside the serviceRequestData object
* The serviceRequestData object is mapped from the AF_dataServiceRequests html var
*
* @param {object} parsedData The response mapped object
* @param {object} spec The mappings spec
*/
function extractDataWithServiceRequestId(parsedData, spec) {
  var serviceRequestMapping = Object.keys(parsedData.serviceRequestData);
  var filteredDsRootPath = serviceRequestMapping.filter(function (serviceRequest) {
    var dsValues = parsedData.serviceRequestData[serviceRequest];
    return dsValues.id === spec.useServiceRequestId;
  });
  var formattedPath = filteredDsRootPath.length ? [filteredDsRootPath[0]].concat(spec.path) : spec.path;
  return R.path(formattedPath, parsedData);
}

/**
* Map the MAPPINGS object, applying each field spec to the parsed data.
* If the mapping value is an array, use it as the path to the extract the
* field's value. If it's an object, extract the value in object.path and pass
* it to the function in object.fun
*
* @param {array} mappings The mappings object
*/
function extractor(mappings) {
  return function extractFields(parsedData) {
    debug('parsedData: %o', parsedData);
    return R.map(function (spec) {
      if (R.is(Array, spec)) {
        return R.path(spec, parsedData);
      }

      // extractDataWithServiceRequestId explanation:
      // https://github.com/facundoolano/google-play-scraper/pull/412
      // assume spec object
      var input = spec.useServiceRequestId ? extractDataWithServiceRequestId(parsedData, spec) : R.path(spec.path, parsedData);
      return spec.fun(input, parsedData);
    }, mappings);
  };
}

/*
 * Extract the javascript objects returned by the AF_initDataCallback functions
 * in the script tags of the app detail HTML.
 */
function parse(response) {
  var scriptRegex = />AF_initDataCallback[\s\S]*?<\/script/g;
  var keyRegex = /(ds:.*?)'/;
  var valueRegex = /data:([\s\S]*?), sideChannel: {}}\);<\//;
  var matches = response.match(scriptRegex);
  if (!matches) {
    return {};
  }
  var parsedData = matches.reduce(function (accum, data) {
    var keyMatch = data.match(keyRegex);
    var valueMatch = data.match(valueRegex);
    if (keyMatch && valueMatch) {
      var key = keyMatch[1];
      var value = JSON.parse(valueMatch[1]);
      return R.assoc(key, value, accum);
    }
    return accum;
  }, {});
  return Object.assign({}, parsedData, {
    serviceRequestData: parseServiceRequests(response)
  });
}

/*
 * Extract the javascript objects returned by the AF_dataServiceRequests function
 * in the script tags of the app detail HTML.
 */
function parseServiceRequests(response) {
  var scriptRegex = /; var AF_dataServiceRequests[\s\S]*?; var AF_initDataChunkQueue/g;
  var valueRegex = /{'ds:[\s\S]*}}/g;
  var matches = response.match(scriptRegex);
  if (!matches) {
    return {};
  }
  var data = matches[0];
  var valueMatch = data.match(valueRegex);
  if (!valueMatch) {
    return {};
  }

  // eslint-disable-next-line
  var value = eval("(" + valueMatch[0] + ")");
  return value;
}
export default Object.assign({
  parse: parse,
  parseServiceRequests: parseServiceRequests,
  extractor: extractor,
  extractDataWithServiceRequestId: extractDataWithServiceRequestId
});