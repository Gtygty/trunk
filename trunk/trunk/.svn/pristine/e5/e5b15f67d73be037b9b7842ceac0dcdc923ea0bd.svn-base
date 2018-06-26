/**
 * Created by hzguest3 on 2017/7/18.
 */
define(["Extend",'common/MallConst'], function (Extend,mallConst) {
  var AppointmentStateModel = function () {
    var self = this;
    self.AppointmentState;
    self.ConvertFrom = function(dataModel){
      this.AppointmentState = convertAppointmentState(dataModel);
    }

    //订单状态
    convertAppointmentState = function(appointmentState){
      var appointmentStateText = "未知状态";
      mallConst.AppointmentState.forEach(function(item, inde, array){
        if (item.Value == appointmentState){
          appointmentStateText = item.Text;
        }
      })
      return appointmentStateText;
    }

  };
  return AppointmentStateModel;
});
