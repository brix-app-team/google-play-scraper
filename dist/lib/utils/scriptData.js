"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _debug = _interopRequireDefault(require("debug"));
var R = _interopRequireWildcard(require("ramda"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var debug = (0, _debug["default"])('google-play-scraper:scriptData');

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
  var formattedPath = filteredDsRootPath.length ? [filteredDsRootPath[0]].concat(_toConsumableArray(spec.path)) : spec.path;
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
  var _matches = _slicedToArray(matches, 1),
    data = _matches[0];
  var valueMatch = data.match(valueRegex);
  if (!valueMatch) {
    return {};
  }

  // eslint-disable-next-line
  var value = eval("(".concat(valueMatch[0], ")"));
  return value;
}
var _default = exports["default"] = Object.assign({
  parse: parse,
  parseServiceRequests: parseServiceRequests,
  extractor: extractor,
  extractDataWithServiceRequestId: extractDataWithServiceRequestId
});