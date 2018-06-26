/* eslint-disable no-undef */
define(['indexApp', 'underscore', 'jquery', 'common/util', 'Extend', 'common/const', 'sysConfig', 'common/BaseInfoManager', 'model/messageDeptListModel', 'model/messageAutoSendModel', 'directives/validateDirective', 'jQueryUi', 'timePicker', 'bootStrapMultiselect', 'service/baseService'],
  function (app, _, $, util, Extend, constant, sysConfig, BaseManager, MessageDeptListModel, AutoSendModel) {
    app.controller('messageCtrl', ['$scope', '$http', 'signValid', function ($scope, $http, signValid) {
      $('body').css('overflow', 'auto');
      var COMMON = {
        URLS: {
          GetAllDept: 'ServiceDept/GetAllServiceDepts',
          GetDeptBySearch: 'ServiceDept/GetAllServiceDeptsSearch?name={0}&enable={1}',
          SetSendSms: 'ServiceDept/SetServiceDeptSendSms?serviceDeptID={0}&sendSms=true',
          SetSendSmsEnabeld: 'ServiceDept/SetServiceDeptSendSmsEnabeld?serviceDeptID={0}&isSendSmsEnabeld={1}',

          GetSMSTotal: 'Sms/GetSmsMargin',

          GetSmsTemplate: 'Sms/GetSmsTemplates',
          SetSmsTemplate: 'Sms/AppendSmsTemplate',
          DelSmsTemplate: 'Sms/DeleteSmsTemplate?smsTemplateID={0}',

          GetSmsPlan: 'Sms/GetSmsSended',
          SaveSmsPlan: 'Sms/AppendSmsPlan',
          SingleAppendSmsPlan: 'Sms/SingleAppendSmsPlan',
          SetPlanState: 'Sms/UpdateOperateState',
          //  获取指定机构分类 serviceDeptIds
          CompareServiceDeptIdByServiceDeptId: 'ServiceDept/CompareServiceDeptIdByServiceDeptId'
        },
        ENUMS: {
          PLANTYPE: { FirstSend: 1, SecondSend: 2, ThirdlySend: 3 }   /* 1: 首次计划 2:二次计划 3:补发 */
        },
        SETTINGS: {
          DateSetting: {
            changeMonth: true,
            buttonImageOnly: true,
            dateFormat: 'yy/mm/dd',
            monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            dayNamesMin: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            minInterval: (1000 * 60 * 60 * 24 * 0), // 1 days
            onClose: function (dateText, inst) { }
          },
          TimeSetting: {
            //hourMin: 8,
            //hourMax: 16
            timeOnlyTitle: '--请选择时间--',
            timeText: '时间',
            hourText: '时',
            minuteText: '分',
            secondText: '秒',
            currentText: '当前时间',
            closeText: '关闭',
            onClose: function (dateText, inst) { }
          },
          MultiSetting: {
            selectAllText: '选择全部',
            allSelectedText: '全部选中',
            nSelectedText: '个被选中',
            nonSelectedText: '--全部--',
            filterPlaceholder: '查询机构',
            buttonWidth: '155px',
            enableFiltering: true,
            includeSelectAllOption: true,
            onDropdownHidden: function (option, checked, select) { }
          }
        },
        ValidDefault: function (input) {                    /* 验证 默认值 */
          if (input === -1 || input === '-1' || input === undefined || input === null || input === '')
            return '';
          return input;
        },
        FormatStringVal: function (str) {                   /* 格式化 - 字符串 */
          return str.replace('的体检电子报告已完成,', '');
        },
        FormatDateAcross: function (input) {                /* 格式化 - 时间 */
          if (input && input.indexOf('/') != -1) {
            return input.split('/').join('-');
          }
          return input || '';
        },
        FormatDateSlope: function (input) {                 /* 格式化 / 时间 */
          if (input && input.indexOf('-') != -1) {
            return input.split('T')[0].split('-').join('/');
          }
          return input || '';
        },
        PreOneDay: function (value) {
          var common = $scope.vm.TabCollection.Common,
            maxValue = common.Timeitems[common.Timeitems.length - 1].vlaue;
          if (value > maxValue) return maxValue;
          else return (value - 0 + 1);
        },
        PreOneDate: function (input, number) {
          var inc = COMMON.FormatDateSlope(input),
            number = number || 1;
          if (inc) {
            var days = inc.split('/'),
              year = days[0],
              month = (days[1] - 0),
              day = (days[2] - 0),
              addDay = 24 * 60 * 60 * 1000 * number,
              now = new Date(year, month, day, 1, 1, 1),
              adjustDate = new Date(now.getTime() + addDay);
            return String.prototype.format('{0}/{1}/{2}', adjustDate.getFullYear(), adjustDate.getMonth(), adjustDate.getDate());
          }
          return '';
        },
        DiffDateAdd: function (input, number) {

          var now = new Date(),
            currentTime = now.getTime(),
            inc = input.split(' '),
            number = number || 0;
          if (inc) {
            var days = inc[0].split('/'),
              times = inc[1].split(':'),
              year = days[0],
              month = (days[1] - 0),
              day = (days[2] - 0),
              h = times[0],
              m = times[1],
              addDay = 1000 * number,
              newNow = new Date(year, month, day, h, m, 0),
              adjustTime = newNow.getTime() + addDay;
            return currentTime > adjustTime;
          }
          return false;
        },
        SearchPlanList: function (options) {                /* 查询 短信计划 */
          var opts = _.extend({ currentObj: null, planType: null }, options);
          if (!opts.currentObj || !opts.planType) {
            util.showFade('查询计划列表的参数不能为空!');
            return;
          }

          var depts = $scope.vm.DeptCollection,
            url = COMMON.URLS.GetSmsPlan,
            data = {
              smsSendedID: COMMON.ValidDefault(opts.currentObj.SelectPlan),
              serviceDeptID: (opts.currentObj.SelectDept.length == depts.AddedDeptList.length ? '' : (opts.currentObj.SelectDept || '')),
              executionState: COMMON.ValidDefault(opts.currentObj.SelectState),
              sendType: COMMON.ValidDefault(opts.currentObj.SelectExecType),
              start: COMMON.FormatDateAcross(opts.currentObj.SelectStartDate),
              end: COMMON.FormatDateAcross(opts.currentObj.SelectEndDate),
              smsPlanType: COMMON.ValidDefault(opts.currentObj.SelectPlanType),
              planType: opts.planType
            };
          opts.currentObj.IsSearched = true;
          util.ajaxPost($http, url, data, function (result) {
            // console.log(result);
            if (result.state == 1) {
              var tempData = [];
              for (var i = 0; i < result.Data.length; i++) {
                var item = result.Data[i];
                var model = new AutoSendModel();
                model.convertFromPlansList(item, sysConfig.autoSend);
                tempData.push(model.PlansList);
              }
              opts.currentObj.List = tempData;
            } else util.showFade(result.message);
          }, function (err) { });
        },
        ModifyPlanState: function (options, callback) {  /* 修改 短信计划的 状态 */
          if (!options.Ids || !_.isArray(options.Ids)) {
            util.showFade('请选择您要操作的计划编号!');
            return;
          }
          if (options.State < 0 || options.State > 2) {
            util.showFade('修改的计划状态错误!');
            return;
          }
          if (!callback || !_.isFunction(callback)) {
            util.showFade('修改的计划必须有回调方法!');
            return;
          }

          var url = COMMON.URLS.SetPlanState,
            data = {
              planIDs: options.Ids,
              OperateState: options.State
            };
          util.ajaxPost($http, url, data, function (result) {
            if (result.state == 1) {
              callback(result.Data);
            }
            util.showFade(result.message);
          }, function (err) { });
        },
        SavePlan: function (options, callback) {                 /* 保存 短信计划 */
          var opts = _.extend({ currentObj: null, currentPlan: null, planDeptId: null }, options);
          if (!opts.currentObj) {
            util.showFade('保存计划的参数不能为空!');
            return;
          }
          var depts = $scope.vm.DeptCollection,
            firstPlan = opts.currentPlan,
            model = new AutoSendModel(),
            url = COMMON.URLS.SaveSmsPlan;
          url2 = COMMON.URLS.SingleAppendSmsPlan;


          if (firstPlan.SelectExecType == '-1') {
            util.showFade('请选择计划分类！');
            return;
          }
          if (firstPlan.SelectPhysicalExamType.length > 1) {
            util.showFade('最多只能选择一个体检者分类！');
            return;
          }
          if (!firstPlan.PlanName) {
            util.showFade('计划名称不能为空！');
            return;
          }
          if (!firstPlan.PlanContent) {
            util.showFade('计划内容不能为空！');
            return;
          }
          var deptDLLVal = $(opts.planDeptId).val();
          if (!deptDLLVal && _.isString(firstPlan.DeptName)) {
            if (firstPlan.DeptName.indexOf(',' != -1)) {
              deptDLLVal = firstPlan.DeptName.split(',');
              firstPlan.DeptName = firstPlan.DeptName.split(',');
            }
          }
          if (!firstPlan.DeptName.length) {
            util.showFade('请选择相关机构！');
            return;
          }

          COMMON.CompareServiceDeptIdByServiceDeptId({ serviceDeptIds: firstPlan.DeptName }, function (isOk) {
            if (isOk || firstPlan.SelectPhysicalExamType.length == 0) {
              if (!firstPlan.StartDate && firstPlan.SolutionType == 1) {
                util.showFade('计划开始日期不能为空！');
                return;
              }
              if (!firstPlan.EndDate && firstPlan.SolutionType == 1) {
                util.showFade('计划结束日期不能为空！');
                return;
              }
              if (!firstPlan.Time && firstPlan.SolutionType == 1) {
                util.showFade('计划重复时间不能为空！');
                return;
              }
              if (!firstPlan.Date && firstPlan.SolutionType == 2) {
                util.showFade('计划日期不能为空！');
                return;
              }
              if (!firstPlan.ExcuteTime && firstPlan.SolutionType == 2) {
                util.showFade('计划执行时间不能为空！');
                return;
              }
              if ((!firstPlan.LandingStartDate || !firstPlan.LandingEndDate) && firstPlan.SolutionType == 2) {
                util.showFade('落地起止时间不能为空！');
                return;
              }

              var userInfo = BaseManager.UserInfoManager.GetUserInfo();
              if (!userInfo) {
                util.showFade('获取当前人信息失败，请重试！');
                return;
              }
              firstPlan.OperateId = userInfo.Id;
              var data = model.convertFromPlansListToParam(firstPlan, sysConfig.autoSend, depts.AddedDeptList,firstPlan.SolutionType);
              // console.log(data);
              if (firstPlan.SolutionType == 2) {
                util.ajaxPost($http, url2, data, function (result) {
                  if (result.state == 1) {
                    if (opts.currentObj.IsSearched) {
                      opts.currentObj.OnClickSearch();
                    }
                    callback && callback(result.Data);
                    firstPlan.OnReset();
                    firstPlan.OnClose();
                  }
                  util.showFade(result.message);
                }, function (err) { });
              }
              else{
                util.ajaxPost($http, url, data, function (result) {
                  if (result.state == 1) {
                    if (opts.currentObj.IsSearched) {
                      opts.currentObj.OnClickSearch();
                    }
                    callback && callback(result.Data);
                    firstPlan.OnReset();
                    firstPlan.OnClose();
                  }
                  util.showFade(result.message);
                }, function (err) { });
              }
            } else {
              util.showFade('部分机构未设置体检者短信分类维护！');
            }
          });
        },
        ResetSearchParam: function (options) {              /* 重置 短信计划的 查询条件 */
          var common = $scope.vm.TabCollection.Common,
            opts = _.extend({
              sendObj: null, multiId: null, startDate: null, endDate: null
            }, options);

          if (!opts.sendObj || !opts.multiId || !opts.startDate || !opts.endDate) {
            util.showFade('重置的参数不能为空!');
            return;
          }

          common.MultiSelect.Clear(opts.multiId);
          common.Dates.Clear(opts.startDate, opts.endDate);

          opts.sendObj.SelectEndDate = '';
          opts.sendObj.SelectStartDate = '';
          opts.sendObj.SelectPlan = -1;
          opts.sendObj.SelectExecType = -1;
          opts.sendObj.SelectState = -1;

          opts.startDate.val('');
          opts.endDate.val('');
        },
        CompareServiceDeptIdByServiceDeptId: function (options, callback) {
          var url = COMMON.URLS.CompareServiceDeptIdByServiceDeptId,
            data = options.serviceDeptIds;
          util.ajaxPost($http, url, data, function (result) {
            if (result.state == 1) {
              callback(result.Data);
            } else {
              util.showFade(result.message);
            }

          }, function (err) { });
        }
      };

      ($scope.vm = {
        MesStatus: 'frist',  // 添加当前标签页状态 Frist:自动发送 Second:二次发送
        SMSTotal: 0,
        IsSendEnabled: true, // 是否开始发送状态
        DeptCollection: {
          CurrentEnabledID: 0,

          //左侧栏中的所有机构
          SearchParam: '',
          SelectAddDeptDialogByDepts: -1,
          AddDeptDialogByDepts: [],

          EnableDeptLists: [],
          DisableDeptLists: [],
          AddedDeptList: [],
          DefaultDeptList: [],

          OnLoadAllDepts: function () {               /* 查询 所有机构信息 */
            var tabs = $scope.vm.TabCollection,
              common = tabs.Common,
              dept = $scope.vm.DeptCollection,
              enableDeptLists = [],
              disableDeptLists = [],
              addedDeptList = [],
              defaultDeptList = [];

            util.ajaxGet($http, COMMON.URLS.GetAllDept, function (result) {
              if (result.state == 1) {
                for (var i = 0; i < result.Data.length; i++) {
                  var item = result.Data[i],
                    model = new MessageDeptListModel();
                  model.convertFrom(item);
                  if (model.IsSendSms) {
                    addedDeptList.push(model);
                    if (model.IsSendSmsEnabled) {
                      enableDeptLists.push(model);
                    } else {
                      disableDeptLists.push(model);
                    }
                  } else {
                    defaultDeptList.push(model);
                  }
                }
                dept.EnableDeptLists = enableDeptLists;
                dept.DisableDeptLists = disableDeptLists;
                dept.AddedDeptList = addedDeptList;
                dept.DefaultDeptList = defaultDeptList;

                // 加载（自动发送） 推广机构
                common.OnLoadAutoSendDepts();
                common.OnLoadAutoSendDeptsByFristPlanDialog();
                // $("#txt1").css({color:"#ff0011",background:"blue"});
              }
            }, function (error) { });
          },
          OnSetSendSmsReloadAllDepts: function () {   /* 重设发送信息机构 */
            var depts = $scope.vm.DeptCollection,
              url = String.prototype.format(COMMON.URLS.SetSendSmsEnabeld, depts.SelectAddDeptDialogByDepts, true);

            util.ajaxPost($http, url, {}
              , function (result) {
                if (result.state == 1) {
                  // 重新加载所有机构
                  depts.OnLoadAllDepts();
                  $('#messageAdd').modal('hide');
                  util.showFade('启用机构成功!');
                }
              }, function (error) { });
          },

          /* 查询 相关机构操作 */
          OnClickSearchDept: function () {
            var searchParam = $scope.vm.DeptCollection.SearchParam,
              isSendEnabled = $scope.vm.IsSendEnabled,
              model = new MessageDeptListModel(),

              url = String.prototype.format(COMMON.URLS.GetDeptBySearch, searchParam, isSendEnabled);

            util.ajaxGet($http, url
              , function (result) {
                //
                var tempData = [];
                if (result.state == 1) {
                  if (result.Data && result.Data.length)
                    for (var i = 0; i < result.Data.length; i++) {
                      var item = model.converSearch(result.Data[i]);
                      tempData.push(item);
                    }
                }
                if (isSendEnabled) {
                  $scope.vm.DeptCollection.EnableDeptLists = tempData;
                } else {
                  $scope.vm.DeptCollection.DisableDeptLists = tempData;
                }
              }, function (error) { });
          },
          OnClickAddDeptDialog: function () {         /* 添加 相关机构操作 */
            var depts = $scope.vm.DeptCollection,
              tempData = [{ Name: '请选择机构', Id: -1 }];
            for (var i = 0; i < depts.DefaultDeptList.length; i++) {
              tempData.push({
                Name: depts.DefaultDeptList[i].Name,
                Id: depts.DefaultDeptList[i].Id
              });
            }
            depts.AddDeptDialogByDepts = tempData;
            depts.SelectAddDeptDialogByDepts = -1;
          },
          OnClickSaveAddDept: function () {           /* 保存 添加的相关机构操作 */
            var depts = $scope.vm.DeptCollection,
              url = String.prototype.format(COMMON.URLS.SetSendSms, depts.SelectAddDeptDialogByDepts, true);

            if (depts.SelectAddDeptDialogByDepts == -1) {
              util.showFade('请选择要添加的机构');
              return;
            }
            util.ajaxPost($http, url, {}, function (result) {
              if (result.state == 1) {
                depts.OnSetSendSmsReloadAllDepts();
              }
            }, function (error) { });
          },
          OnShowEnabledDeptDialog: function (item) {  /* 打开启用/禁用机构 对话框 */
            $scope.vm.DeptCollection.CurrentEnabledID = item.Id;
          },
          OnSaveEnabledDeptDialog: function () {      /* 启用机构操作 */
            var Disable = $scope.vm.DeptCollection,
              self = $scope.vm.TabCollection.Common,
              currentId = $scope.vm.DeptCollection.CurrentEnabledID,
              url = String.prototype.format(COMMON.URLS.SetSendSmsEnabeld, currentId, true);
            util.ajaxPost($http, url, {}, function (result) {
              if (result.state == 1) {
                // $('#messageAdd').modal('hide');
                for (var i = 0; i < Disable.DisableDeptLists.length; i++) {
                  if (Disable.DisableDeptLists[i].Id == currentId) {
                    Disable.DisableDeptLists[i].IsSendSmsEnabled = true;
                    Disable.EnableDeptLists.push(Disable.DisableDeptLists[i]);
                    Disable.DisableDeptLists.splice(i, 1);
                  }
                }
                self.OnLoadAutoSendDeptsByFristPlanDialog();
                util.showFade('启用机构成功!');
              }
            }, function (error) { });
          },
          OnSaveDiabledDeptDialog: function () {     /* 禁用机构操作 */
            var Enable = $scope.vm.DeptCollection,
              self = $scope.vm.TabCollection.Common,
              currentId = $scope.vm.DeptCollection.CurrentEnabledID,
              url = String.prototype.format(COMMON.URLS.SetSendSmsEnabeld, currentId, false);
            util.ajaxPost($http, url, {}, function (result) {
              if (result.state == 1) {
                // $('#messageAdd').modal('hide');
                for (var i = 0; i < Enable.EnableDeptLists.length; i++) {
                  if (Enable.EnableDeptLists[i].Id == currentId) {
                    Enable.EnableDeptLists[i].IsSendSmsEnabled = false;
                    Enable.DisableDeptLists.push(Enable.EnableDeptLists[i]);
                    Enable.EnableDeptLists.splice(i, 1);
                  }
                }
                self.OnLoadAutoSendDeptsByFristPlanDialog();
                util.showFade('禁用机构成功!');
              }
            }, function (error) { });
          },
          OnClickStopButton: function () {            /* 启用按钮 操作 */
            $('.sidebar-nav').animate({ left: '-300px' }, 500);
            $('#state').removeClass('clickbtn');
            $('#stop').attr('class', 'clickbtn');
            $scope.vm.IsSendEnabled = false;
          },
          OnClickStartButton: function () {            /* 停用按钮 操作 */
            $('.sidebar-nav').animate({ left: '0px' }, 500);
            $('#stop').removeClass('clickbtn');
            $('#state').attr('class', 'clickbtn');
            $scope.vm.IsSendEnabled = true;
          },
          Init: function () {
            $scope.vm.DeptCollection.OnLoadAllDepts();
          }
        },
        TabCollection: {

          Common: {
            ExecTypes: [],
            // 体检者分类
            PhysicalExamTypes: constant.PhysicalExamTypeData,
            States: [],
            PlanTypes: [
              { text: '全部', value: '-1' },
              { text: '方式一', value: '1' },
              { text: '方式二', value: '2' }
            ],
            Timeitems: [],
            PlanState: {
              Ids: [],
              State: 0
            },
            Dates: {
              //前置发送天数
              OnLoadLocalTime: function () {
                var tabs = $scope.vm.TabCollection,
                  autoSend = tabs.AutoSend,
                  firstPlan = autoSend.FirstPlan,
                  Timer = firstPlan.StartDate,
                  Val = firstPlan.SelectTimeitem;
                if (Timer) {
                  var d = new Date(Timer),
                    c = d.getDate() - Val;
                  d.setDate(c);
                  var a = d.getFullYear() + '年' + ((d.getMonth() < 9 ? '0' : '') + (d.getMonth() + 1)) + '月' + (d.getDate() < 10 ? '0' : '') + d.getDate() + '日 客户落地到数据中心的时间';
                  return a;
                }
                return '';
              },

              SetMinDate: function (id, selectedDate) {
                $('#' + id).datepicker('option', 'minDate', selectedDate);
              },
              // 加载 日期 首次发送列表中的
              OnLoadAutoSendListDate: function () {
                var autoSend = $scope.vm.TabCollection.AutoSend,
                  opts = $.extend(COMMON.SETTINGS.DateSetting, {
                    onClose: function (dateText, inst) {
                      if (inst) {
                        if (inst.id == 'autoSend_StartDate')
                          autoSend.SelectStartDate = dateText;
                        else if (inst.id == 'autoSend_EndDate')
                          autoSend.SelectEndDate = dateText;
                        $scope.$apply();
                      }
                    }
                  });
                $.timepicker.dateRange($('#autoSend_StartDate'), $('#autoSend_EndDate'), opts);
              },
              // 加载 日期 二次发送列表中的
              OnLoadSecondSendListDate: function () {
                var secondSend = $scope.vm.TabCollection.SecondSend,
                  opts = $.extend(COMMON.SETTINGS.DateSetting, {
                    onClose: function (dateText, inst) {
                      if (inst) {
                        if (inst.id == 'secondSend_StartDate')
                          secondSend.SelectStartDate = dateText;
                        else if (inst.id == 'secondSend_EndDate')
                          secondSend.SelectEndDate = dateText;
                        $scope.$apply();
                      }
                    }
                  });
                $.timepicker.dateRange($('#secondSend_StartDate'), $('#secondSend_EndDate'), opts);
              },
              // 加载 日期 首次发送中创建计划
              OnLoadAutoSendFirstPlanDialogDate: function () {
                var firstPlan = $scope.vm.TabCollection.AutoSend.FirstPlan,
                  opts = $.extend(COMMON.SETTINGS.DateSetting, {
                    onClose: function (dateText, inst) {
                      if (inst) {
                        if (inst.id == 'autoSend_Plan_StartDate')
                          firstPlan.StartDate = dateText;
                        else if (inst.id == 'autoSend_Plan_EndDate')
                          firstPlan.EndDate = dateText;
                        else if (inst.id == 'autoSend_Plan_Date')
                          firstPlan.Date = dateText;
                        else if (inst.id == 'autoSend_Plan_LandingStartDate')
                          firstPlan.LandingStartDate = dateText;
                        else if (inst.id == 'autoSend_Plan_LandingEndDate')
                          firstPlan.LandingEndDate = dateText;
                        $scope.$apply();
                      }
                    }
                  });
                $.timepicker.dateRange($('#autoSend_Plan_StartDate'), $('#autoSend_Plan_EndDate'), opts);
                $.timepicker.dateRange($('#autoSend_Plan_LandingStartDate'), $('#autoSend_Plan_LandingEndDate'), opts);
                $('#autoSend_Plan_Date').datepicker(opts);
              },
              // 加载 时间 首次发送中创建计划
              OnLoadAutoSendFirstPlanDialogTime: function () {
                var firstPlan = $scope.vm.TabCollection.AutoSend.FirstPlan,
                  opts = $.extend(COMMON.SETTINGS.TimeSetting, {
                    onClose: function (dateText, inst) {
                      if (inst && !!dateText) {
                        if (inst.id == 'autoSend_Plan_Time')
                          firstPlan.Time = dateText;
                        else if (inst.id == 'autoSend_Plan_ExcuteTime')
                          firstPlan.ExcuteTime = dateText;
                        $scope.$apply();
                      }
                    }
                  });
                $('#autoSend_Plan_Time').timepicker(opts);
                $('#autoSend_Plan_ExcuteTime').timepicker(opts);
                var now = new Date(),
                  year = now.getFullYear(),
                  month = now.getMonth() + 1,
                  day = now.getDate(),
                  hour = now.getHours(),
                  minute = now.getMinutes();
                //   dates = dateText.split('/');
                // if (dates[0] == year && dates[1] == month && dates[2] == day) {
                //   /* AutoSend PlanDialog 每天重复 开始时间 */
                //   minute += 6;
                //   if (minute > 59) {
                //     hour += 1;
                //     minute -= 60;
                //   }
                //   $('#autoSend_Plan_Time').timepicker('option', 'hourMin', hour);
                //   $('#autoSend_Plan_Time').timepicker('option', 'minuteMin', minute);
                // }
                minute += 6;
                if (minute > 59) {
                  hour += 1;
                  minute -= 60;
                }
                $('#autoSend_Plan_Time').timepicker('option', 'hourMin', hour);
                $('#autoSend_Plan_Time').timepicker('option', 'minuteMin', minute);
                $('#autoSend_Plan_ExcuteTime').timepicker('option', 'hourMin', hour);
                $('#autoSend_Plan_ExcuteTime').timepicker('option', 'minuteMin', minute);
              },
              // 加载 日期 二次发送创建计划
              OnLoadAutoSendSecondPlanDialogDate: function () {
                var secondPlan = $scope.vm.TabCollection.AutoSend.SecondPlan,
                  opts = $.extend(COMMON.SETTINGS.DateSetting, {
                    onClose: function (dateText, inst) {
                      if (inst) {
                        if (inst.id == 'autoSend_SecondPlan_StartDate')
                          secondPlan.StartDate = dateText;
                        else if (inst.id == 'autoSend_SecondPlan_EndDate')
                          secondPlan.EndDate = dateText;
                        $scope.$apply();
                      }
                    }
                  });
                $.timepicker.dateRange($('#autoSend_SecondPlan_StartDate'), $('#autoSend_SecondPlan_EndDate'), opts);
              },
              // 加载 日期 二次发送创建计划
              OnLoadAutoSendSecondPlanDialogTime: function () {
                var secondPlan = $scope.vm.TabCollection.AutoSend.SecondPlan,
                  opts = $.extend(COMMON.SETTINGS.TimeSetting, {
                    onClose: function (dateText, inst) {
                      if (inst && !!dateText) {
                        secondPlan.Time = dateText;
                        $scope.$apply();

                        var now = new Date(),
                          year = now.getFullYear(),
                          month = now.getMonth() + 1,
                          day = now.getDate(),
                          hour = now.getHours(),
                          minute = now.getMinutes(),
                          dates = dateText.split('/');
                        if (dates[0] == year && dates[1] == month && dates[2] == day) {
                          /* AutoSend PlanDialog 每天重复 开始时间 */
                          minute += 5;
                          if (minute > 59) {
                            hour += 1;
                            minute -= 60;
                          }
                          $('#autoSend_SecondPlan_Time').timepicker('option', 'hourMin', hour);
                          $('#autoSend_SecondPlan_Time').timepicker('option', 'minuteMin', minute);
                        }
                      }
                    }
                  });
                $('#autoSend_SecondPlan_Time').timepicker(opts);
              },

              Clear: function (jStartId, jEndId) {
                if (jStartId.length) {
                  jStartId.timepicker('option', 'maxDate', new Date(2099, 1, 1, 1, 1, 1));
                }
                if (jEndId.length) {
                  jEndId.timepicker('option', 'minDate', new Date());
                }
              }
            },

            //下拉框select
            MultiSelect: {
              //加载下拉框中的所有机构
              OnLoadDepts: function (id, data, settings) {
                settings = settings || {};
                var opts = _.extend(COMMON.SETTINGS.MultiSetting, settings, {
                  onDropdownHidden: function (option, checked, select) {
                    var currentVal = $(id).val();
                    if (currentVal) {
                      //自动发送中的推送机构 id
                      if (id == '#AutoSend_SelectDeptDDL')
                        $scope.vm.TabCollection.AutoSend.SelectDept = currentVal;
                      //二次发送记录中的推送机构 id
                      else if (id == '#secondSend_SelectDeptDDL')
                        $scope.vm.TabCollection.SecondSend.SelectDept = currentVal;
                      //创建计划下拉框的 id
                      else if (id == '#AutoSend_PlanDeptDDL')
                        $scope.vm.TabCollection.AutoSend.FirstPlan.DeptName = currentVal;
                      $scope.$apply();
                    }

                  }
                });
                $(id).multiselect(opts).multiselect('dataprovider', data);
              },

              //  OnSetDepts: function(id){

              //  },
              Clear: function (jId) {
                if (jId.length) {
                  jId.find('option:selected').each(function () {
                    $(this).prop('selected', false);
                  });
                  jId.multiselect('refresh');
                }
              }
            },
            //结束

            Template: {
              SelectTemplateId: -1,
              TemplateList: [],
              // 加载 所有信息 模板内容
              OnLoadAllTemplate: function () {
                var tabs = $scope.vm.TabCollection,
                  tpl = tabs.Common.Template,
                  url = COMMON.URLS.GetSmsTemplate;
                if (tpl.TemplateList.length)
                  return;
                util.ajaxGet($http, url, function (result) {
                  var tempData = [];
                  for (var i = 0; i < result.Data.length; i++) {
                    var item = result.Data[i];
                    var model = new AutoSendModel();
                    model.convertFromNotes(item);
                    tempData.push(model.Notes);
                  }
                  tpl.TemplateList = tempData;
                }, function (err) { });
              },
              //选择模板
              OnClickTemplate: function (item) {
                var tabs = $scope.vm.TabCollection,
                  tpl = tabs.Common.Template,
                  tplList = tpl.TemplateList;

                if (tpl.SelectTemplateId != item.Id) {
                  for (var i = 0; i < tplList.length; i++) {
                    if (item == tplList[i]) {
                      tplList[i].Checked = !tplList[i].Checked;
                      if (tplList[i].Checked)
                        tpl.SelectTemplateId = tplList[i].Id;
                    } else tplList[i].Checked = false;
                  }
                }
              },
              //删除模板
              OnClickDeleteTemplate: function () {
                var tabs = $scope.vm.TabCollection,
                  tpl = tabs.Common.Template,
                  templateId = tpl.SelectTemplateId,
                  url = String.prototype.format(COMMON.URLS.DelSmsTemplate, tpl.SelectTemplateId),
                  data = {};

                if (tpl.SelectTemplateId <= 0) {
                  util.showFade('请选择你要删除的模板！');
                  return;
                }

                if (confirm('您确认要删除此模板吗？')) {
                  util.ajaxPost($http, url, data, function (result) {
                    if (result.state == 1) {
                      tpl.SelectTemplateId = 0;
                      tpl.TemplateList = _.reject(tpl.TemplateList, function (item, index, items) {
                        return item.Id == templateId;
                      });
                    }
                    util.showFade(result.message);
                  }, function (err) { });
                }
              },
              OnClickSelectedTemplate: function () {
                var tabs = $scope.vm.TabCollection,
                  currentPlan = tabs.AutoSend.CurrentPlan,
                  tpl = tabs.Common.Template;

                if (!tpl.TemplateList.length) {
                  util.showFade('没有模板，请先创建模板！');
                  return;
                }
                if (tpl.SelectTemplateId <= 0) {
                  util.showFade('请选择您要使用的模板！');
                  return;
                }
                for (var i = 0; i < tpl.TemplateList.length; i++) {
                  var item = tpl.TemplateList[i];
                  if (item.Checked) {
                    currentPlan.PlanId = item.Id;
                    currentPlan.PlanContent = item.Content;
                    tpl.OnClose();
                  }
                }
              },
              OnSaveSmsTemplate: function (template) {  /* 添加 用户消息模板 */
                var common = $scope.vm.TabCollection.Common,
                  url = COMMON.URLS.SetSmsTemplate,
                  data = {
                    Template: template
                  };

                if (!template) {
                  util.showFade('请先录入你要创建的模板!');
                  return;
                }

                util.ajaxPost($http, url, data, function (result) {
                  if (result.state == 1) {
                    common.Template.TemplateList.unshift({
                      Id: result.Data, Content: template, Checked: false
                    });
                  }
                  util.showFade(result.message);
                }, function (err) { alert(err); });
              },
              OnClose: function () {
                $('#selectTemplate').modal('hide');
              }
            },

            SenStatusTop: function (item) {        // 标签页状态的切换
              var Top = $scope.vm;
              Top.MesStatus = item;
            },
            DecidePlan: function (PlanNum, Status) {   // 判断是否可以编辑短信计划
              if (PlanNum > 1) {
                return true;
              } else {
                if (Status == 0) {
                  return true;
                } else {
                  return false;
                }
              }
            },
            OnOpenPlanStateDialog: function (item) {
              var tabs = $scope.vm.TabCollection,
                common = tabs.Common;

              _.extend(common.PlanState, {
                Ids: [item.Id],
                State: item.Status
              });
            },
            OnChoosePlanstate: function (val) {         // 选择 需要修改计划的状态
              var tabs = $scope.vm.TabCollection,
                common = tabs.Common;
              // 赋给需要修改的状态
              _.extend(common.PlanState, {
                State: val
              });
              // 调用修改的状态的函数
              common.OnSavePlanStatesDialog();
            },
            OnOpenPlanStatesDialog: function (Event, planList, state) {
              var tabs = $scope.vm.TabCollection,
                common = tabs.Common,
                ids = [];
              for (var i = 0; i < planList.length; i++) {
                //  planList[i].isChecked && ids.push(planList[i].Id);
                if (planList[i].isChecked) {
                  ids.push(planList[i].Id);
                }
              }
              if (ids.length == 0) {
                util.showFade('请选择计划');
                Event.stopPropagation();
                return;
              }
              _.extend(common.PlanState, {
                Ids: ids,
                State: state
              });
            },
            OnSavePlanStatesDialog: function () {
              COMMON.ModifyPlanState($scope.vm.TabCollection.Common.PlanState, function () {
                var Tabs = $scope.vm,
                  Change = Tabs.TabCollection,
                  PlanState = Change.Common.PlanState;
                if (Tabs.MesStatus == 'frist') {
                  var Frist = Change.AutoSend;
                  for (var i = 0; i < Frist.List.length; i++) {
                    for (var j = 0; j < PlanState.Ids.length; j++) {
                      if (Frist.List[i].Id == PlanState.Ids[j] && Frist.List[i].Status != 0) {
                        Frist.List[i].Status = PlanState.State;
                      }
                    }
                  }
                } else if (Tabs.MesStatus == 'second') {
                  var Second = Change.SecondSend;
                  for (var i = 0; i < Second.List.length; i++) {
                    for (var j = 0; j < PlanState.Ids.length; j++) {
                      if (Second.List[i].Id == PlanState.Ids[j] && Second.List[i].Status != 0) {
                        Second.List[i].Status = PlanState.State;
                      }
                    }
                  }
                }
              });
            },
            OnLoadAutoSendExecTypes: function () {    /* 加载 计划分类 */
              $scope.vm.TabCollection.Common.ExecTypes = constant.AutoSendSelectPlan;
            },
            OnLoadAutoSendDepts: function () {        /* 加载 推送机构 */
              var tabs = $scope.vm.TabCollection,
                mSelect = tabs.Common.MultiSelect,
                depts = $scope.vm.DeptCollection,
                addedDeptList = depts.AddedDeptList,
                addedDeptListLength = addedDeptList.length;

              if (addedDeptListLength) {
                var tempData = []; //[{ label: "--全部--", title: "--全部--", selected: false, value: -1 }],
                for (var i = 0; i < addedDeptListLength; i++) {
                  var item = addedDeptList[i],
                    model = new AutoSendModel();
                  model.convertFromPlansDeptDDL(item);
                  tempData.push(model.PlansDeptDDL);
                }
                mSelect.OnLoadDepts('#AutoSend_SelectDeptDDL', tempData);
                mSelect.OnLoadDepts('#secondSend_SelectDeptDDL', tempData);
              }
            },
            OnLoadAutoSendDeptsByFristPlanDialog: function () {      /* 加载 推送机构对话框中 */
              var tabs = $scope.vm.TabCollection,
                depts = $scope.vm.DeptCollection,
                mSelect = tabs.Common.MultiSelect,
                addedDeptList = depts.EnableDeptLists,   //depts.AddedDeptList,修改为未禁用的机构
                addedDeptListLength = addedDeptList.length;

              if (addedDeptListLength) {
                var tempData = []; //[{ label: "--全部--", title: "--全部--", selected: false, value: -1 }],
                for (var i = 0; i < addedDeptListLength; i++) {
                  var item = addedDeptList[i],
                    model = new AutoSendModel();
                  model.convertFromPlansDeptDDL(item);
                  tempData.push(model.PlansDeptDDL);
                }
                // 初始化 first发送 的机构
                mSelect.OnLoadDepts('#AutoSend_PlanDeptDDL', tempData, { buttonWidth: '100% ' });
                // mSelect.OnLoadDepts('#AutoSend_PlanDeptDDL', tempData);
                // 初始化 Second发送 的机构
                // mSelect.OnLoadDepts('#AutoSend_SecondPlan', tempData);
              }
            },
            OnLoadAutoSendState: function () {        /* 加载 执行状态 */
              $scope.vm.TabCollection.Common.States = constant.AutoSendExecTypes;
            },
            OnLoadAutoSendTimeitem: function () {     /* 加载 前置发送天数 */
              $scope.vm.TabCollection.Common.Timeitems = constant.AutoSendTimeitem;
            }

          },


          //自动发送

          AutoSend: {
            CurrentPlan: null, // FirstPlan OR SecondPlan
            // 默认全选 为 false
            AllChecked: false,
            // 判断用户进入页面后是否已点击查询列表
            IsSearched: false,
            // autosend search 推广计划类型
            SelectPlanType: '-1',
            // autosend search 推广计划
            SelectPlan: -1,
            Plans: [{ value: -1, text: '--全部计划--' }],
            // autosend search 计划分类
            SelectExecType: -1,
            // autosend search 推送机构
            SelectDept: [],
            // autosend search 执行状态
            SelectState: -1,
            // autosend search 开始时间
            SelectStartDate: '',
            // autosend search 结束时间
            SelectEndDate: '',
            // autosend List
            List: [],
            // create first plan dialog
            FirstPlan: {
              // 是否显示短信分组分类
              IsServiceDeptExamType: false,
              OperateId: 0,
              // autosend create first plan 计划分类
              SelectExecType: -1,
              PlanId: 0,
              // autosend create first plan 计划名称
              DeptID: '',
              PlanName: '',
              // autosend create first plan 计划内容
              PlanContent: '',

              //创建计划中的下拉机构
              DeptName: [],

              //创建方式 一、二
              SolutionType: '',

              Date: '',
              ExcuteTime: '',
              LandingStartDate: '',
              LandingEndDate: '',

              StartDate: '',
              EndDate: '',
              Time: '',
              SelectTimeitem: 1,
              PlanType: COMMON.ENUMS.PLANTYPE.FirstSend,
              ParentID: null,
              IsHead: true,
              // 体检者分类 默认值: 1：其他
              SelectPhysicalExamType: [],
              OnSavePlan: function () {
                var autoSend = $scope.vm.TabCollection.AutoSend,
                  options = {
                    currentObj: autoSend,
                    currentPlan: autoSend.FirstPlan,
                    planDeptId: $('#AutoSend_PlanDeptDDL')
                  },
                  callback = function (result) {
                    // 回调 更新推广计划下拉列表
                    autoSend.Plans.splice(1, 0, {
                      value: result,
                      text: autoSend.FirstPlan.PlanName
                    });
                    // autoSend.FirstPlan.OnReset();
                    autoSend.FirstPlan.OnClose();
                  };

                COMMON.SavePlan(options, callback);
              },
              OnReset: function () {
                var tabs = $scope.vm.TabCollection,
                  autoSend = tabs.AutoSend,
                  firstPlan = autoSend.FirstPlan,
                  common = tabs.Common;

                firstPlan.OperateId = 0;
                firstPlan.PlanId = 0;
                firstPlan.PlanName = '';
                firstPlan.PlanContent = '';
                firstPlan.DeptName = [];
                firstPlan.SelectPlan = -1;
                firstPlan.SelectExecType = 0;
                // 体检者分类 默认值: 1：其他
                firstPlan.SelectPhysicalExamType = [];
                firstPlan.StartDate = '';
                firstPlan.EndDate = '';
                firstPlan.Time = '';
                firstPlan.SelectTimeitem = 1;

                firstPlan.Date = new Date().getFullYear()+"/"+(new Date().getMonth()+1)+"/"+new Date().getDate();
                firstPlan.ExcuteTime = '';
                firstPlan.LandingStartDate = '';
                firstPlan.LandingEndDate = '';

                for (var i = 0; i < common.PhysicalExamTypes.length; i++) {
                  common.PhysicalExamTypes[i].selected = false;
                }

                common.MultiSelect.Clear($('#AutoSend_PlanDeptDDL'));
                common.Dates.Clear($('#autoSend_Plan_StartDate'), $('#autoSend_Plan_EndDate'));
              },
              OnClose: function () {
                $('#createFirstPlan').modal('hide');
              }
            },
            // create second plan dialog
            SecondPlan: {
              // 是否显示短信分组分类
              IsServiceDeptExamType: false,
              OperateId: 0,
              // autosend create second plan 计划分类
              SelectExecType: -1,
              // autosend create second plan 计划分类名称
              SelectExecName: '',
              PlanId: 0,
              // autosend create second plan 计划名称
              PlanName: '',
              // autosend create second plan 计划内容
              PlanContent: '',
              // autosend create second plan 计划选择
              DeptNameDisplay: '',
              DeptName: [],
              StartDate: '',
              EndDate: '',
              Time: '',
              // 体检者分类 默认值: 1：其他
              SelectPhysicalExamType: [],
              SelectTimeitem: 0,
              PlanType: COMMON.ENUMS.PLANTYPE.SecondSend,
              ParentID: null,
              IsHead: true,
              SelectPhysicalExamType: [],
              // 点击创建计划传入参数
              OnSettingPlan: function (item) {
                // console.log(item);
                var tabs = $scope.vm.TabCollection,
                  autoSend = tabs.AutoSend,
                  dates = tabs.Common.Dates,
                  secondPlan = autoSend.SecondPlan,
                  common = tabs.Common,
                  now = new Date();
                //console.log(item);
                autoSend.CurrentPlan = secondPlan;

                secondPlan.ParentID = item.Id;
                secondPlan.SelectExecType = item.SendType;
                secondPlan.SelectExecName = item.SendTypeName;
                // secondPlan.PlanId = item.Id;
                secondPlan.PlanName = item.Title;
                secondPlan.PlanContent = COMMON.FormatStringVal(item.Content);
                secondPlan.DeptNameDisplay = item.DeptName;
                secondPlan.DeptName = item.DeptIDs;
                secondPlan.StartDate = COMMON.PreOneDate(item.StartDate);
                secondPlan.EndDate = COMMON.PreOneDate(item.EndDate);
                secondPlan.Time = item.ReWeek;
                secondPlan.SelectTimeitem = COMMON.PreOneDay(item.PreSendDays);
                secondPlan.SelectPhysicalExamType = item.SelectPhysicalExamType;
                for (var i = 0; i < common.PhysicalExamTypes.length; i++) {
                  common.PhysicalExamTypes[i].selected = (secondPlan.SelectPhysicalExamType.indexOf(common.PhysicalExamTypes[i].value) !== -1);
                }

                dates.SetMinDate('autoSend_SecondPlan_StartDate', now);
                dates.SetMinDate('autoSend_SecondPlan_EndDate', now);
                $('#createSecondPlan').modal('show');
              },
              OnSavePlan: function () {
                var autoSend = $scope.vm.TabCollection.AutoSend,
                  secondSend = $scope.vm.TabCollection.SecondSend,
                  options = {
                    currentObj: autoSend,
                    currentPlan: autoSend.SecondPlan,
                    planDeptId: $('#AutoSend_SecondPlan')
                  },
                  callback = function (result) {
                    // // 回调 更新推广计划下拉列表
                    // secondSend.Plans.splice(1, 0, {
                    //   value: result,
                    //   text: autoSend.SecondPlan.PlanName
                    // });
                  };
                COMMON.SavePlan(options, callback);
              },
              OnReset: function () {
                // 二次发送不需要重置
              },
              OnClose: function () {
                $('#createSecondPlan').modal('hide');
              }
            },
            OnLoadPlans: function () {   /* 加载 推广计划 */
              var autoSend = $scope.vm.TabCollection.AutoSend,
                planType = COMMON.ENUMS.PLANTYPE,
                url = COMMON.URLS.GetSmsPlan,
                data = { smsSendedID: '', serviceDeptID: '', executionState: '', start: '', end: '', planType: planType.FirstSend },
                tempData = [{ value: -1, text: '--全部计划--' }];

              util.ajaxPost($http, url, data
                , function (result) {
                  if (result.state == 1) {
                    for (var i = 0; i < result.Data.length; i++) {
                      var item = result.Data[i],
                        model = new AutoSendModel();
                      model.convertFromPlansDDL(item);
                      tempData.push(model.PlansDDL);
                    }
                    autoSend.Plans = tempData;
                  }
                }, function (error) { });
            },

            OnOpenFirstPlanDialog: function (solutionType) {
              var tabs = $scope.vm.TabCollection,
                common = tabs.Common,
                autoSend = tabs.AutoSend;
              //console.log(item);
              autoSend.FirstPlan.SelectPhysicalExamType = [];
              autoSend.CurrentPlan = autoSend.FirstPlan;

              if (!!solutionType) {
                if (autoSend.FirstPlan.SolutionType != solutionType) {
                  autoSend.FirstPlan.OnReset();
                }
                autoSend.FirstPlan.SolutionType = solutionType;
              }

              for (var i = 0; i < common.PhysicalExamTypes.length; i++) {
                common.PhysicalExamTypes[i].selected = false;
              }
            },

            OnClickSearch: function () {
              COMMON.SearchPlanList({
                currentObj: $scope.vm.TabCollection.AutoSend,
                planType: COMMON.ENUMS.PLANTYPE.FirstSend
              });
            },

            OnReset: function () {
              COMMON.ResetSearchParam({
                sendObj: $scope.vm.TabCollection.AutoSend,
                multiId: $('#AutoSend_SelectDeptDDL'),
                startDate: $('#autoSend_StartDate'),
                endDate: $('#autoSend_EndDate')
              });
            },
            OnClickAllChecked: function () {                 // 全选 和 全部不选
              var tabs = $scope.vm.TabCollection,
                autoSend = tabs.AutoSend,
                len = autoSend.List.length;
              if (len != 0) {
                for (var i = 0; i < autoSend.List.length; i++) {
                  autoSend.List[i].isChecked = autoSend.AllChecked;
                }
              } else {
                util.showFade('没有操作计划');
                autoSend.AllChecked = false;
              }
            },
            ChangeExamType: function (item) {
              var self = $scope.vm.TabCollection.AutoSend.FirstPlan,
                index = self.SelectPhysicalExamType.indexOf(item.value);

              if (item.selected) {
                if (self.SelectPhysicalExamType.length > 0) {
                  util.showFade('最多只能选择一个体检者分类！');
                  item.selected = false;
                  return;
                }
                if (index === -1) {
                  self.SelectPhysicalExamType.push(item.value);
                }
              } else if (index !== -1) {
                self.SelectPhysicalExamType.splice(index, 1);
              }
              // console.log(self.SelectPhysicalExamType);
            }
          },
          SecondSend: {
            // 默认全选 为 false
            AllChecked: false,
            // 判断用户进入页面后是否已点击查询列表
            IsSearched: false,
            // secondSend search 推广计划
            SelectPlan: -1,
            Plans: [{ value: -1, text: '--全部计划--' }],
            // secondSend search 计划分类
            SelectExecType: -1,
            // secondSend search 推送机构
            SelectDept: [],
            // secondSend search 执行状态
            SelectState: -1,
            // secondSend search 开始时间
            SelectStartDate: '',
            // secondSend search 结束时间
            SelectEndDate: '',
            // secondSend List
            List: [],
            ThreePlan: {
              OperateId: 0,
              // autosend create second plan 计划分类
              SelectExecType: -1,
              // autosend create second plan 计划分类名称
              SelectExecName: '',
              PlanId: 0,
              // autosend create second plan 计划名称
              PlanName: '',
              // autosend create second plan 计划内容
              PlanContent: '',
              // autosend create second plan 计划选择
              DeptNameDisplay: '',
              DeptName: [],
              StartDate: '',
              EndDate: '',
              Time: '',
              SelectTimeitem: 0,
              PlanType: COMMON.ENUMS.PLANTYPE.ThirdlySend,
              ParentID: null,
              IsHead: true,
              SelectPhysicalExamType: [],
              OnSettingPlan: function (item) {
                var tabs = $scope.vm.TabCollection,
                  thirdPlan = tabs.SecondSend.ThreePlan;
                // console.log(item);
                thirdPlan.ParentID = item.Id;
                thirdPlan.SelectExecType = item.SendType;
                thirdPlan.SelectExecName = item.SendTypeName;
                thirdPlan.PlanId = item.Id;
                thirdPlan.PlanName = item.Title;
                thirdPlan.PlanContent = COMMON.FormatStringVal(item.Content);
                thirdPlan.DeptNameDisplay = item.DeptName;
                thirdPlan.DeptName = item.DeptIDs;
                thirdPlan.StartDate = COMMON.PreOneDate(item.StartDate);
                thirdPlan.EndDate = COMMON.PreOneDate(item.EndDate);
                thirdPlan.Time = item.ReWeek;
                thirdPlan.IsHead = item.IsHead;
                thirdPlan.SelectTimeitem = COMMON.PreOneDay(item.PreSendDays);

                thirdPlan.SelectPhysicalExamType = item.SelectPhysicalExamType;

                $('#onThirdPlanDialog').modal('show');
              },
              OnSavePlan: function () {
                var secondSend = $scope.vm.TabCollection.SecondSend,
                  options = {
                    currentObj: secondSend,
                    currentPlan: secondSend.ThreePlan,
                    planDeptId: $('#AutoSend_SecondPlan')
                  },
                  callback = function (result) {
                    // 回调 更新推广计划下拉列表
                    // secondSend.Plans.splice(1, 0, {
                    //   value: result,
                    //   text: secondSend.ThreePlan.PlanName
                    // });
                  };
                COMMON.SavePlan(options, callback);
              },
              OnReset: function () {
                // 二次发送不需要重置
              },
              OnClose: function () {
                $('#onThirdPlanDialog').modal('hide');
              }
            },
            OnLoadPlans: function () {   /* 加载 推广计划 */
              var secondSend = $scope.vm.TabCollection.SecondSend,
                planType = COMMON.ENUMS.PLANTYPE,
                url = COMMON.URLS.GetSmsPlan,
                data = { smsSendedID: '', serviceDeptID: '', executionState: '', start: '', end: '', planType: planType.SecondSend },
                tempData = [{ value: -1, text: '--全部计划--' }];

              util.ajaxPost($http, url, data
                , function (result) {
                  if (result.state == 1) {
                    for (var i = 0; i < result.Data.length; i++) {
                      var item = result.Data[i],
                        model = new AutoSendModel();
                      model.convertFromPlansDDL(item);
                      tempData.push(model.PlansDDL);
                    }
                    secondSend.Plans = tempData;
                  }
                }, function (error) { });
            },
            OnClickSearch: function () {
              COMMON.SearchPlanList({
                currentObj: $scope.vm.TabCollection.SecondSend,
                planType: COMMON.ENUMS.PLANTYPE.SecondSend
              });
            },
            OnReset: function () {
              COMMON.ResetSearchParam({
                sendObj: $scope.vm.TabCollection.SecondSend,
                multiId: $('#secondSend_SelectDeptDDL'),
                startDate: $('#secondSend_StartDate'),
                endDate: $('#secondSend_EndDate')
              });
            },
            OnClose: function () {
              $('#createFirstPlan').modal('hide');
            },
            OnClickAllChecked: function () {                 // 全选 和 全部不选
              var tabs = $scope.vm.TabCollection,
                SecondSend = tabs.SecondSend,
                len = SecondSend.List.length;
              if (len != 0) {
                for (var i = 0; i < SecondSend.List.length; i++) {
                  SecondSend.List[i].isChecked = SecondSend.AllChecked;
                }
              } else {
                util.showFade('没有操作计划');
                SecondSend.AllChecked = false;
              }
            }
          },
          Init: function () {
            var tabs = $scope.vm.TabCollection,
              autoSend = tabs.AutoSend,
              secondSend = tabs.SecondSend,
              common = tabs.Common;
            /*      AutoSend Search Param      */
            // 加载 日期 首次发送列表中的
            common.Dates.OnLoadAutoSendListDate();
            common.Dates.OnLoadSecondSendListDate();

            // 加载 日期 首次发送中创建计划
            common.Dates.OnLoadAutoSendFirstPlanDialogTime();
            common.Dates.OnLoadAutoSendFirstPlanDialogDate();
            // 加载 日期 二次发送创建计划
            common.Dates.OnLoadAutoSendSecondPlanDialogTime();
            common.Dates.OnLoadAutoSendSecondPlanDialogDate();

            // 加载 推广计划
            autoSend.OnLoadPlans();
            secondSend.OnLoadPlans();
            // 加载 计划分类
            common.OnLoadAutoSendExecTypes();
            // 加载 推广机构  ref => OnLoadAllDepts
            // common.OnLoadAutoSendDepts();
            // 加载 执行状态
            common.OnLoadAutoSendState();
            // 加载 前置天数状态
            common.OnLoadAutoSendTimeitem();

            // 加载 所有信息 模板内容
            common.Template.OnLoadAllTemplate();
          }
        },
        OnLoadSMSTotal: function () {
          util.ajaxGet($http, COMMON.URLS.GetSMSTotal, function (result) {
            if (result.state == 1)
              $scope.vm.SMSTotal = result.Data;
            else util.showFade(result.message);
          }, function (err) { });
        },
        Init: function () {
          // 缓存登录验证
          signValid.ValidAccess('#/message');
          // 导航栏样式
          $('.nav li:eq(13)').addClass('active').siblings().removeClass('active');
          //选项卡
          $('#massageList .panel-body>span').click(function () {
            $(this).addClass('clickspan').siblings().removeClass('clickspan');
          });
          // 加载短信剩余条数
          $scope.vm.OnLoadSMSTotal();
          // 初始化机构
          $scope.vm.DeptCollection.Init();
          // 初始化发送和二次发送
          $scope.vm.TabCollection.Init();
        }
      }).Init();

    }]);
    return app;
  });
