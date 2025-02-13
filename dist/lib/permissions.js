import * as R from 'ramda';
import request from './utils/request.js';
import scriptData from './utils/scriptData.js';
import { BASE_URL, constants } from './constants.js';
import createDebug from 'debug';
var debug = createDebug('google-play-scraper:permissions');
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
  var body = "f.req=%5B%5B%5B%22xdSrCf%22%2C%22%5B%5Bnull%2C%5B%5C%22" + opts.appId + "%5C%22%2C7%5D%2C%5B%5D%5D%5D%22%2Cnull%2C%221%22%5D%5D%5D";
  var url = BASE_URL + "/_/PlayStoreUi/data/batchexecute?rpcids=qnKhOb&f.sid=-697906427155521722&bl=boq_playuiserver_20190903.08_p0&hl=" + opts.lang + "&gl=" + opts.country + "&authuser&soc-app=121&soc-platform=1&soc-device=1&_reqid=1065213";
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
  return request(requestOptions, opts.throttle).then(function (html) {
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
    html = scriptData.parse(html);
  }
  var commonPermissions = html[constants.permission.COMMON];
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
    html = scriptData.parse(html);
  }
  debug('html %o', html);
  var permissions = Object.values(constants.permission).reduce(function (permissionAccummulator, permission) {
    if (!html[permission]) {
      return permissionAccummulator;
    }
    permissionAccummulator.push.apply(permissionAccummulator, R.chain(flatMapPermissions, html[permission]));
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
  return R.map(scriptData.extractor(mappings), input);
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
export default permissions;