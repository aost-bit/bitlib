(function (bitlib) {
  "use strict";

  /// datepicker override.
  $.datepicker._gotoToday = function (id) {
    // set today and close dialog
    var today = new Date();
    var inst = $.datepicker._curInst;
    inst.selectedDay = inst.currentDay = today.getDate().toString();
    inst.selectedMonth = inst.currentMonth = today.getMonth();
    inst.selectedYear = inst.currentYear = today.getFullYear();
    this._selectDate(id, this._formatDate(inst,
      inst.currentDay, inst.currentMonth, inst.currentYear));
  };

  /// subclass dialog widget
  $.widget("ui.customDialog", $.ui.dialog, {
    open: function () {
      $.ui.dialog.prototype.open.apply(this, arguments);
    }
  });

  function openDialog(message, clickHandler, options) {
    options = options || {};

    var $dialog = $("body").find("#bit-dialog"),
      createNew = !$dialog.length;

    if (createNew) {
      $dialog = $('<div id="bit-dialog" title="確認"><span id="bit-dialog-contents"></span></div>').appendTo("body");
    }

    $dialog.removeClass(function (index, className) {
      return (className.match(/^(?!ui-).*$/g) || []).join(" ");
    });

    if (options.cssClass) {
      var classArray = options.cssClass.replace(/ /ig, ",").split(",");

      $.each(classArray, function (i, cssClass) {
        if (cssClass) {
          $dialog.addClass(cssClass);
        }
      });
    }

    message = message || "確認メッセージ";

    if (!bitlib.string.isHtmlString(message)) {
      message = '<div>' + message + '</div>';
    }

    var $contents = $dialog.find("#bit-dialog-contents");
    $contents.html(message);

    var buttons = {};
    $.each(clickHandler, function (name, callback) {
      buttons[name] = function () {
        callback();
        $dialog.customDialog("close");
      };
    });

    $dialog.customDialog($.extend({
      width: "auto",
      height: "auto",
      closeText: "",
      modal: true,
      resizable: false,
      buttons: buttons,
      closeOnEscape: false,
      dialogClass: "",
      classes: {}
    }, options));

    if (createNew) {
      $(".ui-dialog-titlebar-close").hide();
    }
  }

  var spinnerRemover = null;

  function spinnerOn(holderid, R1, R2, count, stroke_width, colour) {
    var sectorsCount = count || 12,
      color = colour || "#fff",
      width = stroke_width || 15,
      r1 = Math.min(R1, R2) || 35,
      r2 = Math.max(R1, R2) || 60,
      cx = r2 + width,
      cy = r2 + width,
      r = Raphael(holderid, r2 * 2 + width * 2, r2 * 2 + width * 2),

      sectors = [],
      opacity = [],
      beta = 2 * Math.PI / sectorsCount,

      pathParams = { stroke: color, "stroke-width": width, "stroke-linecap": "round" };

    Raphael.getColor.reset();

    for (var i = 0; i < sectorsCount; i++) {
      var alpha = beta * i - Math.PI / 2,
        cos = Math.cos(alpha),
        sin = Math.sin(alpha);

      opacity[i] = 1 / sectorsCount * i;
      sectors[i] = r.path([
        ["M", cx + r1 * cos, cy + r1 * sin],
        ["L", cx + r2 * cos, cy + r2 * sin]
      ]).attr(pathParams);

      if (color === "rainbow") {
        sectors[i].attr("stroke", Raphael.getColor());
      }
    }

    var tick;
    (function ticker() {
      opacity.unshift(opacity.pop());

      for (var i = 0; i < sectorsCount; i++) {
        sectors[i].attr("opacity", opacity[i]);
      }
      if (r.safari) {
        r.safari();
      }

      tick = setTimeout(ticker, 1000 / sectorsCount);
    })();

    spinnerRemover = function () {
      clearTimeout(tick);
      r.remove();
    };
  }

  function spinnerOff() {
    if (spinnerRemover) {
      spinnerRemover();
      spinnerRemover = null;
    }
  }

  function lockScreen(contentsHtml, options) {
    options = options || {};

    var $screenLock = $("body").find("#screen-lock"),
      createNew = !$screenLock.length;

    if (createNew) {
      $screenLock = $('<div id="screen-lock"></div>').appendTo("body");
    }

    spinnerOff();
    $screenLock.empty();
    $screenLock.removeClass();

    if (options.cssClass) {
      var classArray = options.cssClass.replace(/ /ig, ",").split(",");

      $.each(classArray, function (i, cssClass) {
        if (cssClass) {
          $screenLock.addClass(cssClass);
        }
      });
    }

    $screenLock
      .css({
        height: ($(document).height() + "px"),
        width: ($(document).width() + "px")
      });

    var $contents = $('<div id="screen-lock-contents"></div>').appendTo($screenLock);

    if (contentsHtml) {
      if (!bitlib.string.isHtmlString(contentsHtml)) {
        contentsHtml = '<div>' + contentsHtml + '</div>';
      }

      $contents.append(contentsHtml);
    } else {
      $contents
        .css({
          height: "300px",
          margin: 0,
          overflow: "hidden",
          width: "300px"
        });

      spinnerOn("screen-lock-contents", 70, 120, 12, 25, "#fff");
    }

    var windowHalfWidth = $(window).width() / 2.0,
      windowHalfHeight = $(window).height() / 2.0;

    // コンテンツ要素を中心に配置する
    var x = windowHalfWidth - ($contents.width() / 2.0),
      y = windowHalfHeight - ($contents.height() / 2.0);

    // ウィンドウ位置をドキュメント座標に
    x += window.pageXOffset || document.documentElement.scrollLeft;
    y += window.pageYOffset || document.documentElement.scrollTop;

    $contents
      .css({
        left: (x + "px"),
        top: (y + "px")
      });
  }

  function unlockScreen() {
    $("#screen-lock").remove();
  }

  function fadeOver(contentsHtml, options) {
    options = options || {};

    var $fadeElement = $("body").find("#fade-element"),
      createNew = !$fadeElement.length;

    if (createNew) {
      $fadeElement = $('<div id="fade-element"></div>').appendTo("body");
    }

    $fadeElement.empty();
    $fadeElement.removeClass();

    if (options.cssClass) {
      var classArray = options.cssClass.replace(/ /ig, ",").split(",");

      $.each(classArray, function (i, cssClass) {
        if (cssClass) {
          $fadeElement.addClass(cssClass);
        }
      });
    }

    contentsHtml = contentsHtml || "";

    if (!bitlib.string.isHtmlString(contentsHtml)) {
      contentsHtml = '<div>' + contentsHtml + '</div>';
    }

    var $contents = $('<div id="fade-element-contents">' + contentsHtml + '</div>').appendTo($fadeElement);

    var windowHalfWidth = $(window).width() / 2.0,
      windowHalfHeight = $(window).height() / 2.0;

    // 要素を中心に配置する
    var x = windowHalfWidth - ($fadeElement.width() / 2.0),
      y = windowHalfHeight - ($fadeElement.height() / 2.0);

    // ウィンドウ位置をドキュメント座標に
    x += window.pageXOffset || document.documentElement.scrollLeft;
    y += window.pageYOffset || document.documentElement.scrollTop;

    $fadeElement
      .css({
        left: (x + "px"),
        top: (y + "px")
      });

    setTimeout(function () {
      $fadeElement
        .fadeOut(options.delay || 500, function () {
          $fadeElement.remove();
        });
    }, options.stop || 2500);
  }

  /**
   * iPad系のデバイスで、ダブルタップした時のzoomを阻止するプラグインです.
   */
  function disablePreventDoubleTapZoom() {
    if (bitlib.browser.ua.isTablet) {
      $(document)
        .on("touchstart.doubletapzoom", function (event) {
          var timeStamp = event.timeStamp,
            lastTapped = $(this).data("lastTouch") || timeStamp;

          var diff = timeStamp - lastTapped,
            fingers = event.originalEvent.touches.length;

          $(this).data("lastTouch", timeStamp);

          if (!diff || 500 < diff || 1 < fingers.length) {
            return; // not double-tap
          }

          event.preventDefault(); // double tap - prevent the zoom

          // also synthesize click events we just swallowed up
          $(this).trigger("click").trigger("click");
        });
    }
  }

  function enablePreventDoubleTapZoom() {
    if (bitlib.browser.ua.isTablet) {
      $(document)
        .off("touchstart.doubletapzoom");
    }
  }

  bitlib.ui = (function () {
    var self = {};

    self.type = "bitlib.ui";

    self.openDialog = function (message, clickHandler, options) {
      message = message || "", options = options || {};
      clickHandler = clickHandler || {
        "OK": function () {}
      };

      openDialog(message, clickHandler, options);

      return self;
    };

    self.lockScreen = function (contentsHtml, options) {
      contentsHtml = contentsHtml || "", options = options || {};

      lockScreen(contentsHtml, options);

      return self;
    };

    self.unlockScreen = function () {
      unlockScreen();

      return self;
    };

    self.fadeOver = function (contentsHtml, options) {
      contentsHtml = contentsHtml || "", options = options || {};

      if (contentsHtml) {
        fadeOver(contentsHtml, options);
      }

      return self;
    };

    var isValidDoubleTapZoom = true;

    self.isValidDoubleTapZoom = function () {
      return isValidDoubleTapZoom;
    };

    self.onPreventDoubleTapZoom = function () {
      if (!isValidDoubleTapZoom) {
        return self;
      }

      disablePreventDoubleTapZoom();
      isValidDoubleTapZoom = false;

      return self;
    };

    self.offPreventDoubleTapZoom = function () {
      if (isValidDoubleTapZoom) {
        return self;
      }

      enablePreventDoubleTapZoom();
      isValidDoubleTapZoom = true;

      return self;
    };

    return self;
  }());

}(bitlib || {}));