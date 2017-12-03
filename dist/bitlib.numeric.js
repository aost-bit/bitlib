(function (bitlib) {
  "use strict";

  var Numeric = (function () {
    var className = "Numeric";

    function parseToNumber(val) {
      if (bitlib.common.isString(val)) {
        val = bitlib.string.replaceToEncode(val)
          .replace(/[A-za-z!"#$%&'()=<>,?_\[\]{}@^~\\ぁ-んァ-ン]/g, "");
      }

      val = bitlib.common.toNumber(val);

      return val;
    }

    function Numeric(initVal) {
      var self = this;

      self.isNumericObj = true;

      var data = 0; // number

      self._getData = function () {
        return data;
      };

      self._setData = function (newData) {
        newData = bitlib.common.toNumber(newData);

        if (!isNaN(newData)) {
          data = newData;
        }

        return self;
      };

      var limitMax = Number.POSITIVE_INFINITY,
        limitMin = Number.NEGATIVE_INFINITY;

      self._getLimitMax = function () {
        return limitMax;
      };

      self._setLimitMax = function (newVal) {
        newVal = bitlib.common.toNumber(newVal);

        if (!isNaN(newVal)) {
          limitMax = (newVal < limitMin) ? limitMin : newVal;

          if (limitMax < data) {
            data = limitMax;
          }
        }

        return self;
      };

      self._getLimitMin = function () {
        return limitMin;
      };

      self._setLimitMin = function (newVal) {
        newVal = bitlib.common.toNumber(newVal);

        if (!isNaN(newVal)) {
          limitMin = (limitMax < newVal) ? limitMax : newVal;

          if (data < limitMin) {
            data = limitMin;
          }
        }

        return self;
      };

      if (initVal) {
        self._setData(initVal);
      }

      return self;
    }

    Numeric.prototype.clone = function () {
      return new Numeric(this._getData());
    };

    Numeric.prototype.getNumber = function () {
      return this._getData();
    };

    Numeric.prototype.setNumber = function (val) {
      var self = this;

      val = parseToNumber(val);

      if (isNaN(val)) {
        return self;
      }

      var limitMax = self._getLimitMax(),
        limitMin = self._getLimitMin();

      if (val < limitMin || limitMax < val) {
        val = (val < limitMin) ? limitMin : limitMax;
      }

      self._setData(val);

      return self;
    };

    Numeric.prototype.trySetNumber = function (val) {
      var self = this;

      val = parseToNumber(val);

      if (isNaN(val)) {
        return false;
      }

      var limitMax = self._getLimitMax(),
        limitMin = self._getLimitMin();

      if (val < limitMin || limitMax < val) {
        return false;
      }

      return true;
    };

    Numeric.prototype.addNumber = function (val) {
      var self = this;

      val = parseToNumber(val);

      if (isNaN(val)) {
        return self;
      }

      var data = self._getData();
      data = data + val;

      // 循環小数を含む計算結果を丸める.
      data = Math.round(data * 1E+10) / 1E+10;

      var limitMax = self._getLimitMax(),
        limitMin = self._getLimitMin();

      if (data < limitMin || limitMax < data) {
        data = (data < limitMin) ? limitMin : limitMax;
      }

      self._setData(data);

      return self;
    };

    Numeric.prototype.tryAddNumber = function (val) {
      var self = this;

      val = parseToNumber(val);

      if (isNaN(val)) {
        return false;
      }

      var data = self._getData();
      data = data + val;

      // 循環小数を含む計算結果を丸める.
      data = Math.round(data * 1E+10) / 1E+10;

      var limitMax = self._getLimitMax(),
        limitMin = self._getLimitMin();

      if (data < limitMin || limitMax < data) {
        return false;
      }

      return true;
    };

    Numeric.prototype.minusNumber = function (val) {
      var self = this;

      val = parseToNumber(val);

      if (isNaN(val)) {
        return self;
      }

      var data = self._getData();
      data = data - val;

      // 循環小数を含む計算結果を丸める.
      data = Math.round(data * 1E+10) / 1E+10;

      var limitMax = self._getLimitMax(),
        limitMin = self._getLimitMin();

      if (data < limitMin || limitMax < data) {
        data = (data < limitMin) ? limitMin : limitMax;
      }

      self._setData(data);

      return self;
    };

    Numeric.prototype.tryMinusNumber = function (val) {
      var self = this;

      val = parseToNumber(val);

      if (isNaN(val)) {
        return false;
      }

      var data = self._getData();
      data = data - val;

      // 循環小数を含む計算結果を丸める.
      data = Math.round(data * 1E+10) / 1E+10;

      var limitMax = self._getLimitMax(),
        limitMin = self._getLimitMin();

      if (data < limitMin || limitMax < data) {
        return false;
      }

      return true;
    };

    Numeric.prototype.setLimitMax = function (val) {
      this._setLimitMax(val);
      return this;
    };

    Numeric.prototype.setLimitMin = function (val) {
      this._setLimitMin(val);
      return this;
    };

    Numeric.getClassName = function () {
      return className;
    };

    return Numeric;
  }());

  bitlib.numeric = (function () {
    var self = {};

    self.type = "bitlib.numeric";

    self.createNumericObj = function (initVal) {
      return new Numeric(initVal);
    };

    return self;
  }());

}(bitlib || {}));