/* eslint-disable no-undef */
define(['indexApp', 'common/util', 'common/Validation', 'common/BaseInfoManager', 'model/doctorPowerModel', 'service/baseService'], function (app, util, Validation, BaseInfoManager, DataModel) {

  app.factory('doctorPowerService', ['ajaxService', function (ajax) {
    var URL = {
        /* 医师健康分组 */
        DoctorPower: {
          // 	1.	获取最近10周的周定义数据
          GetLast10Weeks: 'DoctorPower/GetLast10Weeks',
          // 	2.	获取当前周平均竞争力信息
          // DoctorPower/GetAvgInfoByWeek?weekCode={weekCode}
          GetAvgInfoByWeek: 'DoctorPower/GetAvgInfoByWeek?weekCode={0}',
          //  3.	获取当前周指定健管师竞争力信息
          // DoctorPower/GetDoctorInfoByWeek?weekCode={weekCode}&doctorId={doctorId}
          GetDoctorInfoByWeek: 'DoctorPower/GetDoctorInfoByWeek?weekCode={0}&doctorId={1}',
          //  4.	获取当前周指定服务机构下的健管师竞争力信息
          // DoctorPower/GetDeptDoctorInfoByWeek?weekCode={weekCode}&doctorDeptId={doctorDeptId}
          GetDeptDoctorInfoByWeek: 'DoctorPower/GetDeptDoctorInfoByWeek?weekCode={0}&doctorDeptId={1}',
          //  5.	获取当前周健管师竞争力信息历史数据
          // DoctorPower/GetDoctorHistoryInfoByWeek?weekCode={weekCode}&doctorId={doctorId}
          GetDoctorHistoryInfoByWeek: 'DoctorPower/GetDoctorHistoryInfoByWeek?weekCode={0}&doctorId={1}',
          // 6.	获取服务机构
          // http://10.50.50.33:8523/DWApi/DoctorPower/GetAllDept
          GetAllDept: 'DoctorPower/GetAllDept'
        }
      },
      Valid = {
        DoctorPower: function (param) {
          // if (!param.deptId || param.deptId == -1) {
          //   util.showFade('所选机构不能为空！');
          //   return false;
          // }
          // if (!param.weekCode  || param.weekCode == -1) {
          //   util.showFade('所选周期不能为空！');
          //   return false;
          // }
          // return true;
          var valid = new Validation();
          valid.add(param.deptId, 'isSelectNoEmpty', '所选机构不能为空！');
          valid.add(param.weekCode, 'isSelectNoEmpty', '所选周期不能为空！');

          var errorMsg = valid.start();
          if(errorMsg){
              util.showFade(errorMsg);
              return false;
          }
          return true;
        }
      },
      ViewModel = {
        doctorPower: {
          GetDepts: function (options) {
            var url = URL.DoctorPower.GetAllDept,
                result = [],
                index = 0;

              ajax.GetDsp(url, function (datas) {
                if (datas) {
                  for (; index < datas.length; index++) {
                    var item = datas[index];
                    result.push({
                      text: item.deptName,
                      value: item.deptId
                    });
                  }
                }
                options.callback && options.callback(result);
              });
          },
          GetLast10Weeks: function (options) {
            var url = URL.DoctorPower.GetLast10Weeks,
              dataModel = new DataModel();
            ajax.GetDsp(url, function (datas) {
              var result = dataModel.convertLast10Weeks(datas);
              options.callback && options.callback(result);
            });
          },
          GetAvgInfoByWeek: function (options) {
            var weekCode = options.weekCode,
              url = String.prototype.format(URL.DoctorPower.GetAvgInfoByWeek, weekCode),
              dataModel = new DataModel();
            ajax.GetDsp(url, function (datas) {
              var result = dataModel.convertAvgInfoByWeek(datas);
              options.callback && options.callback(result);
            });
          },
          GetDeptDoctorInfoByWeek: function (options) {
            if (Valid.DoctorPower(options)) {
              var weekCode = options.weekCode,
                deptId = options.deptId,
                url = String.prototype.format(URL.DoctorPower.GetDeptDoctorInfoByWeek, weekCode, deptId),
                dataModel = new DataModel();
              ajax.GetDsp(url, function (datas) {
                var weeks = dataModel.convertDeptDoctorInfoByWeek(datas);

                if (options.callback) {
                  ViewModel.doctorPower.GetAvgInfoByWeek({
                    weekCode: options.weekCode,
                    callback: function (avgWeek) {
                      options.callback({
                        weeks: weeks,
                        avgWeek: avgWeek
                      });
                    }
                  });
                }
              });
            }
          },
          GetDoctorHistoryInfoByWeek: function (options) {
            var weekCode = options.weekCode,
              doctorId = options.doctorId,
              url = String.prototype.format(URL.DoctorPower.GetDoctorHistoryInfoByWeek, weekCode, doctorId),
              dataModel = new DataModel();
            ajax.GetDsp(url, function (datas) { //datas为历史周的数据

              var result = dataModel.convertDeptDoctorHistoryInfoByWeek(datas);
              options.callback && options.callback(result);
            });
          }
        }
      };

    return ViewModel;

  }]);

  return app;
});
