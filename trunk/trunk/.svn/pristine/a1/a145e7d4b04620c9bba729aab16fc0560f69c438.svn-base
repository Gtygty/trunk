define(['indexApp', 'common/util', 'model/mall/CouponModel', 'service/baseService', 'Extend'], function (app, util, DataModel) {

  app.factory('couponService', ['ajaxService', function(ajax){
    var URL = {
        /* 优惠券 */
        Coupon: {
          Add: 'BMSCoupon/AddRootTypeReduceCoupon',//添加一条指定类型满减优惠券
          Search: 'BMSCoupon/SearchCouponList',//分页搜索优惠券列表
          SetCoupon: 'BMSCoupon/SetCouponState',//批量修改优惠券状态
          ReceiveList: 'BMSCoupon/CouponReceiveList',//获取指定优惠券的领取记录 (2.4.0) StateFormat ：0：未使用 1：锁定中 2：已使用 3：已过期
          ComsumList: 'BMSCoupon/CouponComsumList'//分页获取指定优惠券的消费记录
        }
    },
    Valid = {
        CouponAdd: function(param){
            if(!param.CouponTitle){
              util.showFade('请填写通用卷名称!');
              return false;
            }
            if(param.CouponTitle.length > 30){
              util.showFade('通用卷名称最多只能录入30个字符!');
              return false;
            }
            if(!param.StartDate){
              util.showFade('请填写开始时间!');
              return false;
            }
            if(!param.EndDate){
              util.showFade('请填写结束时间!');
              return false;
            }
            if(!param.Amount){
              util.showFade('请填写面值!');
              return false;
            }
            if(isNaN(param.Amount)){
              util.showFade('面值必须为数字!');
              return false;
            }
            if(parseFloat(param.Amount) <= 0 || parseFloat(param.Amount) > 999999999){
              util.showFade('面值已超出指定范围（1~999999999）!');
              return false;
            }
            if(!param.Total){
              util.showFade('请填写发行量!');
              return false;
            }
            if(isNaN(param.Total)){
              util.showFade('发行量必须为数字!');
              return false;
            }
            if(parseFloat(param.Total) <= 0 || parseFloat(param.Total) > 999999999){
              util.showFade('发行量已超出指定范围（1~999999999）!');
              return false;
            }
            if(!param.DueTime){
              util.showFade('请填写有效期!');
              return false;
            }
            if(isNaN(param.DueTime)){
              util.showFade('有效期必须为数字!');
              return false;
            }
            if(parseFloat(param.DueTime) <= 0 || parseFloat(param.DueTime) > 999999999){
              util.showFade('有效期已超出指定范围（1~999999999）!');
              return false;
            }
            if(!param.CouponDescription){
              util.showFade('请填写使用说明!');
              return false;
            }
            if(param.CouponDescription.length > 30){
              util.showFade('使用说明最多只能录入30个字!');
              return false;
            }
            if(param.OrderTypes==null||param.OrderTypes.length==0){
              util.showFade('请选择订单类型!');
              return false;
            }
            if(param.GoodsType==null||param.GoodsType.length==0){
              util.showFade('请选择商品类型!');
              return false;
            }
            if(!param.OrderPrice){
              util.showFade('请填写订单价格下限!');
              return false;
            }
            if(isNaN(param.OrderPrice)){
              util.showFade('订单价格下限必须为数字!');
              return false;
            }
            if(parseFloat(param.OrderPrice) <= 0 || parseFloat(param.OrderPrice) > 999999999){
              util.showFade('订单价格下限已超出指定范围（1~999999999）!');
              return false;
            }
            return true;
        }
    },
    ViewModel = {
      Coupon:{
        List:function(options){
            var url = URL.Coupon.Search,
                param = angular.extend({
                  'PageNum': '',
                  'Count': '',
                  'CouponTitle': '',
                  'CouponState': ''
                }, options.params),
                callback = options.callback,
                dataModel = new DataModel();
                ajax.PostMall(url, param, function(data){
                    if(data){
                      var result = dataModel.conventData(data);
                      callback && callback(result,data.TotalCount);
                    }
                    else
                      util.showFade('添加失败!');
                });
        },
        Add:function(options){
            var url = URL.Coupon.Add,
                orderType = options.orderTypeDDL,
                goodsType = options.goodsTypeDDL,
                param = angular.extend({
                    'CouponTitle':'', //通用卷名称
                    'CouponDescription':'', //使用说明
                    'Total':'', //发行总量
                    'Amount':'', //面值
                    'DueTime':'', //订单相对过期时间
                    'OrderTypes':[], //订单类型 1：体检套餐类型订单
                    'OrderPrice':'', //订单价格下限
                    'GoodsType':[], //商品类型　0：体检套餐类型商品 1：实体类型商品 2：服务类型商品
                    'StartDate':'', //开始时间
                    'EndDate':'' //结束时间
                }, options.params),
                callback = options.callback,
                dataModel = new DataModel();
                var params = dataModel.conventToParam(orderType,goodsType,param)
                if(Valid.CouponAdd(params)){
                  ajax.PostMall(url, param, function(data){
                      if(data)
                        callback && callback(data);
                      else
                        util.showFade('添加失败!');
                  });
                }
        },
        OnGetList: function(list,state){
            var tempList = [];
            if(state == -1){
              tempList=list;
            }else{
                if(list!=null&&list.length>0){
                  for(var i=0;i<list.length;i++){
                    if(list[i].CouponState == state ){
                      tempList.push(list[i]);
                    }
                  }
                }
            }
            return tempList;
        },
        SetState: function(options){
            var url = URL.Coupon.SetCoupon,
                param = angular.extend({
                        'Ids':  [],
                        'State': 0,
                      }, options.param),
                callback = options.callback;
            ajax.PostMall(url, param, function(data){
                if(data)
                  callback && callback(data);
                else
                  util.showFade('更新用卷状态失败!');
            });

        },
        GetData: function(options){   //获取checkbox选中的值进行页面显示
            var url = URL.Coupon.SetCoupon,
                param = angular.extend({
                        'itemOrderTypes': [],
                        'itemGoodsType': [],
                        'orterTypeDDL': [],
                        'goodsTypeDDL': []
                      }, options.param),
                callback = options.callback;
                var tempData = [];
                if(param.itemOrderTypes!=null && param.itemOrderTypes.length>0){
                      // for(var i=0;i<param.itemOrderTypes.length;i++){
                      //     for(var j=0;j<param.orterTypeDDL.length;j++){
                      //       if(param.orterTypeDDL[j].value==param.itemOrderTypes[i]){
                      //          param.orterTypeDDL[j].checked = true;
                      //       }
                      //     }
                      // }
                  param.orterTypeDDL.forEach(function(item, itemIndex, itemArray){
                    item.checked = false;
                    param.itemOrderTypes.forEach(function(data, dataIndex, dataArry){
                      if (item.value == data){
                        item.checked = true;
                      }
                    });
                  });

                }
                if(param.itemGoodsType!=null && param.itemGoodsType.length>0){
                      // for(var i=0;i<param.itemGoodsType.length;i++){
                      //     for(var j=0;j<param.goodsTypeDDL.length;j++){
                      //       if(param.goodsTypeDDL[j].value==param.itemGoodsType[i]){
                      //          param.goodsTypeDDL[j].checked = true;
                      //       }else {
                      //         param.goodsTypeDDL[j].checked = false;
                      //       }
                      //     }
                      // }
                  param.goodsTypeDDL.forEach(function(item, itemIndex, itemArray){
                    item.checked = false;
                    param.itemGoodsType.forEach(function(data, dataIndex, dataArray){
                      if (item.value == data){
                        item.checked = true;
                      }
                    });
                  })

                }
                tempData[0] = param.orterTypeDDL;
                tempData[1] = param.goodsTypeDDL;
                callback && callback(tempData);

        },
        OnGetReceiveList:function(options){
            var url = URL.Coupon.ReceiveList,
                param = angular.extend({
                      "PageNum": 1,
                      "Count":10,
                      "CouponId":'',
                }, options.param),
                callback = options.callback,
                dataModel = new DataModel();
                var callback = options.callback;
                ajax.PostMall(url, param, function(data){
                    if(data){
                      var result = dataModel.convertReceiveList(data)
                      callback && callback(result,data.TotalCount);
                    }
                    else
                      util.showFade('添加失败!');
                });
        },
        OnGetComsumList:function(options){
            var url = URL.Coupon.ComsumList,
                param = angular.extend({
                      "PageNum": 1,
                      "Count":10,
                      "CouponId":'',
                }, options.param),
                callback = options.callback,
                dataModel = new DataModel();
                var callback = options.callback;
                ajax.PostMall(url, param, function(data){
                    if(data){
                      var result = dataModel.convertComsumList(data)
                      callback && callback(result,data.TotalCount);
                    }
                    else
                      util.showFade('添加失败!');
                });
        }
      }
    };

    return ViewModel;
  }]);



  return app;
});
