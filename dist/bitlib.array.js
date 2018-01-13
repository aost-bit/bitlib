import { setTimeout } from "timers";

(function (bitlib) {
  "use strict";

  bitlib.array = (function () {
    var self = {};

    self.type = "bitlib.array";

    self.isEmpty = function (arr) {
      if (!bitlib.common.isArray(arr) && !bitlib.common.isObservableArray(arr)) {
        return false;
      }

      arr = bitlib.common.isObservable(arr) ? arr() : arr;

      return (arr.length === 0);
    };

    self.contains = function (arr, elems) {
      arr = arr || [];

      if (!bitlib.common.isArray(arr) && !bitlib.common.isObservableArray(arr)) {
        return false;
      }

      arr = bitlib.common.isObservable(arr) ? arr() : arr;

      elems = bitlib.common.isArray(elems) ? elems : [elems];
      if (elems.length === 0) {
        return false;
      }

      for (var i = 0, len = elems.length; i < len; i++) {
        if (-1 < $.inArray(elems[i], arr)) {
          return true;
        }
      }

      return false;
    };

    self.removeUndefined = function (arr) {
      arr = arr || [];

      if (!bitlib.common.isArray(arr) || arr.length === 0) {
        return [];
      }

      var results = [];
      for (var i = 0, len = arr.length; i < len; i++) {
        if (!bitlib.common.isUndefined(arr[i])) {
          results.push(arr[i]);
        }
      }

      return results;
    };

    self.removeNullOrUndefined = function (arr) {
      arr = arr || [];

      if (!bitlib.common.isArray(arr) || arr.length === 0) {
        return [];
      }

      var results = [];
      for (var i = 0, len = arr.length; i < len; i++) {
        if (!bitlib.common.isNullOrUndefined(arr[i])) {
          results.push(arr[i]);
        }
      }

      return results;
    };

    self.each = function (arr, callback) {
      if (!arr || !bitlib.common.isFunction(callback)) {
        return self;
      }

      arr = bitlib.common.isObservable(arr) ? arr() : arr;
      arr = bitlib.common.isArray(arr) ? arr : [arr];

      try {
        for (var i = 0, len = arr.length; i < len; i++) {
          if (callback(i, arr[i]) === false) {
            break;
          }
        }
      } catch (err) {
        bitlib.logger.error(err);
      }

      return self;
    };

    self.any = function (arr, validator) {
      if (!arr) {
        return false;
      }

      arr = bitlib.common.isObservable(arr) ? arr() : arr;
      arr = bitlib.common.isArray(arr) ? arr : [arr];

      if (!bitlib.common.isFunction(validator)) {
        validator = function (i, elem) {
          return !!elem;
        };
      }

      try {
        for (var i = 0, len = arr.length; i < len; i++) {
          if (!!validator(i, arr[i])) {
            return true;
          }
        }
      } catch (err) {
        bitlib.logger.error(err);
      }

      return false;
    };

    self.eachTimeout = function (arr, callback, interval) {
      var defer = $.Deferred();

      if (!bitlib.common.isArray(arr) || arr.length === 0 || !bitlib.common.isFunction(callback)) {
        return defer.resolve().promise();
      }

      if (!bitlib.common.isNumber(interval) || interval < 10) {
        interval = 10;
      }

      var i = 0,
        len = arr.length;

      var eachTimeout = function () {
        var rt = callback(i, arr[i]);

        if (rt === false || i === len - 1) {
          defer.resolve();
          return this;
        }

        i++;
        setTimeout(eachTimeout, interval);
      };

      setTimeout(eachTimeout, 0);

      return defer.promise();
    };

    return self;
  }());

}(bitlib || {}));