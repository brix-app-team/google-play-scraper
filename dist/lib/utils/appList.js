"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _url = _interopRequireDefault(require("url"));
var R = _interopRequireWildcard(require("ramda"));
var _scriptData = _interopRequireDefault(require("./scriptData.js"));
var _constants = require("../constants.js");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var MAPPINGS = {
  title: [2],
  appId: [12, 0],
  url: {
    path: [9, 4, 2],
    fun: function fun(path) {
      return new _url["default"].URL(path, _constants.BASE_URL).toString();
    }
  },
  icon: [1, 1, 0, 3, 2],
  developer: [4, 0, 0, 0],
  developerId: {
    path: [4, 0, 0, 1, 4, 2],
    fun: extaractDeveloperId
  },
  priceText: {
    path: [7, 0, 3, 2, 1, 0, 2],
    fun: function fun(price) {
      return price === undefined ? 'FREE' : price;
    }
  },
  currency: [7, 0, 3, 2, 1, 0, 1],
  price: {
    path: [7, 0, 3, 2, 1, 0, 2],
    fun: function fun(price) {
      return price === undefined ? 0 : parseFloat(price.match(/([0-9.,]+)/)[0]);
    }
  },
  free: {
    path: [7, 0, 3, 2, 1, 0, 2],
    fun: function fun(price) {
      return price === undefined;
    }
  },
  summary: [4, 1, 1, 1, 1],
  scoreText: [6, 0, 2, 1, 0],
  score: [6, 0, 2, 1, 1]
};
function extaractDeveloperId(link) {
  return link.split('?id=')[1];
}

/*
 * Apply MAPPINGS for each application in list from root path
*/

function extract(root, data) {
  var input = R.path(root, data);
  if (input === undefined) return [];
  return R.map(_scriptData["default"].extractor(MAPPINGS), input);
}
var _default = exports["default"] = {
  MAPPINGS: MAPPINGS,
  extract: extract
};