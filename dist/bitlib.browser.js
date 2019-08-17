(function (bitlib) {
    "use strict";

    var UA = (function () {
        var ua = {};

        ua.name = window.navigator.userAgent.toLowerCase();

        ua.isIE = (ua.name.indexOf('msie') >= 0 || ua.name.indexOf('trident') >= 0);
        ua.isChrome = ua.name.indexOf('chrome') >= 0;
        ua.isSafari = ua.name.indexOf('safari') >= 0;
        ua.isiPhone = ua.name.indexOf('iphone') >= 0;
        ua.isiPod = ua.name.indexOf('ipod') >= 0;
        ua.isiPad = ua.name.indexOf('ipad') >= 0;
        ua.isiOS = (ua.isiPhone || ua.isiPod || ua.isiPad);
        ua.isAndroid = ua.name.indexOf('android') >= 0;
        ua.isTablet = (ua.isiPad || (ua.isAndroid && ua.name.indexOf('mobile') < 0));

        if (ua.isIE) {
            ua.verArray = /(msie|rv:?)\s?([0-9]{1,})([\.0-9]{1,})/.exec(ua.name);
            if (ua.verArray) {
                ua.ver = parseInt(ua.verArray[2], 10);
            }
        }
        if (ua.isiOS) {
            ua.verArray = /(os)\s([0-9]{1,})([\_0-9]{1,})/.exec(ua.name);
            if (ua.verArray) {
                ua.ver = parseInt(ua.verArray[2], 10);
            }
        }
        if (ua.isAndroid) {
            ua.verArray = /(android)\s([0-9]{1,})([\.0-9]{1,})/.exec(ua.name);
            if (ua.verArray) {
                ua.ver = parseInt(ua.verArray[2], 10);
            }
        }

        ua.isIE7 = (ua.isIE && (ua.ver === 7));
        ua.isIE8 = (ua.isIE && (ua.ver === 8));
        ua.isIE9 = (ua.isIE && (ua.ver === 9));

        ua.isLegacyIE = (ua.isIE7 || ua.isIE8 || ua.isIE9);

        return ua;
    }());

    var KEY_CODE = {
        "0": 48,
        "1": 49,
        "2": 50,
        "3": 51,
        "4": 52,
        "5": 53,
        "6": 54,
        "7": 55,
        "8": 56,
        "9": 57,
        "A": 65,
        "B": 66,
        "C": 67,
        "D": 68,
        "E": 69,
        "F": 70,
        "G": 71,
        "H": 72,
        "I": 73,
        "J": 74,
        "K": 75,
        "L": 76,
        "M": 77,
        "N": 78,
        "O": 79,
        "P": 80,
        "Q": 81,
        "R": 82,
        "S": 83,
        "T": 84,
        "U": 85,
        "V": 86,
        "W": 87,
        "X": 88,
        "Y": 89,
        "Z": 90,
        "F1": 112,
        "F2": 113,
        "F3": 114,
        "F4": 115,
        "F5": 116,
        "F6": 117,
        "F7": 118,
        "F8": 119,
        "F9": 120,
        "F10": 121,
        "F11": 122,
        "F12": 123,
        "F13": 124,
        "F14": 125,
        "F15": 126,
        "BackSpace": 8,
        "Tab": 9,
        "Clear": 12,
        "Enter": 13,
        "Command": 15,
        "Shift": 16,
        "Ctrl": 17,
        "Alt": 18,
        "CapsLock": 20,
        "Esc": 27,
        "Space": 32,
        "PageUp": 33,
        "PageDown": 34,
        "End": 35,
        "Home": 36,
        "LeftArrow": 37,
        "UpArrow": 38,
        "RightArrow": 39,
        "DownArrow": 40,
        "Insert": 45,
        "Delete": 46,
        "NumLock": 144,
        ":": 186,
        "*": 186,
        ";": 187,
        "+": 187,
        "<": 188,
        ",": 188,
        "-": 189,
        "=": 189,
        ">": 190,
        ".": 190,
        "?": 191,
        "/": 191,
        "@": 192,
        "`": 192,
        "{": 219,
        "[": 219,
        "|": 220,
        "\\": 220,
        "}": 221,
        "]": 221,
        "^": 222,
        "~": 222,
        "_": 226
    };

    bitlib.browser = (function () {
        var self = {};

        self.type = "bitlib.browser";

        self.ua = UA;

        self.isSupportSessionStorage = function () {
            return (typeof window.sessionStorage !== "undefined");
        };

        self.clearSessionStorage = function () {
            if (!self.isSupportSessionStorage()) {
                return self;
            }

            try {
                window.sessionStorage.clear();
            } catch (err) {
                bitlib.logger.error(err);
            }

            return self;
        };

        self.isSupportLocalStorage = function () {
            return (typeof window.localStorage !== "undefined");
        };

        self.clearLocalStorage = function () {
            if (!self.isSupportLocalStorage()) {
                return self;
            }

            try {
                window.localStorage.clear();
            } catch (err) {
                bitlib.logger.error(err);
            }

            return self;
        };

        self.isSupportFileAPI = function () {
            return (typeof window.File !== "undefined");
        };

        self.getKeyCode = function (keyName) {
            if (bitlib.common.isNumber(keyName)) {
                return keyName;
            }

            keyName = (keyName || "").toLowerCase();

            if (!keyName || !bitlib.common.isString(keyName)) {
                return -1;
            }

            for (var name in KEY_CODE) {
                if (KEY_CODE.hasOwnProperty(name) && name.toLowerCase() === keyName.toLowerCase()) {
                    return KEY_CODE[name];
                }
            }

            return -1;
        };

        self.isOnline = function () {
            //[TODO] ネットワーク状態の取得
            return true; // window.navigator.onLine
        };

        self.close = function () {
            if (!self.ua.isChrome) {
                (window.open("", "_self").opener = window).close();
            }
            return self;
        };

        return self;
    }());

}(bitlib || {}));