define(['indexApp', 'common/util', 'common/const','model/packageLabelModel', 'service/baseService'],
  function (app, util, Const, packageLabelModel) {
    app.controller('PackageLabelAppCtrl', function ($scope, $http, signValid) {
      signValid.ValidAccess("#/PackageLabelApp");                       //缓存登录验证
      //侧边栏样式
      $(".nav li:eq(16)").addClass("active").siblings().removeClass("active");
      $('body').css('overflow', 'auto');
      $scope.vm = {
      //url地址
      Url:{
        GetList:'BMSCombotag/GetList', //获取套餐信息
        AddPackage:'BMSCombotag/AddOrModify',
        DelPackage:'BMSCombotag/Remove'
      },
      data:{
        //套餐信息
        packageLabelInfo:{
          currId : 1,
          packageLabelId : [],
          packageNames : Const.PackageTypes,
          packageLabels : []
        },
        //添加套餐标签
        packageLabelAddInfo:{
           addPackageName:'',
           addPackageLabeItem:{},
           addPackageLabels:[],
           addBtn:false
        },
        //编辑套餐标签
        packageLabelEditInfo:{
          editPackageId:'',
          editPackageName:'',
          editPackageLabels:[]
        },
        //删除套餐标签
        packageLabelDelInfo:{
          DelItem:{}
        }
      },
      Init:{
        //初始化主页面
        InitHomePage : function(){
          var url = $scope.vm.Url.GetList;
          var data = {};
          util.ajaxZSTJPost( $http, url, data, function(result){
            if(result.Data){
               $scope.vm.data.packageLabelInfo.packageLabels = [];
              var model = new packageLabelModel();
              for(var i=0;i<$scope.vm.data.packageLabelInfo.packageNames.length;i++){
                var item1 = {};
                for(var x=0;x<result.Data.length;x++){
                  if($scope.vm.data.packageLabelInfo.packageNames[i].Id==result.Data[x].ComboType){
                    item1 = result.Data[x];
                    break;
                  }else{
                    item1 = {};
                  }
                }
                var item2 = $scope.vm.data.packageLabelInfo.packageNames[i];
                var item = Object.assign( item1, item2);
                $scope.vm.data.packageLabelInfo.packageLabels.push(item);
              }
              $scope.vm.Init.InitAddPage();
            }
          });
        },

        //初始化添加
        InitAddPage : function(){

          $scope.vm.data.packageLabelAddInfo.addBtn = true;
          $scope.vm.data.packageLabelAddInfo.addPackageLabels = [];
          $scope.vm.data.packageLabelAddInfo.addPackageName = '';
          // $scope.vm.data.packageLabelInfo.currId = 1;
          for(var i=1;i<=$scope.vm.data.packageLabelInfo.packageLabels.length;i++){
            if(i==$scope.vm.data.packageLabelInfo.currId){
              $scope.vm.data.packageLabelAddInfo.addPackageLabels = $scope.vm.data.packageLabelInfo.packageLabels[i-1].Combos;

            }
          }
        },

        //添加标签按钮
        AddLabelBtn:function(){

          if($scope.vm.data.packageLabelAddInfo.addPackageLabels){
          }else{
            $scope.vm.data.packageLabelAddInfo.addPackageLabels = [];
          }
          $scope.vm.data.packageLabelAddInfo.addPackageName = '';
          if($scope.vm.data.packageLabelAddInfo.addBtn){
            $scope.vm.data.packageLabelAddInfo.addBtn = false;
          }else{
            $scope.vm.data.packageLabelAddInfo.addBtn = true;
          }
        },
        //添加提交
        AddLabelCommit:function(){

          var ComboName = $scope.vm.data.packageLabelAddInfo.addPackageName;
          var ComboType = $scope.vm.data.packageLabelInfo.currId;

          var url = $scope.vm.Url.AddPackage;
          var data = { ID:0, ComboType:ComboType, ComboName:ComboName};
          if(ComboType==0){
            util.showFade('请选择分类');
             return false;
          }
          if(ComboName==''){
            util.showFade('请输入标签名称');
            return false;
          }
          for(var i=0;i<$scope.vm.data.packageLabelAddInfo.addPackageLabels.length;i++){
            if($scope.vm.data.packageLabelAddInfo.addPackageLabels[i].ComboName==ComboName){
              util.showFade('标签名称重复');
              return false;
            }
          }
          util.ajaxZSTJPost( $http, url, data, function(result){

            if(result.Data){
              $scope.vm.data.packageLabelAddInfo.addBtn = true;
              util.showFade(result.Message);
              var currItem = {ComboName:ComboName,ComboType:ComboType};
              $scope.vm.data.packageLabelAddInfo.addPackageLabels.push(currItem);
              $scope.vm.Init.InitHomePage();
            }
          });
        },
        //关闭添加标签初始化
        CloseItem : function(){

          $scope.vm.data.packageLabelInfo.currId = 1;


        },
        //初始化编辑
        InitEditPage : function(packageId){

          $scope.vm.data.packageLabelInfo.currId = packageId;
          $scope.vm.data.packageLabelAddInfo.addBtn = true;
          $scope.vm.data.packageLabelDelInfo.DelItem = {};
          $scope.vm.data.packageLabelAddInfo.addPackageLabels = [];
          $scope.vm.data.packageLabelAddInfo.addPackageName = '';
          for(var i=1;i<=$scope.vm.data.packageLabelInfo.packageLabels.length;i++){
            if(i==$scope.vm.data.packageLabelInfo.currId){
              $scope.vm.data.packageLabelAddInfo.addPackageLabels = $scope.vm.data.packageLabelInfo.packageLabels[i-1].Combos;
            }else{
              $scope.vm.data.packageLabelAddInfo.addPackageLabels.push();

            }
          }

        },
        //删除标签
        DelPage : function(item){

          $scope.vm.data.packageLabelDelInfo.DelItem = item;

        },
        //确认删除
        DelPageCommit : function(){

          var url = $scope.vm.Url.DelPackage;
          var data = { ID : $scope.vm.data.packageLabelDelInfo.DelItem.ID};
          util.ajaxZSTJPost($http, url , data, function(result){
            if(result.Data){
              $scope.vm.data.packageLabelAddInfo.addPackageLabels.remove($scope.vm.data.packageLabelDelInfo.DelItem);
              util.showFade(result.Message);
            }else{
              util.showFade(result.Message);
            }
          });
        }
      }
    };
      $scope.vm.Init.InitHomePage();

    });
    return app;
  });
