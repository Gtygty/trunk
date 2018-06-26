/* eslint-disable no-undef */
define(['indexApp', 'common/util', 'common/const','model/systemSettingModel', 'service/baseService'], function (app, util, Const,sysModel) {
  app.controller('systemSettingCtrl', ['$scope', 'signValid','ajaxService' ,'$http',function ($scope, signValid,ajax,$http) {

      var BaseUrl = {
        ZSTJLogList:"BMSLog/SearchZSTJLogList",
        WeChatLog:"BMSLog/SearchWeChatLogList"
      };

      ($scope.vm = {
        Common: {

          Init: function(){
            signValid.ValidAccess('#/systemSetting');                                           // 缓存登录验证
            /* eslint-disable no-undef */
            $('.nav li:eq(16)').addClass('active').siblings().removeClass('active');     // 侧边栏样式
            $('body').css('overflow', 'auto');

            //获取版本信息
            $scope.vm.SystemSetting.OnGetVersion();
          }
        },
        VersionData:[],
        SyncNews:{
            Init: function(){
              var startDateTextBox = $('#NewsStartTime');
              var endDateTextBox = $('#NewsEndTime');
              $.timepicker.dateRange(
                  startDateTextBox,
                  endDateTextBox,
                  {
                      changeMonth: true,
                      buttonImageOnly: true,
                      dateFormat: 'yy-mm-dd',
                      monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                      dayNamesMin: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
                      minInterval: (1000 * 60 * 60 * 24 * 0) // 0 days
                  }
              );
              
          },
          OnClickSearch:function(){
              var startTime=$('#NewsStartTime').val();
              var endTime=$('#NewsEndTime').val();
              if(!startTime || !endTime){
                util.showFade("请输入开始和截止时间");
                return;
              }
              var url = 'BMSVideoNews/SyncNewsWithVideo';
              var params={
                "StartTime": startTime,
                "EndTime": endTime,
                "PageSize": 100
              }
              util.ajaxZSTJPost($http,url,params, function(result){
                if (result){
                    util.showFade(result.Data)
                }else {
                     util.showFade('操作失败！');
                }
            },function(error){
                util.showFade(error);
            });
          }
        },
        SystemSetting:{
            OnClickImportExcel: function(){                //上传xml
                var url = 'BMSSystem/ImportVersionXML',
                    params = {
                        file:{
                            test: document.getElementById("xmlFile").files[0]
                        }
                    };
                if (!params.file.test){
                    util.showFade("请选择需要导入的xml！");
                return;
                }else if(params.file.test.name!="VersionConfig.xml"){
                    util.showFade("请选择正确的文件名！");
                }else if (params.file.test.name.split('.').pop() != "xml"){
                    util.showFade("请选择正确的xml文件！");
                return;
                }
                util.ajaxZSTJFile(url, params, function(result){
                    if (result.Code == 1){

                        //清空fileSelector
                        var File = $("#xmlFile");
                        File.after(File.clone().val(""));
                        File.remove();

                        $scope.vm.SystemSetting.OnGetVersion();
                        $scope.$apply();
                    }
                    util.showFade(result.Message);
                }, function (error){
                    util.showFade(error);
                });
            },
            OnGetVersion: function(){
                var url = 'BMSSystem/GetVersionList',
                    params = {},
                    sysVersionModel = new sysModel();
                ajax.PostZstj(url, params, function(result){
                    $scope.vm.VersionData = sysVersionModel.convertVersionList(result);
                });
            }
        },
        ExceptionLog:{
          List:[],
          Search:{
            'Tag': '',
            'StartTime': null,
            'EndTime': null,
            'PageIndex': 1,
            'PageSize': 10
          },
          OnLoad: function(){
            var url = 'BMSLog/SearchExpectionLog',
                params = $scope.vm.ExceptionLog.Search,
                sysVersionModel = new sysModel();
            util.ajaxZSTJPost($http,url,params, function(result){
                if (result){
                    $scope.vm.ExceptionLog.List = sysVersionModel.convertExceptionLogList(result.LogList);
                    $scope.paginationConf = $scope.vm.ExceptionLog.pageModel;
                    $scope.paginationConf.totalItems = result.TotalCount;
                }else {
                     util.showFade('操作失败！');
                }
            },function(error){
                util.showFade(error);
            });
          },
          OnSearch: function(){
              var ag = $scope.vm.ExceptionLog.Search;
              ag.PageIndex = $scope.vm.ExceptionLog.pageModel.currentPage;
              ag.PageSize = $scope.vm.ExceptionLog.pageModel.itemsPerPage;
              if(ag.PageIndex == 0){
                ag.PageIndex = 1;
              }
              if($('#ExceptionLogStartTime').val()){
                  ag.StartTime  = $('#ExceptionLogStartTime').val()+' '+'00:00:00';
              }
              if($('#ExceptionLogEndTime').val()){
                  ag.EndTime  = $('#ExceptionLogEndTime').val()+' '+'23:59:59';
              }
              var url = 'BMSLog/SearchExpectionLog',
                params = $scope.vm.ExceptionLog.Search,
                sysVersionModel = new sysModel();
              util.ajaxZSTJPost($http,url,params, function(result){
                  if (result){
                        $scope.vm.ExceptionLog.List = sysVersionModel.convertExceptionLogList(result.LogList);
                        $scope.paginationConf.totalItems = result.TotalCount;
                        if(result.TotalCount == 0){
                            $scope.vm.ExceptionLog.pageModel.currentPage = 0;
                        }
                  }else {
                    util.showFade(result.Message);
                  }
              },function(error){
                util.showFade(error);
              });
          },
          OnSearchExceptionLogClick: function(){
              var ag = $scope.vm.ExceptionLog.Search;
              $scope.vm.ExceptionLog.pageModel.currentPage = 1;
              ag.PageIndex = $scope.vm.ExceptionLog.pageModel.currentPage;
              ag.PageSize = $scope.vm.ExceptionLog.pageModel.itemsPerPage;
              if(ag.PageIndex == 0){
                ag.PageIndex = 1;
              }
              if($('#ExceptionLogStartTime').val()){
                  ag.StartTime  = $('#ExceptionLogStartTime').val()+' '+'00:00:00';
              }
              if($('#ExceptionLogEndTime').val()){
                  ag.EndTime  = $('#ExceptionLogEndTime').val()+' '+'23:59:59';
              }
              var url = 'BMSLog/SearchExpectionLog',
                params = $scope.vm.ExceptionLog.Search,
                sysVersionModel = new sysModel();
              util.ajaxZSTJPost($http,url,params, function(result){
                  if (result){
                        $scope.vm.ExceptionLog.List = sysVersionModel.convertExceptionLogList(result.LogList);
                        $scope.paginationConf.totalItems = result.TotalCount;
                        if(result.TotalCount == 0){
                            $scope.vm.ExceptionLog.pageModel.currentPage = 0;
                        }
                  }else {
                    util.showFade(result.Message);
                  }
              },function(error){
                util.showFade(error);
              });
          },
          Init: function(){
              $scope.vm.ExceptionLog.OnLoad();
              var startDateTextBox = $('#ExceptionLogStartTime');
              var endDateTextBox = $('#ExceptionLogEndTime');
              $.timepicker.dateRange(
                  startDateTextBox,
                  endDateTextBox,
                  {
                      changeMonth: true,
                      buttonImageOnly: true,
                      dateFormat: 'yy-mm-dd',
                      monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                      dayNamesMin: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
                      minInterval: (1000 * 60 * 60 * 24 * 0) // 0 days
                  }
              );
          },
          pageModel: {
            currentPage: 1,    //当前所在的页
            itemsPerPage: 10,  //每页展示的数据条数
            pagesLength: 9,   //分页条目的长度（如果设置建议设置为奇数）
            perPageOptions: [10, 20, 30, 40, 50,200],    //可选择显示条数的数组
            rememberPerPage: 'perPageItemsOne',  //使用LocalStorage记住所选择的条目数的名称
            onChange: function () {
              if($scope.vm.ExceptionLog.pageModel.currentPage != 0){
                $scope.vm.ExceptionLog.OnSearch();
              }
            }
         },
        },
        CommonLog:{
          List:[],
          Search:{
            'tag': '',
            'type': '',
            'StartTime': null,
            'EndTime': null,
            'PageIndex': 1,
            'PageSize': 10
          },
          OnLoad: function(){
            var url = 'BMSLog/SearchCommonLogList',
                params = angular.extend( {
                    'tag': '',
                    'type': '',
                    'StartTime': null,
                    'EndTime': null,
                    'PageIndex': 1,
                    'PageSize': 10
                }, $scope.vm.CommonLog.Search),
                // params = $scope.vm.CommonLog.Search,
                sysVersionModel = new sysModel();
                if(params.type == ''){
                    params.type = -1;
                }
                console.log(params)
            util.ajaxZSTJPost($http,url,params, function(result){
                console.log(result)
                if (result){
                    $scope.vm.CommonLog.List = sysVersionModel.convertCommonLogList(result.LogList);
                    $scope.commonLogPaginationConf = $scope.vm.CommonLog.pageModel;
                    $scope.commonLogPaginationConf.totalItems = result.TotalCount;
                }else {
                    util.showFade(result.Message);
                }
            },function(error){
                util.showFade(error);
            });
          },
          OnSearch: function(){
              var ag = $scope.vm.CommonLog.Search;
              ag.PageIndex = $scope.vm.CommonLog.pageModel.currentPage;
              ag.PageSize = $scope.vm.CommonLog.pageModel.itemsPerPage;
              if(ag.PageIndex == 0){
                ag.PageIndex = 1;
              }
              if($('#CommonLogStartTime').val()){
                  ag.StartTime  = $('#CommonLogStartTime').val()+' '+'00:00:00';
              }
              if($('#CommonLogEndTime').val()){
                  ag.EndTime  = $('#CommonLogEndTime').val()+' '+'23:59:59';
              }
              var url = 'BMSLog/SearchCommonLogList',
                params = angular.extend( {
                    'tag': '',
                    'type': '',
                    'StartTime': null,
                    'EndTime': null,
                    'PageIndex': 1,
                    'PageSize': 10
                }, $scope.vm.CommonLog.Search),
                sysVersionModel = new sysModel();
                if(params.type == ''){
                    params.type = -1;
                }
              util.ajaxZSTJPost($http,url,params, function(result){
                  if (result){
                        $scope.vm.CommonLog.List = sysVersionModel.convertCommonLogList(result.LogList);
                        $scope.commonLogPaginationConf.totalItems = result.TotalCount;
                        if(result.TotalCount == 0){
                            $scope.vm.CommonLog.pageModel.currentPage = 0;
                        }
                  }else {
                      util.showFade(result.Message);
                  }
              },function(error){
                util.showFade(error);
              });
          },
          OnSearchCommonLogClick: function(){
              var ag = $scope.vm.CommonLog.Search;
              $scope.vm.CommonLog.pageModel.currentPage = 1;
              ag.PageIndex = $scope.vm.CommonLog.pageModel.currentPage;
              ag.PageSize = $scope.vm.CommonLog.pageModel.itemsPerPage;
              if(ag.Page == 0){
                ag.Page = 1;
              }
              if($('#CommonLogStartTime').val()){
                  ag.StartTime  = $('#CommonLogStartTime').val()+' '+'00:00:00';
              }
              if($('#CommonLogEndTime').val()){
                  ag.EndTime  = $('#CommonLogEndTime').val()+' '+'23:59:59';
              }
              var url = 'BMSLog/SearchCommonLogList',
                params = angular.extend( {
                    'tag': '',
                    'type': '',
                    'StartTime': null,
                    'EndTime': null,
                    'PageIndex': 1,
                    'PageSize': 10
                }, $scope.vm.CommonLog.Search),
                sysVersionModel = new sysModel();
                if(params.type == ''){
                    params.type = -1;
                }
              util.ajaxZSTJPost($http,url,params, function(result){
                  if (result){
                        $scope.vm.CommonLog.List = sysVersionModel.convertCommonLogList(result.LogList);
                        $scope.commonLogPaginationConf.totalItems = result.TotalCount;
                        if(result.TotalCount == 0){
                            $scope.vm.CommonLog.pageModel.currentPage = 0;
                        }
                  }else {
                      util.showFade(result.Message);
                  }
              },function(error){
                util.showFade(error);
              });
          },
          Init: function(){
              var startDateTextBox = $('#CommonLogStartTime');
              var endDateTextBox = $('#CommonLogEndTime');
              $.timepicker.dateRange(
                  startDateTextBox,
                  endDateTextBox,
                  {
                      changeMonth: true,
                      buttonImageOnly: true,
                      dateFormat: 'yy-mm-dd',
                      monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                      dayNamesMin: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
                      minInterval: (1000 * 60 * 60 * 24 * 0) // 0 days
                  }
              );
              $scope.vm.CommonLog.OnLoad();
          },
          pageModel: {
            currentPage: 1,    //当前所在的页
            itemsPerPage: 10,  //每页展示的数据条数
            pagesLength: 9,   //分页条目的长度（如果设置建议设置为奇数）
            perPageOptions: [10, 20, 30, 40, 50,200],    //可选择显示条数的数组
            rememberPerPage: 'perPageItemsThree',  //使用LocalStorage记住所选择的条目数的名称
            onChange: function () {
              if($scope.vm.CommonLog.pageModel.currentPage != 0){
                $scope.vm.CommonLog.OnSearch();
              }
            }
         },
        },
        AliPayLog:{
          List:[],
          AliPayLogCategory:[
            // 'success',
            // 'failure',
            // 'all',
            {text:'全部',value:''},
            {text:'成功',value:'success' },
            {text:'失败',value:'failure'},
          ],
          Search:{
            'StartTime':null,
            'EndTime':null,
            'ResponseData':'',
            'PageIndex':1,
            'PageSize':10
          },
          OnLoad: function() {
            var url = 'BMSLog/SearchAliPayExpection',
                params = angular.extend({
                  'StartTime':null,
                  'EndTime':null,
                  'ResponseData':'',
                  'PageIndex':1,
                  'PageSize':10
                },$scope.vm.AliPayLog.Search),
                sysVersionModel = new sysModel();
                if (params.type == '') {
                  params.type = -1;
                }
            util.ajaxMALLPost($http,url,params,function(result){
                if (result) {
                  $scope.vm.AliPayLog.List = sysVersionModel.convertAliPayLogList(result.LogList);
                  $scope.aliPayLogPaginationConf = $scope.vm.AliPayLog.pageModel;
                  $scope.aliPayLogPaginationConf.totalItems = result.TotalCount;
                }else {
                  util.showFade(result.Message);
                }
            },function(error){
                  util.showFade(error);
            });
          },
          OnSearch:function(){
            var ag = $scope.vm.AliPayLog.Search;
            ag.PageIndex = $scope.vm.AliPayLog.pageModel.currentPage;
            ag.PageSize = $scope.vm.AliPayLog.pageModel.itemsPerPage;
            if (ag.PageIndex == 0){
              ag.PageIndex = 1;
            }
            if ($('#AliPayLogStartTime').val()) {
              ag.StartTime = $('#AliPayLogStartTime').val()+' '+'00:00:00';
            }
            if ($('#AliPayLogEndTime').val()) {
              ag.EndTime = $('#AliPayLogEndTime').val+' '+'23:59:59';
            }
            var url = 'BMSLog/SearchAliPayExpection',
              params = angular.extend({
                'StartTime':null,
                'EndTime':null,
                'ResponseData':'',
                'PageIndex':1,
                'PageSize':10
              },$scope.vm.AliPayLog.Search),
              sysVersionModel = new sysModel();
              if (params.type == '') {
                params.type = -1;
              }
             util.ajaxMALLPost($http,url,params,function(result) {
                  if (result) {
                    $scope.vm.AliPayLog.List = sysVersionModel.convertAliPayLogList(result.LogList);
                    $scope.aliPayLogPaginationConf.totalItems = result.TotalCount;
                    if (result.TotalCount == 0) {
                        $scope.vm.AliPayLog.pageModel.currentPage = 0;
                    }
                  }else {
                    util.showFade(result.Message);
                  }
             },function(error){
                util.showFade(error);
             });
          },
          OnSearchAliPayLogClick:function() {
            var ag = $scope.vm.AliPayLog.Search;
            $scope.vm.AliPayLog.pageModel.currentPage = 1;
            ag.PageIndex = $scope.vm.AliPayLog.pageModel.currentPage;
            ag.PageSize = $scope.vm.AliPayLog.pageModel.itemsPerPage;
            if (ag.Page == 0) {
              ag.Page = 1;
            }
            if ($('#AliPayLogStartTime').val()) {
              ag.StartTime = $('#AliPayLogStartTime').val()+' '+'00:00:00';
            }
            if ($('#AliPayLogEndTime').val()) {
              ag.EndTime = $('#AliPayLogEndTime').val()+' '+'23:59:59';
            }
            var url = 'BMSLog/SearchAliPayExpection',
               params = $scope.vm.AliPayLog.Search;
               sysVersionModel = new sysModel();
            util.ajaxMALLPost($http,url,params,function(result){
              if (result) {
                  $scope.vm.AliPayLog.List = sysVersionModel.convertAliPayLogList(result.LogList);
                  $scope.aliPayLogPaginationConf.totalItems = result.TotalCount;
                  if (result.TotalCount == 0) {
                    $scope.vm.AliPayLog.pageModel.currentPage = 0;
                  }
              }else{
                 util.showFade(result.Message);
              }
            },function(error){
              util.showFade(error);
            });
          },
          Init:function(){
            var startDateTextBox = $('#AliPayLogStartTime');
            var endDateTextBox = $('#AliPayLogEndTime');
            $.timepicker.dateRange(
              startDateTextBox,
              endDateTextBox,
              {
                  changeMonth:true,
                  buttonImageOnly:true,
                  dateFormat:'yy-mm-dd',
                  monthNamesShort:["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                  dayNamesMin: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
                  minInterval: (1000 * 60 * 60 * 24 * 0) // 0 days
              }
            );
            $scope.vm.AliPayLog.OnLoad();
          },
          pageModel:{
            currentPage:1,
            itemsPerPage:10,
            pagesLength:9,
            perPageOptions:[10,20,30,40,50,200],
            rememberPerPage:'perPageItemsFour',
            onChange:function() {
              if ($scope.vm.AliPayLog.pageModel.currentPage != 0) {
                $scope.vm.AliPayLog.OnSearch();
              }
            }
          }
        },

        ThirdAliPayLog:{
          List:[],
          AliPayLogCategory:[
            // 'success',
            // 'failure',
            // 'all',
            {text:'全部',value:''},
            {text:'成功',value:'success' },
            {text:'失败',value:'failure'},
          ],
          Search:{
            'StartTime':null,
            'EndTime':null,
            'ResponseData':'',
            'PageIndex':1,
            'PageSize':10
          },
          OnLoad: function() {
            var url = 'BMSLog/SearchThirdAliPayExpection',
                params = angular.extend({
                  'StartTime':null,
                  'EndTime':null,
                  'ResponseData':'',
                  'PageIndex':1,
                  'PageSize':10
                },$scope.vm.ThirdAliPayLog.Search),
                sysVersionModel = new sysModel();
                if (params.type == '') {
                  params.type = -1;
                }
            util.ajaxMALLPost($http,url,params,function(result){
                if (result) {
                  $scope.vm.ThirdAliPayLog.List = sysVersionModel.convertAliPayLogList(result.LogList);
                  $scope.aliPayLogPaginationConf = $scope.vm.ThirdAliPayLog.pageModel;
                  $scope.aliPayLogPaginationConf.totalItems = result.TotalCount;
                }else {
                  util.showFade(result.Message);
                }
            },function(error){
                  util.showFade(error);
            });
          },
          OnSearch:function(){
            var ag = $scope.vm.ThirdAliPayLog.Search;
            ag.PageIndex = $scope.vm.ThirdAliPayLog.pageModel.currentPage;
            ag.PageSize = $scope.vm.ThirdAliPayLog.pageModel.itemsPerPage;
            if (ag.PageIndex == 0){
              ag.PageIndex = 1;
            }
            if ($('#ThirdAliPayLogStartTime').val()) {
              ag.StartTime = $('#ThirdAliPayLogStartTime').val()+' '+'00:00:00';
            }
            if ($('#ThirdAliPayLogEndTime').val()) {
              ag.EndTime = $('#ThirdAliPayLogEndTime').val+' '+'23:59:59';
            }
            var url = 'BMSLog/SearchThirdAliPayExpection',
              params = angular.extend({
                'StartTime':null,
                'EndTime':null,
                'ResponseData':'',
                'PageIndex':1,
                'PageSize':10
              },$scope.vm.ThirdAliPayLog.Search),
              sysVersionModel = new sysModel();
              if (params.type == '') {
                params.type = -1;
              }
             util.ajaxMALLPost($http,url,params,function(result) {
                  if (result) {
                    $scope.vm.ThirdAliPayLog.List = sysVersionModel.convertAliPayLogList(result.LogList);
                    $scope.aliPayLogPaginationConf.totalItems = result.TotalCount;
                    if (result.TotalCount == 0) {
                        $scope.vm.ThirdAliPayLog.pageModel.currentPage = 0;
                    }
                  }else {
                    util.showFade(result.Message);
                  }
             },function(error){
                util.showFade(error);
             });
          },
          OnSearchAliPayLogClick:function() {
            var ag = $scope.vm.ThirdAliPayLog.Search;
            $scope.vm.ThirdAliPayLog.pageModel.currentPage = 1;
            ag.PageIndex = $scope.vm.ThirdAliPayLog.pageModel.currentPage;
            ag.PageSize = $scope.vm.ThirdAliPayLog.pageModel.itemsPerPage;
            if (ag.Page == 0) {
              ag.Page = 1;
            }
            if ($('#ThirdAliPayLogStartTime').val()) {
              ag.StartTime = $('#ThirdAliPayLogStartTime').val()+' '+'00:00:00';
            }
            if ($('#ThirdAliPayLogEndTime').val()) {
              ag.EndTime = $('#ThirdAliPayLogEndTime').val()+' '+'23:59:59';
            }
            var url = 'BMSLog/SearchThirdAliPayExpection',
               params = $scope.vm.ThirdAliPayLog.Search;
               sysVersionModel = new sysModel();
            util.ajaxMALLPost($http,url,params,function(result){
              if (result) {
                  $scope.vm.ThirdAliPayLog.List = sysVersionModel.convertAliPayLogList(result.LogList);
                  $scope.aliPayLogPaginationConf.totalItems = result.TotalCount;
                  if (result.TotalCount == 0) {
                    $scope.vm.ThirdAliPayLog.pageModel.currentPage = 0;
                  }
              }else{
                 util.showFade(result.Message);
              }
            },function(error){
              util.showFade(error);
            });
          },
          Init:function(){
            var startDateTextBox = $('#ThirdAliPayLogStartTime');
            var endDateTextBox = $('#ThirdAliPayLogEndTime');
            $.timepicker.dateRange(
              startDateTextBox,
              endDateTextBox,
              {
                  changeMonth:true,
                  buttonImageOnly:true,
                  dateFormat:'yy-mm-dd',
                  monthNamesShort:["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                  dayNamesMin: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
                  minInterval: (1000 * 60 * 60 * 24 * 0) // 0 days
              }
            );
            $scope.vm.ThirdAliPayLog.OnLoad();
          },
          pageModel:{
            currentPage:1,
            itemsPerPage:10,
            pagesLength:9,
            perPageOptions:[10,20,30,40,50,200],
            rememberPerPage:'perPageItemsFour',
            onChange:function() {
              if ($scope.vm.ThirdAliPayLog.pageModel.currentPage != 0) {
                $scope.vm.ThirdAliPayLog.OnSearch();
              }
            }
          }
        },

        MallCommonExpectionLog:{
          List:[],
          Search:{
            'Tag':'',
            'StartTime':null,
            'EndTime':null,
            'PageIndex':1,
            'PageSize':10
          },
          OnLoad: function() {
            var url = 'BMSLog/SearchCommonExpection',
                params = angular.extend({
                  'Tag':'',
                  'StartTime':null,
                  'EndTime':null,
                  'PageIndex':1,
                  'PageSize':10
                },$scope.vm.MallCommonExpectionLog.Search),
                sysVersionModel = new sysModel();
                if (params.type == '') {
                  params.type = -1;
                }
            util.ajaxMALLPost($http,url,params,function(result){
                if (result) {
                  $scope.vm.MallCommonExpectionLog.List = sysVersionModel.convertMallCommonExpectionLogList(result.LogList);
                  $scope.mallCommonExpectionLogPaginationConf = $scope.vm.MallCommonExpectionLog.pageModel;
                  $scope.mallCommonExpectionLogPaginationConf.totalItems = result.TotalCount;
                }else {
                  util.showFade(result.Message);
                }
            },function(error){
                  util.showFade(error);
            });
          },
          OnSearch:function(){
            var ag = $scope.vm.MallCommonExpectionLog.Search;
            ag.PageIndex = $scope.vm.MallCommonExpectionLog.pageModel.currentPage;
            ag.PageSize = $scope.vm.MallCommonExpectionLog.pageModel.itemsPerPage;
            if (ag.PageIndex == 0){
              ag.PageIndex = 1;
            }
            if ($('#MallCommonExpectionLogStartTime').val()) {
              ag.StartTime = $('#MallCommonExpectionLogStartTime').val()+' '+'00:00:00';
            }
            if ($('#MallCommonExpectionLogEndTime').val()) {
              ag.EndTime = $('#MallCommonExpectionLogEndTime').val+' '+'23:59:59';
            }
            var url = 'BMSLog/SearchCommonExpection',
              params = angular.extend({
                'Tag':'',
                'StartTime':null,
                'EndTime':null,
                'PageIndex':1,
                'PageSize':10
              },$scope.vm.MallCommonExpectionLog.Search),
              sysVersionModel = new sysModel();
              if (params.type == '') {
                params.type = -1;
              }
             util.ajaxMALLPost($http,url,params,function(result) {
                  if (result) {
                    $scope.vm.MallCommonExpectionLog.List = sysVersionModel.convertMallCommonExpectionLogList(result.LogList);
                    $scope.mallCommonExpectionLogPaginationConf.totalItems = result.TotalCount;
                    if (result.TotalCount == 0) {
                        $scope.vm.MallCommonExpectionLog.pageModel.currentPage = 0;
                    }
                  }else {
                    util.showFade(result.Message);
                  }
             },function(error){
                util.showFade(error);
             });
          },
          OnSearchMallCommonExpectionLogClick:function() {
            var ag = $scope.vm.MallCommonExpectionLog.Search;
            $scope.vm.MallCommonExpectionLog.pageModel.currentPage = 1;
            ag.PageIndex = $scope.vm.MallCommonExpectionLog.pageModel.currentPage;
            ag.PageSize = $scope.vm.MallCommonExpectionLog.pageModel.itemsPerPage;
            if (ag.Page == 0) {
              ag.Page = 1;
            }
            if ($('#MallCommonExpectionLogStartTime').val()) {
              ag.StartTime = $('#MallCommonExpectionLogStartTime').val()+' '+'00:00:00';
            }
            if ($('#MallCommonExpectionLogEndTime').val()) {
              ag.EndTime = $('#MallCommonExpectionLogEndTime').val()+' '+'23:59:59';
            }
            var url = 'BMSLog/SearchCommonExpection',
               params = $scope.vm.MallCommonExpectionLog.Search;
               sysVersionModel = new sysModel();
            util.ajaxMALLPost($http,url,params,function(result){
              if (result) {
                  $scope.vm.MallCommonExpectionLog.List = sysVersionModel.convertMallCommonExpectionLogList(result.LogList);
                  $scope.mallCommonExpectionLogPaginationConf.totalItems = result.TotalCount;
                  if (result.TotalCount == 0) {
                    $scope.vm.MallCommonExpectionLog.pageModel.currentPage = 0;
                  }
              }else{
                 util.showFade(result.Message);
              }
            },function(error){
              util.showFade(error);
            });
          },
          Init:function(){
            var startDateTextBox = $('#MallCommonExpectionLogStartTime');
            var endDateTextBox = $('#MallCommonExpectionLogEndTime');
            $.timepicker.dateRange(
              startDateTextBox,
              endDateTextBox,
              {
                  changeMonth:true,
                  buttonImageOnly:true,
                  dateFormat:'yy-mm-dd',
                  monthNamesShort:["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                  dayNamesMin: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
                  minInterval: (1000 * 60 * 60 * 24 * 0) // 0 days
              }
            );
            $scope.vm.MallCommonExpectionLog.OnLoad();
          },
          pageModel:{
            currentPage:1,
            itemsPerPage:10,
            pagesLength:9,
            perPageOptions:[10,20,30,40,50,200],
            rememberPerPage:'perPageItemsFive',
            onChange:function() {
              if ($scope.vm.MallCommonExpectionLog.pageModel.currentPage != 0) {
                $scope.vm.MallCommonExpectionLog.OnSearch();
              }
            }
          }
        },
        MallExpectionLog:{
          List:[],
          Search:{
            'Tag':'',
            'StartTime':null,
            'EndTime':null,
            'PageIndex':1,
            'PageSize':10
          },
          OnLoad: function() {
            var url = 'BMSLog/SearchExpection',
                params = angular.extend({
                  'Tag':'',
                  'StartTime':null,
                  'EndTime':null,
                  'PageIndex':1,
                  'PageSize':10
                },$scope.vm.MallExpectionLog.Search),
                sysVersionModel = new sysModel();
                if (params.type == '') {
                  params.type = -1;
                }
            util.ajaxMALLPost($http,url,params,function(result){
                if (result) {
                  $scope.vm.MallExpectionLog.List = sysVersionModel.convertMallExpectionLogList(result.LogList);
                  $scope.mallExpectionLogPaginationConf = $scope.vm.MallExpectionLog.pageModel;
                  $scope.mallExpectionLogPaginationConf.totalItems = result.TotalCount;
                }else {
                  util.showFade(result.Message);
                }
            },function(error){
                  util.showFade(error);
            });
          },
          OnSearch:function(){
            var ag = $scope.vm.MallExpectionLog.Search;
            ag.PageIndex = $scope.vm.MallExpectionLog.pageModel.currentPage;
            ag.PageSize = $scope.vm.MallExpectionLog.pageModel.itemsPerPage;
            if (ag.PageIndex == 0){
              ag.PageIndex = 1;
            }
            if ($('#MallExpectionLogStartTime').val()) {
              ag.StartTime = $('#MallExpectionLogStartTime').val()+' '+'00:00:00';
            }
            if ($('#MallExpectionLogEndTime').val()) {
              ag.EndTime = $('#MallExpectionLogEndTime').val+' '+'23:59:59';
            }
            var url = 'BMSLog/SearchExpection',
              params = angular.extend({
                'Tag':'',
                'StartTime':null,
                'EndTime':null,
                'PageIndex':1,
                'PageSize':10
              },$scope.vm.MallExpectionLog.Search),
              sysVersionModel = new sysModel();
              if (params.type == '') {
                params.type = -1;
              }
             util.ajaxMALLPost($http,url,params,function(result) {
                  if (result) {
                    $scope.vm.MallExpectionLog.List = sysVersionModel.convertMallExpectionLogList(result.LogList);
                    $scope.mallExpectionLogPaginationConf.totalItems = result.TotalCount;
                    if (result.TotalCount == 0) {
                        $scope.vm.MallExpectionLog.pageModel.currentPage = 0;
                    }
                  }else {
                    util.showFade(result.Message);
                  }
             },function(error){
                util.showFade(error);
             });
          },
          OnSearchMallExpectionLogClick:function() {
            var ag = $scope.vm.MallExpectionLog.Search;
            $scope.vm.MallExpectionLog.pageModel.currentPage = 1;
            ag.PageIndex = $scope.vm.MallExpectionLog.pageModel.currentPage;
            ag.PageSize = $scope.vm.MallExpectionLog.pageModel.itemsPerPage;
            if (ag.Page == 0) {
              ag.Page = 1;
            }
            if ($('#MallExpectionLogStartTime').val()) {
              ag.StartTime = $('#MallExpectionLogStartTime').val()+' '+'00:00:00';
            }
            if ($('#MallExpectionLogEndTime').val()) {
              ag.EndTime = $('#MallExpectionLogEndTime').val()+' '+'23:59:59';
            }
            var url = 'BMSLog/SearchExpection',
               params = $scope.vm.MallExpectionLog.Search;
               sysVersionModel = new sysModel();
            util.ajaxMALLPost($http,url,params,function(result){
              if (result) {
                  $scope.vm.MallExpectionLog.List = sysVersionModel.convertMallExpectionLogList(result.LogList);
                  $scope.mallExpectionLogPaginationConf.totalItems = result.TotalCount;
                  if (result.TotalCount == 0) {
                    $scope.vm.MallExpectionLog.pageModel.currentPage = 0;
                  }
              }else{
                 util.showFade(result.Message);
              }
            },function(error){
              util.showFade(error);
            });
          },
          Init:function(){
            var startDateTextBox = $('#MallExpectionLogStartTime');
            var endDateTextBox = $('#MallExpectionLogEndTime');
            $.timepicker.dateRange(
              startDateTextBox,
              endDateTextBox,
              {
                  changeMonth:true,
                  buttonImageOnly:true,
                  dateFormat:'yy-mm-dd',
                  monthNamesShort:["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                  dayNamesMin: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
                  minInterval: (1000 * 60 * 60 * 24 * 0) // 0 days
              }
            );
            $scope.vm.MallExpectionLog.OnLoad();
          },
          pageModel:{
            currentPage:1,
            itemsPerPage:10,
            pagesLength:9,
            perPageOptions:[10,20,30,40,50,200],
            rememberPerPage:'perPageItemsSix',
            onChange:function() {
              if ($scope.vm.MallExpectionLog.pageModel.currentPage != 0) {
                $scope.vm.MallExpectionLog.OnSearch();
              }
            }
          }
        },
        SearchMallLog:{
          List:[],
          MallLogIsSuccessCategory:[
            // 'success',
            // 'failure',
            // 'all',
            {text:'全部',value:null},
            {text:'成功',value:true },
            {text:'失败',value:false},
          ],
          MallLogTypeCategory:[
            {text:'DCP',value:2},
            {text:'ZSTJ',value:1},
            {text:'XIAOMEI',value:3}
          ],
          Search:{
            'Type':1,
            'Url':'',
            'StartTime':null,
            'EndTime':null,
            'IsSuccess':null,
            'PageIndex':1,
            'PageSize':10
          },
          OnLoad: function() {
            var url = 'BMSLog/SearchMALLLogList',
                params = angular.extend({
                  'Type':1,
                  'Url':'',
                  'StartTime':null,
                  'EndTime':null,
                  'IsSuccess':null,
                  'PageIndex':1,
                  'PageSize':10
                },$scope.vm.SearchMallLog.Search),
                sysVersionModel = new sysModel();
                if (params.type == '') {
                  params.type = -1;
                }
            util.ajaxMALLPost($http,url,params,function(result){
                if (result) {
                  $scope.vm.SearchMallLog.List = sysVersionModel.convertMallLogList(result.LogList);
                  $scope.SearchMallLogPaginationConf = $scope.vm.SearchMallLog.pageModel;
                  $scope.SearchMallLogPaginationConf.totalItems = result.TotalCount;
                }else {
                  util.showFade(result.Message);
                }
            },function(error){
                  util.showFade(error);
            });
          },
          OnSearch:function(){
            var ag = $scope.vm.SearchMallLog.Search;
            ag.PageIndex = $scope.vm.SearchMallLog.pageModel.currentPage;
            ag.PageSize = $scope.vm.SearchMallLog.pageModel.itemsPerPage;
            if (ag.PageIndex == 0){
              ag.PageIndex = 1;
            }
            if ($('#MallLogStartTime').val()) {
              ag.StartTime = $('#MallLogStartTime').val()+' '+'00:00:00';
            }
            if ($('#MallLogEndTime').val()) {
              ag.EndTime = $('#MallLogEndTime').val+' '+'23:59:59';
            }
            var url = 'BMSLog/SearchMALLLogList',
              params = angular.extend({
                'Type':1,
                'Url':'',
                'StartTime':null,
                'EndTime':null,
                'IsSuccess':null,
                'PageIndex':1,
                'PageSize':10
              },$scope.vm.SearchMallLog.Search),
              sysVersionModel = new sysModel();
              if (params.type == '') {
                params.type = -1;
              }
             util.ajaxMALLPost($http,url,params,function(result) {
                  if (result) {
                    $scope.vm.SearchMallLog.List = sysVersionModel.convertMallLogList(result.LogList);
                    $scope.SearchMallLogPaginationConf.totalItems = result.TotalCount;
                    if (result.TotalCount == 0) {
                        $scope.vm.SearchMallLog.pageModel.currentPage = 0;
                    }
                  }else {
                    util.showFade(result.Message);
                  }
             },function(error){
                util.showFade(error);
             });
          },
          OnSearchMallLogClick:function() {
            var ag = $scope.vm.SearchMallLog.Search;
            $scope.vm.SearchMallLog.pageModel.currentPage = 1;
            ag.PageIndex = $scope.vm.SearchMallLog.pageModel.currentPage;
            ag.PageSize = $scope.vm.SearchMallLog.pageModel.itemsPerPage;
            if (ag.Page == 0) {
              ag.Page = 1;
            }
            if ($('#MallLogStartTime').val()) {
              ag.StartTime = $('#MallLogStartTime').val()+' '+'00:00:00';
            }
            if ($('#MallLogEndTime').val()) {
              ag.EndTime = $('#MallLogEndTime').val()+' '+'23:59:59';
            }
            var url = 'BMSLog/SearchMALLLogList',
               params = $scope.vm.SearchMallLog.Search;
               sysVersionModel = new sysModel();
            util.ajaxMALLPost($http,url,params,function(result){
              if (result) {
                  $scope.vm.SearchMallLog.List = sysVersionModel.convertMallLogList(result.LogList);
                  $scope.SearchMallLogPaginationConf.totalItems = result.TotalCount;
                  if (result.TotalCount == 0) {
                    $scope.vm.SearchMallLog.pageModel.currentPage = 0;
                  }
              }else{
                 util.showFade(result.Message);
              }
            },function(error){
              util.showFade(error);
            });
          },
          Init:function(){
            var startDateTextBox = $('#MallLogStartTime');
            var endDateTextBox = $('#MallLogEndTime');
            $.timepicker.dateRange(
              startDateTextBox,
              endDateTextBox,
              {
                  changeMonth:true,
                  buttonImageOnly:true,
                  dateFormat:'yy-mm-dd',
                  monthNamesShort:["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                  dayNamesMin: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
                  minInterval: (1000 * 60 * 60 * 24 * 0) // 0 days
              }
            );
            $scope.vm.SearchMallLog.OnLoad();
          },
          pageModel:{
            currentPage:1,
            itemsPerPage:10,
            pagesLength:9,
            perPageOptions:[10,20,30,40,50,200],
            rememberPerPage:'perPageItemsSeven',
            onChange:function() {
              if ($scope.vm.SearchMallLog.pageModel.currentPage != 0) {
                $scope.vm.SearchMallLog.OnSearch();
              }
            }
          }
        },
        SearchZSTJLog:{
          List:[],
          ZSTJLogIsSuccessCategory:[
            // 'success',
            // 'failure',
            // 'all',
            {text:'全部',value:null},
            {text:'成功',value:true },
            {text:'失败',value:false},
          ],
          ZSTJLogTypeCategory:[
          // DSP:1 DCP:2 MALL:3 SMS:4
            {text:'DCP',value:2},
            {text:'DSP',value:1},
            {text:'MALL',value:3},
            {text:'SMS',value:4},
            {text:'WECHAT',value:5},
            {text:'UHEALTH',value:6},
            {text:'XIAOMEI',value:7}
          ],
          Search:{
            'Type':1,
            'Url':'',
            'StartTime':null,
            'EndTime':null,
            'IsSuccess':null,
            'PageIndex':1,
            'PageSize':10
          },
          OnLoad: function() {
            var url = BaseUrl.ZSTJLogList,
                params = angular.extend({
                  'Type':1,
                  'Url':'',
                  'StartTime':null,
                  'EndTime':null,
                  'IsSuccess':null,
                  'PageIndex':1,
                  'PageSize':10
                },$scope.vm.SearchZSTJLog.Search),
                sysVersionModel = new sysModel();
                if (params.type == '') {
                  params.type = -1;
                }
            util.ajaxZSTJPost($http,url,params,function(result){
                if (result) {
                  $scope.vm.SearchZSTJLog.List = sysVersionModel.convertZSTJLogList(result.LogList);
                  $scope.SearchZSTJLogPaginationConf = $scope.vm.SearchZSTJLog.pageModel;
                  $scope.SearchZSTJLogPaginationConf.totalItems = result.TotalCount;
                }else {
                  util.showFade(result.Message);
                }
            },function(error){
                  util.showFade(error);
            });
          },
          OnSearch:function(){
            var ag = $scope.vm.SearchZSTJLog.Search;
            ag.PageIndex = $scope.vm.SearchZSTJLog.pageModel.currentPage;
            ag.PageSize = $scope.vm.SearchZSTJLog.pageModel.itemsPerPage;
            if (ag.PageIndex == 0){
              ag.PageIndex = 1;
            }
            if ($('#ZSTJLogStartTime').val()) {
              ag.StartTime = $('#ZSTJLogStartTime').val()+' '+'00:00:00';
            }
            if ($('#ZSTJLogEndTime').val()) {
              ag.EndTime = $('#ZSTJLogEndTime').val+' '+'23:59:59';
            }
            var url = BaseUrl.ZSTJLogList,
              params = angular.extend({
                'Type':1,
                'Url':'',
                'StartTime':null,
                'EndTime':null,
                'IsSuccess':null,
                'PageIndex':1,
                'PageSize':10
              },$scope.vm.SearchZSTJLog.Search),
              sysVersionModel = new sysModel();
              if (params.type == '') {
                params.type = -1;
              }
             util.ajaxZSTJPost($http,url,params,function(result) {
                  if (result) {
                    $scope.vm.SearchZSTJLog.List = sysVersionModel.convertZSTJLogList(result.LogList);
                    $scope.SearchZSTJLogPaginationConf.totalItems = result.TotalCount;
                    if (result.TotalCount == 0) {
                        $scope.vm.SearchZSTJLog.pageModel.currentPage = 0;
                    }
                  }else {
                    util.showFade(result.Message);
                  }
             },function(error){
                util.showFade(error);
             });
          },
          OnSearchZSTJLogClick:function() {
            var ag = $scope.vm.SearchZSTJLog.Search;
            $scope.vm.SearchZSTJLog.pageModel.currentPage = 1;
            ag.PageIndex = $scope.vm.SearchZSTJLog.pageModel.currentPage;
            ag.PageSize = $scope.vm.SearchZSTJLog.pageModel.itemsPerPage;
            if (ag.Page == 0) {
              ag.Page = 1;
            }
            if ($('#ZSTJLogStartTime').val()) {
              ag.StartTime = $('#ZSTJLogStartTime').val()+' '+'00:00:00';
            }
            if ($('#ZSTJLogEndTime').val()) {
              ag.EndTime = $('#ZSTJLogEndTime').val()+' '+'23:59:59';
            }
            var url = BaseUrl.ZSTJLogList,
               params = $scope.vm.SearchZSTJLog.Search;
               sysVersionModel = new sysModel();
            util.ajaxZSTJPost($http,url,params,function(result){
              if (result) {
                  $scope.vm.SearchZSTJLog.List = sysVersionModel.convertZSTJLogList(result.LogList);
                  $scope.SearchZSTJLogPaginationConf.totalItems = result.TotalCount;
                  if (result.TotalCount == 0) {
                    $scope.vm.SearchZSTJLog.pageModel.currentPage = 0;
                  }
              }else{
                 util.showFade(result.Message);
              }
            },function(error){
              util.showFade(error);
            });
          },
          Init:function(){
            var startDateTextBox = $('#ZSTJLogStartTime');
            var endDateTextBox = $('#ZSTJLogEndTime');
            $.timepicker.dateRange(
              startDateTextBox,
              endDateTextBox,
              {
                  changeMonth:true,
                  buttonImageOnly:true,
                  dateFormat:'yy-mm-dd',
                  monthNamesShort:["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                  dayNamesMin: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
                  minInterval: (1000 * 60 * 60 * 24 * 0) // 0 days
              }
            );
            $scope.vm.SearchZSTJLog.OnLoad();
          },
          pageModel:{
            currentPage:1,
            itemsPerPage:10,
            pagesLength:9,
            perPageOptions:[10,20,30,40,50,200],
            rememberPerPage:'perPageItemsEight',
            onChange:function() {
              if ($scope.vm.SearchZSTJLog.pageModel.currentPage != 0) {
                $scope.vm.SearchZSTJLog.OnSearch();
              }
            }
          }
        },
        SearchWeChatLog: {
          List:[],
          WeChatLogLogIsSuccessCategory:[
            {text:'全部',value:null},
            {text:'成功',value:true },
            {text:'失败',value:false},
          ],
          WeChatLogTypeCategory:[
            {text:'ZSTJ',value:1},
          ],
          SearchParam:{
            'Type':1,
            'Url':'',
            'StartTime':null,
            'EndTime':null,
            'IsSuccess':null,
            'PageIndex':1,
            'PageSize':10
          },
          OnLoad:function() {
            var params = angular.extend({
                  'Type':1,
                  'Url':'',
                  'StartTime':null,
                  'EndTime':null,
                  'IsSuccess':null,
                  'PageIndex':1,
                  'PageSize':10
                },$scope.vm.SearchWeChatLog.SearchParam);
            var sysVersionModel = new sysModel();
            util.ajaxZSTJPost($http,BaseUrl.WeChatLog,params,function(result){
                if (result) {
                  $scope.vm.SearchWeChatLog.List = sysVersionModel.convertWeChatLogList(result.LogList);
                  $scope.SearchWeChatLogPaginationConf = $scope.vm.SearchWeChatLog.pageModel;
                  $scope.SearchWeChatLogPaginationConf.totalItems = result.TotalCount;
                }else {
                  util.showFade(result.Message);
                }
            },function(error){
                  util.showFade(error);
            });
          },
          OnSearch:function() {
            var ag = $scope.vm.SearchWeChatLog.SearchParam;
            ag.PageIndex = $scope.vm.SearchWeChatLog.pageModel.currentPage;
            ag.PageSize = $scope.vm.SearchWeChatLog.pageModel.itemsPerPage;
            if (ag.PageIndex == 0) {
              ag.PageIndex = 1;
            }
            if ($('#WeChatLogStartTime').val()) {
              ag.StartTime = $('#WeChatLogStartTime').val() + '' + '00:00:00';
            }
            if ($('#WeChatLogEndTime').val()) {
              ag.EndTime = $('#WeChatLogEndTime').val() + '' + '23:59:59';
            }
            var params = angular.extend({
                  'Type':1,
                  'Url':'',
                  'StartTime':null,
                  'EndTime':null,
                  'IsSuccess':null,
                  'PageNumber':1,
                  'PageSize':10
                },$scope.vm.SearchWeChatLog.SearchParam);
            var sysVersionModel = new sysModel();
            util.ajaxZSTJPost($http,BaseUrl.WeChatLog,params,function(result) {
                  if (result) {
                    $scope.vm.SearchWeChatLog.List = sysVersionModel.convertWeChatLogList(result.LogList);
                    $scope.SearchWeChatLogPaginationConf.totalItems = result.TotalCount;
                    if (result.TotalCount == 0) {
                        $scope.vm.SearchWeChatLog.pageModel.currentPage = 0;
                    }
                  }else {
                    util.showFade(result.Message);
                  }
             },function(error){
                util.showFade(error);
             });
          },
          OnSearchWeChatLogClick:function() {
            var ag = $scope.vm.SearchWeChatLog.SearchParam;
            $scope.vm.SearchWeChatLog.pageModel.currentPage = 1;
            ag.PageIndex = $scope.vm.SearchWeChatLog.pageModel.currentPage;
            ag.PageSize = $scope.vm.SearchWeChatLog.pageModel.itemsPerPage;
            if ($('#WeChatLogStartTime').val()) {
              ag.StartTime = $('#WeChatLogStartTime').val()+''+'00:00:00';
            }
            if ($('#WeChatLogEndTime').val()) {
              ag.EndTime = $('#WeChatLogEndTime').val() + ''+ '23:59:59';
            }
            var params = $scope.vm.SearchWeChatLog.SearchParam;
            var sysVersionModel = new sysModel();
            util.ajaxZSTJPost($http,BaseUrl.WeChatLog,params,function(result) {
                  if (result) {
                    $scope.vm.SearchWeChatLog.List = sysVersionModel.convertWeChatLogList(result.LogList);
                    $scope.SearchWeChatLogPaginationConf.totalItems = result.TotalCount;
                    if (result.TotalCount == 0) {
                        $scope.vm.SearchWeChatLog.pageModel.currentPage = 0;
                    }
                  }else {
                    util.showFade(result.Message);
                  }
             },function(error){
                util.showFade(error);
             });
          },
          Init:function (){
            var startDateTextBox = $('#WeChatLogStartTime'),
                endDateTextBox = $('#WeChatLogEndTime');
            $.timepicker.dateRange(
              startDateTextBox,
              endDateTextBox,
              {
                  changeMonth:true,
                  buttonImageOnly:true,
                  dateFormat:'yy-mm-dd',
                  monthNamesShort:["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                  dayNamesMin: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
                  minInterval: (1000 * 60 * 60 * 24 * 0) // 0 days
              }
            );
            $scope.vm.SearchWeChatLog.OnLoad();
          },
          pageModel:{
            currentPage:1,
            itemsPerPage:10,
            pagesLength:9,
            perPageOptions:[10,20,30,40,50,200],
            rememberPerPage:'perPageItemsNine',
            onChange:function() {
              if ($scope.vm.SearchWeChatLog.pageModel.currentPage != 0) {
                $scope.vm.SearchWeChatLog.OnSearch();
              }
            }
          }
        },
        Init: function(){
          var vm = $scope.vm;

          vm.Common.Init();
          vm.SyncNews.Init();
        }
      }).Init();

  }]);
  return app;
});
