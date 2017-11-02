(function (bitlib) {
  "use strict";

  bitlib.object = (function () {
    var self = {};

    self.type = "bitlib.object";

    self.getPropertyLength = function (obj) {
      obj = obj || {};

      if (!bitlib.common.isObject(obj)) {
        return 0;
      }

      var len = 0;
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          len = len + 1;
        }
      }

      return len;
    };

    self.getPropertyByPath = function (obj, path) {
      obj = obj || {}, path = path || "";

      if (!(bitlib.common.isObject(obj) || bitlib.common.isArray(obj)) || !bitlib.common.isString(path)) {
        return undefined;
      }

      var names = path
        .replace(/\./g, "/")
        .split("/");

      var prop = bitlib.comon.copyDeep(obj);

      for (var i = 0, len = names.length; i < len; i++) {
        var name = names[i].toLowerCase(),
          val = undefined;

        if (!name) {
          continue;
        }

        for (var key in prop) {
          if (name === key.toLowerCase()) {
            val = prop[key];
            break;
          }
        }

        if (!(bitlib.common.isObject(val) || bitlib.common.isArray(val))) {
          return val;
        }

        prop = val;
      }

      return prop;
    };

    self.removeUndefined = function (obj) {
      obj = obj || {};

      if (!bitlib.common.isObject(obj)) {
        return {};
      }

      var results = {};
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (!bitlib.common.isUndefined(obj[key])) {
            results[key] = obj[key];
          }
        }
      }

      return results;
    };

    self.removeNullOrUndefined = function (obj) {
      obj = obj || {};

      if (!bitlib.common.isObject(obj)) {
        return {};
      }

      var results = {};
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (!bitlib.common.isNullOrUndefined(obj[key])) {
            results[key] = obj[key];
          }
        }
      }

      return results;
    };

    self.each = function (obj, callback) {
      obj = bitlib.common.isObservable(obj) ? obj() : obj;

      if (!bitlib.common.isObject(obj) || !bitlib.common.isFunction(callback)) {
        return self;
      }

      try {
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (callback(key, obj[key]) === false) {
              break;
            }
          }
        }
      } catch (err) {
        bitlib.logger.error(err);
      }

      return self;
    };

    self.any = function (obj, validator) {
      obj = bitlib.common.isObservable(obj) ? obj() : obj;

      if (!bitlib.common.isObject(obj)) {
        return false;
      }

      if (!bitlib.common.isFunction(validator)) {
        validator = function (key, val) {
          return !!val;
        };
      }

      try {
        for (var key in obj) {
          if (obj.hasOwnProperty(key) && !!validator(key, obj[key])) {
            return true;
          }
        }
      } catch (err) {
        bitlib.logger.error(err);
      }

      return false;
    };

    return self;
  }());

}(bitlib || {}));