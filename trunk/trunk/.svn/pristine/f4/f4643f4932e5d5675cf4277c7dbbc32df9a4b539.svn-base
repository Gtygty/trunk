define(['indexApp', 'common/util', 'model/groupListModel', 'common/const', 'service/baseService'], function (app, util, groupModel, config) {
  app.controller('groupCtrl', function ($scope, $http, signValid) {
    signValid.ValidAccess("#/group");                       //缓存登录验证
    //侧边栏样式
    $(".nav li:eq(5)").addClass("active").siblings().removeClass("active");
    $('body').css('overflow', 'auto');

    $scope.groups = [];//分组数据集合
    $scope.GroupName = {};//当前分组数据字段Name
    $scope.GroupId = {};//当前分组数据字段Id
    $scope.GroupType = {};//当前分组数据字段Type
    $scope.GroupTypes = [];
    $scope.priorityLevel = 0; //当前分组的优先回复字段GroupPrior
    $scope.isPriorityReply = false; //当前分组的优先回复等级选中状态

    var requestListHandler = function () {
      var url = "GroupRule/GetGroupItems";
      var successCallback = function (result) {
        if (result.state == 1) {
          var groupItems = [];
          for (var i = 0; i < result.Data.length; i++) {
            var items = result.Data[i];
            var model = new groupModel();
            model.convertFrom(items);
            groupItems.push(model);
          }
          $scope.groups = groupItems;
        } else {
          util.showFade(result.message);
        }
      };
      var errorCallback = function (err) {
        util.showFade(err);
      };
      util.ajaxGet($http, url, successCallback, errorCallback);
    };
    requestListHandler();
    var curItem = {};
    //编辑
    $scope.GroupTypes = config.GroupTypes;
    $scope.GroupType = 0;
    $scope.editGroup = function () {
      curItem = $scope.groups[this.$index];
      $scope.GroupName = curItem.Name;
      $scope.GroupId = curItem.ID;
      $scope.GroupType = curItem.Type;
      $scope.Priority = curItem.Priority;
      if($scope.Priority == 1){
        $scope.isPriorityReply = true;
      }else{
        $scope.isPriorityReply = false;
      }
    };
    //编辑时选择优先回复等级
    $scope.EditpriorClick = function(){
      $scope.isPriorityReply = !$scope.isPriorityReply;
      if($scope.isPriorityReply){
        $scope.Priority = 1;
      }else{
        $scope.Priority = 0;
      }

    };
    //编辑保存
    $scope.saveGroup = function () {
      if (!$scope.GroupName) {
        util.showFade("分组名称不能为空");
        return;
      }
      else if ($scope.GroupName.checkSpecialCode()) {
        util.showFade("请输入合法的分组名称");
        return;
      }
      var groupName = encodeURIComponent($scope.GroupName);
      var url = "GroupRule/UpdateGroup?groupID=" + curItem.ID + "&groupName=" + groupName + "&groupType=" + $scope.GroupType + "&priorityLevel=" + $scope.Priority;
      var successCallback = function (result) {
        if (result.state == 1) {
          // curItem.Name=$scope.GroupName;
          // curItem.Type=$scope.listType;
          requestListHandler();
          util.showFade(result.message);
          $("#groupEdit").modal("hide");
        } else {
          util.showFade(result.message);
        }
      };
      var errorCallback = function (err) {
        util.showFade(err);
      };
      util.ajaxGet($http, url, successCallback, errorCallback);
    };
    //添加
    $scope.AddGroup = function () {
      $scope.addGroupName = "";
      $scope.GroupType = -1;
      $scope.GroupTypes = config.GroupTypes;
      $scope.Priority = 0;
      $scope.isPriorityReply = false;
    };
    //添加时选择优先回复等级
    $scope.AddpriorClick = function(){
      $scope.isPriorityReply = !$scope.isPriorityReply;
      $scope.Priority  = 0;
        if($scope.isPriorityReply){
        $scope.Priority = 1;
      }else{
        $scope.Priority = 0;
      }
    };
    // 新建保存
    $scope.AddSubGroup = function () {
      if (!$scope.addGroupName) {
        util.showFade("分组名称不能为空");
        return;
      } else if ($scope.addGroupName.checkSpecialCode()) {
        util.showFade("请输入合法的分组名称");
        return;
      }

      var addGroupName = encodeURIComponent($scope.addGroupName);
      var url = "GroupRule/AppendGroup?groupName=" + addGroupName + "&groupType=" + $scope.GroupType + "&priorityLevel=" + $scope.Priority;
      var successCallback = function (result) {
        if (result.state == 1) {
          requestListHandler();
          $("#groupAdd").modal("hide");
        } else {
          util.showFade(result.message);
        }
      };
      var errorCallback = function (error) {
        util.showFade(error);
      };
      util.ajaxGet($http, url, successCallback, errorCallback);
    };
  });
  return app;
});
