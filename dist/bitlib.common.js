(function (bitlib) {
  "use strict";

  bitlib.common = (function () {
    var self = {};

    self.type = "bitlib.common";

    /**
     * 型名を小文字で返却します.
     * @param {Object} value
     * @return {String} 型名（小文字)
     */
    self.typeOf = function (value) {
      var type = typeof value;

      switch (type) {
        case "function":
          if (value instanceof RegExp) {
            return "regexp";
          }
          if (ko.isObservable(value)) {
            return (value.removeAll === undefined) ? "observable" : "observableArray";
          }
          return type;

        case "object":
          if (value instanceof RegExp) {
            return "regexp";
          }
          if (value instanceof jQuery) {
            return "jquery";
          }
          if (value instanceof Array) {
            return "array";
          }
          if (value instanceof Date) {
            return "date";
          }
          if (!(value instanceof Object)) {
            return "null";
          }
          return type;
      }

      return type;
    };

    /**
     * オブジェクトが Array か判定します.
     * @param obj {Object} オブジェクト
     * @return {Boolean} Array の場合 true
     */
    self.isArray = function (obj) {
      return (self.typeOf(obj) === "array");
    };

    /**
     * オブジェクトが Boolean か判定します.
     * @param obj {Object} オブジェクト
     * @return {Boolean} Boolean の場合 true
     */
    self.isBoolean = function (obj) {
      return (self.typeOf(obj) === "boolean");
    };

    /**
     * オブジェクトが Number か判定します.
     * @param {Object} obj  オブジェクト
     * @return {Boolean} Number の場合 true
     */
    self.isNumber = function (obj) {
      return (self.typeOf(obj) === "number");
    };

    /**
     * オブジェクトが String か判定します.
     * @param obj {Object} オブジェクト
     * @return {Boolean} String の場合 true
     */
    self.isString = function (obj) {
      return (self.typeOf(obj) === "string");
    };

    /**
     * オブジェクトが Date か判定します.
     * @param obj {Object} オブジェクト
     * @return {Boolean} Date の場合 true
     */
    self.isDate = function (obj) {
      return (self.typeOf(obj) === "date");
    };

    self.isValidDate = function (obj) {
      if (!self.isDate(obj)) {
        return false;
      }
      return !isNaN(obj.getTime());
    };

    /**
     * オブジェクトが RegExp か判定します.
     * @param obj {Object} オブジェクト
     * @return {Boolean} RegExp の場合 true
     */
    self.isRegExp = function (obj) {
      return (self.typeOf(obj) === "regexp");
    };

    /**
     * オブジェクトが Observable か判定します.
     * @param obj {Object} オブジェクト
     * @return {Boolean} Observable または ObservableArray の場合 true
     */
    self.isObservable = function (obj) {
      var type = self.typeOf(obj);
      return (type === "observable" || type === "observableArray");
    };

    /**
     * オブジェクトが ObservableArray か判定します.
     * @param obj {Object} オブジェクト
     * @return {Boolean} ObservableArray の場合 true
     */
    self.isObservableArray = function (obj) {
      return (self.typeOf(obj) === "observableArray");
    };

    /**
     * オブジェクトが Function か判定します. (RegExp, Observable は含めない)
     * @param obj {Object} オブジェクト
     * @return {Boolean} Function の場合 true
     */
    self.isFunction = function (obj) {
      if (self.isRegExp(obj) || self.isObservable(obj)) {
        return false;
      }
      return (typeof obj) === "function";
    };

    /**
     * オブジェクトが jQuery か判定します。
     * @param obj {Object} オブジェクト
     * @return {Boolean} jQuery の場合 true
     */
    self.isJQuery = function (obj) {
      return (self.typeOf(obj) === "jquery");
    };

    /**
     * オブジェクトが Object か判定します。
     * @param obj {Object} オブジェクト
     * @return {Boolean} Object の場合 true
     */
    self.isObject = function (obj) {
      return (self.typeOf(obj) === "object");
    };

    self.isUndefined = function (val) {
      return (val === undefined);
    };

    self.isNullOrUndefined = function (val) {
      return (val === undefined || val === null);
    };

    self.toBoolean = function (val) {
      if (self.isBoolean(val)) {
        return val;
      }
      return Boolean(val);
    };

    self.toInteger = function (val) {
      var result = 0;

      try {
        result = parseInt(val, 10);
      } catch (err) {
        console.warn(err);
        result = NaN;
      }

      if (isNaN(result) || !isFinite(result)) {
        return NaN;
      }

      return result;
    };

    self.toNumber = function (val) {
      var result = 0;

      try {
        result = parseFloat(val);
      } catch (err) {
        console.warn(err);
        result = NaN;
      }

      if (isNaN(result) || !isFinite(result)) {
        return NaN;
      }

      return result;
    };

    self.copyDeep = function (original) {
      if (self.isObject(original)) {
        return $.extend({}, {}, original);
      }
      if (self.isArray(original)) {
        return original.slice(0, original.length);
      }
      return original;
    };

    self.publishTemporaryUniqueName = function () {
      return (new Date().getTime().toString(16) + Math.floor(1000 * Math.random()).toString(16));
    };

    return self;
  }());

}(bitlib || {}));