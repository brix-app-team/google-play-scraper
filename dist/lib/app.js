"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var R = _interopRequireWildcard(require("ramda"));
var _querystring = _interopRequireDefault(require("querystring"));
var _request = _interopRequireDefault(require("./utils/request.js"));
var _scriptData = _interopRequireDefault(require("./utils/scriptData.js"));
var _constants = require("./constants.js");
var _mappingHelpers = _interopRequireDefault(require("./utils/mappingHelpers.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var PLAYSTORE_URL = "".concat(_constants.BASE_URL, "/store/apps/details");
function app(opts) {
  return new Promise(function (resolve, reject) {
    if (!opts || !opts.appId) {
      throw Error('appId missing');
    }
    opts.lang = opts.lang || 'en';
    opts.country = opts.country || 'us';
    var qs = _querystring["default"].stringify({
      id: opts.appId,
      hl: opts.lang,
      gl: opts.country
    });
    var reqUrl = "".concat(PLAYSTORE_URL, "?").concat(qs);
    var options = Object.assign({
      url: reqUrl,
      followRedirect: true
    }, opts.requestOptions);
    (0, _request["default"])(options, opts.throttle).then(_scriptData["default"].parse)
    // comment next line to get raw data
    .then(_scriptData["default"].extractor(MAPPINGS)).then(R.assoc('appId', opts.appId)).then(R.assoc('url', reqUrl)).then(resolve)["catch"](reject);
  });
}
var MAPPINGS = {
  title: ['ds:5', 1, 2, 0, 0],
  description: {
    path: ['ds:5', 1, 2],
    fun: function fun(val) {
      return _mappingHelpers["default"].descriptionText(_mappingHelpers["default"].descriptionHtmlLocalized(val));
    }
  },
  descriptionHTML: {
    path: ['ds:5', 1, 2],
    fun: _mappingHelpers["default"].descriptionHtmlLocalized
  },
  summary: ['ds:5', 1, 2, 73, 0, 1],
  installs: ['ds:5', 1, 2, 13, 0],
  minInstalls: ['ds:5', 1, 2, 13, 1],
  maxInstalls: ['ds:5', 1, 2, 13, 2],
  score: ['ds:5', 1, 2, 51, 0, 1],
  scoreText: ['ds:5', 1, 2, 51, 0, 0],
  ratings: ['ds:5', 1, 2, 51, 2, 1],
  reviews: ['ds:5', 1, 2, 51, 3, 1],
  histogram: {
    path: ['ds:5', 1, 2, 51, 1],
    fun: _mappingHelpers["default"].buildHistogram
  },
  price: {
    path: ['ds:5', 1, 2, 57, 0, 0, 0, 0, 1, 0, 0],
    fun: function fun(val) {
      return val / 1000000 || 0;
    }
  },
  // If there is a discount, originalPrice if filled.
  originalPrice: {
    path: ['ds:5', 1, 2, 57, 0, 0, 0, 0, 1, 1, 0],
    fun: function fun(price) {
      return price ? price / 1000000 : undefined;
    }
  },
  discountEndDate: ['ds:5', 1, 2, 57, 0, 0, 0, 0, 14, 1],
  free: {
    path: ['ds:5', 1, 2, 57, 0, 0, 0, 0, 1, 0, 0],
    // considered free only if price is exactly zero
    fun: function fun(val) {
      return val === 0;
    }
  },
  currency: ['ds:5', 1, 2, 57, 0, 0, 0, 0, 1, 0, 1],
  priceText: {
    path: ['ds:5', 1, 2, 57, 0, 0, 0, 0, 1, 0, 2],
    fun: _mappingHelpers["default"].priceText
  },
  available: {
    path: ['ds:5', 1, 2, 18, 0],
    fun: Boolean
  },
  offersIAP: {
    path: ['ds:5', 1, 2, 19, 0],
    fun: Boolean
  },
  IAPRange: ['ds:5', 1, 2, 19, 0],
  androidVersion: {
    path: ['ds:5', 1, 2, 140, 1, 1, 0, 0, 1],
    fun: _mappingHelpers["default"].normalizeAndroidVersion
  },
  androidVersionText: {
    path: ['ds:5', 1, 2, 140, 1, 1, 0, 0, 1],
    fun: function fun(version) {
      return version || 'Varies with device';
    }
  },
  androidMaxVersion: {
    path: ['ds:5', 1, 2, 140, 1, 1, 0, 1, 1],
    fun: _mappingHelpers["default"].normalizeAndroidVersion
  },
  developer: ['ds:5', 1, 2, 68, 0],
  developerId: {
    path: ['ds:5', 1, 2, 68, 1, 4, 2],
    fun: function fun(devUrl) {
      return devUrl.split('id=')[1];
    }
  },
  developerEmail: ['ds:5', 1, 2, 69, 1, 0],
  developerWebsite: ['ds:5', 1, 2, 69, 0, 5, 2],
  developerAddress: ['ds:5', 1, 2, 69, 2, 0],
  developerLegalName: ['ds:5', 1, 2, 69, 4, 0],
  developerLegalEmail: ['ds:5', 1, 2, 69, 4, 1, 0],
  developerLegalAddress: {
    path: ['ds:5', 1, 2, 69],
    fun: function fun(searchArray) {
      var _R$path;
      return (_R$path = R.path([4, 2, 0], searchArray)) === null || _R$path === void 0 ? void 0 : _R$path.replace(/\n/g, ', ');
    }
  },
  developerLegalPhoneNumber: ['ds:5', 1, 2, 69, 4, 3],
  privacyPolicy: ['ds:5', 1, 2, 99, 0, 5, 2],
  developerInternalID: {
    path: ['ds:5', 1, 2, 68, 1, 4, 2],
    fun: function fun(devUrl) {
      return devUrl.split('id=')[1];
    }
  },
  genre: ['ds:5', 1, 2, 79, 0, 0, 0],
  genreId: ['ds:5', 1, 2, 79, 0, 0, 2],
  categories: {
    path: ['ds:5', 1, 2],
    fun: function fun(searchArray) {
      var categories = _mappingHelpers["default"].extractCategories(R.path([118], searchArray));
      if (categories.length === 0) {
        // add genre and genreId like GP does when there're no categories available
        categories.push({
          name: R.path([79, 0, 0, 0], searchArray),
          id: R.path([79, 0, 0, 2], searchArray)
        });
      }
      return categories;
    }
  },
  icon: ['ds:5', 1, 2, 95, 0, 3, 2],
  headerImage: ['ds:5', 1, 2, 96, 0, 3, 2],
  screenshots: {
    path: ['ds:5', 1, 2, 78, 0],
    fun: function fun(screenshots) {
      if (!(screenshots !== null && screenshots !== void 0 && screenshots.length)) return [];
      return screenshots.map(R.path([3, 2]));
    }
  },
  video: ['ds:5', 1, 2, 100, 0, 0, 3, 2],
  videoImage: ['ds:5', 1, 2, 100, 1, 0, 3, 2],
  previewVideo: ['ds:5', 1, 2, 100, 1, 2, 0, 2],
  contentRating: ['ds:5', 1, 2, 9, 0],
  contentRatingDescription: ['ds:5', 1, 2, 9, 2, 1],
  adSupported: {
    path: ['ds:5', 1, 2, 48],
    fun: Boolean
  },
  released: ['ds:5', 1, 2, 10, 0],
  updated: {
    path: ['ds:5', 1, 2, 145, 0, 1, 0],
    fun: function fun(ts) {
      return ts * 1000;
    }
  },
  version: {
    path: ['ds:5', 1, 2, 140, 0, 0, 0],
    fun: function fun(val) {
      return val || 'VARY';
    }
  },
  recentChanges: ['ds:5', 1, 2, 144, 1, 1],
  comments: {
    path: [],
    isArray: true,
    fun: _mappingHelpers["default"].extractComments
  },
  preregister: {
    path: ['ds:5', 1, 2, 18, 0],
    fun: function fun(val) {
      return val === 1;
    }
  },
  earlyAccessEnabled: {
    path: ['ds:5', 1, 2, 18, 2],
    fun: function fun(val) {
      return typeof val === 'string';
    }
  },
  isAvailableInPlayPass: {
    path: ['ds:5', 1, 2, 62],
    fun: function fun(field) {
      return !!field;
    }
  }
};
var _default = exports["default"] = app;