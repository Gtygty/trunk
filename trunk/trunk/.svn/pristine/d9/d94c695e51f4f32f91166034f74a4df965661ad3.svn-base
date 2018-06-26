define(['Extend','common/util'],function(Extend,util){
var viewModel = function(){
	 var format = 
	    {
	    	ClearT:function(input) {
	    		if (!input) return '-';
	    		var date = input.toString().ClearT();
  	    		item = date.split('.');
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
        GetAllAppointmentAgency:function(input) {
          if (!input) return '-';
          var allAgency = '';
          for (var i = 0; i < input.length; i++) {
              var tempObj = input[i];
              allAgency += tempObj.SupplierName + '(' + tempObj.SupplierCode + ')' + '、';
            }
          return allAgency.substr(0,allAgency.length - 1);
        },
	    	GetReportSendType:function(input) {
	    		if (input == 0) {
	    			return '医院自取';
	    		}else if (input == 1) {
	    			return '统一快递';
	    		}
	    	},
        ConvertGoodsList:function(input) {
          var resultArr = [];
          for (var i = 0; i < input.length; i++) {
            var goodsList = input[i].MEList;
            for (var j = 0; j < goodsList.length; j++) {
              var goodsInfo = new Object();
              goodsInfo["SupplierName"] = input[i].SupplierName;
              goodsInfo["GroupSalesPrise"] = goodsList[j].GroupSalesPrise;
              goodsInfo["GoodsId"] = goodsList[j].GoodsId;
              goodsInfo["GoodsName"] = goodsList[j].GoodsName;
              resultArr.push(goodsInfo);
            }
          }
          return resultArr;
        }
	    }

      Date.prototype.format = function (format) {
              var args = {
                  "M+": this.getMonth() + 1,
                  "d+": this.getDate(),
                  "h+": this.getHours(),
                  "m+": this.getMinutes(),
                  "s+": this.getSeconds(),
                  "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
                  "S": this.getMilliseconds()
              };
              if (/(y+)/.test(format))
                  format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
              for (var i in args) {
                  var n = args[i];
                  if (new RegExp("(" + i + ")").test(format))
                      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
              }
              return format;
      };

     this.getFormatDate = function () {
     	var date = new Date();
     	var str = "";
     	return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
     };

	 this.convertEnterpriseModel = function(items){
	 	var tempData = [];
  		if (items!=null) {
  			for (var i = 0; i < items.length; i++) {
  				var item = items[i];
  				    tempData.push({
                'Id':item.Id,
  				    	'Name':item.Name,
  				    	'ConnectName':item.ConnectName,
  				    	'ConnectMobile':item.ConnectMobile,
  				    	'LastUpdatetime':format.ClearT(item.LastUpdatetime),
  				    	'CreateTime':format.ClearT(item.CreateTime),
  				    	'Address':item.Address,
  				    	'ReportSendType':item.ReportSendType,//enum
                'ConvertReportSendType':format.GetReportSendType(item.ReportSendType),
  				    	'ReportSummary':item.ReportSummary,//bool
                'ConvertReportSummary':item.ReportSummary ? '是' : '否',
  				    	'MinAppointDate':format.ClearT(item.MinAppointDate),//string
                'ConvertMinAppointDate':new Date(item.MinAppointDate),//date
  				    	'MaxAppointDate':format.ClearT(item.MaxAppointDate),//string
                'ConvertMaxAppointDate':new Date(item.MaxAppointDate),//date
                'AppointmentTimeRange':format.ClearTT(item.MinAppointDate) + ' ' + '~' + ' ' + format.ClearTT(item.MaxAppointDate),//时间段
                'AppointmentAgency':format.GetAllAppointmentAgency(item.MECList),//预约中心
                'WarningText':item.WarningText,
  				    	'MECList':item.MECList,
                'MEList':item.MEList,
                'MECListFormat':format.ConvertGoodsList(item.MECListFormat)
  				    });
  			}
  		}
  		return tempData;
	 }

   this.getRequestDate = function(item) {
    return item.format("yyyy-MM-dd");
   }

   this.getRequestParams = function (item) {
    return {
      'Name': item.Name,
      'ConnectName': item.ConnectName,
      'ConnectMobile': item.ConnectMobile,
      'Address': item.Address,
      'ReportSendType': item.ReportSendType,
      'ReportSummary': item.ReportSummary,
      'MinAppointDate': item.ConvertMinAppointDate.format("yyyy-MM-dd"),
      'MaxAppointDate': item.ConvertMaxAppointDate.format("yyyy-MM-dd"),
      'WarningText': item.WarningText,
      'MECList': [],
      'MEList': []
    }
   }

   //体检中心及其商品信息列表
   this.convertEnterpriseAndGoods = function(items){
        var tempData = [];
        if (items!=null) {
          for (var i = 0; i < items.length; i++) {
                var item = items[i];
                tempData.push({
                  'no':i,
                  'SupplierCode':item.SupplierCode,
                  'SupplierName':item.SupplierName,
                  'GoodsList':item.GoodsList,
                  'isChecked':false
                });
          }
        }
        return tempData;
   }

   //商品信息转型
   this.conventToGoodsList = function(items,item){
        var tempData = [];

       /* //逻辑判断，判断当前items中是否有item
        if(items!=null && items.length>0){
              //存在数据判断该数据是否相同
              var currentItem = items[0];
              if(currentItem.SupplierCode != item.SupplierCode){//原本不存在的
                  item.isChecked = false;
                  util.showFade("只能选择一家机构信息，请先添加该企业再重新选择！");
                  return;
              }else{//已经存在的
                  for(var i=0;i<items.length;i++){
                      var cItem = items[i];
                      if(!item.isChecked){//取消选中，剔除操作
                        if(item.SupplierCode!=cItem.SupplierCode){
                            tempData.push({
                                Id:cItem.Id,
                                RootType:cItem.RootType,
                                isChecked:cItem.isChecked,
                                CommonInfo:cItem.CommonInfo,
                                SupplierCode:cItem.SupplierCode,
                                SupplierName:cItem.SupplierName
                            });
                        }
                      }else{//选中操作，加入操作
                            tempData.push({
                                Id:cItem.Id,
                                RootType:cItem.RootType,
                                isChecked:cItem.isChecked,
                                CommonInfo:cItem.CommonInfo,
                                SupplierCode:cItem.SupplierCode,
                                SupplierName:cItem.SupplierName
                            });
                      }
                  }
              }

        }else{
            if(item!=null&&item.isChecked){//新数据，加入数组
              var GoodsList = item.GoodsList;
              for(var i=0;i<GoodsList.length;i++){
                  tempData.push({
                      Id:GoodsList[i].Id,
                      RootType:GoodsList[i].RootType,
                      isChecked:false,
                      CommonInfo:GoodsList[i].CommonInfo,
                      SupplierCode:item.SupplierCode,
                      SupplierName:item.SupplierName
                  });
              }
            }
        }*/

        if(items!=null){//已存在数据，加入数组
          for(var i=0;i<items.length;i++){
              var cItem = items[i];
              if(!item.isChecked){//取消选中，剔除操作
                if(item.SupplierCode!=cItem.SupplierCode){
                    tempData.push({
                        Id:cItem.Id,
                        RootType:cItem.RootType,
                        isChecked:cItem.isChecked,
                        CommonInfo:cItem.CommonInfo,
                        SupplierCode:cItem.SupplierCode,
                        SupplierName:cItem.SupplierName
                    });
                }
              }else{//选中操作，加入操作
                    tempData.push({
                        Id:cItem.Id,
                        RootType:cItem.RootType,
                        isChecked:cItem.isChecked,
                        CommonInfo:cItem.CommonInfo,
                        SupplierCode:cItem.SupplierCode,
                        SupplierName:cItem.SupplierName
                    });
              }
          }
        }

        if(item!=null&&item.isChecked){//新数据，加入数组
          var GoodsList = item.GoodsList;
          for(var i=0;i<GoodsList.length;i++){
              tempData.push({
                  Id:GoodsList[i].Id,
                  RootType:GoodsList[i].RootType,
                  isChecked:false,
                  CommonInfo:GoodsList[i].CommonInfo,
                  SupplierCode:item.SupplierCode,
                  SupplierName:item.SupplierName
              });
          }
        }
        return tempData;
   }

   //获取所欲选中的商品信息
   this.conventToAllGoods = function(goodsList,item){
        var tempData = [];
        if(goodsList!=null){
          for(var i=0; i<goodsList.length ; i++) {
              var cItem = goodsList[i];
              if(!item.isChecked){//取消选中，剔除操作
                if(item.Id!=cItem.Id){
                    tempData.push(cItem);
                }
              }else{//选中操作，加入操作
                tempData.push(cItem);
                
              }
          }
        }
        if(item!=null&&item.isChecked){//第一次选中加入
             tempData.push(item);
        }
        //数据转换
        goodsList = tempData;
        var temp = [];//SupplierCode的聚合
        for(var m=0; m<goodsList.length; m++){
          temp.push(goodsList[m].SupplierCode);
        }
        for(var s=0;s<temp.length;s++){
          for (var k=s+1;k<temp.length;k++) {
            if(temp[s] == temp[k]){
              s--;
              temp.splice(k,1);
            }
          }
        }
        var lastData = [];
        var tempList = [];
        for(var s=0;s<temp.length;s++){
            tempList = [];
           for(var m=0;m<goodsList.length;m++){
            if(temp[s] == goodsList[m].SupplierCode){
              tempList.push(goodsList[m]);
            }
           }
           lastData.push({
                SupplierCode:temp[s],
                SupplierName:tempList[0].SupplierName,
                GoodsInfoList:tempList
           });
        }
        var list = [];
        list.push(lastData);//页面显示值
        list.push(tempData);//临时变量值
        return list;
   }


   this.removeData = function(index,item,goodsList,tempList,type){
        var tempData = [];
        var list = [];
        if(type == 1){//删除父节点(将其所有的子节点删除)
            var supplierCode = goodsList[index].SupplierCode;
            goodsList.splice(index,1);
            for(var i=0;i<tempList.length;i++){
                if(tempList[i].SupplierCode != supplierCode){
                    tempData.push(tempList[i]);
                }
            }
            list.push(goodsList);
            list.push(tempData);
        }else if(type == 2){//删除子节点,
            list = this.conventToAllGoods(tempList,item)
        }
        return list;
   }


	 this.convertGoodsListModel = function(items){
	 	var tempData = [];
  		if (items!=null) {
  			for (var i = 0; i < items.length; i++) {
  				var item = items[i];
  				// var GoodsList = [];
  				// if (item.GoodsList!=null) {
  				// 	for (var i = 0; i < item.GoodsList.length; i++) {
  				// 		item.GoodsList[i]
  				// 	}
  				// }
  				    tempData.push({
  				    	'SupplierCode':item.SupplierCode,
  				    	'SupplierName':item.SupplierName,
  				    	'GoodsList':item.GoodsList
  				    });
  			}
  		}
  		return tempData;
	 };

};
return viewModel;
});