'use strict';

app.directive('oasImgSrc', function oasImgSrc(APP_CONFIG) {
    var attrName = "src";
    var normalized = "oasImgSrc";
    return {
        priority: 99,
        link: function (scope, element, attrs) {
            attrs.$observe(normalized, function(value) {
                //NOTE: Make sure to include a blank src attribute on the element or IE throws up.
                //      See ngSrc code for more information.

                if (!value) return;

                var requiresToken = attrs.requiresToken ? scope.$eval(attrs.requiresToken) : true;

                if (requiresToken && sessionStorage.oas_token)
                    attrs.$set(attrName, APP_CONFIG.baseApiUrl + value + (value.indexOf("?") !== -1 ? "&" : "?") + "Authorization=" + sessionStorage.oas_token);
                else if (!requiresToken)
                    attrs.$set(attrName, APP_CONFIG.baseApiUrl + value);

                //TODO: issue in IE, commenting out for now
//                element.one("error", function(e) {
//                    e.preventDefault();
//                    e.stopPropagation();
//
//                    attrs.$set(attrName, "");
//                    return true;
//                });
            });
        }
    };
});