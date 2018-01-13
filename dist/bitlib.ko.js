(function (bitlib) {
  "use strict";

  bitlib.ko = (function () {
    var self = {};

    self.type = "bitlib.ko";

    self.unwrap = function (val) {
      if (!val) {
        return val;
      }
      return ko.utils.unwrapObservable(val);
    };

    self.addBindingHandler = function (name, newHandler) {
      if (!name || !newHandler) {
        return self;
      }

      if (!!ko.bindingHandlers[name]) {
        bitlib.logger.debug("[" + name + "] bindingHandler を上書きします.");
      }
      ko.bindingHandlers[name] = newHandler;

      return self;
    };

    return self;
  }());

  bitlib.ko.addBindingHandler("visibility", {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      var isVisible = valueAccessor();
      isVisible = ko.isObservable(isVisible) ? isVisible() : isVisible;

      if (isVisible) {
        $(element)
          .addClass("visible");
      } else {
        $(element)
          .addClass("invisible");
      }
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      var isVisible = valueAccessor();
      isVisible = ko.isObservable(isVisible) ? isVisible() : isVisible;

      if (isVisible) {
        $(element)
          .removeClass("invisible")
          .addClass("visible");
      } else {
        $(element)
          .removeClass("visible")
          .addClass("invisible");
      }
    }
  });

  bitlib.ko.addBindingHandler("invisibility", {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      var isInvisible = valueAccessor();
      isInvisible = ko.isObservable(isInvisible) ? isInvisible() : isInvisible;

      if (isInvisible) {
        $(element)
          .addClass("invisible");
      } else {
        $(element)
          .addClass("visible");
      }
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      var isInvisible = valueAccessor();
      isInvisible = ko.isObservable(isInvisible) ? isInvisible() : isInvisible;

      if (isInvisible) {
        $(element)
          .removeClass("visible")
          .addClass("invisible");
      } else {
        $(element)
          .removeClass("invisible")
          .addClass("visible");
      }
    }
  });

  bitlib.ko.addBindingHandler("validity", {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      var isValid = valueAccessor();
      isValid = ko.isObservable(isValid) ? isValid() : isValid;

      if (isValid) {
        $(element)
          .addClass("valid");
      } else {
        $(element)
          .addClass("invalid");
      }
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      var isValid = valueAccessor();
      isValid = ko.isObservable(isValid) ? isValid() : isValid;

      if (isValid) {
        $(element)
          .removeClass("invalid")
          .addClass("valid");
      } else {
        $(element)
          .removeClass("valid")
          .addClass("invalid");
      }
    }
  });

  bitlib.ko.addBindingHandler("invalidity", {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      var isInvalid = valueAccessor();
      isInvalid = ko.isObservable(isInvalid) ? isInvalid() : isInvalid;

      if (isInvalid) {
        $(element)
          .addClass("invalid");
      } else {
        $(element)
          .addClass("valid");
      }
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      var isInvalid = valueAccessor();
      isInvalid = ko.isObservable(isInvalid) ? isInvalid() : isInvalid;

      if (isInvalid) {
        $(element)
          .removeClass("valid")
          .addClass("invalid");
      } else {
        $(element)
          .removeClass("invalid")
          .addClass("valid");
      }
    }
  });

  bitlib.ko.addBindingHandler("availability", {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      var isAvailable = valueAccessor();
      isAvailable = ko.isObservable(isAvailable) ? isAvailable() : isAvailable;

      if (isAvailable) {
        $(element)
          .addClass("available");
      } else {
        $(element)
          .addClass("inavailable");
      }
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      var isAvailable = valueAccessor();
      isAvailable = ko.isObservable(isAvailable) ? isAvailable() : isAvailable;

      if (isAvailable) {
        $(element)
          .removeClass("inavailable")
          .addClass("available");
      } else {
        $(element)
          .removeClass("available")
          .addClass("inavailable");
      }
    }
  });

  bitlib.ko.addBindingHandler("inavailability", {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      var isInavailable = valueAccessor();
      isInavailable = ko.isObservable(isInavailable) ? isInavailable() : isInavailable;

      if (isInavailable) {
        $(element)
          .addClass("inavailable");
      } else {
        $(element)
          .addClass("available");
      }
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      var isInavailable = valueAccessor();
      isInavailable = ko.isObservable(isInavailable) ? isInavailable() : isInavailable;

      if (isInavailable) {
        $(element)
          .removeClass("available")
          .addClass("inavailable");
      } else {
        $(element)
          .removeClass("inavailable")
          .addClass("available");
      }
    }
  });

  bitlib.ko.addBindingHandler("focus", {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      var isFocused = valueAccessor();
      isFocused = ko.isObservable(isFocused) ? isFocused() : isFocused;

      if (isFocused) {
        $(element)
          .addClass("focused");
      }
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      var isFocused = valueAccessor();
      isFocused = ko.isObservable(isFocused) ? isFocused() : isFocused;

      if (isFocused) {
        $(element)
          .addClass("focused");
      } else {
        $(element)
          .removeClass("focused");
      }
    }
  });

  bitlib.ko.addBindingHandler("stopEventPropagation", {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      var targetEvent = valueAccessor();
      targetEvent = ko.isObservable(targetEvent) ? targetEvent() : targetEvent;

      targetEvent = bitlib.common.isArray(targetEvent) ? targetEvent : [targetEvent];

      for (var i = 0, len = targetEvent.length; i < len; i++) {
        if (targetEvent[i]) {
          $(element)
            .on(targetEvent[i], function (event) {
              event.stopPropagation();
            });
        }
      }
    }
  });

  bitlib.ko.addBindingHandler("clickIf", {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      var newValueAccessor = function () {
        return {
          click: function (data, event) {
            if (valueAccessor()["if"]()) {
              return valueAccessor()["do"].call(viewModel, data, event);
            } else {
              if (valueAccessor()["failto"]) {
                return valueAccessor()["failto"].call(viewModel, data, event);
              } else {
                return false;
              }
            }
          }
        };
      };
      ko.bindingHandlers.event.init.call(this, element, newValueAccessor, allBindingsAccessor, viewModel, bindingContext);
    }
  });

  bitlib.ko.addBindingHandler("eachRows", {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      var index = valueAccessor();
      index = ko.isObservable(index) ? index() : index;

      if (!isNaN(index) && isFinite(index)) {
        var cssClass = (index % 2) === 1 ? "odd" : "even";

        $(element)
          .addClass(cssClass)
          .addClass("rowno-" + (index + 1).toString());
      }
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      var index = valueAccessor();
      index = ko.isObservable(index) ? index() : index;

      $(element)
        .removeClass(function (index, className) {
          return (className.match(/(odd|even|rowno-[0-9]+)/ig) || []).join(" ");
        });

      if (!isNaN(index) && isFinite(index)) {
        var cssClass = ((index % 2) === 1) ? "odd" : "even";

        $(element)
          .addClass(cssClass)
          .addClass("rowno-" + (index + 1).toString());
      }
    }
  });

}(bitlib || {}));