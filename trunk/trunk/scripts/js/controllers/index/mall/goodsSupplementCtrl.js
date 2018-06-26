/* eslint-disable no-undef */
define(['indexApp'
    , 'common/util'
    , 'common/const'
    , 'model/mall/GoodsSupplementModel'
    , 'service/baseService'
    , 'service/mall/goodsSupplementService']
  , function (app, util, Const, vModel) {
    app.controller('goodsSupplementCtrl', ['$scope'
      , '$http'
      , 'signValid'
      , 'goodsSupplementService'
      , function ($scope, $http, signValid, goodsSupplementService) {

        ($scope.vm = {
          Common: {
            InitConfig: function () {
              signValid.ValidAccess('#/mallGoodsSupplement');                                    // 缓存登录验证
              $(".navli:eq(5)").addClass("active").siblings().removeClass("active");
              $('body').css('overflow', 'auto');
            },
            Init: function () {
              var self = $scope.vm.Common;

              self.InitConfig();
            }
          },
          GoodsType: {
            Current: {
              'GoodType': '',
              'SubType': '',
              'GoodsTags': '',
              'MEDesc': '',
              'CommonDesc': ''
            },
            Search: {
              'RootType': 0
            },
            CurrentData: {
              'GoodType': '',
              'SubType': [],
              'GoodsTags': [],
              'MEDesc': '',
              'CommonDesc': ''
            },
            tempData: {
              'GoodType': '',
              'SubType': [],
              'GoodsTags': [],
              'MEDesc': '',
              'CommonDesc': ''
            },
            OnGetTagList: function (state) {
              $scope.vm.GoodsType.Search.RootType = state;
              $scope.vm.GoodsType.Current.GoodType = state;
              goodsSupplementService.GoodsType.List({
                params: {'RootType': state},
                callback: function (result) {
                  if (result) {
                    $scope.vm.GoodsType.CurrentData = result;
                    $scope.vm.GoodsType.Current.MEDesc = result.MEDesc;
                    $scope.vm.GoodsType.Current.CommonDesc = result.CommonDesc;
                    $scope.vm.GoodsType.tempData = result;//临时存放对象信息 ???
                  } else {
                    $scope.vm.GoodsType.CurrentData = {
                      'GoodType': '',
                      'SubType': [],
                      'GoodsTags': [],
                      'MEDesc': '',
                      'CommonDesc': ''
                    }
                    $scope.vm.GoodsType.tempData = {
                      'GoodType': '',
                      'SubType': [],
                      'GoodsTags': [],
                      'MEDesc': '',
                      'CommonDesc': ''
                    }
                  }
                  $scope.vm.GoodsType.tempData.GoodType = state;
                }
              });
            },
            OnAddGoodsTag: function () {//添加二级标签名
              var subTypeName = $scope.vm.GoodsType.Current.SubType;
              goodsSupplementService.GoodsType.Add({
                params: {
                  'subTypeName': subTypeName,
                  'tempData': $scope.vm.GoodsType.tempData
                },
                callback: function (result) {
                  $scope.vm.GoodsType.Current = {
                    'GoodType': '',
                    'SubType': [],
                    'GoodsTags': [],
                    'MEDesc': '',
                    'CommonDesc': ''
                  }
                  $scope.vm.GoodsType.OnGetTagList($scope.vm.GoodsType.Search.RootType);
                }
              });
            },
            OnMove: function (oldIndex, newIndex) {//数据移动
              $scope.vm.GoodsType.tempData.SubType[oldIndex] = $scope.vm.GoodsType.tempData.SubType.splice(newIndex, 1, $scope.vm.GoodsType.tempData.SubType[oldIndex])[0];
              var onLoadData = function (callback) {
                goodsSupplementService.GoodsType.Add({
                  params: {
                    'subTypeName': null,
                    'tempData': $scope.vm.GoodsType.tempData
                  },
                  callback: function (result) {
                    $scope.vm.GoodsType.Current = {
                      'GoodType': '',
                      'SubType': [],
                      'GoodsTags': [],
                      'MEDesc': '',
                      'CommonDesc': ''
                    }
                    $scope.vm.GoodsType.OnGetTagList($scope.vm.GoodsType.Search.RootType);
                  }
                })
              };
            },
            OnReMove: function (index) {//删除数据
              var url = "BMSGoods/AddOrModifyGoodsType";
              var dataModel = new vModel();
              var tempDataCopy = angular.copy($scope.vm.GoodsType.tempData);
              tempDataCopy.SubType.splice(index,1);
              var paramData = dataModel.conventDataToParam({subTypeName: '', tempData: tempDataCopy});
              util.showAjaxLoading();
              util.ajaxMALLPost($http, url, paramData, function (result) {
                if (result.Code == 1 && result.Data != null && result.Data.AppointmentList != null) {
                  $scope.vm.GoodsType.OnGetTagList($scope.vm.GoodsType.Search.RootType);
                } else {
                  util.showFade(result.Message);
                }
                util.hideAjaxLoading();
              }, function (err) {
                util.hideAjaxLoading();
                console.log(err);
              })
            },
            // OnReMove: function(item){//删除数据
            //     var url = "BMSGoods/AddOrModifyGoodsType";
            //     var dataModel = new vModel();
            //     var subTypeList = angular.copy($scope.vm.GoodsType.tempData.SubType);
            //     subTypeList.remove(item);
            //     // $scope.vm.GoodsType.tempData.SubType = dataModel.OnMove(3,item,$scope.vm.GoodsType.tempData.SubType);
            //     util.showAjaxLoading();
            //     var paramData = dataModel.conventDataToParam({subTypeName:'',tempData:$scope.vm.GoodsType.tempData});
            //     util.ajaxMALLPost($http, url, paramData, function(result){
            //       if (result.Code == 1 && result.Data != null && result.Data.AppointmentList != null){
            //           $scope.vm.GoodsType.Current = {'GoodType':'','SubType':[],'GoodsTags':[],'MEDesc':'','CommonDesc':''}
            //           $scope.vm.GoodsType.OnGetTagList($scope.vm.GoodsType.Search.RootType);
            //       }else{
            //           $scope.vm.GoodsType.OnGetTagList($scope.vm.GoodsType.Search.RootType);
            //           util.showFade(result.Message);
            //       }
            //       util.hideAjaxLoading();
            //     }, function(err){
            //       util.hideAjaxLoading();
            //       util.showFade(err);
            //     })
            // },
            // OnAddTag: function(){
            //     var name = $scope.vm.GoodsType.Current.GoodsTags;
            //     goodsSupplementService.GoodsType.AddTag({
            //       params:{
            //         'name':name,
            //         'tempData':$scope.vm.GoodsType.tempData
            //       },
            //       callback: function(result){
            //           $scope.vm.GoodsType.Current = {'GoodType':'','SubType':[],'GoodsTags':[],'MEDesc':'','CommonDesc':''}
            //           $scope.vm.GoodsType.OnGetTagList($scope.vm.GoodsType.Search.RootType);
            //       }
            //     });
            // },
            OnRemoveTag: function (item) {
              var dataModel = new vModel();
              $scope.vm.GoodsType.tempData.GoodsTags = dataModel.OnRemoveTag(item, $scope.vm.GoodsType.tempData.GoodsTags);
              goodsSupplementService.GoodsType.Add({
                params: {
                  'subTypeName': null,
                  'tempData': $scope.vm.GoodsType.tempData
                },
                callback: function (result) {
                  $scope.vm.GoodsType.Current = {
                    'GoodType': '',
                    'SubType': [],
                    'GoodsTags': [],
                    'MEDesc': '',
                    'CommonDesc': ''
                  }
                  $scope.vm.GoodsType.OnGetTagList($scope.vm.GoodsType.Search.RootType);
                }
              });
            },
            OnSave: function () {
              $scope.vm.GoodsType.tempData.MEDesc = $scope.vm.GoodsType.Current.MEDesc;
              $scope.vm.GoodsType.tempData.CommonDesc = $scope.vm.GoodsType.Current.CommonDesc;
              goodsSupplementService.GoodsType.Add({
                params: {
                  'subTypeName': null,
                  'tempData': $scope.vm.GoodsType.tempData
                },
                callback: function (result) {
                  $scope.vm.GoodsType.OnGetTagList($scope.vm.GoodsType.Search.RootType);
                  util.showFade('保存成功！')
                }
              });
            },
            Init: function () {
              $scope.vm.GoodsType.OnGetTagList(0);
            }
          },
          Init: function () {
            var comon = $scope.vm.Common,
              goods = $scope.vm.GoodsType;
            comon.Init();
            goods.Init();
          }
        }).Init();
      }]);
    return app;
  });
