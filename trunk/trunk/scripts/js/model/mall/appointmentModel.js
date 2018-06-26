/**
 * Created by hzguest3 on 2017/6/6.
 */
define(["Extend",'common/MallConst'], function (Extend,mallConst) {
  var AppointmentModel = function () {
    var self = this;
    self.Ckecked;
    self.OrderId;
    self.AppointDate ;
    self.DepartCode ;
    self.DepartName ;
    self.GoodsName ;
    self.AccountId ;
    self.CustomerName ;
    self.CustomerIDCard ;
    self.CustomerGender ;
    self.CustomerMarried ;
    self.CustomerMobile ;
    self.Remark ;
    self.State ;
    self.StateFormat;
    self.LastUpdateDate ;
    self.CreateTime ;
    self.Relation;

    self.ConvertFrom = function(dataModel){
      self.Checked = false;
      self.OrderId = dataModel.OrderId;
      self.AppointDate = dataModel.AppointDate.ClearT().ConvertToDate().Format('yyyy-MM-dd');
      self.DepartCode = dataModel.DepartCode;
      self.DepartName = dataModel.DepartName;
      self.GoodsName = dataModel.GoodsName;
      self.AccountId = dataModel.AccountId;
      self.CustomerName = dataModel.CustomerName;
      self.CustomerIDCard = dataModel.CustomerIDCard;
      self.CustomerGender = dataModel.CustomerGender == 0 ? "女" : "男";
      self.CustomerMarried = dataModel.CustomerMarried == 0 ? "未婚" : "已婚";
      self.CustomerMobile = dataModel.CustomerMobile;
      self.Remark = dataModel.Remark;
      self.State = dataModel.State;
      self.StateFormat = convertOrderChildState(dataModel.State);
      self.LastUpdateDate = dataModel.LastUpdateDate.ClearT().ConvertToDate().Format('yyyy-MM-dd hh:mm:ss');
      self.CreateTime = dataModel.CreateTime.ClearT().ConvertToDate().Format('yyyy-MM-dd hh:mm:ss');
      self.Relation = dataModel.Relation;
    }

    //订单状态
    convertOrderChildState = function(orderState){
      var orderStateText = "未知状态";
      mallConst.OrderChildState.forEach(function(item, inde, array){
        if (item.Value == orderState){
          orderStateText = item.Text;
        }
      })
      return orderStateText;
    }

  };
  return AppointmentModel;
});
