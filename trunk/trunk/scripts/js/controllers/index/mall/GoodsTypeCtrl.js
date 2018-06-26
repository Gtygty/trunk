/**
 * Created by hzguest3 on 2017/6/22.
 */
define(['indexApp', 'common/util', 'common/const', 'model/mall/goodsTypeModel', 'service/baseService'],
  function (App, Util, Const, Model, BaseService) {
    App.controller('goodsTypeCtrl', function ($scope, $http, signValid, ajaxService) {

      var BaseUrl = {
        AddOrModifyType: "BMSGoods/AddOrModifyGoodsType",
        GoodsTypeDetail: "BMSGoods/GoodsTypeDetail"
      };

      ($scope.vm = {
        GoodsTypeCollection: {

          data:{
            CurrentType:0,
            CurrentGoodsType:{},
            AddGoodsTypeName:"",
            AddTagName:"",
            RemoveTagItem:{},
            SubmitGoodsType:{}
          },

          ResetParams:function(){
            _GoodsTypeCollection.data.CurrentGoodsType = {
              "Type":_GoodsTypeCollection.data.CurrentType,
              "SubType":[],
              "GoodsTags":[],
              "MEDesc":"",
              "CommonDesc":""
            }
          },

          AddOrModifyGoodsType:function(){
            var url = BaseUrl.AddOrModifyType;
            param = _GoodsTypeCollection.data.SubmitGoodsType;
            // ajaxService.PostMall(url, param, function(result){
            //   if (result != null){
            //     _GoodsTypeCollection.data.CurrentGoodsType = Model.ConvertPayBackModel(result);
            //   }
            //   angular.copy(_GoodsTypeCollection.data.CurrentGoodsType, _GoodsTypeCollection.data.SubmitGoodsType);
            // })

            Util.showAjaxLoading();
            Util.ajaxMALLPost($http,url,param, function(result){
              if (result.Code == 1 && result.Data != null){
                 _GoodsTypeCollection.data.CurrentGoodsType = Model.ConvertPayBackModel(result.Data);
               }else {
                Util.showFade(result.Message);
               }
              angular.copy(_GoodsTypeCollection.data.CurrentGoodsType, _GoodsTypeCollection.data.SubmitGoodsType);
              Util.hideAjaxLoading();
            },function(err){
              console.log(err);
              Util.hideAjaxLoading();
            })
          },

          GetGoodsTypeDetil:function(rootType){
            _GoodsTypeCollection.data.CurrentType = rootType;
            var url = BaseUrl.GoodsTypeDetail;
            param = {
              "RootType": _GoodsTypeCollection.data.CurrentType
            }
            ajaxService.PostMall(url, param, function(result){
              if (result != null){
                _GoodsTypeCollection.data.CurrentGoodsType = Model.ConvertPayBackModel(result);
              }else {
                _GoodsTypeCollection.ResetParams();
              }
              angular.copy(_GoodsTypeCollection.data.CurrentGoodsType, _GoodsTypeCollection.data.SubmitGoodsType);
            })
          },

          SubTypeSort:function(oldIndex, newIndex){
            _GoodsTypeCollection.data.SubmitGoodsType.SubType[oldIndex] =
              _GoodsTypeCollection.data.SubmitGoodsType.SubType.splice(newIndex, 1, _GoodsTypeCollection.data.SubmitGoodsType.SubType[oldIndex])[0];
            _GoodsTypeCollection.AddOrModifyGoodsType();
          },

          SubTypeAdd:function(){
            if (_GoodsTypeCollection.data.AddGoodsTypeName.length < 1 ||
                _GoodsTypeCollection.data.AddGoodsTypeName.length > 8 ){
              Util.showFade("二级分类名长度需为1-8字！");
              return;
            }
            var vaild = true;
            _GoodsTypeCollection.data.SubmitGoodsType.SubType.forEach(function(item, index, array){
              if (item.SubTypeName == _GoodsTypeCollection.data.AddGoodsTypeName)
                vaild = false;
            });
            if (!vaild){
              Util.showFade("二级分类名已存在！");
              return;
            }
            _GoodsTypeCollection.data.SubmitGoodsType.SubType.unshift({
              "Id":null,
              "SubTypeName":_GoodsTypeCollection.data.AddGoodsTypeName
            });
            _GoodsTypeCollection.data.AddGoodsTypeName = "";
            _GoodsTypeCollection.AddOrModifyGoodsType();
          },

          SubTypeRemove:function(index){
            _GoodsTypeCollection.data.SubmitGoodsType.SubType.splice(index,1);
            _GoodsTypeCollection.AddOrModifyGoodsType();
          },

          TagsAdd:function(){
            if (_GoodsTypeCollection.data.AddTagName.length < 1 ||
              _GoodsTypeCollection.data.AddTagName.length > 8 ){
              Util.showFade("二级分类名长度需为1-8字！");
              return;
            }
            var vaild = true;
            _GoodsTypeCollection.data.SubmitGoodsType.GoodsTags.forEach(function(item, index, array){
              if (item == _GoodsTypeCollection.data.AddTagName)
                vaild = false;
            });
            if (!vaild){
              Util.showFade("标签名已存在！");
              return;
            }
            _GoodsTypeCollection.data.SubmitGoodsType.GoodsTags.unshift(_GoodsTypeCollection.data.AddTagName);
            _GoodsTypeCollection.data.AddTagName = "";
            _GoodsTypeCollection.AddOrModifyGoodsType();
          },

          TagsRemove:function(){
            _GoodsTypeCollection.data.SubmitGoodsType.GoodsTags.remove(_GoodsTypeCollection.data.RemoveTagItem);
            _GoodsTypeCollection.AddOrModifyGoodsType();
          },

          Init: function () {
            _GoodsTypeCollection.GetGoodsTypeDetil();
          }
        },

        Init: function () {
          //缓存登录验证
          signValid.ValidAccess("#/mallPayback");
          //侧边栏样式
          $(".navli:eq(5)").addClass("active").siblings().removeClass("active");
          $('body').css('overflow', 'auto');
          _GoodsTypeCollection = $scope.vm.GoodsTypeCollection;
          _GoodsTypeCollection.Init();

        }
      }).Init();

    })
  })
