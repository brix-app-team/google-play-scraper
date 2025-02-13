function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(typeof e + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
import * as R from 'ramda';
import request from './utils/request.js';
import scriptData from './utils/scriptData.js';
import { BASE_URL, constants } from './constants.js';
import createDebug from 'debug';
var debug = createDebug('google-play-scraper:reviews');
function reviews(opts) {
  return new Promise(function (resolve, reject) {
    validate(opts);
    var fullOptions = Object.assign({
      sort: constants.sort.NEWEST,
      lang: 'en',
      country: 'us',
      num: 150,
      paginate: false,
      nextPaginationToken: null
    }, opts);
    processReviews(fullOptions).then(resolve)["catch"](reject);
  });
}
function validate(opts) {
  if (!opts || !opts.appId) {
    throw Error('appId missing');
  }
  if (opts.sort && !R.includes(opts.sort, R.values(constants.sort))) {
    throw new Error('Invalid sort ' + opts.sort);
  }
}

/**
 * Format the reviews for correct and unified response model
 * @param {array} reviews The reviews to be formated
 * @param {string} token The token to be sent
 */
function formatReviewsResponse(_ref) {
  var reviews = _ref.reviews,
    num = _ref.num,
    _ref$token = _ref.token,
    token = _ref$token === void 0 ? null : _ref$token;
  var reviewsToResponse = reviews.length >= num ? reviews.slice(0, num) : reviews;
  return {
    data: reviewsToResponse,
    nextPaginationToken: token
  };
}

/**
 * This object allow us to differ between
 * the initial body request and the paginated ones
 */
var REQUEST_TYPE = {
  initial: 'initial',
  paginated: 'paginated'
};

/**
 * This method allow us to get the body for the review request
 *
 * @param {string} options.appId The app id for reviews
 * @param {number} options.sort The sort order for reviews
 * @param {number} options.numberOfReviewsPerRequest The number of reviews per request
 * @param {string} options.withToken The token to be used for the given request
 * @param {string} options.requestType The request type
 */
function getBodyForRequests(_ref2) {
  var _formBody;
  var appId = _ref2.appId,
    sort = _ref2.sort,
    _ref2$numberOfReviews = _ref2.numberOfReviewsPerRequest,
    numberOfReviewsPerRequest = _ref2$numberOfReviews === void 0 ? 150 : _ref2$numberOfReviews,
    _ref2$withToken = _ref2.withToken,
    withToken = _ref2$withToken === void 0 ? '%token%' : _ref2$withToken,
    _ref2$requestType = _ref2.requestType,
    requestType = _ref2$requestType === void 0 ? REQUEST_TYPE.initial : _ref2$requestType;
  /* The body is slight different for the initial and paginated requests */
  var formBody = (_formBody = {}, _formBody[REQUEST_TYPE.initial] = "f.req=%5B%5B%5B%22UsvDTd%22%2C%22%5Bnull%2Cnull%2C%5B2%2C" + sort + "%2C%5B" + numberOfReviewsPerRequest + "%2Cnull%2Cnull%5D%2Cnull%2C%5B%5D%5D%2C%5B%5C%22" + appId + "%5C%22%2C7%5D%5D%22%2Cnull%2C%22generic%22%5D%5D%5D", _formBody[REQUEST_TYPE.paginated] = "f.req=%5B%5B%5B%22UsvDTd%22%2C%22%5Bnull%2Cnull%2C%5B2%2C" + sort + "%2C%5B" + numberOfReviewsPerRequest + "%2Cnull%2C%5C%22" + withToken + "%5C%22%5D%2Cnull%2C%5B%5D%5D%2C%5B%5C%22" + appId + "%5C%22%2C7%5D%5D%22%2Cnull%2C%22generic%22%5D%5D%5D", _formBody);
  return formBody[requestType];
}
var REQUEST_MAPPINGS = {
  reviews: [0],
  token: [1, 1]
};

// FIXME this looks similar to the processAndRecur from other methods
function processReviewsAndGetNextPage(_x, _x2, _x3) {
  return _processReviewsAndGetNextPage.apply(this, arguments);
}
/**
 * Make a review request to Google Play Store
 * @param {object} opts The request options
 * @param {array} savedReviews The reviews accumulator array
 * @param {string} nextToken The next page token
 */
function _processReviewsAndGetNextPage() {
  _processReviewsAndGetNextPage = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(html, opts, savedReviews) {
    var processAndRecurOptions, appId, paginate, num, parsedHtml, reviews, token, reviewsAccumulator;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          processAndRecurOptions = Object.assign({}, opts, {
            requestType: REQUEST_TYPE.paginated
          });
          appId = processAndRecurOptions.appId, paginate = processAndRecurOptions.paginate, num = processAndRecurOptions.num;
          parsedHtml = R.is(String, html) ? scriptData.parse(html) : html;
          if (!(parsedHtml.length === 0)) {
            _context.next = 5;
            break;
          }
          return _context.abrupt("return", formatReviewsResponse({
            reviews: savedReviews,
            token: null,
            num: num
          }));
        case 5:
          // PROCESS REVIEWS EXTRACTION
          reviews = extract(REQUEST_MAPPINGS.reviews, parsedHtml, appId);
          token = R.path(REQUEST_MAPPINGS.token, parsedHtml);
          reviewsAccumulator = [].concat(savedReviews, reviews);
          return _context.abrupt("return", !paginate && token && reviewsAccumulator.length < num ? makeReviewsRequest(processAndRecurOptions, reviewsAccumulator, token) : formatReviewsResponse({
            reviews: reviewsAccumulator,
            token: token,
            num: num
          }));
        case 9:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _processReviewsAndGetNextPage.apply(this, arguments);
}
function makeReviewsRequest(opts, savedReviews, nextToken) {
  debug('nextToken: %s', nextToken);
  debug('savedReviews length: %s', savedReviews.length);
  debug('requestType: %s', opts.requestType);
  var appId = opts.appId,
    sort = opts.sort,
    requestType = opts.requestType,
    lang = opts.lang,
    country = opts.country,
    requestOptions = opts.requestOptions,
    throttle = opts.throttle,
    num = opts.num;
  var body = getBodyForRequests({
    appId: appId,
    sort: sort,
    withToken: nextToken,
    requestType: requestType
  });
  var url = BASE_URL + "/_/PlayStoreUi/data/batchexecute?rpcids=qnKhOb&f.sid=-697906427155521722&bl=boq_playuiserver_20190903.08_p0&hl=" + lang + "&gl=" + country + "&authuser&soc-app=121&soc-platform=1&soc-device=1&_reqid=1065213";
  debug('batchexecute URL: %s', url);
  debug('with body: %s', body);
  var reviewRequestOptions = Object.assign({
    url: url,
    method: 'POST',
    body: body,
    followRedirect: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  }, requestOptions);
  return request(reviewRequestOptions, throttle).then(function (html) {
    var input = JSON.parse(html.substring(5));
    var data = JSON.parse(input[0][2]);
    return data === null ? formatReviewsResponse({
      reviews: savedReviews,
      token: null,
      num: num
    }) : processReviewsAndGetNextPage(data, opts, savedReviews);
  });
}

/**
 * Process the reviews for a given app
 * @param {object} opts The options for reviews behavior
 */
function processReviews(opts) {
  var requestType = !opts.nextPaginationToken ? REQUEST_TYPE.initial : REQUEST_TYPE.paginated;
  var token = opts.nextPaginationToken || '%token%';
  var reviewsOptions = Object.assign({}, {
    requestType: requestType
  }, opts);
  return makeReviewsRequest(reviewsOptions, [], token);
}
function getReviewsMappings(appId) {
  var MAPPINGS = {
    id: [0],
    userName: [1, 0],
    userImage: [1, 1, 3, 2],
    date: {
      path: [5],
      fun: generateDate
    },
    score: [2],
    scoreText: {
      path: [2],
      fun: function fun(score) {
        return String(score);
      }
    },
    url: {
      path: [0],
      fun: function fun(reviewId) {
        return BASE_URL + "/store/apps/details?id=" + appId + "&reviewId=" + reviewId;
      }
    },
    title: {
      path: [0],
      fun: function fun() {
        return null;
      }
    },
    text: [4],
    replyDate: {
      path: [7, 2],
      fun: generateDate
    },
    replyText: {
      path: [7, 1],
      fun: function fun(text) {
        return text || null;
      }
    },
    version: {
      path: [10],
      fun: function fun(version) {
        return version || null;
      }
    },
    thumbsUp: [6],
    criterias: {
      path: [12, 0],
      fun: function fun(criterias) {
        if (criterias === void 0) {
          criterias = [];
        }
        return criterias.map(buildCriteria);
      }
    }
  };
  return MAPPINGS;
}
var buildCriteria = function buildCriteria(criteria) {
  return {
    criteria: criteria[0],
    rating: criteria[1] ? criteria[1][0] : null
  };
};
function generateDate(dateArray) {
  if (!dateArray) {
    return null;
  }
  var millisecondsLastDigits = String(dateArray[1] || '000');
  var millisecondsTotal = "" + dateArray[0] + millisecondsLastDigits.substring(0, 3);
  var date = new Date(Number(millisecondsTotal));
  return date.toJSON();
}

/*
 * Apply MAPPINGS for each application in list from root path
*/
function extract(root, data, appId) {
  var input = R.path(root, data);
  var MAPPINGS = getReviewsMappings(appId);
  return R.map(scriptData.extractor(MAPPINGS), input);
}
export default reviews;