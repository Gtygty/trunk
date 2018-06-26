define(['Extend', 'common/const'], function (Extend, Const) {
  var messageAutoSendModel = function () {
    var format = {
      ToHzExamtypeName: function(value){
        var result = '';
        if(value.length){
          for (var i = 0; i < Const.PhysicalExamTypeData.length; i++) {
            var item = Const.PhysicalExamTypeData[i];
            if (item.value == value[0]) {
              result = item.text;
              break;
            }
          }
        }
        return result;
      }
    };
    var self = this;
    self.Notes = {              // 短信模板 ViewModel
      Id: 0,
      Content: '',
      Checked: false
    };
    self.PlansDDL = {           // 推广计划 ViewModel
      value: '',
      //text: '',
      label: '',
      title: '',
      selected: false
    };
    self.PlansDeptDDL = {       // 推送机构 ViewModel
      value: '',
      text: ''
    };
    self.PlansList = {          // 自动Send List ViewModel
      Id: 0,
      Title: '',
      Content: '',
      DeptIDs: '',
      DeptName: '',
      StartDate: '',
      EndDate: '',
      ReWeek: '',
      Status: 0,
      PreSendDays: 0,
      SendType: 0,
      SendTypeName: '',
      HzExamtype: [],
      HzExamtypeName: '',
      isChecked: false,
      IsReSendPlan: false
    };
    self.convertFromNotes = function (dataModel) {          // 短信模板
      self.Notes.Id = dataModel.Id;
      self.Notes.Content = dataModel.Content;
      self.Notes.Checked = dataModel.Checked || false;
    };
    self.convertFromPlansDDL = function (dataModel) {       // 推广计划 DLL
      self.PlansDDL.value = dataModel.ID;     //ID 全大写 数据来源
      self.PlansDDL.text = dataModel.Theme;
    };
    self.convertFromPlansDeptDDL = function (dataModel) {   // 推送机构 DLL
      self.PlansDeptDDL.value = dataModel.Id;
      //self.PlansDeptDDL.text = dataModel.Name;
      self.PlansDeptDDL.title = dataModel.Name;
      self.PlansDeptDDL.label = dataModel.Name;
      self.PlansDeptDDL.selected = false;
      //label: 'Option 1', title: 'Option 1', value: '1', selected: true
    };
    self.convertFromPlansListToParam = function (planModel, sysConfig, depts,solutionType) {
      var ServiceDeptIDs = !planModel.DeptName ? '' : planModel.DeptName;
      var Start = !planModel.StartDate ? '' : planModel.StartDate.split('/').join('-');
      var End = !planModel.EndDate ? '' : planModel.EndDate.split('/').join('-');
      var isTime = planModel.Time.indexOf(':') == -1;
      var Hour = isTime ? planModel.Time : planModel.Time.split(':')[0];
      var Minute = isTime ? 0 : planModel.Time.split(':')[1];
      // 发送内容中 添加进入APP的链接
      //http://hzswvajgs01:100/SMSPromotion.html#/1/1/bjbr002/1
      var ext = sysConfig['EXT']['default'];
      var orgName = '';
      var date = '';

      var Date="";
      var SolutionType=1;
      if(solutionType&&solutionType==2){
        Start = !planModel.LandingStartDate ? '' : planModel.LandingStartDate.split('/').join('-');
        End = !planModel.LandingEndDate ? '' : planModel.LandingEndDate.split('/').join('-');
        isTime = planModel.ExcuteTime.indexOf(':') == -1;
        Hour = isTime ? planModel.ExcuteTime : planModel.ExcuteTime.split(':')[0];
        Minute = isTime ? 0 : planModel.ExcuteTime.split(':')[1];
        Date =!planModel.Date ? '' : planModel.Date.split('/').join('-');
        SolutionType=2;
      }

      if (planModel.IsHead) {   // 如果包含头部信息
        date = sysConfig['DATE']['default'];
        if (ServiceDeptIDs.length == 1) {       // 判断用户是否只选择一条记录
          for (var i = 0; i < depts.length; i++) {
            if (depts[i].Id == ServiceDeptIDs[0]) {
              orgName = encodeURIComponent(depts[i].Name);
              if (!!depts[i].DeptKey) {
                if (sysConfig['EXT'][depts[i].DeptKey]) {
                  ext = sysConfig['EXT'][depts[i].DeptKey];
                }
                if (sysConfig['DATE'][depts[i].DeptKey]) {
                  date = sysConfig['DATE'][depts[i].DeptKey];
                }
              }
              break;
            }
          }
        }
      }
      // 区分短信和地推地址，添加type=1为短信操作。
      var Content = date + planModel.PlanContent + sysConfig['TIP'] + '[CDATA[' + sysConfig.GetURL() + '/1/{msmid}/{mobile}/{org}/{orgname}]]' + ext;
      var data = {
        Theme: planModel.PlanName,
        Template: Content,
        OperateType: 1,       // 0. 健管师  1.运维
        OperateId: planModel.OperateId,
        ServiceDeptIDs: ServiceDeptIDs,
        IsAutoSend: true,
        Start: Start,
        End: End,
        Hour: Hour,
        Minute: Minute,
        HzExamtype: planModel.SelectPhysicalExamType.join(),
        SendType: planModel.SelectExecType,
        PreSendDays: planModel.SelectTimeitem,
        PlanType: planModel.PlanType,
        ParentID: planModel.ParentID,
        IsHead: planModel.IsHead,
        SolutionType:SolutionType,
      };

      if(solutionType&&solutionType==2){
        data.Date=Date;
      }
      return data;
    };

    self.convertFromPlansList = function (dataModel, sysConfig) {     // 自动Send List
      var flag = sysConfig['TIP'] + '[CDATA[',
        startFlag = ']]',
        Content = dataModel.Template.indexOf(flag) == -1 ? dataModel.Template : dataModel.Template.substr(0, dataModel.Template.indexOf(flag)),
        reWeek = function (hour, minute) {
          var _hourTag = hour > 9 ? '' : '0',
            _minuteTag = minute > 9 ? '' : '0';
          return _hourTag + hour + ':' + _minuteTag + minute;
        },
        getTypeName = function (type) {
          if (type == 2) {
            return '个检';
          } else if (type == 1) {
            return '团检';
          } else {
            return '默认';
          }
        },
        ExectionYypeState = function (dataModel) {
          // debugger
          // 根据方案类型来判断服务是否结束
          var AA = new Date(),
            DD = AA.Format('yyyy/MM/dd/hh/mm/ss'),
            arr = DD.split('/'),
            starttime = new Date(arr[0], arr[1], arr[2]),
            starttimes = starttime.getTime(),
            BB = dataModel.SolutionType == 2 ? dataModel.AutoSendTime.replace('T', ' ').split(' ') : dataModel.AutoSendEnd.replace('T', ' ').split(' '),
            CC = BB[0],
            arrs = CC.split('-'),
            times = BB[1].split(':'),
            lktime = new Date(arrs[0], arrs[1], arrs[2]),
            lktimes = lktime.getTime();

          if (dataModel.SolutionType == 2) {
            var time1 = new Date(arr[0], arr[1], arr[2], arr[3], arr[4]).getTime(),
                time2 = new Date(arrs[0], arrs[1], arrs[2], times[0], times[1]).getTime();

            if (time1 > time2 || (arr[0] == arrs[0] && arr[1] == arrs[1] && arr[2] == arrs[2] && arr[3] == times[0] && arr[4] == times[1])) {
              return dataModel.ExecutionState = 0;
            }else{
              return dataModel.ExecutionState;
            }
          } else {
            if (starttimes > lktimes) {
              return dataModel.ExecutionState = 0;
            } else {
              return dataModel.ExecutionState;
            }
          }


        };
      Content = Content.indexOf(startFlag) == -1 ? Content : Content.substr(Content.indexOf(startFlag) + startFlag.length, Content.length);
      var HzExamtype = !dataModel.HzExamtype ? [] : [dataModel.HzExamtype];

      self.PlansList.Id = dataModel.ID;
      self.PlansList.Title = dataModel.Theme;
      self.PlansList.Content = Content;
      self.PlansList.DeptIDs = dataModel.DeptIDs.toString();
      self.PlansList.DeptName = dataModel.DeptNames.toString();
      self.PlansList.StartDate = dataModel.AutoSendStart;
      self.PlansList.EndDate = dataModel.AutoSendEnd;
      self.PlansList.ReWeek = reWeek(dataModel.Hour, dataModel.Minute);

      self.PlansList.Status = ExectionYypeState(dataModel);
      self.PlansList.PreSendDays = dataModel.PreSendDays;
      self.PlansList.SendType = dataModel.SendType;
      self.PlansList.SelectPhysicalExamType = HzExamtype;

      self.PlansList.SolutionType=dataModel.SolutionType;

      self.PlansList.HzExamtypeName = format.ToHzExamtypeName(HzExamtype),
      self.PlansList.SendTypeName = getTypeName(dataModel.SendType);
      self.PlansList.isChecked = false;
      self.PlansList.IsHead = dataModel.IsHead;
      self.PlansList.IsReSendPlan = dataModel.PlanNum; // 当计划数据大于一条时，说明已发送二次或补发记录
    };
  };
  return messageAutoSendModel;
});
