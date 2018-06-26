/* eslint-disable no-undef */
define(['indexApp'
      , 'common/util'
      , 'Extend'
      , 'common/const'
      , 'sysConfig'
      , 'common/BaseInfoManager'
      , 'model/postionCategoryModel'
      , 'model/doctorListModel'
      , 'model/serviceDeptItemModel'
      , 'jqueryMD5'
      , 'service/baseService'],
  function (app
          , util
          , Extend
          , Const
          , sysConfig
          , cacheUser
          , PostionCategoryModel
          , DoctorListModel
          , serviceDeptItemModel) {
    app.controller('serverCtrl', function ($scope, $http, signValid) {
      signValid.ValidAccess('#/server');                       //缓存登录验证
      //侧边栏样式
      $('.nav li:eq(0)').addClass('active').siblings().removeClass('active');
      $('body').css('overflow', 'auto');

      $scope.JobTypes = Const.JobTypes;//服务状态

      //*************健管师职称*******************
      var currentEditSourceItem = {};
      var currentOffSourceItem = {};
      var currentSetSourceItem = {};
      var supperDoctorList = [];
      var gobalValue = { ServiceTypeState: false, deptName: '', deptID: '' };
      $scope.postionCategoryItems = [];
      $scope.CurrentEditItem = { UserName: '', Speciality: '', CertificateCode: '', Mobile: '', JobState: -1, PositionCode: -1, PhotoUrl: '' };
      $scope.AccountSetItem = {};
      $scope.agentInfo = {};
      $scope.serviceDeptItems = [];
      $scope.serviceDeptLists = [];
      $scope.scrollheight = 0;
      var AddItems = function () {
        $scope.AddItem = {
          UserName: '', Speciality: '', CertificateCode: '', JobState: '', PId: -1, Password: '', rePassword: '',
          Introduce: '', ServiceLimit: '0', PersonID: '', PositionCode: '', Mobile: '', DeptID: gobalValue.deptID, ServiceTypeState: gobalValue.ServiceTypeState, DeptName: gobalValue.deptName, Account: '', RoleFlag: 0, postionCategoryValue: -1, JobTypeDefaultValue: -1, PhotoUrl: ''
        };
      };
      var postionCategoryItem = new PostionCategoryModel();
      postionCategoryItem.Name = '请选择健管师职称';
      postionCategoryItem.Code = -1;
      $scope.postionCategoryItems.push(postionCategoryItem);


      //***********************获取服务机构*******************************

      var GetAgentList = function () {
        var url = 'ServiceDept/GetServiceDeptInfo';
        var successCallback = function (result) {
          if (result.state == 1) {
            $scope.serviceDeptItems = [];
            $scope.serviceDeptLists = [];
            if (result.Data.length > 0) {
              for (var i = 0; i < result.Data.length; i++) {
                var serviceDeptItem = new serviceDeptItemModel();
                serviceDeptItem.convert(result.Data[i]);
                $scope.agentInfo.IsSelect = serviceDeptItem.IsSelect;
                $scope.serviceDeptItems.push(serviceDeptItem);   //ScanIsSelect
                $scope.serviceDeptLists.push(serviceDeptItem);   // 2016/12/29
              }
              if (gobalValue.deptID == '') {
                gobalValue.deptID = $scope.serviceDeptItems[0].Id;
              }
              $scope.requestDoctorListHandler(gobalValue.deptID);
            }
          }
        };
        var errorCallback = function (err) {
          util.showFade('获取服务机构失败');
        };

        util.ajaxGet($http, url, successCallback, errorCallback);
          var height = $(window).height();
             var width= $('#topheight').css('height');
             $scope.scrollheight ={height: height- 50 - 101 + 'px'};
            //  console.log(height);
            //  console.log( $scope.scrollheight);
      };
      GetAgentList();

      //***********************查询服务机构*******************************
      $scope.SearchName = '';
      $scope.SearchDept = function () {
        var name = $scope.SearchName,
          model = new serviceDeptItemModel(),
          List = [],
          url = 'ServiceDept/GetServiceDeptInfoSearch?name=' + name;
        util.ajaxGet($http, url, function (result) {
          if (result.state == 1) {
            if (result.Data && result.Data.length) {
              $scope.serviceDeptLists = [];
              for (var i = 0; i < result.Data.length; i++) {
                var item = model.convertSearch(result.Data[i]);
                List.push(item);
              };
              $scope.serviceDeptLists = List;
            }
          } else {
            util.showFade('未查询到相关信息');
          }
        }, function (err) { util.showFade('查询错误'); });
      };


      //***********************添加服务机构*******************************

      $scope.AddAgent = function () {
        $('.tip').hide();
        $scope.agentInfo = {
          RptDeptKey: null,
          Name: '',
          FullName: '',
          ServiceType: 2,
          SmsType:'',
          OperateBy: '',
          Address: '',
          SmsAccount: '',
          SmsPassword: '',
          SmsSign: '',
          SmsShortCode: '',
          IsSelect: false
        };
        $scope.vm.IsPhysicalExam = false;
        $scope.vm.PhysicalExam.List = [];
      };

      $scope.AddAgentSubmit = function () {
        if (!$scope.agentInfo.Name) {
          util.showFade('机构名称不能为空');
          return;
        }

        if(!$scope.agentInfo.RptDeptKey){
          util.showFade('机构匹配关系不能为空');
          return;
        }
        // if (!$scope.agentInfo.FullName) {
        //   util.showFade('机构全称不能为空');
        //   return;
        // }
        else if (!$scope.agentInfo.Address) {
          util.showFade('机构地址不能为空');
          return;
        }

        if(!$scope.agentInfo.SmsType){
          util.showFade('短信类型不能为空');
          return;
        }
        if ($scope.agentInfo.SmsType != 'md') {
          if (!$scope.agentInfo.SmsAccount) {
            util.showFade('请输入短信推广账号');
            return;
          }
          else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,20}$/g.test($scope.agentInfo.SmsPassword)) { //验证8-20位混合字母数字
            // util.showFade('短信推广密码必须是8-20位混合字母数字');
            $('#tipPasswordAdd').show();
            return;
          }
          else if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,20}$/g.test($scope.agentInfo.SmsPassword)) {
            $('#tipPasswordAdd').hide();
          }

          if (!$scope.agentInfo.SmsPassword) {
            util.showFade('请输入短信推广密码');
            return;
          }

          if (!$scope.agentInfo.SmsSign) {
            util.showFade('请输入机构签名');
            return;
          }

          if (!$scope.agentInfo.SmsShortCode) {
            util.showFade('请输入机构短号');
            return;
          }
          else if (!/^\d{4}$/g.test($scope.agentInfo.SmsShortCode)) { //验证四位数字
            $('#tipShortCodeAdd').show();
            return;
          }
          else if (/^\d{4}$/g.test($scope.agentInfo.SmsShortCode)) { //验证四位数字
            $('#tipShortCodeAdd').hide();
          }
        }

        var url = 'ServiceDept/AppendServiceDept';
        var userInfo = cacheUser.UserInfoManager.GetUserInfo();
        var data = {
          RptDeptKey: $scope.agentInfo.RptDeptKey,
          Name: $scope.agentInfo.Name,
          ServiceType: $scope.agentInfo.ServiceType,
          SmsType:$scope.agentInfo.SmsType,
          OperateBy: userInfo.Id,
          Address: $scope.agentInfo.Address,
          SmsAccount: $scope.agentInfo.SmsAccount,
          SmsPassword: $scope.agentInfo.SmsPassword,
          SmsSign: $scope.agentInfo.SmsSign,
          SmsShortCode: $scope.agentInfo.SmsShortCode,
          FullName: $scope.agentInfo.FullName
        };

        var successCallback = function (result) {
          if (result.state == 1) {
            GetAgentList();
            $scope.vm.PhysicalExam.OnLoad(function(){
              console.log($scope.vm.PhysicalExam.List);
              if ($scope.vm.PhysicalExam.List.length) {
                $scope.vm.IsPhysicalExam = true;
              } else {
                $('#agencyAdd').modal('hide');
              }
            });
            //$('#agencyAdd').modal('hide');
          }
          util.showFade(result.message);
        };
        var errorCallback = function (err) {
          alert('添加服务机构失败');
        };
        util.ajaxPost($http, url, data, successCallback, errorCallback);

      };

      //***********************更新服务机构*******************************

      $scope.imgBoolen = false;
      $scope.regionHttp = '';
      $scope.EditAgent = function (serviceDeptItem) {
        $('.tip').hide();
        //console.log(serviceDeptItem);
        angular.copy(serviceDeptItem, $scope.agentInfo);
        $scope.regionHttp = sysConfig.autoSend.GetURL() + '/2/' + serviceDeptItem.RptDeptKey + '/' + encodeURIComponent(serviceDeptItem.Name);
        // var regionUrl = sysConfig.autoSend.GetURL() + '/promotion/' + serviceDeptItem.RptDeptKey + '/' + serviceDeptItem.Name;
        // $scope.regionHttp = sysConfig.autoSend.GetURL() + '/promotion/' + serviceDeptItem.RptDeptKey + '/' + encodeURIComponent(serviceDeptItem.Name)+'/'+util.createRequestToken(regionUrl);

       /**
         * 初始化 短信分类
         */
        $scope.vm.PhysicalExam.Init();
      };

      $scope.TogglePictrue = function () {
        $scope.agentInfo.IsSelect = !$scope.agentInfo.IsSelect;
      };
      $scope.EditAgentSubmit = function () {
        if (!$scope.agentInfo.Name) {
          util.showFade('机构名称不能为空');
          return;
        }
        else if (!$scope.agentInfo.Address) {
          util.showFade('机构地址不能为空');
          return;
        }
        if ($scope.agentInfo.SmsAccount || $scope.agentInfo.SmsPassword || $scope.agentInfo.SmsSign || $scope.agentInfo.SmsShortCode) {
          if (!$scope.agentInfo.SmsAccount) {
            util.showFade('请输入短信推广账号');
            return;
          }
          else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,20}$/g.test($scope.agentInfo.SmsPassword)) { //验证8-20位混合字母数字
            // util.showFade('短信推广密码必须是8-20位混合字母数字');
            $('#tipPasswordEdit').show();
            return;
          }
          else if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,20}$/g.test($scope.agentInfo.SmsPassword)) {
            $('#tipPasswordEdit').hide();
          }

          if (!$scope.agentInfo.SmsPassword) {
            util.showFade('请输入短信推广密码');
            return;
          }
          if (!$scope.agentInfo.SmsSign) {
            util.showFade('请输入机构签名');
            return;
          }
          if (!$scope.agentInfo.SmsShortCode) {
            util.showFade('请输入机构短号');
            return;
          }
          else if (!/^\d{4}$/g.test($scope.agentInfo.SmsShortCode)) { //验证四位数字
            // util.showFade('机构短号必须是4位数字');
            $('#tipShortCodeEdit').show();
            return;
          }
          else if (/^\d{4}$/g.test($scope.agentInfo.SmsShortCode)) {
            $('#tipShortCodeEdit').hide();
          }
          if (!$scope.regionHttp) {
            util.showFade('请输入地推链接');
            return;
          }
        }
        var url = 'ServiceDept/UpdateServiceDept';
        var userInfo = cacheUser.UserInfoManager.GetUserInfo();
        var data = $scope.agentInfo;
        data.OperateBy = userInfo.Id;
        var successCallback = function (result) {
          if (result.state == 1) {
            $('#agencyEdit').modal('hide');
            GetAgentList();
            util.showFade('编辑机构成功');
          } else {
            util.showFade(result.message);
          }

        };
        var errorCallback = function (err) {
          alert('更新服务机构失败');
        };
        util.ajaxPost($http, url, data, successCallback, errorCallback);
      };

      //***********************获取主管健管师*******************************

      var GetSuperDoctorInfo = function (deptID) {
        var url = 'ServiceDept/GetSupperDoctorInfo?deptID=' + deptID;
        var successCallback = function (result) {
          supperDoctorList = [];
          if (result.state == 1) {
            var supperDoctorItem = new DoctorListModel();
            supperDoctorItem.Name = '请选择所属高级健管师';
            supperDoctorItem.ID = -1;
            supperDoctorList.push(supperDoctorItem);
            for (var i = 0; i < result.Data.length; i++) {
              var supperDoctorItem = new DoctorListModel();
              supperDoctorItem.convert(result.Data[i]);
              supperDoctorList.push(supperDoctorItem);
            }
          }
          else {
            var supperDoctorItem = new DoctorListModel();
            supperDoctorItem.Name = '暂无高级健管师';
            supperDoctorItem.ID = -1;
            supperDoctorList.push(supperDoctorItem);
          }
          $scope.supperDoctorList = supperDoctorList;
        };
        var errorCallback = function (err) {
          alert('获取主管健管师失败');
        };
        util.ajaxGet($http, url, successCallback, errorCallback);
      };

      //*************健管师职称*******************

      $scope.IsAccountExist = function () {//判断健管师账户是否存在

        if ($scope.AddItem.Account == '') {
          $('#tip').show();
          $('#tip').text('账号不能为空');
          return;
        }
        else if ($scope.AddItem.Account.checkSpecialCode()) {
          $('#tip').show();
          $('#tip').text('请输入合法的账号');
          return;
        }
        var account = encodeURIComponent($scope.AddItem.Account);
        var url = 'Doctor/IsAccountExist/' + account;
        var successCallback = function (result) {
          if (result.state == 1) {
            if (result.Data) {
              $('#tip').show();
              $('#tip').text('账号已存在，请重新输入！');
            }
            else {
              $('#tip').hide();
              $('#tip').text('');
            }
          }
        };
        var errorCallback = function (err) { };
        util.ajaxGet($http, url, successCallback, errorCallback);
      };

      $scope.addroleChange = function (val) {
        if (val == 1) {
          $scope.AddItem.PId = -1;
          $('.supperDoctor').attr('disabled', true);
        }
        else {
          $('.supperDoctor').attr('disabled', false);
        }
      };

      $scope.editroleChange = function (val) {
        if (val == 1) {
          $scope.CurrentEditItem.PId = -1;
          $('.supperDoctor').attr('disabled', true);
        }
        else {
          $('.supperDoctor').attr('disabled', false);
        }
      };

      $scope.AddStuff = function () {
        AddItems();
        $('#tip').hide();
        $scope.addroleChange(0);
      };

      //添加员工保存
      $scope.AddSubmit = function () {
        if ($scope.AddItem.UserName.trim() == '') {
          util.showFade('姓名不能为空');
          return;
        }
        else if (!/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test($scope.AddItem.CertificateCode)) { //验证身份证格式
          util.showFade('请输入正确的证件号');
          return;
        }
        else if ($scope.AddItem.Password == '' || $scope.AddItem.Password.length < 6) {
          util.showFade('密码必须大于六位');
          return;
        }
        else if ($scope.AddItem.Password != $scope.AddItem.rePassword) {
          util.showFade('两次密码输入不符');
          return;
        }
        else if (!/^(13|14|15|17|18)\d{9}$/.test($scope.AddItem.Mobile.trim())) { //验证手机号
          util.showFade('请输入正确的手机号');
          return;
        }
        else if ($scope.AddItem.Account.trim() == '') {
          util.showFade('登录账号不能为空');
          return;
        }
        else if ($scope.AddItem.Account.checkSpecialCode()) {
          $('#tip').show();
          $('#tip').text('请输入合法的账号');
          return;
        }
        else if ($scope.AddItem.JobTypeDefaultValue == -1) {
          util.showFade('请选择服务状态');
          return;
        }
        else if ($scope.AddItem.DeptID == -1) {
          util.showFade('请选择机构');
          return;
        }
        else if ($scope.AddItem.postionCategoryValue == -1) {
          util.showFade('请选择健管师职称');
          return;
        }
        else if (!/^[0-9]*[1-9][0-9]|0*$/.test($scope.AddItem.ServiceLimit)) { //正整数
          util.showFade('请输入有效的服务上限');
          return;
        }
        else if ($scope.AddItem.PhotoUrl && !/^(http|https):\/\/.*\.(jpg|JPG|jpeg|JPEG|png|PNG|bmp|BMP|gif|GIF|svg|SVG)$/.test($scope.AddItem.PhotoUrl)) {
          util.showFade('请输入有效的图片链接');
          return;
        }

        var url = 'Doctor/AppendDoctorAndAccount';
        userPassword = $.md5($scope.AddItem.Password);
        var data = {
          'UserName': $scope.AddItem.UserName,
          'Speciality': $scope.AddItem.Speciality,
          'CertificateCode': $scope.AddItem.CertificateCode,
          'JobState': $scope.AddItem.JobTypeDefaultValue,
          'PId': $scope.AddItem.PId,
          'Password': userPassword,
          'Introduce': $scope.AddItem.Introduce,
          'ServiceLimit': $scope.AddItem.ServiceLimit,
          'PersonID': $scope.AddItem.PersonID,
          'PositionCode': $scope.AddItem.postionCategoryValue,
          'Mobile': $scope.AddItem.Mobile,
          'DeptID': gobalValue.deptID,
          'Account': $scope.AddItem.Account,
          'RoleFlag': $scope.AddItem.RoleFlag,
          'PhotoUrl': $scope.AddItem.PhotoUrl

        };

        var successCallback = function (result) {
          if (result.state == 1) {
            util.showFade(result.message);
            $('#btnCloseAddPannel').click();
            GetAgentList();
            //$scope.requestDoctorListHandler(gobalValue.deptID);
          }
          else {
            util.showFade(result.message);
          }
        };
        var errorCallback = function (err) {
          util.showFade('添加健管师失败');
        };

        util.ajaxPost($http, url, data, successCallback, errorCallback);
      };

      //***********************编辑健管师信息*******************************

      $scope.EditStuff = function (doctorListItem) {
        currentEditSourceItem = doctorListItem;
        angular.copy(currentEditSourceItem, $scope.CurrentEditItem);
        $scope.editroleChange(doctorListItem.RoleFlag);


        var otherDoctorArray = [];
        for (var i = 0; i < supperDoctorList.length; i++) {
          if (doctorListItem.ID == supperDoctorList[i].ID) {
            continue;
          }
          otherDoctorArray.push(supperDoctorList[i]);
        }
        if (otherDoctorArray.length == 1) {
          otherDoctorArray = [{ ID: -1, Name: '暂无高级健管师' }];
        }
        $scope.otherDoctorArray = otherDoctorArray;
      };

      $scope.EditSubmit = function () {
        if ($scope.CurrentEditItem.UserName.trim() == '') {
          util.showFade('姓名不能为空');
          return;
        }
        else if (!/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test($scope.CurrentEditItem.CertificateCode)) { //验证身份证格式
          util.showFade('请输入正确的证件号');
          return;
        }
        else if (!/^(13|15|17|18|14)\d{9}$/.test($scope.CurrentEditItem.Mobile)) { //验证手机号
          util.showFade('请输入正确的手机号');
          return;
        }
        else if ($scope.CurrentEditItem.JobState == -1) {
          util.showFade('请选择服务状态');
          return;
        }
        else if ($scope.CurrentEditItem.PositionCode == -1) {
          util.showFade('请选择健管师职称');
          return;
        }
        else if (!/^[0-9]*[1-9][0-9]|0*$/.test($scope.CurrentEditItem.ServiceLimit)) { //正整数
          util.showFade('请输入有效的服务上限');
          return;
        }
        else if ($scope.CurrentEditItem.PhotoUrl && !/^(http|https):\/\/.*\.(jpg|JPG|jpeg|JPEG|png|PNG|bmp|BMP|gif|GIF|svg|SVG)$/.test($scope.CurrentEditItem.PhotoUrl)) {
          util.showFade('请输入有效的图片链接');
          return;
        }

        var url = 'Doctor/UpdateDoctor';
        var data = $scope.CurrentEditItem;
        if (data.PId == -1) { //接口需求若无高级主管则post null/0
          data.PId = null;
        }
        var successCallback = function (result) {
          if (result.state == 1) {
            util.Extend(currentEditSourceItem, $scope.CurrentEditItem);
            for (var i = 0; i < $scope.postionCategoryItems.length; i++) {
              var item = $scope.postionCategoryItems[i];
              if (item.Code == currentEditSourceItem.PositionCode) {
                currentEditSourceItem.PisitionName = item.Name;
                break;
              }
            }
            $scope.requestDoctorListHandler(gobalValue.deptID);
            //currentEditSourceItem.refresh();
          }
          util.showFade(result.message);

          $('#btnCloseEditPannel').click();
        };
        var errorCallback = function (err) {
          alert('编辑健管师失败');
        };
        util.ajaxPost($http, url, data, successCallback, errorCallback);
      };

      //***********************设置健管师密码*******************************

      $scope.SetAccount = function (doctorListItem) {
        currentSetSourceItem = doctorListItem;
        $scope.AccountSetItem = {
          account: currentSetSourceItem.Account,
          newPassword: '',
          rePassword: ''
        };
      };

      $scope.SetAccountSubmit = function (SettedAccount) {

        if (SettedAccount.newPassword && SettedAccount.rePassword) {
          var newPassword = SettedAccount.newPassword;
          var rePassword = SettedAccount.rePassword;
        }
        else {
          util.showFade('密码不能为空');
          return;
        }

        if (newPassword.length < 6) {
          util.showFade('密码不能小于6位');
          return;
        }
        else if (newPassword != rePassword) {
          util.showFade('密码不一致');
          return;
        }
        userPassword = $.md5(SettedAccount.newPassword);
        var account = encodeURIComponent(SettedAccount.account);
        var userPassword = encodeURIComponent(userPassword);
        var url = 'Login/ChangePassword?account=' + account + '&newPassword=' + userPassword;
        var successCallback = function (result) {
          util.showFade(result.message);
          $('#btnCloseSetPannel').click();

        };
        var errorCallback = function (err) {
          alert(err);
        };
        util.ajaxGet($http, url, successCallback, errorCallback);
      };

      //***********************编辑健管师可用性*****************************

      $scope.OffStuff = function (doctorListItem) {
        currentOffSourceItem = doctorListItem;
        if (currentOffSourceItem.IsEnabled) {
          $scope.OffText = '确认要禁用当前健管师账号吗？';
        }
        else { $scope.OffText = '确认要启用当前健管师账号吗？'; }
      };

      $scope.OffStuffSubmit = function (doctorListItem) {
        var enable = !currentOffSourceItem.IsEnabled;
        var data = {};
        var url = 'Doctor/EnableDoctor/' + currentOffSourceItem.Account + '?enable=' + enable;

        var successCallback = function (result) {
          util.showFade(result.message);
          if (result.state == 1) {
            GetAgentList();
            //$scope.requestDoctorListHandler(currentOffSourceItem.DeptID);
            // currentOffSourceItem.IsEnabled=enable;
          }
        };
        var errorCallback = function (err) {
          alert('设置健管师可用性失败');
        };
        util.ajaxPost($http, url, data, successCallback, errorCallback);
      };

      //***********************请求健管师列表*******************************

      var requestDeptHandler = function () {
        var url = 'Common/GetConst?category=' + Const.PostionCategory;
        var successCallback = function (result) {
          var PostionCategoryItem = new PostionCategoryModel();
          if (result.Data) {
            for (var i = 0; i < result.Data.length; i++) {
              var postionCategoryItem = new PostionCategoryModel();
              postionCategoryItem.convertFrom(result.Data[i]);
              $scope.postionCategoryItems.push(postionCategoryItem);
            }
          }
        };
        var errorCallback = function (err) {
          alert(err);
        };
        util.ajaxGet($http, url, successCallback, errorCallback);
      };

      $scope.requestDoctorListHandler = function (deptID) {
        /*
        for (var i = 0; i < $scope.serviceDeptItems.length; i++) {
          if ($scope.serviceDeptItems[i].Id == deptID) {
            // departInfo
            // console.log($scope.serviceDeptItems[i]);
            gobalValue.deptName = $scope.serviceDeptItems[i].Name;
            gobalValue.ServiceTypeState = $scope.serviceDeptItems[i].ServiceTypeState;
            $scope.deptName = gobalValue.deptName;
            $scope.ServiceTypeState = gobalValue.ServiceTypeState; // 2017-02-16 新添加，VIP服务机构的类型区分

            gobalValue.deptID = deptID;
          }
        }
        var doctorListItems = [];
        var url = 'Doctor/GetDoctorsByDeptID?deptID=' + deptID;

        var successCallback = function (result) {
          if (result.state == 1) {
            var doctorItem = result.Data;
            for (i = 0; i < doctorItem.length; i++) {
              var webItem = doctorItem[i];
              var doctorListItem = new DoctorListModel();
              doctorListItem.convertFrom(webItem);
              doctorListItems.push(doctorListItem);
            }
          }
          else {
            doctorListItems = [];
            util.showFade(result.message);
          }
          $scope.doctorListItems = doctorListItems;
          GetSuperDoctorInfo(deptID);
        };
        var errorCallback = function (err) {
          alert(err);
        };
        util.ajaxGet($http, url, successCallback, errorCallback);
        */
      };

      if ($scope.postionCategoryItems.length == 1) {
        requestDeptHandler();
      }

      //***********************机构体检人群分类*******************************
      var URLS = {
        PhysicalExam: {
          // 1.获取机构体检人群分类
          // GET api/ServiceDept/GetExamTypeList/{checkUnitCode}
          List: 'ServiceDept/GetExamTypeList/{0}',
          // 2. 添加或更新机构相关体检人群
          // POST api/ServiceDept/SetServiceDeptExamType
          // [
          //   {
          //     "ServiceDeptId": 1,
          //     "ExamtypeId": 2,
          //     "ExamtypeCode": "sample string 3",
          //     "ExamtypeName": "sample string 4",
          //     "HzExamtype": 5
          //   }
          // ]
          Set: 'ServiceDept/SetServiceDeptExamType',
          // 3.获取机构体检人群分类关系
          // GET api/ServiceDept/GetServiceDeptExamTypes/{serviceDeptID}
          GET: 'ServiceDept/GetServiceDeptExamTypes/{0}'
        }
      };

      $scope.vm = {
        IsPhysicalExam: false,
        PhysicalExam: {
          List: [],
          PhysicalExamTypeData: Const.PhysicalExamTypeData,
          OnChangeTab: function(){
            //  var self = $scope.vm.PhysicalExam;
            $scope.vm.IsPhysicalExam = true;
          },
          OnLoad: function(callback){
            var self = $scope.vm.PhysicalExam,
                currentDept = $scope.agentInfo,
                listURL = URLS.PhysicalExam.List.Format(currentDept.RptDeptKey),
                getURL = URLS.PhysicalExam.GET.Format(currentDept.Id),
                serviceDeptItem = new serviceDeptItemModel();

            util.ajaxGet($http, listURL, function (result) {
              if (result.state == 1 && result.Data) {
                util.ajaxGet($http, getURL, function (result2) {
                  if (result2.state == 1 || result2.state == 2) {
                    // console.log(result.Data);
                    // console.log(result2.Data);
                    self.List = serviceDeptItem.convertPhysicalExam(result.Data, result2.Data);
                    callback && callback();
                  } else {
                    util.showFade(result2.message);
                  }
                }, function (err) {
                  console.log(err);
                });
              } else if(result.state == 2 ){
                self.List = [];
                callback && callback();
              } else {
                self.List = [];
                callback && callback();
                //util.showFade(result.message);
              }

            }, function (err) {
              console.log(err);
            });
          },
          OnSave: function(){
            var self = $scope.vm.PhysicalExam,
              currentDept = $scope.agentInfo,
              url = URLS.PhysicalExam.Set,
              param = [];
              for (var i = 0; i < self.List.length; i++) {
                var item = self.List[i];
                param.push({
                  ServiceDeptId: currentDept.Id,
                  ExamtypeId: item.ExamTypeID,
                  ExamtypeCode: item.ExamTypeCode,
                  ExamtypeName: item.ExamTypeName,
                  HzExamtype: item.SelectedItem
                });
              }

            util.ajaxPost($http, url, param, function (result2) {
              if (result2.state == 1 && result2.Data) {
                util.showFade(result2.message);
                $('#agencyEdit').modal('hide');
              } else {
                util.showFade(result2.message);
              }

            }, function (err) {
              console.log(err);
            });
          },
          Init: function(){
            var self = $scope.vm.PhysicalExam;

            $scope.vm.IsPhysicalExam = false;
            self.OnLoad();
          }
        },
        Init: function(){
      //     var userInfo = cacheUser.UserInfoManager.GetUserInfo();
      // var gobalValue = { ServiceTypeState: false, deptName: '', deptID: '' };

        }
      };

      $scope.vm.Init();


      $scope.$watch('agentInfo.Name', function (newValue) {
        if (newValue) {
          // 清除预览
          //$scope.regionHttp = newValue;
          //console.log($scope.regionHttp);
          if ($scope.regionHttp) {
            var data = $scope.regionHttp.split('/');
            if (data.length > 0) {
              data.splice(data.length - 1, 1, encodeURIComponent(newValue));
              $scope.regionHttp = data.join('/');
            }
          }
        }
      });

    });

    return app;
  });
