'use strict';

app.directive('iframeResizer', function iframeResizer() {
    return {
        link: function (scope, element, attrs) {
            setTimeout(function()
            {
                iFrameResize({
                    enablePublicMethods: true//,
                    //initCallback: function(messageData) { console.log("INIT: " + messageData); },
                    //resizedCallback: function(messageData) { console.log("RESIZED: " + messageData); },
                    //messageCallback: function(messageData) { console.log("MESSAGE: " + messageData); },
                    //closedCallback: function(id) { console.log("CLOSED: " + id); }
                }, '#' + attrs.id);
            }, 10);
        }
    };
});

app.directive('autoHeight', function autoHeight($window, $timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            function setHeight() {
                var offset = attrs.autoHeightOffset ? parseInt(attrs.autoHeightOffset) : 0;
                var height = $window.innerHeight - element.prop('offsetTop') - offset;

                element.css('height', height + 'px');
            }

            angular.element($window).bind('resize', setHeight);

            $timeout(setHeight, 200);
            element.css("overflow", "auto");

            scope.$on('$destroy', function cleanUpAutoHeight() {
                angular.element($window).unbind('resize', setHeight);
            });
        }
    };
});
