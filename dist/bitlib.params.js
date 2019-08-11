(function(bitlib) {
    "use strict";

    var LooseDictionary = (function() {
        var className = "LooseDictionary";

        function LooseDictionary(initParams) {
            if (!(this instanceof LooseDictionary)) {
                return new LooseDictionary();
            }

            var self = this;

            initParams = initParams || {};

            var params = {};
            for (var key in initParams) {
                if (initParams.hasOwnProperty(key)) {
                    params[key] = initParams[key];
                }
            }

            self._exists = function(name) {
                name = (name || "").toLowerCase();

                if (!name || !bitlib.common.isString(name)) {
                    return false;
                }

                var clone = bitlib.common.copy(params);

                for (var k in clone) {
                    if (clone.hasOwnProperty(k) && k.toLowerCase() === name) {
                        return true;
                    }
                }

                return false;
            };

            self._get = function(name) {
                name = (name || "").toLowerCase();

                if (!name || !bitlib.common.isString(name)) {
                    return undefined;
                }

                var clone = bitlib.common.copy(params);

                for (var k in clone) {
                    if (clone.hasOwnProperty(k) && k.toLowerCase() === name) {
                        return clone[k];
                    }
                }

                return undefined;
            };

            self._getAll = function() {
                return bitlib.common.copy(params);
            };

            self._set = function(name, val) {
                name = name || "";

                if (!name || !bitlib.common.isString(name)) {
                    return self;
                }

                for (var k in params) {
                    if (params.hasOwnProperty(k) && k.toLowerCase() === name.toLowerCase()) {
                        params[k] = val;
                        return self;
                    }
                }

                params[name] = val;

                return self;
            };

            self._remove = function(name) {
                name = (name || "").toLowerCase();

                if (!name || !bitlib.common.isString(name)) {
                    return self;
                }

                for (var k in params) {
                    if (params.hasOwnProperty(k) && k.toLowerCase() === name) {
                        delete params[k];
                        break;
                    }
                }

                return self;
            };

            self._clear = function() {
                params = {};
                return self;
            };

            return self;
        }

        LooseDictionary.prototype.exists = function(name) {
            return this._exists(name);
        };

        LooseDictionary.prototype.get = function(name) {
            return this._get(name);
        };

        LooseDictionary.prototype.clone = function() {
            return this._getAll();
        };

        LooseDictionary.prototype.set = function(name, val) {
            this._set(name, val);
            return this;
        };

        LooseDictionary.prototype.setIfNotFound = function(name, val) {
            var self = this;

            if (!name || !bitlib.common.isString(name)) {
                return self;
            }

            var clone = self._getAll();
            if (bitlib.common.isNullOrUndefined(clone[name])) {
                self._set(name, val);
            }

            return self;
        };

        LooseDictionary.prototype.remove = function(name) {
            this._remove(name);
            return this;
        };

        LooseDictionary.prototype.removeWithout = function(names) {
            var self = this;

            names = names || [];
            names = bitlib.common.isArray(names) ? names : [names];

            var clone = self._getAll();

            self._clear();

            if (!bitlib.common.isArray(names)) {
                return self;
            }

            for (var i = 0, len = names.length; i < len; i++) {
                if (clone.hasOwnProperty(names[i])) {
                    self._set(names[i], clone[names[i]]);
                }
            }

            return self;
        };

        LooseDictionary.prototype.clear = function() {
            this._clear();
            return this;
        };

        LooseDictionary.getClassName = function() {
            return className;
        };

        return LooseDictionary;
    }());

    var SessionParameter = (function() {
        var className = "SessionParameter";

        var ID = "session-params",
            looseDictionary = new LooseDictionary();

        var isAvailable = true;

        function loadDictionary() {
            if (!isAvailable) {
                return false;
            }

            var initParams = bitlib.json.parse(window.sessionStorage.getItem(ID));
            looseDictionary = new LooseDictionary(initParams);

            return true;
        }

        function saveDictionary() {
            if (!isAvailable) {
                return false;
            }

            try {
                window.sessionStorage.removeItem(ID);
                window.sessionStorage.setItem(ID, bitlib.json.stringify(looseDictionary.clone()));
            } catch (err) {
                bitlib.logger.warn(err);

                var removeName = "",
                    maxDataSize = 0,
                    clone = looseDictionary.clone();

                for (var name in clone) {
                    var value = bitlib.json.stringify(clone[name]),
                        dataSize = window.encodeURI(value).length;

                    if (!removeName || maxDataSize < dataSize) {
                        removeName = name;
                        maxDataSize = dataSize;
                    }
                }

                if (removeName) {
                    looseDictionary.remove(removeName);
                    saveDictionary();
                }
            }

            return true;
        }

        function SessionParameter() {
            if (!(this instanceof SessionParameter)) {
                return new SessionParameter();
            }

            // singleton
            if (SessionParameter.prototype._singletonInstance) {
                return SessionParameter.prototype._singletonInstance;
            }
            var self = this;
            SessionParameter.prototype._singletonInstance = self;

            if (!bitlib.browser.isSupportSessionStorage()) {
                var message = "このブラウザは SessionStorage 機能をサポートしていません.\n" +
                    "SessionParameter では、この機能が必須要件となります.";

                bitlib.logger.error(message).show();

                isAvailable = false;

                return self;
            }

            loadDictionary();

            return self;
        }

        SessionParameter.prototype.exists = function(name) {
            if (!name || !bitlib.common.isString(name)) {
                return false;
            }
            return looseDictionary.exists(name);
        };

        SessionParameter.prototype.get = function(name) {
            if (!name || !bitlib.common.isString(name)) {
                return "";
            }

            var val = looseDictionary.get(name);

            if (bitlib.common.isNullOrUndefined(val)) {
                return "";
            }

            return val;
        };

        SessionParameter.prototype.clone = function() {
            return looseDictionary.clone();
        };

        SessionParameter.prototype.set = function(name, val) {
            var self = this;

            if (!name || !bitlib.common.isString(name)) {
                return self;
            }

            looseDictionary.set(name, val);

            return self;
        };

        SessionParameter.prototype.remove = function(name) {
            var self = this;

            if (!name || !bitlib.common.isString(name)) {
                return self;
            }

            looseDictionary.remove(name);

            return self;
        };

        SessionParameter.prototype.removeWithout = function(names) {
            names = names || [];
            names = bitlib.common.isArray(names) ? names : [names];

            looseDictionary.removeWithout(names);

            return this;
        };

        SessionParameter.prototype.clear = function() {
            looseDictionary.clear();
            return this;
        };

        SessionParameter.prototype.load = function() {
            loadDictionary();
            return this;
        };

        SessionParameter.prototype.save = function() {
            saveDictionary();
            return this;
        };

        SessionParameter.getClassName = function() {
            return className;
        };

        return SessionParameter;
    }());

    var LocalParameter = (function() {
        var className = "LocalParameter";

        var ID = "local-params",
            looseDictionary = new LooseDictionary();

        var isAvailable = true;

        function loadDictionary() {
            if (!isAvailable) {
                return false;
            }

            var initParams = {};
            try {
                if (bitlib.browser.isSupportLocalStorage()) {
                    initParams = bitlib.json.parse(window.localStorage.getItem(ID));
                } else {
                    initParams = bitlib.json.parse(window.sessionStorage.getItem(ID));
                }
            } catch (err) {
                bitlib.logger.warn(err);

                // LocalStorage が有効にも関わらず、アクセス時にエラーになることがある.
                initParams = bitlib.json.parse(window.sessionStorage.getItem(ID));
            }

            looseDictionary = new LooseDictionary(initParams);

            return true;
        }

        function saveDictionary() {
            if (!isAvailable) {
                return false;
            }

            try {
                if (bitlib.browser.isSupportLocalStorage()) {
                    try {
                        window.localStorage.removeItem(ID);
                        window.localStorage.setItem(ID, bitlib.json.stringify(looseDictionary.clone()));
                    } catch (err) {
                        bitlib.logger.warn(err);

                        window.sessionStorage.removeItem(ID);
                        window.sessionStorage.setItem(ID, bitlib.json.stringify(looseDictionary.clone()));
                    }
                } else {
                    window.sessionStorage.removeItem(ID);
                    window.sessionStorage.setItem(ID, bitlib.json.stringify(looseDictionary.clone()));
                }
            } catch (err) {
                bitlib.logger.warn(err);

                var removeName = "",
                    maxDataSize = 0,
                    clone = looseDictionary.clone();

                for (var name in clone) {
                    var value = bitlib.json.stringify(clone[name]),
                        dataSize = window.encodeURI(value).length;

                    if (!removeName || maxDataSize < dataSize) {
                        removeName = name;
                        maxDataSize = dataSize;
                    }
                }

                if (removeName) {
                    looseDictionary.remove(removeName);
                    saveDictionary();
                }
            }
        }

        function LocalParameter() {
            if (!(this instanceof LocalParameter)) {
                return new LocalParameter();
            }

            // singleton
            if (LocalParameter.prototype._singletonInstance) {
                return LocalParameter.prototype._singletonInstance;
            }
            var self = this;
            LocalParameter.prototype._singletonInstance = self;

            if (!bitlib.browser.isSupportLocalStorage()) {
                var message = "このブラウザは LocalStorage 機能をサポートしていません.\n";

                if (!bitlib.browser.isSupportSessionStorage()) {
                    message += "LocalParameter では、SessionStorage 機能が必須要件となります.";
                    bitlib.logger.error(message).show();

                    isAvailable = false;

                    return self;
                }

                message += "そのため、SessionStorage を代替機能として使用します.";
                bitlib.logger.warn(message);
            }

            loadDictionary();

            return self;
        }

        LocalParameter.prototype.exists = function(name) {
            if (!name || !bitlib.common.isString(name)) {
                return false;
            }
            return looseDictionary.exists(name);
        };

        LocalParameter.prototype.get = function(name) {
            if (!name || !bitlib.common.isString(name)) {
                return "";
            }

            var val = looseDictionary.get(name);

            if (bitlib.common.isNullOrUndefined(val)) {
                return "";
            }

            return val;
        };

        LocalParameter.prototype.clone = function() {
            return looseDictionary.clone();
        };

        LocalParameter.prototype.set = function(name, val) {
            var self = this;

            if (!name || !bitlib.common.isString(name)) {
                return self;
            }

            looseDictionary.set(name, val);

            return self;
        };

        LocalParameter.prototype.remove = function(name) {
            var self = this;

            if (!name || !bitlib.common.isString(name)) {
                return self;
            }

            looseDictionary.remove(name);

            return self;
        };

        LocalParameter.prototype.removeWithout = function(names) {
            names = names || [];
            names = bitlib.common.isArray(names) ? names : [names];

            looseDictionary.removeWithout(names);

            return this;
        };

        LocalParameter.prototype.clear = function() {
            looseDictionary.clear();
            return this;
        };

        LocalParameter.prototype.load = function() {
            loadDictionary();
            return this;
        };

        LocalParameter.prototype.save = function() {
            saveDictionary();
            return this;
        };

        LocalParameter.getClassName = function() {
            return className;
        };

        return LocalParameter;
    }());

    var PageParameter = (function() {
        var className = "PageParameter";

        var sessionParameter = new SessionParameter();

        var ID = "page-params",
            looseDictionary = new LooseDictionary(),
            sessionQueryDictionary = new LooseDictionary();

        function PageParameter() {
            if (!(this instanceof PageParameter)) {
                return new PageParameter();
            }

            // singleton
            if (PageParameter.prototype._singletonInstance) {
                return PageParameter.prototype._singletonInstance;
            }
            var self = this;
            PageParameter.prototype._singletonInstance = self;

            looseDictionary = new LooseDictionary(sessionParameter.clone());

            // クエリ文字列
            var regExp = new RegExp("([^&=]+)=?([^&]*)", "g"),
                queryString = window.location.search.substring(1);

            function toURIComponent(prop) {
                prop = prop.replace(/\+/g, " ");
                return window.decodeURIComponent(prop);
            }

            var matchedStr;
            while ((matchedStr = regExp.exec(queryString)) !== null) {
                looseDictionary.set(toURIComponent(matchedStr[1]), toURIComponent(matchedStr[2]));
            }

            // クエリパラメータ
            var queryParams = sessionParameter.get(ID) || {};
            for (var name in queryParams) {
                if (queryParams.hasOwnProperty(name)) {
                    looseDictionary.set(name, queryParams[name]);
                }
            }

            return self;
        }

        PageParameter.prototype.exists = function(name) {
            if (!name || !bitlib.common.isString(name)) {
                return false;
            }
            return looseDictionary.exists(name);
        };

        PageParameter.prototype.get = function(name) {
            if (!name || !bitlib.common.isString(name)) {
                return "";
            }

            var val = looseDictionary.get(name);

            if (bitlib.common.isNullOrUndefined(val)) {
                return "";
            }

            return val;
        };

        PageParameter.prototype.clone = function() {
            return looseDictionary.clone();
        };

        PageParameter.prototype.setSessionQuery = function(name, val) {
            var self = this;

            if (!name || !bitlib.common.isString(name)) {
                return self;
            }

            sessionQueryDictionary.set(name, val);

            return self;
        };

        PageParameter.prototype.removeSessionQuery = function(name) {
            var self = this;

            if (!name || !bitlib.common.isString(name)) {
                return self;
            }

            sessionQueryDictionary.remove(name);

            return self;
        };

        PageParameter.prototype.clearSessionQueries = function() {
            sessionQueryDictionary.clear();
            return this;
        };

        PageParameter.prototype.saveSessionQuery = function() {
            sessionParameter
                .set(ID, sessionQueryDictionary.clone())
                .save();
        };

        PageParameter.getClassName = function() {
            return className;
        };

        return PageParameter;
    }());

    bitlib.params = (function() {
        var self = {};

        self.type = "bitlib.params";

        var sessionParameter = new SessionParameter();
        self.session = sessionParameter;

        var localParameter = new LocalParameter();
        self.local = localParameter;

        var pageParameter = new PageParameter();
        self.page = pageParameter;

        self.createDictionary = function(initParams) {
            return new LooseDictionary(initParams);
        };

        return self;
    }());

}(bitlib || {}));