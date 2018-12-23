(function (bitlib) {
  "use strict";

  var Logger = (function () {
    var className = "Logger";

    var INFO = "INFO",
      WARN = "WARN",
      ERROR = "ERROR",
      FATAL = "FATAL",
      DEBUG = "DEBUG";

    function Logger() {
      if (!(this instanceof Logger)) {
        return new Logger();
      }

      var self = this;

      var repository = [];

      self._getAll = function () {
        return bitlib.common.copy(repository);
      };

      self._add = function (type, message) {
        if (!type || !message) {
          return self;
        }

        repository.push({
          type: type,
          date: new Date(),
          message: message
        });

        return self;
      };

      self._clear = function () {
        repository = [];
        return self;
      };

      return self;
    };

    Logger.prototype.getAll = function () {
      return this._getAll();
    };

    Logger.prototype.info = function (message) {
      if (message) {
        this._add(INFO, message);
        console.info(message);
      }
      return this;
    };

    Logger.prototype.warn = function (message) {
      if (message) {
        this._add(WARN, message);
        console.warn(message);
      }
      return this;
    };

    Logger.prototype.error = function (message) {
      if (message) {
        this._add(ERROR, message);
        console.error(message);
      }
      return this;
    };

    Logger.prototype.fatal = function (message) {
      if (message) {
        this._add(FATAL, message);
        console.error(message);
      }
      return this;
    };

    Logger.prototype.debug = function (message) {
      if (message) {
        this._add(DEBUG, message);
        console.log(message);
      }
      return this;
    };

    Logger.prototype.clear = function () {
      return this._clear();
    };

    Logger.getClassName = function () {
      return className;
    };

    return Logger;
  }());

  bitlib.logger = (function () {
    var self = {};

    self.type = "bitlib.logger";

    var logger = new Logger(),
      messageCalled = "";

    self.getAll = function () {
      return logger.getAll();
    };

    self.info = function (message) {
      logger.info(message);

      if (message) {
        messageCalled = message;
      }

      return self;
    };

    self.warn = function (message) {
      logger.warn(message);

      if (message) {
        messageCalled = message;
      }

      return self;
    };

    self.error = function (message) {
      logger.error(message);

      if (message) {
        messageCalled = message;
      }

      return self;
    };

    self.fatal = function (message) {
      logger.fatal(message);

      if (message) {
        messageCalled = message;
      }

      return self;
    };

    self.debug = function (message) {
      logger.debug(message);

      if (message) {
        messageCalled = message;
      }

      return self;
    };

    self.show = function () {
      if (messageCalled) {
        alert(messageCalled);
      }
      return self;
    };

    self.clear = function () {
      logger.clear();
      return self;
    };

    return self;
  }());

}(bitlib || {}));