'use strict';

(function () {
    var app_config;

    if (window.location.host.has("local")) {
        app_config = {
            baseApiUrl: 'http://locallogin.orionadvisor.com/api/v1',
            portalUrl: 'http://localportal.orionadvisor.com/sso.html?t=[TOKEN]',
            feePayPortalUrl: 'http://localportal.orionadvisor.com/feepay/sso.html?t=[TOKEN]',
            repPortalUrl: 'http://localrep.orionadvisor.com/sso.html?t=[TOKEN]',
            insightUrl: 'http://localapp.orionadvisor.com/insight/sso.html?t=[TOKEN]',
            trendsUrl: 'http://api.orionadvisor.local/api/v1/Reporting/BI/SisenseSSO?Authorization=[TOKEN]',
            orionConnectUrl: 'http://localapp.orionadvisor.com/integration.html?t=[TOKEN]',
            devPortalUrl: 'https://developers.orionadvisor.com/login?t=[TOKEN]&action=sso',
            hiddenLeversApiKey: 'h5g16e14dy998gg',
            apiOnlyRoleId: 275,
            informOnlyRoleId: {user: 14470, admin: 14576}
        }
    } else if (window.location.host.has("test")) {
        app_config = {
            baseApiUrl: 'https://testlogin.orionadvisor.com/api/v1',
            portalUrl: 'https://testportal.orionadvisor.com/sso.html?t=[TOKEN]',
            feePayPortalUrl: 'https://testportal.orionadvisor.com/feepay/sso.html?t=[TOKEN]',
            repPortalUrl: 'https://testrep.orionadvisor.com/sso.html?t=[TOKEN]',
            insightUrl: 'https://testapi.orionadvisor.com/insight/sso.html?t=[TOKEN]',
            trendsUrl: 'https://testapi.orionadvisor.com/api/v1/Reporting/BI/SisenseSSO?Authorization=[TOKEN]',
            orionConnectUrl: 'https://testapi.orionadvisor.com/orionconnectapp/integration.html?t=[TOKEN]',
            devPortalUrl: 'https://developers.orionadvisor.com/login?t=[TOKEN]&action=sso',
            hiddenLeversApiKey: 'h5g16e14dy998gg',
            apiOnlyRoleId: 275,
            informOnlyRoleId: {user: 14470, admin: 14576}
        }
    } else {
        app_config = {
            baseApiUrl: 'https://login.orionadvisor.com/api/v1',
            portalUrl: 'https://portal.orionadvisor.com/sso.html?t=[TOKEN]',
            feePayPortalUrl: 'https://portal.orionadvisor.com/feepay/sso.html?t=[TOKEN]',
            repPortalUrl: 'https://rep.orionadvisor.com/sso.html?t=[TOKEN]',
            insightUrl: 'https://api.orionadvisor.com/insight/sso.html?t=[TOKEN]',
            trendsUrl: 'https://api.orionadvisor.com/api/v1/Reporting/BI/SisenseSSO?Authorization=[TOKEN]',
            orionConnectUrl: 'https://api.orionadvisor.com/orionconnectapp/integration.html?t=[TOKEN]',
            devPortalUrl: 'https://developers.orionadvisor.com/login?t=[TOKEN]&action=sso',
            hiddenLeversApiKey: 'h5g16e14dy998gg',
            apiOnlyRoleId: 275,
            informOnlyRoleId: {user: 14470, admin: 14576}
        }
    }

    app.constant('APP_CONFIG', app_config);
})();
