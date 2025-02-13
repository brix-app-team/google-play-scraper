import request from './utils/request.js';
import * as cheerio from 'cheerio';
import { BASE_URL } from './constants.js';
var PLAYSTORE_URL = BASE_URL + "/store/apps";
var CATEGORY_URL_PREFIX = '/store/apps/category/';
function categories(opts) {
  opts = Object.assign({}, opts);
  return new Promise(function (resolve, reject) {
    var options = Object.assign({
      url: PLAYSTORE_URL
    }, opts.requestOptions);
    request(options, opts.throttle).then(cheerio.load).then(extractCategories).then(resolve)["catch"](reject);
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
export default categories;