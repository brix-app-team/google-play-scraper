"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var R = _interopRequireWildcard(require("ramda"));
var _request = _interopRequireDefault(require("./utils/request.js"));
var _scriptData = _interopRequireDefault(require("./utils/scriptData.js"));
var _constants = require("./constants.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
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
  var PLAYSTORE_URL = "".concat(_constants.BASE_URL, "/store/apps/datasafety");
  var searchParams = new URLSearchParams({
    id: opts.appId,
    hl: opts.lang
  });
  var reqUrl = "".concat(PLAYSTORE_URL, "?").concat(searchParams);
  var options = Object.assign({
    url: reqUrl,
    followRedirect: true
  }, opts.requestOptions);
  return (0, _request["default"])(options, opts.throttle).then(_scriptData["default"].parse).then(_scriptData["default"].extractor(MAPPINGS));
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
var _default = exports["default"] = dataSafety;