"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var cheerio = _interopRequireWildcard(require("cheerio"));
var R = _interopRequireWildcard(require("ramda"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function descriptionHtmlLocalized(searchArray) {
  var descriptionTranslation = R.path([12, 0, 0, 1], searchArray);
  var descriptionOriginal = R.path([72, 0, 1], searchArray);
  return descriptionTranslation || descriptionOriginal;
}
function descriptionText(description) {
  // preserve the line breaks when converting to text
  var html = cheerio.load('<div>' + description.replace(/<br>/g, '\r\n') + '</div>');
  return html('div').text();
}
function priceText(priceText) {
  return priceText || 'Free';
}
function normalizeAndroidVersion(androidVersionText) {
  if (!androidVersionText) return 'VARY';
  var number = androidVersionText.split(' ')[0];
  if (parseFloat(number)) {
    return number;
  }
  return 'VARY';
}
function buildHistogram(container) {
  if (!container) {
    return {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0
    };
  }
  return {
    1: container[1][1],
    2: container[2][1],
    3: container[3][1],
    4: container[4][1],
    5: container[5][1]
  };
}

/**
 * Extract the comments from google play script array
 * @param {array} comments The comments array
 */
function extractComments(data) {
  /**
   * Comments have been found to migrate between two
   * paths: ds:8 and ds:9. For this reason, we'll check
   * for expected fields in both paths to determine
   * the correct path to use.
   */
  var comments = [];
  for (var _i = 0, _arr = ['ds:8', 'ds:9']; _i < _arr.length; _i++) {
    var path = _arr[_i];
    var authorPath = [path, 0, 0, 1, 0];
    var versionPath = [path, 0, 0, 10];
    var datePath = [path, 0, 0, 5, 0];

    /**
     * This logic could be further improved by checking
     * values like `version` and `date` against expected
     * patterns for these values.
     */
    if (R.path(authorPath, data)) {
      if (R.path(versionPath, data)) {
        if (R.path(datePath, data)) {
          /**
           * If we have found all expected fields, then
           * we will dump the original comments structure
           * into the `comments` variable for further
           * handling.
           */
          comments = R.path([path, 0], data);
          break;
        }
      }
    }
  }
  if (comments.length > 0) {
    comments = comments.map(R.path([4])).slice(0, 5);
  }
  return comments;
}
function extractFeatures(featuresArray) {
  if (featuresArray === null) {
    return [];
  }
  var features = featuresArray[2] || [];
  return features.map(function (feature) {
    return {
      title: feature[0],
      description: R.path([1, 0, 0, 1], feature)
    };
  });
}

/**
 * Recursively extracts the categories of the App
 * @param {array} categories The categories array
 */
function extractCategories(searchArray) {
  var categories = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (searchArray === null || searchArray.length === 0) return categories;
  if (searchArray.length >= 4 && typeof searchArray[0] === 'string') {
    categories.push({
      name: searchArray[0],
      id: searchArray[2]
    });
  } else {
    searchArray.forEach(function (sub) {
      extractCategories(sub, categories);
    });
  }
  return categories;
}
var _default = exports["default"] = {
  descriptionHtmlLocalized: descriptionHtmlLocalized,
  descriptionText: descriptionText,
  priceText: priceText,
  normalizeAndroidVersion: normalizeAndroidVersion,
  buildHistogram: buildHistogram,
  extractComments: extractComments,
  extractFeatures: extractFeatures,
  extractCategories: extractCategories
};