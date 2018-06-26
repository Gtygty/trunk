/* eslint-disable no-undef */
define(['Extend', 'common/util', 'sysConfig'], function (Extend, util, sysConfig) {
  var viewModel = function () {
      
      var format = 
      {
        ClearT:function(input) {
          if (!input) return '-';
          var date = input.toString().ClearT();
            item = date.split('T');
          return item[0];
        },
        ClearTT:function(input) {
          if (!input) return '-';
          var date = input.toString().ClearT();
            item = date.split(' ');
          return item[0];
        },
        ClearMilliSecondT:function(input) {
          if (!input) return '-';
          var date = input.toString().ClearT().split(' ');
          return date[0] + ' ' + date[1].substring(0,8);
        },
        GetEmployeeDetailInfo:function(input) {
          if (!input) return '-';
          var employeeInfo = '';
          employeeInfo = employeeInfo + "姓名：" + input.CustomerName + '\n';
          employeeInfo = employeeInfo + "身份证号：" + input.CustomerIDCard + '\n';
          employeeInfo = employeeInfo + "手机号：" + input.CustomerMobile + '\n';
          employeeInfo = employeeInfo + "性别：" + (input.CustomerGender ? "男" : "女") + '\n';
          employeeInfo = employeeInfo + "婚否：" + (input.CustomerMarried ? "已婚" : "未婚") + '\n';
          return employeeInfo;
        },
        GetIncreaseInfo: function (input) {
          if (!input) return '-';
          var IncreaseInfo = '';
          // employeeInfo = employeeInfo + "姓名：" + input.CustomerName + '\n';
          IncreaseInfo = IncreaseInfo + "支付价格：" + input.PayAmount + '\n';
          IncreaseInfo = IncreaseInfo + "订单号：" + input.OrderId + '\n';
          return IncreaseInfo;
        },
        //预约员工状态
        formatGroupAppointStateStr:function(item){
          var data = '';
          var state = item.State;
             //105申请中，120预约成功，125预约到检，130预约取消，
             if(state == 105){
                data = "申请中";
             }else if(state == 120){
                data = "预约成功";
             }else if(state == 125){
                data = "预约到检";
             }else if(state == 130){
                data = "预约取消";
             }
            return data;
        },

        formatType:function(type){
          switch(type)
          {
            case 1:
              return "线下团检";
            case 2:
              return "线上团检";
            default:
              return "未知类型";
          }
        }
      }

      this.convenAppointData = function(items){
          var tempData = [];

          if (items!=null) {
            for (var i = 0; i < items.length; i++) {
                  var item = items[i];
                  tempData.push({    
                    'OrderId': item.OrderId,
                    'AccountId': item.AccountId,
                    'EmployeeId': item.EmployeeId,
                    'CustomerName': item.CustomerName,
                    'CustomerIDCard': item.CustomerIDCard,
                    'EnterpriseId': item.EnterpriseId,
                    'EnterpriseName': item.EnterpriseName,
                    'CustomerGender': item.CustomerGender,
                    'CustomerMarried': item.CustomerMarried,
                    'CustomerMobile': item.CustomerMobile,
                    'DepartCode': item.DepartCode,
                    'DepartName': item.DepartName,
                    'GoodsId': item.GoodsId,
                    'GoodsName': item.GoodsName,
                    'Checked':false,
                    'ThirdpartGoodsId': item.ThirdpartGoodsId,
                    'AppointDate': format.ClearTT(item.AppointDate),
                    'State': item.State,
                    'AppointmentState':format.formatGroupAppointStateStr(item),
                    'EmployeeDetailInfo':format.GetEmployeeDetailInfo(item),
                    'LastUpdateDate': format.ClearMilliSecondT(item.LastUpdateDate),
                    'CreateTime': format.ClearT(item.CreateTime),
                    'Type':item.Type,
                    'TypeFormat': format.formatType(item.Type),
                    'IncreaseInfo': item.IncreaseInfo,
                    'IncreaseInfoFormat': format.GetIncreaseInfo(item.IncreaseInfo)
                  });
            }
          }

          return tempData;
      }
    
      //初始化下拉框查询值
      this.conventToSelectData = function(items){
        var tempData = [];
            tempData.push({
               Text: '--全部--',
               Value:null
            });
          if (items!=null) {
            for (var i = 0; i < items.length; i++) {
                  var item = items[i];
                  tempData.push({
                     Text: item.SupplierName,
                     Value: item.SupplierCode
                  });
            }
          }
          return tempData;
       };

    this.conventToStateData = function() {
        var tempData = [];
            tempData.push({
               Text: '--全部--',
               Value:-1
            });
        tempData.push({
                     Text: '申请中',
                     Value: 105
                  });
        tempData.push({
                     Text: '预约成功',
                     Value: 120
                  });
        tempData.push({
                     Text: '预约到检',
                     Value: 125
                  });
        tempData.push({
                     Text: '预约取消',
                     Value: 130
                  });    
        return tempData;
     }; 


     this.convertEnterpriseEmployeeList = function(items){
          var tempData = [];
          if (items!=null) {
            for (var i = 0; i < items.length; i++) {
                  var item = items[i];
                  tempData.push({
                    'EmployeeAppointmentItem':item.EmployeeAppointmentItem,
                    'Id':item.Id,
                    'EnterpriseId':item.EnterpriseId,
                    'AccountID':item.AccountID,
                    'Name':item.Name,
                    'IDCard':item.IDCard,
                    'Mobile':item.Mobile,
                    'Gender':item.Gender,
                    'Married':item.Married,
                    'MECList':item.MECList
                  });
            }
          }
          return tempData;
     }  

     var formatData = 
     {
        //用户信息
        formatCustomerInfo:function(item){
           var data = '';
           data = '姓名：'+item.Name
                +'\n手机号：'+item.Mobile
                +'\n身份证号：'+item.IDCard;
           return data;
        },
        //基本资料
        formatCommonData:function(item){
            var data = '';
            var generStr = '';
            var marrStr = '';
            var supplierInfo = '';
            var goodsInfo = '';
            if(item.Gender){
                generStr = '男';
            }else{
                generStr = '女';
            }
            if(item.Married){
                marrStr = '已婚';
            }else{
                marrStr = '未婚';
            }
            if(item.MECList!=null){
              for (var i=0;i<item.MECList.length;i++) {
                 supplierInfo+=item.MECList[i].SupplierName;
                 if(i!=item.MECList.length-1){
                    supplierInfo+='\n         ';
                 }
              }
            }
            if(item.MECList!=null){
              for (var i=0;i<item.MECList.length;i++) {
                if(item.MECList[i].MEList!=null){
                      console.log(item.MECList[i].MEList.length)
                    for (var j=0;j<item.MECList[i].MEList.length;j++) {
                        goodsInfo+=item.MECList[i].MEList[j].GoodsName;
                        // if(i!=item.MECList[i].MEList.length-1){
                            goodsInfo+='\n         ';
                        // }
                    }
                }
              }
            }
            data = '性别：'+generStr
                  +'\n婚否：'+marrStr
                  +'\n企业：'+item.EnterpriseName
                  +'\n体检中心：'+supplierInfo
                  +'\n体检套餐：'+goodsInfo;

            return data;
        },
        //app基本资料
        formatAppData:function(item){
            var  data = '';
            var generStr = '';
            var marrStr = '';
            if(item.EmployeeAppointmentItem==null){
               return data;
            }
            if(item.EmployeeAppointmentItem.CustomerGender){
                generStr = '男';
            }else{
                generStr = '女';
            }
            if(item.EmployeeAppointmentItem.CustomerMarried){
                marrStr = '已婚';
            }else{
                marrStr = '未婚';
            }
            if(item.EmployeeAppointmentItem!=null){
                cItem = item.EmployeeAppointmentItem;
                data = '\n姓名：'+ cItem.CustomerName
                    +'\n手机号：'+cItem.CustomerMobile
                    +'\n身份证号：'+cItem.CustomerIDCard
                    +'\n性别：'+generStr
                    +'\n婚否：'+marrStr
                    +'\n体检中心：'+cItem.DepartName
                    +'\n体检套餐：' +cItem.GoodsName;
            }
            return data;
        },
        formatAppointData:function(item){
          var data = '';
            if(item.EmployeeAppointmentItem!=null){
               data = format.ClearTT(item.EmployeeAppointmentItem.AppointDate);
            }
            return data;
        },
        //企业员工列表
        formatAppointStateStr:function(item){
          var data = '';
            if(item.EmployeeAppointmentItem!=null){
               var state = item.EmployeeAppointmentItem.State;
               //105申请中，120预约成功，125预约到检，130预约取消，
               if(state == 105){
                  data = "申请中";
               }else if(state == 120){
                  data = "预约成功";
               }else if(state == 125){
                  data = "预约到检";
               }else if(state == 130){
                  data = "预约取消";
               }
            }
            return data;
        },
        formatImportTime:function(item){
          var data = '';
            if(item!=null){
               data = format.ClearT(item.CreateTime).substring(0,19);
            }
            return data;
        },
        formatRemark:function(item){
          var data = '';
            if(item.EmployeeAppointmentItem!=null){
               data = item.EmployeeAppointmentItem.Remark==null?"":item.EmployeeAppointmentItem.Remark;
            }
            return data;
        },
        formatAppointState:function(item){
            var state = -1;
            if(item.EmployeeAppointmentItem!=null){
               state = item.EmployeeAppointmentItem.State;
            }
            return state;
        }
     }

     this.conventEmployeeList = function(items){
        var tempData = [];

        if (items!=null) {
          for (var i = 0; i < items.length; i++) {
                var item = items[i];
                tempData.push({
                    'Id': item.Id,
                    'EnterpriseId': item.EnterpriseId,
                    'EmployeeId': item.Id,
                    'customerInfo': formatData.formatCustomerInfo(item),//客户信息
                    'commonData': formatData.formatCommonData(item),//基本信息
                    'appData':formatData.formatAppData(item),//app数据
                    'appointTime':formatData.formatAppointData(item),//预约时间
                    'appointState':formatData.formatAppointStateStr(item),//预约状态
                    'importTime':formatData.formatImportTime(item),//导入时间
                    'Remark':formatData.formatRemark(item),//备注
                    'State':formatData.formatAppointState(item),
                    'isChecked':false,
                    "CustomerName": item.EmployeeAppointmentItem==null?"":item.EmployeeAppointmentItem.CustomerName,
                    "CustomerIDCard": item.EmployeeAppointmentItem==null?"":item.EmployeeAppointmentItem.CustomerIDCard,
                    "CustomerGender": item.EmployeeAppointmentItem==null?"":item.EmployeeAppointmentItem.CustomerGender,
                    "CustomerMarried": item.EmployeeAppointmentItem==null?"":item.EmployeeAppointmentItem.CustomerMarried,
                    "CustomerMobile": item.EmployeeAppointmentItem==null?"":item.EmployeeAppointmentItem.CustomerMobile,
                    "DepartCode": item.EmployeeAppointmentItem==null?"":item.EmployeeAppointmentItem.DepartCode,
                    "DepartName": item.EmployeeAppointmentItem==null?"":item.EmployeeAppointmentItem.DepartName,
                    "GoodsId": item.EmployeeAppointmentItem==null?"":item.EmployeeAppointmentItem.GoodsId,
                    "GoodsName": item.EmployeeAppointmentItem==null?"":item.EmployeeAppointmentItem.GoodsName,
                    "ThirdpartGoodsId": item.EmployeeAppointmentItem==null?"":item.EmployeeAppointmentItem.ThirdpartGoodsId,
                    'EnterpriseName': item.EnterpriseName,
                    'AccountID': item.AccountID,
                    'Name': item.Name,
                    'IDCard': item.IDCard,
                    'Mobile': item.Mobile,
                    'Gender': item.Gender==1?'男':'女',
                    'Married': item.Married==1?'已婚':'未婚',
                    'MECList': item.MECList,
                    'GoodsSalesPrise':item.EmployeeAppointmentItem==null?"":item.EmployeeAppointmentItem.GoodsSalesPrise==null?"":item.EmployeeAppointmentItem.GoodsSalesPrise
                });
          }
        }
        return tempData;
     }

     this.convenGoodsData = function(items){
          var tempData = [];

          if (items!=null) {
            for (var i = 0; i < items.length; i++) {
                  var item = items[i];
                  tempData.push({
                    'Name': item.Name,
                    'OrderId': item.OrderId,
                    'GoodsId': item.GoodsId,
                    'ThirdpartGoodsId': item.ThirdpartGoodsId,
                    'GoodsType': item.GoodsType,
                    'SupportSupplierID': item.SupportSupplierID,
                    'ListIconUrl': item.ListIconUrl,
                    'Price': item.Price,
                    'OriginPrice': item.OriginPrice,
                    'Count': item.Count,
                    'CreateDate': format.ClearTT(item.CreateDate)
                  });
            }
          }

          return tempData;
      }
   
  };
  return viewModel;
});
