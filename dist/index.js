"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var R = _interopRequireWildcard(require("ramda"));
var _constants = require("./lib/constants.js");
var _memoizee = _interopRequireDefault(require("memoizee"));
var _app = _interopRequireDefault(require("./lib/app.js"));
var _list = _interopRequireDefault(require("./lib/list.js"));
var _search = _interopRequireDefault(require("./lib/search.js"));
var _suggest = _interopRequireDefault(require("./lib/suggest.js"));
var _developer = _interopRequireDefault(require("./lib/developer.js"));
var _reviews = _interopRequireDefault(require("./lib/reviews.js"));
var _similar = _interopRequireDefault(require("./lib/similar.js"));
var _permissions = _interopRequireDefault(require("./lib/permissions.js"));
var _datasafety = _interopRequireDefault(require("./lib/datasafety.js"));
var _categories = _interopRequireDefault(require("./lib/categories.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var methods = {
  app: _app["default"],
  list: _list["default"],
  search: R.partial(_search["default"], [_app["default"]]),
  suggest: _suggest["default"],
  developer: _developer["default"],
  reviews: _reviews["default"],
  similar: _similar["default"],
  permissions: _permissions["default"],
  datasafety: _datasafety["default"],
  categories: _categories["default"]
};
function memoized(opts) {
  var cacheOpts = Object.assign({
    primitive: true,
    normalizer: JSON.stringify,
    maxAge: 1000 * 60 * 5,
    // cache for 5 minutes
    max: 1000 // save up to 1k results to avoid memory issues
  }, opts);

  // need to rebuild the methods so they all share the same memoized appMethod
  var doMemoize = function doMemoize(fn) {
    return (0, _memoizee["default"])(fn, cacheOpts);
  };
  var mAppMethod = (0, _memoizee["default"])(_app["default"], cacheOpts);
  var otherMethods = {
    list: _list["default"],
    search: R.partial(_search["default"], [mAppMethod]),
    suggest: _suggest["default"],
    developer: _developer["default"],
    reviews: _reviews["default"],
    similar: _similar["default"],
    permissions: _permissions["default"],
    datasafety: _datasafety["default"],
    categories: _categories["default"]
  };
  return Object.assign({
    app: mAppMethod
  }, _constants.constants, R.map(doMemoize, otherMethods));
}
var _default = exports["default"] = Object.assign({
  memoized: memoized
}, _constants.constants, methods);