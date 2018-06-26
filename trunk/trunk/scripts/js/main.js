var base = '/scripts/js';
var urlArgs = "CDNVersion=" + new Date().getTime();
/*if (environment == "pro") {
    base = '/Scripts/js-build';
    urlArgs = "CDNVersion=v16"
}*/
require.config({
    baseUrl: base,
    urlArgs: urlArgs,
    waitSeconds: 200,
    paths: {
        angular: 'lib/angular.min',
        router: 'lib/angular-route.min',
        jquery:'lib/jquery-1.11.3.min',
        bootStrap: 'lib/bootstrap.min',
        bootStrapMultiselect: 'lib/bootstrap-multiselect',
        underscore: 'lib/underscore.min',
        highcharts: 'lib/highcharts',
        highchartMore: 'lib/highcharts-more',
        sysConfig: 'common/SysConfig',
        indexApp: 'app/indexApp',
        loginApp: 'app/loginApp',
        Extend: 'common/Extend',
        pikaday:'lib/pikaday.min',
        hcexporting:'lib/exporting',
        hcexportingcsv:'lib/export-csv',
        jqueryMD5: 'lib/jquery.md5',
        jQueryUi: 'lib/jquery-ui.min',
        timePicker: 'lib/jquery-ui-timepicker-addon',
        wangEditor:'lib/wangEditor/js/wangEditor',
        sanitize:'lib/angular-sanitize',
        ajaxfileupload:'lib/ajaxfileupload',
        sparkMd5: 'lib/spark-md5',
        async:'lib/async',
        upyunMu:'lib/upyun-mu',
        emoji:'lib/emoji'
    },
    shim: {
        angular:{
            exports:'angular'
        },
        router: {
            deps: ['angular'],
            exports:'router'
        },
        bootStrap: {
            deps: ['jquery'],
            exports:'bootStrap'
        },
        bootStrapMultiselect: {
            deps: ['jquery', 'bootStrap'],
            exports: 'bootStrapMultiselect'
        },
        underscore: {
            exports: 'underscore'
        },
        highcharts:{
            exports:'highcharts'
        },
        highchartMore: {
            deps: ['highcharts']
        },
        hcexporting: {
            deps: ['highcharts'],
            exports:'hcexporting'
        },
        hcexportingcsv: {
            deps: ['highcharts'],
            exports:'hcexportingcsv'
        },pikaday:{
            exports:'pikaday'
        },jqueryMD5: {
            deps: ['jquery'],
            exports: 'jqueryMD5'
        },timePicker: {
            deps: ['jQueryUi'],
            exprots:'timePicker'
        }, jQueryUi: {
            deps: ['jquery'],
            exprots: 'jQueryUi'
        }, wangEditor: {
            deps: ['jquery']
        }, sanitize:{
            deps:['angular']
        }, sparkMd5:{
            exports:'sparkMd5'
        }, async:{
            deps:['sparkMd5'],
            exports:'async'
        }, upyunMu:{
            exports:'upyunMu'
        }, emoji:{
            deps: ['jquery'],
            exports:'emoji'
        }, jQuerySelect: {
            deps: ['jquery'],
            exprots: 'jQuerySelect'
        }
    }
});
