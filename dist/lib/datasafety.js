import * as R from 'ramda';
import request from './utils/request.js';
import scriptData from './utils/scriptData.js';
import { BASE_URL } from './constants.js';
function dataSafety(opts) {
  return new Promise(function (resolve, reject) {
    if (!opts && !opts.appId) {
      throw Error('appId missing');
    }
    opts.lang = opts.lang || 'en';
    processDataSafety(opts).then(resolve)["catch"](reject);
  });
}
function processDataSafety(opts) {
  var PLAYSTORE_URL = BASE_URL + "/store/apps/datasafety";
  var searchParams = new URLSearchParams({
    id: opts.appId,
    hl: opts.lang
  });
  var reqUrl = PLAYSTORE_URL + "?" + searchParams;
  var options = Object.assign({
    url: reqUrl,
    followRedirect: true
  }, opts.requestOptions);
  return request(options, opts.throttle).then(scriptData.parse).then(scriptData.extractor(MAPPINGS));
}
var MAPPINGS = {
  sharedData: {
    path: ['ds:3', 1, 2, 137, 4, 0, 0],
    fun: mapDataEntries
  },
  collectedData: {
    path: ['ds:3', 1, 2, 137, 4, 1, 0],
    fun: mapDataEntries
  },
  securityPractices: {
    path: ['ds:3', 1, 2, 137, 9, 2],
    fun: mapSecurityPractices
  },
  privacyPolicyUrl: ['ds:3', 1, 2, 99, 0, 5, 2]
};
function mapSecurityPractices(practices) {
  if (!practices) {
    return [];
  }
  return practices.map(function (practice) {
    return {
      practice: R.path([1], practice),
      description: R.path([2, 1], practice)
    };
  });
}
function mapDataEntries(dataEntries) {
  if (!dataEntries) {
    return [];
  }
  return dataEntries.flatMap(function (data) {
    var type = R.path([0, 1], data);
    var details = R.path([4], data);
    return details.map(function (detail) {
      return {
        data: R.path([0], detail),
        optional: R.path([1], detail),
        purpose: R.path([2], detail),
        type: type
      };
    });
  });
}
export default dataSafety;