(function (bitlib) {
  "use strict";

  bitlib.json = (function () {
    var self = {};

    self.type = "bitlib.json";

    self.stringify = function (obj) {
      if (bitlib.common.isNullOrUndefined(obj)) {
        return "";
      }

      try {
        return JSON.stringify(obj);
      } catch (err) {
        bitlib.logger.error(err);
      }

      return "";
    };

    // JSON 文字列を pretty-printed した形の文字列で返却します.
    self.format = function (val) {
      if (!val) {
        return "";
      }

      try {
        var obj = bitlib.common.isString(val) ? JSON.parse(val) : val;
        return JSON.stringify(obj, null, "  ");
      } catch (err) {
        bitlib.logger.error(err);
      }

      return "";
    };

    self.parse = function (val) {
      if (!val) {
        return null;
      }

      try {
        val = val.replace(/^(\s|\n)+|(\s|\n)+$/g, "");
        return JSON.parse(val);
      } catch (err) {
        bitlib.logger.error(err);
      }

      return null;
    };

    return self;
  }());

}(bitlib || {}));