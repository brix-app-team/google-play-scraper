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
var _debug = _interopRequireDefault(require("debug"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var debug = (0, _debug["default"])('google-play-scraper:permissions');
function permissions(opts) {
  return new Promise(function (resolve, reject) {
    if (!opts && !opts.appId) {
      throw Error('appId missing');
    }
    opts.lang = opts.lang || 'en';
    opts.country = opts.country || 'us';
    processPermissions(opts).then(resolve)["catch"](reject);
  });
}
function processPermissions(opts) {
  var body = "f.req=%5B%5B%5B%22xdSrCf%22%2C%22%5B%5Bnull%2C%5B%5C%22".concat(opts.appId, "%5C%22%2C7%5D%2C%5B%5D%5D%5D%22%2Cnull%2C%221%22%5D%5D%5D");
  var url = "".concat(_constants.BASE_URL, "/_/PlayStoreUi/data/batchexecute?rpcids=qnKhOb&f.sid=-697906427155521722&bl=boq_playuiserver_20190903.08_p0&hl=").concat(opts.lang, "&gl=").concat(opts.country, "&authuser&soc-app=121&soc-platform=1&soc-device=1&_reqid=1065213");
  debug('batchexecute URL: %s', url);
  debug('with body: %s', body);
  var requestOptions = Object.assign({
    url: url,
    method: 'POST',
    body: body,
    followRedirect: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  }, opts.requestOptions);
  return (0, _request["default"])(requestOptions, opts.throttle).then(function (html) {
    var input = JSON.parse(html.substring(5));
    var data = JSON.parse(input[0][2]);
    if (data === null) {
      return [];
    }
    return opts["short"] ? processShortPermissionsData(data) : processPermissionData(data);
  });
}
var MAPPINGS = {
  permissions: [2],
  type: 0
};
function processShortPermissionsData(html) {
  if (R.is(String, html)) {
    html = _scriptData["default"].parse(html);
  }
  var commonPermissions = html[_constants.constants.permission.COMMON];
  if (!commonPermissions) {
    return [];
  }
  var validPermissions = commonPermissions.filter(function (permission) {
    return permission.length;
  });
  var permissionNames = R.chain(function (permission) {
    return permission[MAPPINGS.type];
  }, validPermissions);
  return permissionNames;
}
function processPermissionData(html) {
  if (R.is(String, html)) {
    html = _scriptData["default"].parse(html);
  }
  debug('html %o', html);
  var permissions = Object.values(_constants.constants.permission).reduce(function (permissionAccummulator, permission) {
    if (!html[permission]) {
      return permissionAccummulator;
    }
    permissionAccummulator.push.apply(permissionAccummulator, _toConsumableArray(R.chain(flatMapPermissions, html[permission])));
    return permissionAccummulator;
  }, []);
  debug('Permissions %o', permissions);
  return permissions;
}
function flatMapPermissions(permission) {
  var input = R.path(MAPPINGS.permissions, permission);
  if (typeof input === 'undefined') {
    return [];
  }
  var mappings = getPermissionMappings(permission[MAPPINGS.type]);
  return R.map(_scriptData["default"].extractor(mappings), input);
}
function getPermissionMappings(type) {
  return {
    permission: [1],
    type: {
      path: 0,
      fun: function fun() {
        return type;
      }
    }
  };
}
var _default = exports["default"] = permissions;