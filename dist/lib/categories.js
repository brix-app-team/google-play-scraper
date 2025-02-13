"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _request = _interopRequireDefault(require("./utils/request.js"));
var cheerio = _interopRequireWildcard(require("cheerio"));
var _constants = require("./constants.js");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var PLAYSTORE_URL = "".concat(_constants.BASE_URL, "/store/apps");
var CATEGORY_URL_PREFIX = '/store/apps/category/';
function categories(opts) {
  opts = Object.assign({}, opts);
  return new Promise(function (resolve, reject) {
    var options = Object.assign({
      url: PLAYSTORE_URL
    }, opts.requestOptions);
    (0, _request["default"])(options, opts.throttle).then(cheerio.load).then(extractCategories).then(resolve)["catch"](reject);
  });
}
function extractCategories($) {
  var categoryIds = $('ul li a').toArray().map(function (el) {
    return $(el).attr('href');
  }).filter(function (url) {
    return url.startsWith(CATEGORY_URL_PREFIX) && !url.includes('?age=');
  }).map(function (url) {
    return url.substr(CATEGORY_URL_PREFIX.length);
  });
  categoryIds.push('APPLICATION');
  return categoryIds;
}
var _default = exports["default"] = categories;