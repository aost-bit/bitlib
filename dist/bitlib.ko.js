(function (bitlib) {
  "use strict";

  bitlib.ko = (function () {
    var self = {};

    self.type = "bitlib.ko";

    self.unwrap = function (val) {
      if (!val || !bitlib.common.isObservable(val)) {
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

  bitlib.ko.addBindingHandler("availability", {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      var isAvailable = valueAccessor();
      isAvailable = ko.isObservable(isAvailable) ? isAvailable() : isAvailable;

      if (isAvailable) {
        $(element)
          .addClass("enable");
      } else {
        $(element)
          .addClass("disable");
      }
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      var isAvailable = valueAccessor();
      isAvailable = ko.isObservable(isAvailable) ? isAvailable() : isAvailable;

      if (isAvailable) {
        $(element)
          .removeClass("disable")
          .addClass("enable");
      } else {
        $(element)
          .removeClass("enable")
          .addClass("disable");
      }
    }
  });

  bitlib.ko.addBindingHandler("inavailability", {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      var isInavailable = valueAccessor();
      isInavailable = ko.isObservable(isInavailable) ? isInavailable() : isInavailable;

      if (isInavailable) {
        $(element)
          .addClass("disable");
      } else {
        $(element)
          .addClass("enable");
      }
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      var isInavailable = valueAccessor();
      isInavailable = ko.isObservable(isInavailable) ? isInavailable() : isInavailable;

      if (isInavailable) {
        $(element)
          .removeClass("enable")
          .addClass("disable");
      } else {
        $(element)
          .removeClass("disable")
          .addClass("enable");
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

  bitlib.ko.addBindingHandler("activity", {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      var isVisible = valueAccessor();
      isVisible = ko.isObservable(isVisible) ? isVisible() : isVisible;

      if (isVisible) {
        $(element)
          .addClass("active");
      } else {
        $(element)
          .addClass("inactive");
      }
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      var isVisible = valueAccessor();
      isVisible = ko.isObservable(isVisible) ? isVisible() : isVisible;

      if (isVisible) {
        $(element)
          .removeClass("inactive")
          .addClass("active");
      } else {
        $(element)
          .removeClass("active")
          .addClass("inactive");
      }
    }
  });

  bitlib.ko.addBindingHandler("inactivity", {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      var isInactive = valueAccessor();
      isInactive = ko.isObservable(isInactive) ? isInactive() : isInactive;

      if (isInactive) {
        $(element)
          .addClass("inactive");
      } else {
        $(element)
          .addClass("active");
      }
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      var isInactive = valueAccessor();
      isInactive = ko.isObservable(isInactive) ? isInactive() : isInactive;

      if (isInactive) {
        $(element)
          .removeClass("active")
          .addClass("inactive");
      } else {
        $(element)
          .removeClass("inactive")
          .addClass("active");
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

      var $element = $(element);

      for (var i = 0, len = targetEvent.length; i < len; i++) {
        if (targetEvent[i]) {
          $element
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

  bitlib.ko.addBindingHandler("eachElems", {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      var index = valueAccessor();
      index = ko.isObservable(index) ? index() : index;

      if (!isNaN(index) && isFinite(index)) {
        var $element = $(element),
          cssClass = (index % 2) === 1 ? "odd" : "even";

        $element
          .addClass(cssClass)
          .addClass("elemno-" + index.toString());

        if (index === 0) {
          $element
            .addClass("first-elem");
        }

        $element
          .prev()
          .removeClass("last-elem");

        $element
          .addClass("last-elem");
      }
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      var index = valueAccessor();
      index = ko.isObservable(index) ? index() : index;

      $(element)
        .removeClass(function (index, className) {
          return (className.match(/(odd|even|elemno-[0-9]+|first-elem|last-elem)/ig) || []).join(" ");
        });

      if (!isNaN(index) && isFinite(index)) {
        var $element = $(element),
          cssClass = (index % 2) === 1 ? "odd" : "even";

        $element
          .addClass(cssClass)
          .addClass("elemno-" + index.toString());

        if (index === 0) {
          $element
            .addClass("first-elem");
        }

        $element
          .prev()
          .removeClass("last-elem");

        $element
          .addClass("last-elem");
      }
    }
  });

}(bitlib || {}));