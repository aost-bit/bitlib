(function (bitlib) {
  "use strict";

  bitlib.string = (function () {
    var self = {};

    self.type = "bitlib.string";

    self.contains = function (str, val) {
      str = str || "";

      if (!bitlib.common.isString(str)) {
        return false;
      }

      val = bitlib.common.isArray(val) ? val : [val];
      if (val.length === 0) {
        return false;
      }

      for (var i = 0, len = val.length; i < len; i++) {
        if (bitlib.common.isString(val) && -1 < str.indexOf(val[i])) {
          return true;
        }
      }

      return false;
    };

    self.trim = function (str, char) {
      str = str || "", char = char || ["\\s", "\\t"];

      if (!str || !bitlib.common.isString(str)) {
        return "";
      }

      char = bitlib.common.isArray(char) ? char : [char];
      if (char.length === 0) {
        return str;
      }

      var regExp = new RegExp("^(" + char.join("|") + ")+|(" + char.join("|") + ")+$", "g");

      return str.replace(regExp, "");
    };

    self.ltrim = function (str, char) {
      str = str || "", char = char || ["\\s", "\\t"];

      if (!str || !bitlib.common.isString(str)) {
        return "";
      }

      char = bitlib.common.isArray(char) ? char : [char];
      if (char.length === 0) {
        return str;
      }

      var regExp = new RegExp("^(" + char.join("|") + ")+", "g");

      return str.replace(regExp, "");
    };

    self.rtrim = function (str, char) {
      str = str || "", char = char || ["\\s", "\\t"];

      if (!str || !bitlib.common.isString(str)) {
        return "";
      }

      char = bitlib.common.isArray(char) ? char : [char];
      if (char.length === 0) {
        return str;
      }

      var regExp = new RegExp("(" + char.join("|") + ")+$", "g");

      return str.replace(regExp, "");
    };

    /**
     * 文字列を、指定された長さになるまでfill文字列を左に追加して返却します。
     * @return {String}
     */
    self.padding = self.paddingLeft = function (str, length, fill) {
      str = str || "", length = length || 1, fill = fill || "";

      if (!bitlib.common.isNumber(length) || length < 1) {
        return str.toString();
      }

      return (Array(length + 1).join(fill) + str).slice(-length);
    };

    /**
     * 文字列を、指定された長さになるまでfill文字列を右に追加して返却します。
     * @return {String}
     */
    self.paddingRight = function (str, length, fill) {
      str = str || "", length = length || 1, fill = fill || "";

      if (!bitlib.common.isNumber(length) || length < 1) {
        return str.toString();
      }

      return (str + Array(length + 1).join(fill)).slice(0, length);
    };

    self.zeroPadding = function (val, length) {
      val = val || 0, length = length || 1;
      return self.padding(val.toString(), length, "0");
    };

    self.toBoolean = function (val) {
      if (self.isString(val)) {
        val = $.trim(val || "false").toLowerCase();

        return self.contains(val, [
          "true",
          "valid",
          "yes",
          "ok"
        ]);
      }

      return bitlib.common.toBoolean(val);
    };

    self.trimOverlapLineFeedForLegacyIE = function (val) {
      val = val || "";

      if (!bitlib.common.isString(val) || !bitlib.browser.ua.isLegacyIE) {
        return val;
      }

      return val.replace(/\r\n/g, "\n");
    };

    self.replaceToWindowsLineFeed = function (val) {
      val = val || "";

      if (!val || !bitlib.common.isString(val)) {
        return val;
      }

      return val.replace(/(\r\n|\r|\n)/g, "\r\n");
    };

    self.replaceToUnixLineFeed = function (val) {
      val = val || "";

      if (!val || !bitlib.common.isString(val)) {
        return val;
      }

      return val.replace(/(\r\n|\r|\n)/g, "\n");
    };

    self.isHiragana = function (str) {
      if (!str || !bitlib.common.isString(str)) {
        return false;
      }
      return !!str.match(/^[ぁ-ん。・ー～”゛゜]+$/);
    };

    self.isEmKana = function (str) {
      if (!str || !bitlib.common.isString(str)) {
        return false;
      }
      return !!str.match(/^[ァ-ン・ー～”゛゜]+$/);
    };

    self.isEnKana = function (str) {
      if (!str || !bitlib.common.isString(str)) {
        return false;
      }
      return !!str.match(/^[ｧ-ﾝ~.ﾞﾟ-]+$/);
    };

    var MONOBYTE_KANA_CHARS = [
      "ｶﾞ", "ｷﾞ", "ｸﾞ", "ｹﾞ", "ｺﾞ",
      "ｻﾞ", "ｼﾞ", "ｽﾞ", "ｾﾞ", "ｿﾞ",
      "ﾀﾞ", "ﾁﾞ", "ﾂﾞ", "ﾃﾞ", "ﾄﾞ",
      "ﾊﾞ", "ﾊﾟ", "ﾋﾞ", "ﾋﾟ", "ﾌﾞ", "ﾌﾟ", "ﾍﾞ", "ﾍﾟ", "ﾎﾞ", "ﾎﾟ", "ｳﾞ",
      "ｧ", "ｱ", "ｨ", "ｲ", "ｩ", "ｳ", "ｪ", "ｴ", "ｫ", "ｵ",
      "ｶ", "ｷ", "ｸ", "ｹ", "ｺ",
      "ｻ", "ｼ", "ｽ", "ｾ", "ｿ",
      "ﾀ", "ﾁ", "ｯ", "ﾂ", "ﾃ", "ﾄ",
      "ﾅ", "ﾆ", "ﾇ", "ﾈ", "ﾉ",
      "ﾊ", "ﾋ", "ﾌ", "ﾍ", "ﾎ",
      "ﾏ", "ﾐ", "ﾑ", "ﾒ", "ﾓ",
      "ｬ", "ﾔ", "ｭ", "ﾕ", "ｮ", "ﾖ",
      "ﾗ", "ﾘ", "ﾙ", "ﾚ", "ﾛ",
      "ﾜ", "ｦ", "ﾝ",
      "｡", "｢", "｣", "､", "･", "ｰ", "ﾞ", "ﾟ"
    ];

    var DUOBYTE_KANA_CHARS = [
      "ガ", "ギ", "グ", "ゲ", "ゴ",
      "ザ", "ジ", "ズ", "ゼ", "ゾ",
      "ダ", "ヂ", "ヅ", "デ", "ド",
      "バ", "パ", "ビ", "ピ", "ブ", "プ", "ベ", "ペ", "ボ", "ポ", "ヴ",
      "ァ", "ア", "ィ", "イ", "ゥ", "ウ", "ェ", "エ", "ォ", "オ",
      "カ", "キ", "ク", "ケ", "コ",
      "サ", "シ", "ス", "セ", "ソ",
      "タ", "チ", "ッ", "ツ", "テ", "ト",
      "ナ", "ニ", "ヌ", "ネ", "ノ",
      "ハ", "ヒ", "フ", "ヘ", "ホ",
      "マ", "ミ", "ム", "メ", "モ",
      "ャ", "ヤ", "ュ", "ユ", "ョ", "ヨ",
      "ラ", "リ", "ル", "レ", "ロ",
      "ワ", "ヲ", "ン",
      "。", "「", "」", "、", "・", "ー", "゛", "゜"
    ];

    self.replaceToEncode = function (str) {
      if (!str || !bitlib.common.isString(str)) {
        return "";
      }

      str = str.replace(/[Ａ-Ｚａ-ｚ０-９－！”＃＄％＆’（）＝＜＞，．？＿［］｛｝＠＾～￥]/g, function (s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
      });

      for (var i = 0, len = DUOBYTE_KANA_CHARS.length; i < len; i++) {
        while (self.contains(str, DUOBYTE_KANA_CHARS[i])) {
          str = str.replace(DUOBYTE_KANA_CHARS[i], MONOBYTE_KANA_CHARS[i]);
        }
      }

      return str;
    };

    self.isHtmlString = function (str) {
      if (!str || !bitlib.common.isString(str)) {
        return false;
      }
      return !!str.match(/^<[a-z]+>.*<\/[a-z]+>$/ig);
    };

    var DEFAULT_TEXT = "---";

    self.toText = function () {
      var args = [];
      args.push.apply(args, arguments);

      var defaultVal = DEFAULT_TEXT,
        maxLength = -1;

      for (var i = 1, len = args.length; i < len; i++) {
        if (bitlib.common.isNumber(args[i])) {
          maxLength = args[i];
          continue;
        }
        if (bitlib.common.isString(args[i])) {
          defaultVal = args[i];
        }
      }

      if (bitlib.common.isNullOrUndefined(args[0])) {
        return defaultVal;
      }

      var val = $.trim(bitlib.ko.unwrap(args[0]).toString() || defaultVal);

      // テキストを切り詰める
      if (0 < maxLength) {
        var reducedVal = val.substring(0, maxLength);
        val = (maxLength < val.length) ? (reducedVal + "...") : reducedVal;
      }

      return val;
    };

    self.toNumberText = function (val, defaultVal) {
      val = val || "";

      if (bitlib.common.isNullOrUndefined(defaultVal)) {
        defaultVal = DEFAULT_TEXT;
      }

      var val = self.toText(val, defaultVal);
      if (!val || val === defaultVal) {
        return defaultVal;
      }

      var num = bitlib.common.toNumber(val);
      if (isNaN(num)) {
        return defaultVal;
      }

      return num.toString();
    };

    self.toArrayText = function () {
      var args = [];
      args.push.apply(args, arguments);

      var delimiter = ",",
        defaultVal = DEFAULT_TEXT,
        maxLength = -1;

      var i = 0,
        len = 0;

      for (i = 1, len = args.length; i < len; i++) {
        if (bitlib.common.isNumber(args[i])) {
          maxLength = args[i];
          continue;
        }
        if (bitlib.common.isString(args[i])) {
          switch (i) {
            case 1:
              delimiter = args[i];
              break;
            case 2:
              defaultVal = args[i];
              break;
            default:
              // none
          }
        }
      }

      if (bitlib.common.isNullOrUndefined(args[0])) {
        return defaultVal;
      }

      var val = bitlib.ko.unwrap(args[0]);
      if (!bitlib.common.isArray(val)) {
        return self.toText(val);
      }

      var arrText = "";
      for (i = 0, len = val.length; i < len; i++) {
        if (0 < maxLength && maxLength < i + 1) {
          arrText += delimiter + "..(" + (len - i) + ")";
          break;
        }

        arrText += !arrText ? val[i] : (delimiter + val[i]);
      }

      return arrText || defaultVal;
    };

    self.toPropertyText = function () {
      var args = [];
      args.push.apply(args, arguments);

      var delimiter = ",",
        defaultVal = DEFAULT_TEXT,
        maxLength = -1;

      var i = 0,
        len = 0;

      for (i = 1, len = args.length; i < len; i++) {
        if (bitlib.common.isNumber(args[i])) {
          maxLength = args[i];
          continue;
        }
        if (bitlib.common.isString(args[i])) {
          switch (i) {
            case 1:
              delimiter = args[i];
              break;
            case 2:
              defaultVal = args[i];
              break;
            default:
              // none
          }
        }
      }

      if (bitlib.common.isNullOrUndefined(args[0])) {
        return defaultVal;
      }

      var val = bitlib.ko.unwrap(args[0]);
      if (!bitlib.common.isObject(val)) {
        return self.toText(val);
      }

      i = 0;
      len = bitlib.common.getPropertyLength(val);

      var propText = "";
      for (var name in val) {
        if (0 < maxLength && maxLength < i + 1) {
          propText += delimiter + "..(" + (len - i) + ")";
          break;
        }

        var elemText = name.toString() + "=" + (val[name]).toString();
        propText += !propText ? elemText : (delimiter + elemText);

        i += 1;
      }

      return propText || defaultVal;
    };

    return self;
  }());

}(bitlib || {}));