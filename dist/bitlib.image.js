(function(bitlib) {
    "use strict";

    bitlib.image = (function() {
        var self = {};

        self.type = "bitlib.image";

        self.isUsable = function(imgType) {
            imgType = (imgType || "").toLowerCase();

            if (!imgType || !bitlib.common.isString(imgType)) {
                return false;
            }

            return !!imgType.match(/(jpeg|jpg|png|bmp)/ig);
        };

        self.sliceDataUrl = function(data, imgType) {
            imgType = (imgType || "").toLowerCase();

            if (!imgType) {
                return "";
            }

            var dataHeader = "data:image/" + imgType + ";base64,";
            if (!data || data.indexOf(dataHeader) === -1) {
                return "";
            }

            return data.replace(dataHeader, "");
        };

        self.getExif = function(data, imgType) {
            var dataUrl = self.sliceDataUrl(data, imgType);
            if (!dataUrl) {
                return null;
            }

            var binaryData = window.atob(dataUrl);

            try {
                return EXIF.readFromBinaryFile(new BinaryFile(binaryData));
            } catch (err) {
                bitlib.logger.error(err);
            }

            return null;
        };

        self.getHeight = function(exif) {
            if (!exif || !exif.PixelYDimension) {
                return 0;
            }
            return exif.PixelYDimension;
        };

        self.getWidth = function(exif) {
            if (!exif || !exif.PixelXDimension) {
                return 0;
            }
            return exif.PixelXDimension;
        };

        self.getRotate = function(exif) {
            if (!exif || !exif.Orientation) {
                return 0;
            }

            var rotation = 0;
            switch (exif.Orientation) {
                case 1:
                case 2:
                    rotation = 0; // 通常・左右反転
                    break;
                case 3:
                case 4:
                    rotation = 180; // 180度回転・上下反転
                    break;
                case 6:
                case 7:
                    rotation = 90; // 時計回りに90度回転・時計回りに90度回転 上下反転
                    break;
                case 5:
                case 8:
                    rotation = -90; // 反時計回りに90度回転 上下反転・反時計回りに90度回転
                    break;
                default:
                    rotation = 0;
            }

            return rotation;
        };

        self.wrapImageType = function(imgType) {
            imgType = (imgType || "").toLowerCase();

            if (!imgType || !bitlib.common.isString(imgType)) {
                return "";
            }

            switch (imgType) {
                case "jpeg":
                    return "jpg";
                default:
                    // none
            }

            return imgType;
        };

        return self;
    }());

}(bitlib || {}));