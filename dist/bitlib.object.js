(function(bitlib) {
    "use strict";

    bitlib.object = (function() {
        var self = {};

        self.type = "bitlib.object";

        self.isEmpty = function(obj) {
            obj = bitlib.common.isObservable(obj) ? obj() : obj;

            if (!bitlib.common.isObject(obj)) {
                return false;
            }

            return $.isEmptyObject(obj);
        };

        self.getPropertyLength = function(obj) {
            obj = bitlib.common.isObservable(obj) ? obj() : obj;

            if (!bitlib.common.isObject(obj)) {
                return 0;
            }

            var len = 0;
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    len = len + 1;
                }
            }

            return len;
        };

        self.getPropertyByPath = function(obj, path) {
            obj = obj || {}, path = path || "";

            if (!bitlib.common.isObject(obj) || !bitlib.common.isString(path)) {
                return undefined;
            }

            var names = path
                .replace(/\./g, "/")
                .split("/");

            var prop = bitlib.common.copy(obj);

            for (var i = 0, len = names.length; i < len; i++) {
                var name = names[i].toLowerCase(),
                    val = undefined;

                if (!name) {
                    continue;
                }

                for (var key in prop) {
                    if (prop.hasOwnProperty(key) && name === key.toLowerCase()) {
                        val = prop[key];
                        break;
                    }
                }

                if (!bitlib.common.isObject(val)) {
                    return val;
                }

                prop = val;
            }

            return prop;
        };

        self.removeUndefined = function(obj) {
            obj = obj || {};

            if (!bitlib.common.isObject(obj)) {
                return {};
            }

            var results = {};
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (!bitlib.common.isUndefined(obj[key])) {
                        results[key] = obj[key];
                    }
                }
            }

            return results;
        };

        self.removeNullOrUndefined = function(obj) {
            obj = obj || {};

            if (!bitlib.common.isObject(obj)) {
                return {};
            }

            var results = {};
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (!bitlib.common.isNullOrUndefined(obj[key])) {
                        results[key] = obj[key];
                    }
                }
            }

            return results;
        };

        self.each = function(obj, callback) {
            obj = bitlib.common.isObservable(obj) ? obj() : obj;

            if (!bitlib.common.isObject(obj) || !bitlib.common.isFunction(callback)) {
                return self;
            }

            try {
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if (callback(key, obj[key]) === false) {
                            break;
                        }
                    }
                }
            } catch (err) {
                bitlib.logger.error(err);
            }

            return self;
        };

        self.any = function(obj, validator) {
            obj = bitlib.common.isObservable(obj) ? obj() : obj;

            if (!bitlib.common.isObject(obj)) {
                return false;
            }

            if (!bitlib.common.isFunction(validator)) {
                validator = function(key, val) {
                    return !!val;
                };
            }

            try {
                for (var key in obj) {
                    if (obj.hasOwnProperty(key) && !!validator(key, obj[key])) {
                        return true;
                    }
                }
            } catch (err) {
                bitlib.logger.error(err);
            }

            return false;
        };

        self.pick = function(obj, validator) {
            obj = bitlib.common.isObservable(obj) ? obj() : obj;

            if (!bitlib.common.isObject(obj)) {
                return null;
            }

            if (!bitlib.common.isFunction(validator)) {
                validator = function(key, val) {
                    return !!val;
                };
            }

            try {
                for (var key in obj) {
                    if (obj.hasOwnProperty(key) && !!validator(key, obj[key])) {
                        return obj[key];
                    }
                }
            } catch (err) {
                bitlib.logger.error(err);
            }

            return null;
        };

        self.scrape = function(obj, validator) {
            obj = bitlib.common.isObservable(obj) ? obj() : obj;

            if (!bitlib.common.isObject(obj)) {
                return {};
            }

            if (!bitlib.common.isFunction(validator)) {
                validator = function(key, val) {
                    return !!val;
                };
            }

            var results = {};
            try {
                for (var key in obj) {
                    if (obj.hasOwnProperty(key) && !!validator(key, obj[key])) {
                        results[key] = obj[key];
                    }
                }
            } catch (err) {
                bitlib.logger.error(err);
            }

            return results;
        };

        self.eachTimeout = function(obj, callback, interval) {
            var defer = $.Deferred();

            if (!bitlib.common.isObject(obj) || !bitlib.common.isFunction(callback)) {
                return defer.resolve().promise();
            }

            if (!bitlib.common.isNumber(interval) || interval < 10) {
                interval = 10;
            }

            var keys = [];
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    keys.push(key);
                }
            }

            var i = 0,
                len = keys.length;

            if (len === 0) {
                return defer.resolve().promise();
            }

            var eachTimeout = function() {
                try {
                    var rt = callback(keys[i], obj[keys[i]]);

                    if (rt === false || i === len - 1) {
                        defer.resolve();
                        return this;
                    }
                } catch (err) {
                    defer.reject(err);
                    return this;
                }

                i++;
                setTimeout(eachTimeout, interval);
            };

            setTimeout(eachTimeout, 0);

            return defer.promise();
        };

        self.concatSequentialProperties = function(source, propNames) {
            if (!bitlib.common.isObject(source) || !bitlib.common.isArray(propNames) || propNames.length === 0) {
                return {};
            }

            var results = [];

            for (var i = 0, len = propNames.length; i < len; i++) {
                var name = propNames[i];

                if (bitlib.common.isString(name)) {
                    results.push(source[name]);
                }
            }

            return results;
        };

        return self;
    }());

}(bitlib || {}));