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