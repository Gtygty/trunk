/* eslint-disable no-undef */
define(['indexApp', 
  'common/util', 
  'model/mall/zstjGoodsModel', 
  'model/mall/goodsAddItemModel', 'service/baseService', 'Extend'], function (app, util, DataModel,addItemModel) {

  app.factory('zstjGoodsService', ['ajaxService', function(ajax){
    var URL = {
        /* 商城商品 */
        Goods: {
          // 添加或修改商品大类 (2.4.0)
          Type: 'BMSGoods/AddOrModifyGoodsType',
          // 添加或修改一条体检套餐类型商品 (2.4.0)
          AddOrModify: 'BMSGoods/AddOrModifyHealthCheckGoods',
          // 获取商品列表 (2.4.0)
          List: 'BMSGoods/GoodsList',
          // 获取体检套餐类型商品详情 (2.4.0)
          Detail: 'BMSGoods/GoodsDetail',
          // 批量修改商品状态 (2.4.0)
          State:'BMSGoods/SetGoodsState',
          // 所属服务商-下拉列表
          GoodsServiceDDL: 'BMSSupplier/AllSuppliers',
          // 商品标签-下拉列表
          GoodsTagDDL: 'BMSSupplier/SupplierTags',
          // 支持的体检机构类型服务商-下拉列表
          // GoodsAcceptServiceDDL: '',
          // 商品分类-下拉列表
          GoodsTypeDDL: 'BMSGoods/GoodsTypeDetail',
          //商品指标库
          GetGroupCheckIndex: 'BMSCheckIndex/GetGroupCheckIndex',
          //商品加项
          GetGoodsIncrease: 'BMSGoods/SearchIncreaseGoodsByPage'
        }
    },
    Valid = {
      AddOrMod: function(param){
        // if(!param.ListIconUrl){
        //   util.showFade('必须包含一张缩略图!');
        //   return false;
        // }
        if(!param.BannerUrls.length){
          util.showFade('必须包含一张详细图!');
          return false;
        }
        if(param.SupplierCode == -1){
          util.showFade('请选择所属服务商!');
          return false;
        }
        if(!param.Name || param.Name.length < 2){
          util.showFade('商品名称不能小于两个字符!');
          return false;
        }
        if(param.Name.length > 30){
          util.showFade('商品名称最多只能录入30个字符!');
          return false;
        }
        if(param.Type == -1){
          util.showFade('请选择商品分类!');
          return false;
        }
        if(param.Tags.length == 0){
          util.showFade('请添加商品标签!');
          return false;
        }
        if(param.Tags.length > 3){
          util.showFade('最多只能添加三个商品标签!');
          return false;
        }
        if(!/^\d+(\.\d{1,2})?$/.test(param.OriginPrice)){
          util.showFade('市场价必须为数字或者1~2位小数!');
          return false;
        }
        //TODO
        if(parseFloat(param.OriginPrice) <= 0 || parseFloat(param.OriginPrice) > 999999999){
          util.showFade('市场价已超出指定范围（1~999999999）!');
          return false;
        }
        if(!/^\d+(\.\d{1,2})?$/.test(param.SalePrice)){
          util.showFade('特惠价必须为数字或者1~2位小数!');
          return false;
        }
        //TODO
        if(parseFloat(param.SalePrice) <= 0 || parseFloat(param.SalePrice) > 999999999){
          util.showFade('特惠价已超出指定范围（1~999999999）!');
          return false;
        }
        if(!/^\d+(\.\d{1,2})?$/.test(param.CostPrice)){
          util.showFade('进价必须为数字或者1~2位小数!');
          return false;
        }
        //TODO
        if(parseFloat(param.CostPrice) <= 0 || parseFloat(param.CostPrice) > 999999999){
          util.showFade('进价已超出指定范围（1~999999999）!');
          return false;
        }
        if(!param.BriefDescription || param.BriefDescription.length < 1){
          util.showFade('简要描述不能小于一个字符!');
          return false;
        }
        if(param.BriefDescription.length > 30){
          util.showFade('简要描述最多只能录入30个字符!');
          return false;
        }
        // if(!isNaN(param.OrderIndex)){
        //   util.showFade('权重必须为数字!');
        //   return false;
        // }
        if(isNaN(parseInt(param.OrderIndex))){
          util.showFade('权重必须为数字!');
          return false;
        }
        //7/25 修复无法添加或编辑进价超过10000的商品BUG
        if(parseInt(param.OrderIndex) <= 0 || parseInt(param.OrderIndex) > 10000){
        // if(parseFloat(param.CostPrice) <= 0 || parseFloat(param.CostPrice) > 10000){
          util.showFade('权重已超出指定范围（1~10000!');
          return false;
        }
        if (param.CrowdTypes == null || param.CrowdTypes.length <= 0 ){
            util.showFade('必须指定套餐的适用人群！');
          return false;
        }
        if ( !(param.DetailDescription.replace("<p><br></p>","") || param.CheckIndexDescription) ){
            util.showFade('必须填写商品详情！');
          return false;
        }

        return true;
      }
    },
    ViewModel = {
      Entity: function(){
        return {
          Id: '',
          Type: -1,                     // 二级分类
          ThirdpartGoodsId : '',      //第三方机构商品ID
          // SupplierCode: -1,          // 供应商id
          SupplierCode: -1,            // 供应商id
          // SupportIds: [],            // 支持的供货商id string
          Name: '',                    // 商品主题
          // AppshowName :'',
          SalePrice: 0.0,              // 售卖价格
          CostPrice: 0.0,              // 成本价
          OriginPrice: 0.0,            // 市场价格
          BriefDescription: '',       // 简要描述
          DetailDescription: '',      // html详情
          CheckIndexDescription: '',//商品指标html详情
          CheckIndexList: [],        //商品指标列表
          IncreaseGoods: [],          //商品加项列表
          Tags: [],                     // 商品标签 string
          // ListIconUrl: '',             // 列表上图片地址
          BannerUrls: [],              // 详情的轮播图
          OrderIndex: 1,               // 排序序号(权重)
          CrowdTypes: [],              // 体检套餐商品信息(类型)
          RootType: -1,               // -1: 所有 0:体检套餐 1:实体 2:服务 3:加项 4:团检套餐

          Tag: {
            grossMargin: 0.0,
            goodsState: -1,            // 0:下架 1:上架 2: 删除
            selectedService: -1,
            selectedType: -1,
            selectedTag: -1,
            crowdTypeDDL: [
              { text: '男性', value: 0, checked: false },
              { text: '已婚女性', value: 1, checked: false },
              // { text: '未婚女性', value: 3, checked: false }
              { text: '未婚女性', value: 2, checked: false }
            ]
          }
        };
      },
      SetEntity: function(item){
        var CrowdType = [];
        for(var i=0; i< item.Tag.crowdTypeDDL.length; i++){
          var currentItem = item.Tag.crowdTypeDDL[i];
          if(currentItem.checked){
            CrowdType.push(currentItem.value);
          }
        }
        var increaseArr = [];
        for (var i = 0; i < item.IncreaseGoods.length; i++) {
          increaseArr.push(item.IncreaseGoods[i].Id);
        }
        return {
          Id: item.Id,
          Type: item.Tag.selectedType,                // 二级分类
          ThirdpartGoodsId : item.ThirdpartGoodsId,
          SupplierCode: item.Tag.selectedService,       // 供应商id
          // SupportIds: [],                             // 支持的供货商id string
          Name: item.Name,                            // 商品主题
          GoodsType: item.RootType,               // -1: 所有 0:体检套餐 1:实体 2:服务 3:加项 4:团检套餐
          // AppshowName :item.AppshowName,
          SalePrice: item.SalePrice,                  // 售卖价格
          CostPrice: item.CostPrice,                  // 成本价
          OriginPrice: item.OriginPrice,              // 市场价格
          BriefDescription: item.BriefDescription,    // 简要描述
          DetailDescription: item.DetailDescription,  // html详情
          CheckIndexDescription: item.CheckIndexDescription,//商品指标html详情
          CheckIndexList: item.CheckIndexList,        //商品指标列表
          IncreaseGoods: increaseArr,          //加项
          Tags: item.Tags,                            // 商品标签 string
          BannerUrls: item.BannerUrls,   // 详情的轮播图
          // ListIconUrl: item.BannerUrls.length ? item.BannerUrls[0] : '',        // 列表上图片地址
          // BannerUrls: item.BannerUrls.length ? item.BannerUrls.slice(1) : [],   // 详情的轮播图
          OrderIndex: item.OrderIndex,                // 排序序号(权重)
          CrowdTypes: CrowdType
        };
      },
      SearchEntity: function(){
        return {
          PageNum: 1,
          Count: null,
          GoodsType: -1,        // -1: 所有 0:体检套餐 1:实体 2:服务 3:加项 4:团检套餐
          Type: '',
          ProviderId: '',
          SupportId: '',
          Name: '',
          MinSalePrice: '',
          MaxSalePrice: '',
          GoodsState: -1,       // 0:下架 1:上架 2: 删除
          Id: ''
        };
      },
      SetSearchEntity: function(item){
        return {
          PageNum: 1,
          Count: null,  
          GoodsType: item.GoodsType,                      // 0:体检套餐 1:实体 2:服务
          Type: item.Type == -1 ? '' : item.Type,
          ProviderId: item.ProviderId == -1 ? '' : item.ProviderId,
          SupportId: '',
          Name: item.Name,
          MinSalePrice: item.MinSalePrice,
          MaxSalePrice: item.MaxSalePrice,
          GoodsState: item.GoodsState,        // 0:下架 1:上架 2: 删除
          Id: item.Id
        };
      },
      ConvertEntityToVM: function(item){
        var result = {
          Id: item.Id,
          Type: item.CommonInfo.Type,               // 二级分类
          ThirdpartGoodsId :item.CommonInfo.ThirdpartGoodsId,//第三方机构ID
          SupplierCode: item.CommonInfo.SupplierCode,         // 供应商id
          // SupportIds: [],         // 支持的供货商id string
          Name: item.CommonInfo.Name,               // 商品主题
          // AppshowName: item.CommonInfo.AppshowName,
          SalePrice: item.CommonInfo.SalePrice,         // 售卖价格
          CostPrice: item.CommonInfo.CostPrice,         // 成本价
          OriginPrice: item.CommonInfo.OriginPrice,       // 市场价格
          BriefDescription: item.CommonInfo.BriefDescription,   // 简要描述
          DetailDescription: item.CommonInfo.DetailDescription,//商品指标html详情
          CheckIndexDescription: item.Other.CheckIndexDescription,//商品指标html详情
          CheckIndexList: item.Other.CheckIndexList || [],        //商品指标列表
          Tags: item.CommonInfo.Tags,               // 商品标签 string
          // ListIconUrl: item.CommonInfo.ListIconUrl,        // 列表上图片地址
          BannerUrls: item.CommonInfo.BannerUrls || [],         // 详情的轮播图
          OrderIndex: item.CommonInfo.OrderIndex,          // 排序序号(权重)
          CrowdTypes: item.CrowdTypes,          // 体检套餐商品信息(类型)
          RootType: item.RootType,

          Tag: {
            grossMargin: item.CommonInfo.GrossMargin,
            goodsState: item.CommonInfo.State,       // 0:下架 1:上架 2: 删除
            selectedService: item.CommonInfo.SupplierCode,
            selectedType: item.CommonInfo.Type,
            selectedTag: -1,
            crowdTypeDDL: [
              { text: '男性', value: 0, checked: false },
              { text: '已婚女性', value: 1, checked: false },
              { text: '未婚女性', value: 2, checked: false }
            ]
          }
        };
        // if(item.CommonInfo.ListIconUrl){
        //   result.BannerUrls.unshift(item.CommonInfo.ListIconUrl);
        // }
        if(result.CrowdTypes.length){
          for(var i=0; i< result.CrowdTypes.length; i++){
            for(var j=0; j< result.Tag.crowdTypeDDL.length; j++){
              if(result.CrowdTypes[i] == result.Tag.crowdTypeDDL[j].value){
                result.Tag.crowdTypeDDL[j].checked = true;
              }
            }
          }
        }
        return result;
      },
      Goods: {
          ServiceDDL: function(options){
            var url = URL.Goods.GoodsServiceDDL,
                param = { SupplierType: -1 }, // -1: 全部
                callback = options.callback,
                dataModel = new DataModel();
              ajax.PostMall(url, param, function(data){
                  if(data)
                  {
                    var result = dataModel.convertServiceDDL(data);
                    callback && callback(result);
                  }
                  else
                    util.showFade('获取下拉列表失败!');
              });
          },
          TypeAndTagDDL: function(options){
            var url = URL.Goods.GoodsTypeDDL,
                param = {
                  RootType: 0
                },
                callback = options.callback,
                dataModel = new DataModel();
              ajax.PostMall(url, param, function(data){
                  if(data)
                  {
                    var result = dataModel.convertTypeAndTagDDL(data);
                    callback && callback(result);
                  }
                  else
                    util.showFade('获取商品分类失败!');
              });
          },
          //加项
          GetGoodsIncreaseList: function (option) {
            var url = URL.Goods.GetGoodsIncrease,
                callback = option.callback,
                selectedIncreaseItem = option.selectIncreaseItem,
                params = {
                  PageCount: 9999,
                  PageIndex: 1,
                  SupplierCode: option.deptCode
                };
            ajax.PostMall(url, params, function (result) {
              if (result.GoodsList) {
                var arr = [],
                    increaseList = [];
                for (var i = 0; i < result.GoodsList.length; i++) {
                  arr.push(addItemModel.ConvertIncreaseList(result.GoodsList[i]));
                }
                for (var i = 0; i < arr.length; i++) {
                  var item = {label: arr[i].Name, title: arr[i].Name, value: arr[i].Id, selected: false};
                  for (var j = 0; j < selectedIncreaseItem.length; j++) {
                    if (selectedIncreaseItem[j] == item.value) {
                      item.selected = true;
                      break;
                    }
                  }
                  increaseList.push(item);
                }
                callback && callback(increaseList,arr);
              }
            }, function (err) {
              console.log(err);
            })
          },
          //获取商品详情标签
          EventGroupQuotaList: function (options) {
            var url = URL.Goods.GetGroupCheckIndex,
                callback = options.callback,
                dataModel = new DataModel(),
                checkedList = options.checkedList;
            ajax.PostMall(url,{},function (result) {
              var data = dataModel.convertGroupQuotaList(result);
              var list = [];
              for(var i=0;i<data.length;i++) {
                var temp = {};
                temp.label = data[i].GroupName;
                temp.selected = false;
                temp.GroupName = data[i].GroupName;
                temp.children = data[i].CheckIndexList;
                for(var j=0;j<data[i].CheckIndexList.length;j++){
                    temp.children[j].label = data[i].CheckIndexList[j].Content;
                    temp.children[j].value = data[i].CheckIndexList[j].Content;
                    temp.children[j].selected = false;
                    for (var x = 0; x < checkedList.length; x++) {
                      if (checkedList[x].Content == temp.children[j].value) {
                        temp.children[j].selected = true;
                      }
                    }
                }
                list.push(temp);
              }
              //data：元数据，list：构造的multiselect数据
              callback && callback(data,list);
            });
          },
          PreviewEventGroupQuotaList: function (options) {
              var list = [];
              for(var i=0;i<options.length;i++) {
                var temp = {};
                temp.label = options[i].Content;
                temp.selected = true;

                list.push(temp);
              }
              return list;
          },
          //multiSelectOnchange
          MultiSelectOnChange: function (sourceData,currentItem,option,checked) {
            //sourceData:元数据，currentItem：操作的对象，

            //选择组头和组员
            for (var x = 0; x < option.length; x++) {
              var manipulateItem;
              var manipulateOption;
              if (option.length > 1) {
                manipulateOption = option[x];
              }else {
                //等于1时也有可能是组头
                if (option[0].context == undefined) {
                  //组员没有context
                  manipulateOption = option;
                }else {
                  manipulateOption = option[0];
                }
              }
              for (var i = 0; i < sourceData.length; i++) {
                if (sourceData[i].GroupName == manipulateOption[0].parentElement.label) {
                  for (var j = 0; j < sourceData[i].CheckIndexList.length; j++) {
                    if (sourceData[i].CheckIndexList[j].Content == manipulateOption[0].label) {
                      manipulateItem = sourceData[i].CheckIndexList[j];
                    }
                  }
                }
              }
              if (checked) {
                var isExist = true;
                for (var i = 0; i < currentItem.length; i++) {
                  if (currentItem[i].Content == manipulateItem.Content) {
                    isExist = false;
                  }
                }
                if (isExist) {
                  currentItem.push(manipulateItem);
                }
              }else {
                for (var i = 0; i < currentItem.length; i++) {
                  if (currentItem[i].Id == manipulateItem.Id) {
                    currentItem.remove(currentItem[i]);
                  }
                }
              }
            }
          },
          List: function(options){
            var url = URL.Goods.List,
                param = (options.param || ViewModel.SearchEntity()),
                callback = options.callback,
                dataModel = new DataModel();
            ajax.PostMall(url, param, function(data){
                var result = dataModel.convertGoodsList(data, options.ServiceDDL, options.TypeDDL);
                callback && callback(result);
            });
          },
          AddOrEdit: function(options){
            var url = URL.Goods.AddOrModify,
                param = ViewModel.SetEntity(options.param),
                callback = options.callback;
            if (param.GoodsType == -1) {
              util.showFade('请选择套餐类型');
              return ;
            }
            if(Valid.AddOrMod(param)){
              ajax.PostMall(url, param, function(data){
                  if(data)
                    callback && callback(data);
                  else
                    util.showFade('添加失败!');
              });
            }
          },
          Search: function(options){
            var url = URL.Goods.List,
                param = (options.param ? ViewModel.SetSearchEntity(options.param):  ViewModel.SearchEntity()),
                callback = options.callback,
                dataModel = new DataModel();
            ajax.PostMall(url, param, function(data){
                var result = dataModel.convertGoodsList(data, options.ServiceDDL, options.TypeDDL);
                callback && callback(result);
            });
          },
          FirstOrDefault: function(options){
            var url = URL.Goods.Detail,
                param = { Id: options.param.Id },
                callback = options.callback,
                dataModel = new DataModel();
            ajax.PostMall(url, param, function(data){
                var result = dataModel.convertGoodsSingle(data, options.ServiceDDL, options.TypeDDL);
                callback && callback(result);
            });
          },
          UpGoods: function(options){
             var url = URL.Goods.State,
                param = {
                  GoodsIds: options.param.GoodsIds || [],
                  GoodsState: 1
                };
             ajax.PostMall(url, param, function(data){
                options.callback && options.callback(data);
             });
          },
          DownGoods: function(options){
             var url = URL.Goods.State,
                param = {
                  GoodsIds: options.param.GoodsIds || [],
                  GoodsState: 0
                };
             ajax.PostMall(url, param, function(data){
                options.callback && options.callback(data);
             });
          },
          RemoveGoods: function(options){
             var url = URL.Goods.State,
                param = {
                  GoodsIds: options.param.GoodsIds || [],
                  GoodsState: 2
                };
             ajax.PostMall(url, param, function(data){
                options.callback && options.callback(data);
             });
          }
        }
    };

    return ViewModel;

  }]);

  return app;
});
