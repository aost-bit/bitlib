(function (bitlib) {
  "use strict";

  // moment.js 拡張
  moment.fn.foreach = function (to, step, callback) {
    try {
      var temp = this.clone();
      while (temp <= to) {
        if (false === callback(temp)) {
          break;
        }
        temp.add(step);
      }
    } catch (err) {
      console.error(err);
    }
  };

  moment.fn.isWeekday = function () {
    var temp = this.day();
    return (temp !== 0 && temp !== 6);
  };

  var Time = (function () {
    var className = "Time";

    function Time(initObj) {
      var self = this;

      self.isTimeObj = true;

      var data = new Date(1970, 0, 1);

      self._getData = function () {
        return moment(data).toDate();
      };

      self._setData = function (newData) {
        if (bitlib.common.isDate(newData)) {
          data = new Date(
            1970,
            0,
            1,
            newData.getHours(),
            newData.getMinutes(),
            newData.getSeconds(),
            newData.getMilliseconds()
          );
        }
        return self;
      };

      if (initObj) {
        self._setData(initObj);
      }

      return self;
    }

    Time.prototype.clone = function () {
      return new Time(this._getData());
    };

    Time.prototype.getTime = function () {
      var data = this._getData(),
        base = new Date(1970, 0, 1);

      return data.getTime() - base.getTime();
    };

    Time.prototype.getHours = function () {
      return this._getData().getHours();
    };

    Time.prototype.setHours = function (val) {
      var self = this;

      val = bitlib.common.toInteger(val);
      if (isNaN(val)) {
        return self;
      }

      var data = self._getData();
      data.setHours(val);

      self._setData(data);

      return self;
    };

    Time.prototype.getMinutes = function () {
      return this._getData().getMinutes();
    };

    Time.prototype.setMinutes = function (val) {
      var self = this;

      val = bitlib.common.toInteger(val);
      if (isNaN(val)) {
        return self;
      }

      var data = self._getData();
      data.setMinutes(val);

      self._setData(data);

      return self;
    };

    Time.prototype.getSeconds = function () {
      return this._getData().getSeconds();
    };

    Time.prototype.setSeconds = function (val) {
      var self = this;

      val = bitlib.common.toInteger(val);
      if (isNaN(val)) {
        return self;
      }

      var data = self._getData();
      data.setSeconds(val);

      self._setData(data);

      return self;
    };

    Time.prototype.getMilliseconds = function () {
      return this._getData().getMilliseconds();
    };

    Time.prototype.setMilliseconds = function (val) {
      var self = this;

      val = bitlib.common.toInteger(val);
      if (isNaN(val)) {
        return self;
      }

      var data = self._getData();
      data.setMilliseconds(val);

      self._setData(data);

      return self;
    };

    Time.getClassName = function () {
      return className;
    };

    return Time;
  }());

  var TimeSpan = (function () {
    var className = "TimeSpan";

    function TimeSpan(initVal) {
      var self = this;

      self.isTimeSpanObj = true;

      var data = 0; // millisec

      self._getData = function () {
        return data;
      };

      self._setData = function (newData) {
        newData = bitlib.common.toInteger(newData);

        if (!isNaN(newData)) {
          data = newData;
        }

        return self;
      };

      if (initVal) {
        self._setData(initVal);
      }

      return self;
    }

    TimeSpan.prototype.clone = function () {
      return new TimeSpan(this._getData());
    };

    TimeSpan.prototype.getTime = function () {
      return this._getData();
    };

    TimeSpan.prototype.getHours = function () {
      return Math.floor(this._getData() / 3600000);
    };

    TimeSpan.prototype.setHours = function (val) {
      var self = this;

      val = bitlib.common.toInteger(val);
      if (isNaN(val)) {
        return self;
      }

      var rem = self._getData() % 3600000;
      var data = (val * 3600000) + rem;

      self._setData(data);

      return self;
    };

    TimeSpan.prototype.getMinutes = function () {
      var rem = this._getData() % 3600000;
      return Math.floor(rem / 60000);
    };

    TimeSpan.prototype.setMinutes = function (val) {
      var self = this;

      val = bitlib.common.toInteger(val);
      if (isNaN(val)) {
        return self;
      }

      var quot = Math.floor(self._getData() / 3600000),
        rem = self._getData() % 60000;

      var data = (quot * 3600000) + (val * 60000) + rem;

      self._setData(data);

      return self;
    };

    TimeSpan.prototype.getSeconds = function () {
      var rem = this._getData() % 60000;
      return Math.floor(rem / 1000);
    };

    TimeSpan.prototype.setSeconds = function (val) {
      var self = this;

      val = bitlib.common.toInteger(val);
      if (isNaN(val)) {
        return self;
      }

      var quot = Math.floor(self._getData() / 60000),
        rem = self._getData() % 1000;

      var data = (quot * 60000) + (val * 1000) + rem;

      self._setData(data);

      return self;
    };

    TimeSpan.prototype.getMilliseconds = function () {
      return this._getData() % 1000;
    };

    TimeSpan.prototype.setMilliseconds = function (val) {
      var self = this;

      val = bitlib.common.toInteger(val);
      if (isNaN(val)) {
        return self;
      }

      var quot = Math.floor(self._getData() / 1000);
      var data = (quot * 1000) + val;

      self._setData(data);

      return self;
    };

    TimeSpan.getClassName = function () {
      return className;
    };

    return TimeSpan;
  }());

  var DateTime = (function () {
    var className = "DateTime";

    function DateTime(initObj) {
      var self = this;

      self.isDateTimeObj = true;

      var data = new Date();

      self._getData = function () {
        return moment(data).toDate();
      };

      self._setData = function (newData) {
        if (bitlib.common.isDate(newData)) {
          data = moment(newData).toDate();
        }
        return self;
      };

      if (initObj) {
        self._setData(initObj);
      }

      return self;
    }

    DateTime.prototype.toDate = function () {
      return this._getData();
    };

    DateTime.prototype.clone = function () {
      return new DateTime(this._getData());
    };

    DateTime.prototype.getTime = function () {
      return this._getData().getTime();
    };

    DateTime.prototype.getYears = function () {
      return this._getData().getFullYear();
    };

    DateTime.prototype.setYears = function (val) {
      var self = this;

      val = bitlib.common.toInteger(val);
      if (isNaN(val)) {
        return self;
      }

      var data = self._getData();
      data.setFullYear(val);

      self._setData(data);

      return self;
    };

    DateTime.prototype.addYears = function (val) {
      var self = this;

      val = bitlib.common.toInteger(val);
      if (isNaN(val)) {
        return self;
      }

      var data = self._getData();
      self._setData(moment(data).add(val, "years").toDate());

      return self;
    };

    DateTime.prototype.subtractYears = function (val) {
      var self = this;

      val = bitlib.common.toInteger(val);
      if (isNaN(val)) {
        return self;
      }

      var data = self._getData();
      self._setData(moment(data).subtract(val, "years").toDate());

      return self;
    };

    DateTime.prototype.toNextYear = function () {
      this.addYears(1);
      return this;
    };

    DateTime.prototype.toLastYear = function () {
      this.subtractYears(1);
      return this;
    };

    DateTime.prototype.getMonths = function () {
      return this._getData().getMonth() + 1;
    };

    DateTime.prototype.setMonths = function (val) {
      var self = this;

      val = bitlib.common.toInteger(val);
      if (isNaN(val)) {
        return self;
      }

      var data = self._getData();
      data.setFullYear(val - 1);

      self._setData(data);

      return self;
    };

    DateTime.prototype.addMonths = function (val) {
      var self = this;

      val = bitlib.common.toInteger(val);
      if (isNaN(val)) {
        return self;
      }

      var data = self._getData();
      self._setData(moment(data).add(val, "months").toDate());

      return self;
    };

    DateTime.prototype.subtractMonths = function (val) {
      var self = this;

      val = bitlib.common.toInteger(val);
      if (isNaN(val)) {
        return self;
      }

      var data = self._getData();
      self._setData(moment(data).subtract(val, "months").toDate());

      return self;
    };

    DateTime.prototype.toNextMonth = function () {
      this.addMonths(1);
      return this;
    };

    DateTime.prototype.toLastMonth = function () {
      this.subtractMonths(1);
      return this;
    };

    DateTime.prototype.getDays = function () {
      return this._getData().getDate();
    };

    DateTime.prototype.setDays = function (val) {
      var self = this;

      val = bitlib.common.toInteger(val);
      if (isNaN(val)) {
        return self;
      }

      var data = self._getData();
      data.setDate(val);

      self._setData(data);

      return self;
    };

    DateTime.prototype.addDays = function (val) {
      var self = this;

      val = bitlib.common.toInteger(val);
      if (isNaN(val)) {
        return self;
      }

      var data = self._getData();
      self._setData(moment(data).add(val, "days").toDate());

      return self;
    };

    DateTime.prototype.subtractDays = function (val) {
      var self = this;

      val = bitlib.common.toInteger(val);
      if (isNaN(val)) {
        return self;
      }

      var data = self._getData();
      self._setData(moment(data).subtract(val, "days").toDate());

      return self;
    };

    DateTime.prototype.toNextDay = function () {
      this.addDays(1);
      return this;
    };

    DateTime.prototype.toLastDay = function () {
      this.subtractDays(1);
      return this;
    };

    DateTime.prototype.getHours = function () {
      return this._getData().getHours();
    };

    DateTime.prototype.setHours = function (val) {
      var self = this;

      val = bitlib.common.toInteger(val);
      if (isNaN(val)) {
        return self;
      }

      var data = self._getData();
      data.setHours(val);

      self._setData(data);

      return self;
    };

    DateTime.prototype.addHours = function (val) {
      var self = this;

      val = bitlib.common.toInteger(val);
      if (isNaN(val)) {
        return self;
      }

      var data = self._getData();
      self._setData(moment(data).add(val, "hours").toDate());

      return self;
    };

    DateTime.prototype.subtractHours = function (val) {
      var self = this;

      val = bitlib.common.toInteger(val);
      if (isNaN(val)) {
        return self;
      }

      var data = self._getData();
      self._setData(moment(data).subtract(val, "hours").toDate());

      return self;
    };

    DateTime.prototype.getMinutes = function () {
      return this._getData().getMinutes();
    };

    DateTime.prototype.setMinutes = function (val) {
      var self = this;

      val = bitlib.common.toInteger(val);
      if (isNaN(val)) {
        return self;
      }

      var data = self._getData();
      data.setMinutes(val);

      self._setData(data);

      return self;
    };

    DateTime.prototype.addMinutes = function (val) {
      var self = this;

      val = bitlib.common.toInteger(val);
      if (isNaN(val)) {
        return self;
      }

      var data = self._getData();
      self._setData(moment(data).add(val, "minutes").toDate());

      return self;
    };

    DateTime.prototype.subtractMinutes = function (val) {
      var self = this;

      val = bitlib.common.toInteger(val);
      if (isNaN(val)) {
        return self;
      }

      var data = self._getData();
      self._setData(moment(data).subtract(val, "minutes").toDate());

      return self;
    };

    DateTime.prototype.getSeconds = function () {
      return this._getData().getSeconds();
    };

    DateTime.prototype.setSeconds = function (val) {
      var self = this;

      val = bitlib.common.toInteger(val);
      if (isNaN(val)) {
        return self;
      }

      var data = self._getData();
      data.setSeconds(val);

      self._setData(data);

      return self;
    };

    DateTime.prototype.addSeconds = function (val) {
      var self = this;

      val = bitlib.common.toInteger(val);
      if (isNaN(val)) {
        return self;
      }

      var data = self._getData();
      self._setData(moment(data).add(val, "seconds").toDate());

      return self;
    };

    DateTime.prototype.subtractSeconds = function (val) {
      var self = this;

      val = bitlib.common.toInteger(val);
      if (isNaN(val)) {
        return self;
      }

      var data = self._getData();
      self._setData(moment(data).subtract(val, "seconds").toDate());

      return self;
    };

    DateTime.prototype.getMilliseconds = function () {
      return this._getData().getMilliseconds();
    };

    DateTime.prototype.setMilliseconds = function (val) {
      var self = this;

      val = bitlib.common.toInteger(val);
      if (isNaN(val)) {
        return self;
      }

      var data = self._getData();
      data.setMilliseconds(val);

      self._setData(data);

      return self;
    };

    DateTime.prototype.addMilliseconds = function (val) {
      var self = this;

      val = bitlib.common.toInteger(val);
      if (isNaN(val)) {
        return self;
      }

      var data = self._getData();
      self._setData(moment(data).add(val, "milliseconds").toDate());

      return self;
    };

    DateTime.prototype.subtractMilliseconds = function (val) {
      var self = this;

      val = bitlib.common.toInteger(val);
      if (isNaN(val)) {
        return self;
      }

      var data = self._getData();
      self._setData(moment(data).subtract(val, "milliseconds").toDate());

      return self;
    };

    DateTime.prototype.getDateOnly = function () {
      var data = this._getData();
      return new Date(data.getFullYear(), data.getMonth(), data.getDate());
    };

    DateTime.prototype.setDateOnly = function (obj) {
      var self = this;

      obj = (!obj || !obj.isDateTimeObj) ? obj : obj.toDate();
      if (!bitlib.common.isDate(obj)) {
        return self;
      }

      var days = Math.floor(obj.getTime() / 86400000);
      var times = self.getTime() % 86400000;

      self._setData(new Date((days * 86400000) + times));

      return self;
    };

    DateTime.prototype.getTimeOnly = function () {
      var data = this._getData();
      return new Time(data);
    };

    DateTime.prototype.setTimeOnly = function (obj) {
      var self = this;

      if (!obj || !obj.isTimeObj) {
        return self;
      }

      var days = Math.floor(self.getTime() / 86400000);
      self._setData(new Date((days * 86400000) + obj.getTime()));

      return self;
    };

    DateTime.prototype.isEqual = function (obj) {
      obj = (!obj || !obj.isDateTimeObj) ? obj : obj.toDate();

      if (!bitlib.common.isDate(obj)) {
        return false;
      }

      return this.getTime() === obj.getTime();
    };

    DateTime.prototype.isEqualDate = function (obj) {
      obj = (!obj || !obj.isDateTimeObj) ? obj : obj.toDate();

      if (!bitlib.common.isDate(obj)) {
        return false;
      }

      return Math.floor(this.getTime() / 86400000) === Math.floor(obj.getTime() / 86400000);
    };

    DateTime.prototype.isEqualTime = function (obj) {
      obj = (!obj || !obj.isDateTimeObj) ? obj : obj.toDate();

      if (!bitlib.common.isDate(obj)) {
        return false;
      }

      return (this.getTime() % 86400000) === (obj.getTime() % 86400000);
    };

    DateTime.getClassName = function () {
      return className;
    };

    return DateTime;
  }());

  var DateTimeRange = (function () {
    var className = "DateTimeRange";

    function DateTimeRange(initObj) {
      var self = this;

      self.isDateTimeRangeObj = true;

      var beginData = new Date(),
        endData = new Date();

      self._getBeginData = function () {
        return moment(beginData).toDate();
      };

      self._setBeginData = function (newData) {
        if (bitlib.common.isDate(newData)) {
          beginData = moment(newData).toDate();

          if (endData.getTime() < beginData.getTime()) {
            endData = moment(beginData).toDate();
          }
        }
        return self;
      };

      self._getEndData = function () {
        return moment(endData).toDate();
      };

      self._setEndData = function (newData) {
        if (bitlib.common.isDate(newData)) {
          endData = moment(newData).toDate();

          if (endData.getTime() < beginData.getTime()) {
            beginData = moment(endData).toDate();
          }
        }
        return self;
      };

      if (initObj) {
        if (bitlib.common.isDate(initObj.begin) && bitlib.common.isDate(initObj.end)) {
          var begin = initObj.begin,
            end = initObj.end;

          if (end.getTime() < begin.getTime()) {
            var temp = begin;
            begin = end;
            end = temp;
          }

          self
            ._setBeginData(begin)
            ._setEndData(end)
        }
      }

      return self;
    }

    DateTimeRange.prototype.clone = function () {
      return new DateTimeRange({
        begin: this._getBeginData(),
        end: this._getEndData()
      });
    };

    DateTimeRange.prototype.getDurationTime = function () {
      return this._getEndData().getTime() - this._getBeginData().getTime();
    };

    DateTimeRange.prototype.getBegin = function () {
      return this._getBeginData();
    };

    DateTimeRange.prototype.getEnd = function () {
      return this._getEndData();
    };

    DateTimeRange.prototype.setBegin = function (obj) {
      this._setBeginData(obj);
      return this;
    };

    DateTimeRange.prototype.setEnd = function (obj) {
      this._setEndData(obj);
      return this;
    };

    DateTimeRange.prototype.shiftForward = function (val) {
      var self = this;

      if (bitlib.common.isObject(val) && val.isTimeSpanObj) {
        val = val.getTime();
      }

      val = bitlib.common.toInteger(val);
      if (isNaN(val)) {
        return self;
      }

      var beginData = self._getBeginData(),
        endData = self._getEndData();

      self
        ._setBeginData(moment(beginData).add(val, "milliseconds").toDate())
        ._setEndData(moment(endData).add(val, "milliseconds").toDate());

      return self;
    };

    DateTimeRange.prototype.shiftBackward = function (val) {
      var self = this;

      if (bitlib.common.isObject(val) && val.isTimeSpanObj) {
        val = val.getTime();
      }

      val = bitlib.common.toInteger(val);
      if (isNaN(val)) {
        return self;
      }

      var beginData = self._getBeginData(),
        endData = self._getEndData();

      self
        ._setBeginData(moment(beginData).subtract(val, "milliseconds").toDate())
        ._setEndData(moment(endData).subtract(val, "milliseconds").toDate());

      return self;
    };

    DateTimeRange.prototype.isOverlapped = function (obj) {
      var self = this;

      if (!obj || !obj.isDateTimeRangeObj) {
        return false;
      }

      var beginData = self._getBeginData(),
        endData = self._getEndData();

      return (obj.getBegin().getTime() <= endData.getTime()) && (beginData.getTime() <= obj.getEnd().getTime());
    };

    DateTimeRange.prototype.contains = function (obj) {
      var self = this;

      obj = (!obj || !obj.isDateTimeObj) ? obj : obj.toDate();
      if (!bitlib.common.isDate(obj)) {
        return false;
      }

      var beginData = self._getBeginData(),
        endData = self._getEndData();

      return (obj.getTime() <= endData.getTime()) && (beginData.getTime() <= obj.getTime());
    };

    DateTimeRange.prototype.isEqual = function (obj) {
      var self = this;

      if (!obj || !obj.isDateTimeRangeObj) {
        return false;
      }

      var beginData = self._getBeginData(),
        endData = self._getEndData();

      return (obj.getBegin().getTime() === beginData.getTime()) && (obj.getEnd().getTime() === endData.getTime());
    };

    DateTimeRange.prototype.getIntersectRange = function (obj) {
      var self = this;

      if (!self.isOverlapped(obj)) {
        return self.clone();
      }

      var beginData = self._getBeginData(),
        endData = self._getEndData();

      var objBeginData = obj._getBeginData(),
        objEndData = obj._getEndData();

      return new DateTimeRange({
        begin: new Date(Math.max(beginData.getTime(), objBeginData.getTime())),
        end: new Date(Math.min(endData.getTime(), objEndData.getTime()))
      });
    };

    DateTimeRange.prototype.getUnionRange = function (obj) {
      var self = this;

      if (!self.isOverlapped(obj)) {
        return self.clone();
      }

      var beginData = self._getBeginData(),
        endData = self._getEndData();

      var objBeginData = obj._getBeginData(),
        objEndData = obj._getEndData();

      return new DateTimeRange({
        begin: new Date(Math.min(beginData.getTime(), objBeginData.getTime())),
        end: new Date(Math.max(endData.getTime(), objEndData.getTime()))
      });
    };

    DateTimeRange.prototype.eachDay = function (callback) {
      var self = this;

      if (!callback || !bitlib.common.isFunction(callback)) {
        return self;
      }

      var beginData = self._getBeginData(),
        endData = self._getEndData();

      moment(beginData)
        .startOf("day")
        .foreach(endData, 86400000, callback);

      return self;
    };

    DateTimeRange.getClassName = function () {
      return className;
    };

    return DateTimeRange;
  }());

  var DateRange = (function () {
    var className = "DateRange";

    function DateRange(initObj) {
      var self = DateTimeRange.apply(this, []);

      self.isDateRangeObj = true;

      var beginData = new Date(),
        endData = new Date();

      self._getBeginData = function () {
        return moment(beginData).toDate();
      };

      self._setBeginData = function (newData) {
        if (bitlib.common.isDate(newData)) {
          beginData = new Date(
            newData.getFullYear(),
            newData.getMonth(),
            newData.getDate()
          );

          if (endData.getTime() < beginData.getTime()) {
            endData = new Date(
              beginData.getFullYear(),
              beginData.getMonth(),
              beginData.getDate(),
              23,
              59,
              59,
              999
            );
          }
        }
        return self;
      };

      self._getEndData = function () {
        return moment(endData).toDate();
      };

      self._setEndData = function (newData) {
        if (bitlib.common.isDate(newData)) {
          endData = new Date(
            newData.getFullYear(),
            newData.getMonth(),
            newData.getDate(),
            23,
            59,
            59,
            999
          );

          if (endData.getTime() < beginData.getTime()) {
            beginData = new Date(
              endData.getFullYear(),
              endData.getMonth(),
              endData.getDate()
            );
          }
        }
        return self;
      };

      if (initObj) {
        if (bitlib.common.isDate(initObj.begin) && bitlib.common.isDate(initObj.end)) {
          var begin = initObj.begin,
            end = initObj.end;

          if (end.getTime() < begin.getTime()) {
            var temp = begin;
            begin = end;
            end = temp;
          }

          self
            ._setBeginData(begin)
            ._setEndData(end)
        }
      }

      return self;
    }

    var _super = DateTimeRange;
    inherits(DateRange, _super);

    DateRange.prototype.clone = function () {
      return new DateRange({
        begin: this._getBeginData(),
        end: this._getEndData()
      });
    };

    DateRange.prototype.getDurationDays = function () {
      return Math.ceil(this.getDurationTime() / 86400000);
    };

    DateRange.prototype.getIntersectRange = function (obj) {
      var self = this;

      if (!self.isOverlapped(obj)) {
        return self.clone();
      }

      var beginData = self._getBeginData(),
        endData = self._getEndData();

      var objBeginData = obj._getBeginData(),
        objEndData = obj._getEndData();

      return new DateRange({
        begin: new Date(Math.max(beginData.getTime(), objBeginData.getTime())),
        end: new Date(Math.min(endData.getTime(), objEndData.getTime()))
      });
    };

    DateRange.prototype.getUnionRange = function (obj) {
      var self = this;

      if (!self.isOverlapped(obj)) {
        return self.clone();
      }

      var beginData = self._getBeginData(),
        endData = self._getEndData();

      var objBeginData = obj._getBeginData(),
        objEndData = obj._getEndData();

      return new DateRange({
        begin: new Date(Math.min(beginData.getTime(), objBeginData.getTime())),
        end: new Date(Math.max(endData.getTime(), objEndData.getTime()))
      });
    };

    DateRange.getClassName = function () {
      return className;
    };

    return DateRange;
  }());

  bitlib.datetime = (function () {
    var self = {};

    self.type = "bitlib.datetime";

    self.startOfMonth = function (date) {
      return moment(date).startOf("month").toDate();
    };

    self.endOfMonth = function (date) {
      return moment(date).endOf("month").toDate();
    };

    self.startOfWeek = function (date) {
      return moment(date).startOf("week").toDate();
    };

    self.endOfWeek = function (date) {
      return moment(date).endOf("week").toDate();
    };

    self.startOfDay = function (date) {
      return moment(date).startOf("day").toDate();
    };

    self.endOfDay = function (date) {
      return moment(date).endOf("day").toDate();
    };

    self.startOfCalendar = function (date) {
      var first = moment(date).startOf("month");
      if (first.day() === 0) {
        return first.day(-7).toDate();
      }
      return first.startOf("week").toDate();
    };

    self.endOfCalendar = function (date) {
      var start = self.startOfCalendar(date);
      return moment(start).add("week", 5).endOf("week").toDate();
    };

    self.createTimeObj = function (initObj) {
      return new Time(initObj);
    };

    self.createTimeSpanObj = function (initVal) {
      return new TimeSpan(initVal);
    };

    self.createDateTimeObj = function (initObj) {
      return new DateTime(initObj);
    };

    self.createDateTimeRangeObj = function (initObj) {
      return new DateTimeRange(initObj);
    };

    self.createDateRangeObj = function (initObj) {
      return new DateRange(initObj);
    };

    return self;
  }());

}(bitlib || {}));