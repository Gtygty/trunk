define(['indexApp',
'model/mall/goodsAddItemModel',
'common/util',
'service/baseService'],function(app,vModel,util){
app.controller('goodsAddItemCtrl',function($scope, $http ,ajaxService){
    
    var _goodsAddItem;
    
    //分页参数
    $scope.pageConfig =  {
        totalItems: 0,
        currentPage: 1,    //当前所在的页
        itemsPerPage: 10,  //每页展示的数据条数
        pagesLength: 9,   //分页条目的长度（如果设置建议设置为奇数）
        perPageOptions: [10, 30, 50, 100, 200, 500],    //可选择显示条数的数组
        rememberPerPage: 'goodsAddItemPerPage',  //使用LocalStorage记住所选择的条目数的名称
        onChange: function () {
            if ($scope.pageConfig.currentPage != 0 ) {
                $scope.vm.goodsAddItem.OnSearch();
            }
        }
    }

    //项目请求地址
    var BaseUrl = {
        //获取服务商列表
        GetAllSupplier:"BMSSupplier/AllSuppliers",
        //获取体检加项列表
        GetAddItemList:"BMSGoods/SearchIncreaseGoodsByPage",
        //添加
        OnAdd: 'BMSGoods/AddIncreaseGoods',
        //编辑
        OnModify: 'BMSGoods/ModifyIncreaseGoods',
        //删除
        OnDelete : 'BMSGoods/RemoveIncreaseGoods'
    };
    
    ($scope.vm={
        goodsAddItem:{
            
            data:{
                SupplierSelectList:[],//服务商列表
                ServiceDDL:[],//原始数据服务商列表
                Search:{//搜索参数值
                    "PageCount": 10,
                    "PageIndex": 1,
                    "SupplierCode": "",//选中的服务商
                    "Name": ""
                },
                AddItemList:[],//体检加项列表
                supplierObjects:{},//服务商列表字典
                goodsList:[],//商品列表
                params:{//添加或者修改参数值
                    "Id": undefined,
                    "SupplierCode": "",
                    "Name": "",
                    "SalePrice": 0,
                    "Description": "",
                    "OriginPrice": 0,
                    "OrderIndex": 0,
                    "CrowdTypes": [],
                    "ThirdDepartGoodsId": ""
                },
				SexTypes:[//类别信息
					{value:'0',checked:false,text:'男'},
					{value:'1',checked:false,text:'女已婚'},
					{value:'2',checked:false,text:'女未婚'}
                ],
                deleteId:""//删除item的id
            },

            //点击添加的时候参数重置
            OnResetParams:function(){
                _goodsAddItem.data.params.Id = undefined;
                _goodsAddItem.data.params.SupplierCode = "";
                _goodsAddItem.data.params.Name = "";
                _goodsAddItem.data.params.SalePrice = "";
                _goodsAddItem.data.params.Description = "";
                _goodsAddItem.data.params.OriginPrice = "";
                _goodsAddItem.data.params.OrderIndex = "";
                _goodsAddItem.data.params.CrowdTypes = [];
                _goodsAddItem.data.params.ThirdDepartGoodsId = "";
                for(var m=0;m<_goodsAddItem.data.SupplierSelectList.length;m++){
                    if(m==0){
                        _goodsAddItem.data.SupplierSelectList[m].selected = true;
                    }else {
                        _goodsAddItem.data.SupplierSelectList[m].selected = false;
                    }
                }
                _goodsAddItem.OnConfigAddSupplierSelect();
                // _goodsAddItem.OnConfigGoodsSelect();
                _goodsAddItem.data.SexTypes = [
					{value:'0',checked:false,text:'男'},
					{value:'1',checked:false,text:'女已婚'},
					{value:'2',checked:false,text:'女未婚'}
				]
            },

            //添加弹框
            OnShowAddDialog:function(){
                _goodsAddItem.OnResetParams();
                $('#addOrModifyGoodsAddItem').modal('show');
            },

            //编辑弹框
            OnShowModifyDialog:function(item){
                _goodsAddItem.OnResetParams();
                _goodsAddItem.data.params.Id = item.Id;
                _goodsAddItem.data.params.SupplierCode = item.SupplierCode;
                _goodsAddItem.data.params.Name = item.Name;
                _goodsAddItem.data.params.SalePrice = item.SalePrice;
                _goodsAddItem.data.params.Description = item.Description;
                _goodsAddItem.data.params.OriginPrice = item.OriginPrice;
                _goodsAddItem.data.params.OrderIndex = item.OrderIndex;
                _goodsAddItem.data.params.CrowdTypes = item.CrowdTypes;
                _goodsAddItem.data.params.ThirdDepartGoodsId = item.ThirdDepartGoodsId;
                //多选框赋值
                for(var i=0;i<item.CrowdTypes.length;i++){
                    for(var j=0;j<_goodsAddItem.data.SexTypes.length;j++){
                        if(_goodsAddItem.data.SexTypes[j].value == item.CrowdTypes[i]){
                            _goodsAddItem.data.SexTypes[j].checked = true;
                            break;
                        }
                    }
                }
                //下拉框赋值
                for(var m=0;m<_goodsAddItem.data.SupplierSelectList.length;m++){
                    var obj = _goodsAddItem.data.SupplierSelectList[m];
                    if(item.SupplierCode == obj.value){
                        _goodsAddItem.data.SupplierSelectList[m].selected = true;
                    }else {
                        _goodsAddItem.data.SupplierSelectList[m].selected = false;
                    }
                }
                _goodsAddItem.OnConfigAddSupplierSelect();
                $('#addOrModifyGoodsAddItem').modal('show');
            },

            //添加
            AddEvent:function(){
                var url = BaseUrl.OnAdd;
                var tempList = [];
                for(var i=0;i<_goodsAddItem.data.SexTypes.length;i++){
                    if(_goodsAddItem.data.SexTypes[i].checked){
                        tempList.push(_goodsAddItem.data.SexTypes[i].value);
                    }
                }
                _goodsAddItem.data.params.CrowdTypes = tempList;
                params = { 
                    "SupplierCode": _goodsAddItem.data.params.SupplierCode,
                    "Name": _goodsAddItem.data.params.Name,
                    "SalePrice": _goodsAddItem.data.params.SalePrice,
                    "Description": _goodsAddItem.data.params.Description,
                    "OriginPrice": _goodsAddItem.data.params.OriginPrice,
                    "OrderIndex": _goodsAddItem.data.params.OrderIndex,
                    "CrowdTypes": _goodsAddItem.data.params.CrowdTypes,
                    "ThirdDepartGoodsId": _goodsAddItem.data.params.ThirdDepartGoodsId
                };
                if(!_goodsAddItem.data.params.SupplierCode){
                    util.showFade('请选择所属服务商!');
                    return false;
                }
                // if(!_goodsAddItem.data.params.ThirdDepartGoodsId){
                //     util.showFade('请填写商品!');
                //     return false;
                // }
                if(!_goodsAddItem.data.params.Name){
                    util.showFade('请填写名称!');
                    return false;
                }
                if(_goodsAddItem.data.params.Name.length<2||_goodsAddItem.data.params.Name.length>60){
                    util.showFade('名称在2~60字符串!');
                    return false;
                }
                if(!_goodsAddItem.data.params.Description){
                    util.showFade('请填写说明!');
                    return false;
                }
                if(_goodsAddItem.data.params.Description.length<2||_goodsAddItem.data.params.Description.length>500){
                    util.showFade('说明在2~500字符串!');
                    return false;
                }
                if(!_goodsAddItem.data.params.OriginPrice){
                    util.showFade('请填写原价!');
                    return false;
                }
                if(!/^\d+(\.\d{1,2})?$/.test(_goodsAddItem.data.params.OriginPrice)){
                  util.showFade('原价必须为数字或者1~2位小数!');
                  return false;
                }
                if(parseFloat(_goodsAddItem.data.params.OriginPrice) <= 0 || parseFloat(_goodsAddItem.data.params.OriginPrice) > 999999999){
                  util.showFade('原价已超出指定范围（1~999999999）!');
                  return false;
                }
                if(!_goodsAddItem.data.params.SalePrice){
                    util.showFade('请填写售价!');
                    return false;
                }
                if(!/^\d+(\.\d{1,2})?$/.test(_goodsAddItem.data.params.SalePrice)){
                  util.showFade('售价必须为数字或者1~2位小数!');
                  return false;
                }
                if(parseFloat(_goodsAddItem.data.params.SalePrice) <= 0 || parseFloat(_goodsAddItem.data.params.SalePrice) > 999999999){
                  util.showFade('售价已超出指定范围（1~999999999）!');
                  return false;
                }
                if(!_goodsAddItem.data.params.OrderIndex){
                    util.showFade('请填写权重!');
                    return false;
                }
                if(!/^\d+(\.\d{1,2})?$/.test(_goodsAddItem.data.params.OrderIndex)){
                  util.showFade('权重必须为数字或者1~2位小数!');
                  return false;
                }
                if(parseFloat(_goodsAddItem.data.params.OrderIndex) <= 0 || parseFloat(_goodsAddItem.data.params.OrderIndex) > 999999999){
                  util.showFade('权重已超出指定范围（1~999999999）!');
                  return false;
                }
                if(_goodsAddItem.data.params.CrowdTypes.length==0){
                    util.showFade('请选择类别!');
                    return false;
                }
                util.showAjaxLoading();
                util.ajaxMALLPost($http,url,params,function(result){
                    if (result.Code == 1){
                        util.showFade(result.Message);
                        $('#addOrModifyGoodsAddItem').modal('hide');
                    }else {
                        util.showFade(result.Message);
                    }
                    _goodsAddItem.OnSearch();
                    util.hideAjaxLoading();
                },function(err){
                    util.hideAjaxLoading();
                    util.showFade(err);
                })
            },

            //编辑
            ModifyEvent:function(){
                var url = BaseUrl.OnModify;
                var tempList = [];
                for(var i=0;i<_goodsAddItem.data.SexTypes.length;i++){
                    if(_goodsAddItem.data.SexTypes[i].checked){
                        tempList.push(_goodsAddItem.data.SexTypes[i].value);
                    }
                }
                _goodsAddItem.data.params.CrowdTypes = tempList;
                params = { 
                    "Id": _goodsAddItem.data.params.Id,
                    "SupplierCode": _goodsAddItem.data.params.SupplierCode,
                    "Name": _goodsAddItem.data.params.Name,
                    "SalePrice": _goodsAddItem.data.params.SalePrice,
                    "Description": _goodsAddItem.data.params.Description,
                    "OriginPrice": _goodsAddItem.data.params.OriginPrice,
                    "OrderIndex": _goodsAddItem.data.params.OrderIndex,
                    "CrowdTypes": _goodsAddItem.data.params.CrowdTypes,
                    "ThirdDepartGoodsId": _goodsAddItem.data.params.ThirdDepartGoodsId
                };
                if(!_goodsAddItem.data.params.SupplierCode){
                    util.showFade('请选择所属服务商!');
                    return false;
                }
                // if(!_goodsAddItem.data.params.ThirdDepartGoodsId){
                //     util.showFade('请填写商品!');
                //     return false;
                // }
                if(!_goodsAddItem.data.params.Name){
                    util.showFade('请填写名称!');
                    return false;
                }
                if(_goodsAddItem.data.params.Name.length<2||_goodsAddItem.data.params.Name.length>60){
                    util.showFade('名称在2~60字符串!');
                    return false;
                }
                if(!_goodsAddItem.data.params.Description){
                    util.showFade('请填写说明!');
                    return false;
                }
                if(_goodsAddItem.data.params.Description.length<2||_goodsAddItem.data.params.Description.length>500){
                    util.showFade('说明在2~500字符串!');
                    return false;
                }
                if(!_goodsAddItem.data.params.OriginPrice){
                    util.showFade('请填写原价!');
                    return false;
                }
                if(!/^\d+(\.\d{1,2})?$/.test(_goodsAddItem.data.params.OriginPrice)){
                  util.showFade('原价必须为数字或者1~2位小数!');
                  return false;
                }
                if(parseFloat(_goodsAddItem.data.params.OriginPrice) <= 0 || parseFloat(_goodsAddItem.data.params.OriginPrice) > 999999999){
                  util.showFade('原价已超出指定范围（1~999999999）!');
                  return false;
                }
                if(!_goodsAddItem.data.params.SalePrice){
                    util.showFade('请填写售价!');
                    return false;
                }
                if(!/^\d+(\.\d{1,2})?$/.test(_goodsAddItem.data.params.SalePrice)){
                  util.showFade('售价必须为数字或者1~2位小数!');
                  return false;
                }
                if(parseFloat(_goodsAddItem.data.params.SalePrice) <= 0 || parseFloat(_goodsAddItem.data.params.SalePrice) > 999999999){
                  util.showFade('售价已超出指定范围（1~999999999）!');
                  return false;
                }
                if(!_goodsAddItem.data.params.OrderIndex){
                    util.showFade('请填写权重!');
                    return false;
                }
                if(!/^\d+(\.\d{1,2})?$/.test(_goodsAddItem.data.params.OrderIndex)){
                  util.showFade('权重必须为数字或者1~2位小数!');
                  return false;
                }
                if(parseFloat(_goodsAddItem.data.params.OrderIndex) <= 0 || parseFloat(_goodsAddItem.data.params.OrderIndex) > 999999999){
                  util.showFade('权重已超出指定范围（1~999999999）!');
                  return false;
                }
                if(_goodsAddItem.data.params.CrowdTypes.length==0){
                    util.showFade('请选择类别!');
                    return false;
                }
                util.showAjaxLoading();
                util.ajaxMALLPost($http,url,params,function(result){
                    if (result.Code == 1){
                        util.showFade(result.Message);
                        $('#addOrModifyGoodsAddItem').modal('hide');
                    }else {
                        util.showFade(result.Message);
                    }
                    _goodsAddItem.OnSearch();
                    util.hideAjaxLoading();
                },function(err){
                    util.hideAjaxLoading();
                    util.showFade(err);
                })
            },

            //删除弹框
            OnShowDeleteDialog:function(item){
                _goodsAddItem.data.deleteId = item.Id;
                $('#deleteEventQuotaModal').modal('show');
            },

            //删除选中的item
            DeleteEventQuota:function(){
                var url = BaseUrl.OnDelete;
                params = { 
                    "Id": _goodsAddItem.data.deleteId
                };
                util.showAjaxLoading();
                util.ajaxMALLPost($http,url,params,function(result){
                    if (result.Code == 1){
                        util.showFade(result.Message);
                        $('#deleteEventQuotaModal').modal('hide');
                    }else {
                        util.showFade(result.Message);
                    }
                    _goodsAddItem.OnSearch();
                    util.hideAjaxLoading();
                },function(err){
                    util.hideAjaxLoading();
                    util.showFade(err);
                })
            },

            //将服务商信息进行字典转换
            OnConvertSupplerList:function(input){
                var result = {};
                for(var i=0; i< input.length; i++){
                  var item = input[i];
                  result[item.SupplierCode] = item.SupplierName;
                }
                return result;
            },

            //获取所有的服务商列表
            OnGetAllSupplier:function(){
                var url = BaseUrl.GetAllSupplier,
                    params = { SupplierType: -1 }; // -1: 全部
                util.showAjaxLoading();
                util.ajaxMALLPost($http,url,params,function(result){
                    if (result.Code == 1 && result.Data != null){
                        var datas = result.Data;
                        datas.unshift({ SupplierName: '全部', SupplierCode: "" });
                        _goodsAddItem.data.ServiceDDL = datas;
                        _goodsAddItem.data.supplierObjects = _goodsAddItem.OnConvertSupplerList(datas);
                        for(var i=0;i<datas.length;i++){
                          var tag = {
                            label: datas[i].SupplierName,
                            title: datas[i].SupplierName,
                            value: datas[i].SupplierCode,
                            selected: false
                          };
                          _goodsAddItem.data.SupplierSelectList.push(tag);
                        }
                        _goodsAddItem.OnConfigSupplierSelect();
                    }else {
                        util.showFade(result.Message);
                    }
                    _goodsAddItem.OnSearch();
                    util.hideAjaxLoading();
                },function(err){
                    util.hideAjaxLoading();
                    util.showFade(err);
                })
            },

            //给下拉框赋值
            OnConfigSupplierSelect:function(){
                //查询用下拉框
                var SupplierListSetting= {
                  enableFiltering: true,
                  buttonWidth: 255,
                  onChange: function(option, checked){
                    _goodsAddItem.data.Search.SupplierCode = option[0].value;
                  }
                }
                $("#supplierSelect").multiselect(SupplierListSetting).multiselect('dataprovider', _goodsAddItem.data.SupplierSelectList);
            },

            //弹框中出现的下拉列表
            OnConfigAddSupplierSelect:function(){
                //添加框中服务list下拉列表
                var AddOrModifySupplierListSetting= {
                    enableFiltering: true,
                    buttonWidth: 255,
                    onChange: function(option, checked){
                      _goodsAddItem.data.params.SupplierCode = option[0].value;
                    }
                };
                $("#addOrModifySupplierSelect").multiselect(AddOrModifySupplierListSetting).multiselect('dataprovider', _goodsAddItem.data.SupplierSelectList);
                if (_goodsAddItem.data.params.Id != undefined) {
                    $("#addOrModifySupplierSelect").multiselect('disable');
                }else {
                    $("#addOrModifySupplierSelect").multiselect('enable');
                }
            },

            //获取体检加项列表
            OnSearch:function(){
                var url = BaseUrl.GetAddItemList;
                var params = {
                    "PageCount": $scope.pageConfig.itemsPerPage,
                    "PageIndex": $scope.pageConfig.currentPage==0?1:$scope.pageConfig.currentPage,
                    "SupplierCode": _goodsAddItem.data.Search.SupplierCode,
                    "Name": _goodsAddItem.data.Search.Name
                }
                util.showAjaxLoading();
                util.ajaxMALLPost($http,url,params,function(result){
                    if (result.Code == 1 && result.Data != null){
                        _goodsAddItem.data.AddItemList = [];
                        result.Data.GoodsList.forEach(function(item ,idex, array){
                          var model = vModel.ConvertInfo(item,_goodsAddItem.data.supplierObjects);
                          _goodsAddItem.data.AddItemList.push((model));
                        });
                        $scope.pageConfig.totalItems = result.Data.Total;
                    }else {
                    util.showFade(result.Message);
                    }
                    util.hideAjaxLoading();
                },function(err){
                    util.hideAjaxLoading();
                    util.showFade(err);
                })
            },

            //模块初始化
            init:function(){
                _goodsAddItem.OnGetAllSupplier();
            }

        },

        //模块初始化
        Init: function () {
            _goodsAddItem = $scope.vm.goodsAddItem;
            _goodsAddItem.init();
        }

    }).Init();

});
    return app;
})