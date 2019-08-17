(function (bitlib) {
    "use strict";

    bitlib.ajax = (function () {
        var self = {};

        self.type = "bitlib.ajax";

        self.isSuccess = function (reply) {
            if (!reply) {
                return false;
            }

            if (reply.result_code === "200") {
                return true;
            }

            return false;
        };

        self.send = function (url, request, options) {
            if (!url) {
                bitlib.logger.error("POST 送信先が指定されていません.");
                return null;
            }

            request = request || {};
            options = options || {};

            var defer = $.Deferred();

            try {
                $.ajax({
                    type: "POST",
                    url: url,
                    data: bitlib.json.stringify(request),
                    dataType: "json",
                    contentType: "application/json; charset=UTF-8",
                    success: function (data) {
                        defer.resolve(data);
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        defer.reject(XMLHttpRequest, textStatus, errorThrown);
                    }
                });

                return defer.promise();
            } catch (err) {
                bitlib.logger.error(err);
            }

            return null;
        };

        self.submit = function (url, request, attr) {
            if (!url) {
                bitlib.logger.error("POST 送信先が指定されていません.");
                return self;
            }

            request = request || {};
            attr = attr || {};

            try {
                var $form = $("#ExecuteService");
                if (!$form.length) {
                    $form = $("body").append('<form id="ExecuteService" style="display:none"><input type="hidden" name="transfer" /><input type="hidden" name="body" /></form>');
                }

                $form
                    .attr($.extend(
                        attr, {
                            method: "POST",
                            action: url
                        }
                    ));

                $form.find("[name='body']").val(bitlib.json.stringify(request));
                $form.submit();
            } catch (err) {
                bitlib.logger.error(err);
            }

            return self;
        };

        return self;
    }());

}(bitlib || {}));