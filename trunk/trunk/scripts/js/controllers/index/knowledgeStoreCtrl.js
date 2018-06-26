/**
 * Created by guoxuanyou on 2017/6/29.
 */
define(['indexApp', 'common/util', 'common/const','model/knowledgeStoreModel'], function (app, util, Const,sysModel) {
  app.controller('knowledgeStoreCtrl', ['$scope', 'signValid','ajaxService' ,'$http',function ($scope, signValid,ajax,$http) {
    signValid.ValidAccess('#/knowledgeStore');
    $('body').css('overflow','auto');
    ($scope.vm={

      SearchBoxName:'',
      SearchBtnName:'',
      SearchTypeKey:'',
      SearchNameKey:'',
      CurrentTab:0,

      QuotaStore:{
        List:[],
        Search:{
          'Type':'',
          'Name':'',
          'PageNum':1,
          'PageSize':10
        },
        AddCategoryName:'',
        DeleteModelItem:{},
        //所属
        QuotaCategory:[],
        CurrentInfo:{
          'Id':'',
          'Type':'',
          'Name':'',
          'Description':'',
          'Clinic':'',
          'Suggestion':''
        },
        AddOrModifyModelInfoCategory:{//OrModify
          'Id':'',
          'Type': '',
          'Name': '',
          'Description': '',
          'Clinic': '',
          'Suggestion': ''
        },
        OnLoad:function() {
          $scope.vm.SearchBoxName = '指标名称：';
          $scope.vm.SearchBtnName = '添加指标分类';
          $scope.vm.CurrentTab = 0;
          var url = 'BMSKnowledge/KnowledgeInfoList',
              param = angular.extend({
                'Type':'',
                'Name':'',
                'PageNum':1,
                'PageSize':10
              },$scope.vm.QuotaStore.Search);

          ajax.PostZstj(url,param,function(result){
            //请求成功
            var sysVersionModel = new sysModel();
            $scope.vm.QuotaStore.List = sysVersionModel.convertQuotaStoreList(result);
            $scope.QuotaPaginationConf = $scope.vm.QuotaStore.paginationConf;
            $scope.QuotaPaginationConf.totalItems = result.length;
          })
          $scope.vm.QuotaStore.GetQuotaTagsList();
        },
        OnSearch:function() {
          var url = 'BMSKnowledge/KnowledgeInfoList',
              ag = $scope.vm.QuotaStore.Search;
          ag.PageNum = $scope.vm.QuotaStore.paginationConf.currentPage;
          ag.PageSize = $scope.vm.QuotaStore.paginationConf.itemsPerPage;
          ag.Type = $scope.vm.SearchTypeKey;
          ag.Name = $scope.vm.SearchNameKey;
          if (ag.PageNum == 0) {
            ag.PageNum = 1;
          }
          var param = angular.extend({
            'Type':'',
            'Name':'',
            'PageNum':1,
            'PageSize':10
          },$scope.vm.QuotaStore.Search);

          ajax.PostZstj(url,param,function(result){
            //请求成功
            var sysVersionModel = new sysModel();
            $scope.vm.QuotaStore.List = sysVersionModel.convertQuotaStoreList(result);
            $scope.QuotaPaginationConf = $scope.vm.QuotaStore.paginationConf;
            $scope.QuotaPaginationConf.totalItems = result.length;
          })
        },
        OnSearchQuotaClick:function() {
          var url = 'BMSKnowledge/KnowledgeInfoList',
              ag = $scope.vm.QuotaStore.Search;
          ag.PageNum = $scope.vm.QuotaStore.paginationConf.currentPage;
          ag.PageSize = $scope.vm.QuotaStore.paginationConf.itemsPerPage;
          ag.Type = $scope.vm.SearchTypeKey;
          ag.Name = $scope.vm.SearchNameKey;
          if (ag.PageNum == 0) {
            ag.PageNum = 1;
          }
          var param = angular.extend({
            'Type':'',
            'Name':'',
            'PageNum':1,
            'PageSize':10
          },$scope.vm.QuotaStore.Search);

          ajax.PostZstj(url,param,function(result){
            //请求成功
            var sysVersionModel = new sysModel();
            $scope.vm.QuotaStore.List = sysVersionModel.convertQuotaStoreList(result);
            $scope.QuotaPaginationConf = $scope.vm.QuotaStore.paginationConf;
            $scope.QuotaPaginationConf.totalItems = result.length;
          })
        },
        LookQuotaInfoDetail:function(item) {
          $scope.vm.QuotaStore.CurrentInfo = item;
          $('#preViewQuotaInfoDetail').modal('show');
        },
        ShowAddCategory:function() {
          $('#addQuotaCategory').modal('show');
        },
        GetQuotaTagsList:function() {
          var url = 'BMSKnowledge/GetKnowledgeTagsList';
          ajax.PostZstj(url,{},function(result) {
            $scope.vm.QuotaStore.QuotaCategory = [];
            for (var i = 0; i < result.length; i++) {
              $scope.vm.QuotaStore.QuotaCategory.push(result[i]);
            }
          })
        },
        AddOrModifyTagList:function() {
          var increaseName = $scope.vm.QuotaStore.AddCategoryName;
          var isLoad = true;
          if (increaseName.length == 0) {
            util.showFade('分类名不能为空');
            return ;
          }
          for (var i = 0; i < $scope.vm.QuotaStore.QuotaCategory.length; i++) {
            if (increaseName == $scope.vm.QuotaStore.QuotaCategory[i]) {isLoad = false;}
          }
          if (isLoad) {
            var url = 'BMSKnowledge/AddKnowledgeTagsList',
                tempArr = new Array();
            for (var i = 0; i < $scope.vm.QuotaStore.QuotaCategory.length; i++) {
              tempArr.push($scope.vm.QuotaStore.QuotaCategory[i]);
            }
            tempArr.push($scope.vm.QuotaStore.AddCategoryName);
            var param = {'TagList':tempArr};
            ajax.PostZstj(url,param,function(result) {
              //success
              $scope.vm.QuotaStore.QuotaCategory.push(increaseName);
            });
          }else {
            util.showFade('该分类已添加');
          }
        },
        DeleteTagList:function(item) {
          var url = 'BMSKnowledge/AddKnowledgeTagsList',
              tempArr = new Array();
              for (var i = 0; i < $scope.vm.QuotaStore.QuotaCategory.length; i++) {
                tempArr.push($scope.vm.QuotaStore.QuotaCategory[i]);
              }
              tempArr.remove(item);
          var param = {'TagList':tempArr};
          ajax.PostZstj(url,param,function(result) {
            //success
            $scope.vm.QuotaStore.QuotaCategory.remove(item);
          });
        },
        ResortedTagList:function() {
          var url = 'BMSKnowledge/AddKnowledgeTagsList',
              tempArr = new Array();
              for (var i = 0; i < $scope.vm.QuotaStore.QuotaCategory.length; i++) {
                tempArr.push($scope.vm.QuotaStore.QuotaCategory[i]);
              }
          var param = {'TagList':tempArr};
          ajax.PostZstj(url,param,function(result) {
            //success
            $('#addQuotaCategory').modal('hide');
          });
        },
        SortCategory:function(oldIndex,newIndex){
          $scope.vm.QuotaStore.QuotaCategory[oldIndex] = $scope.vm.QuotaStore.QuotaCategory.splice(newIndex, 1, $scope.vm.QuotaStore.QuotaCategory[oldIndex])[0];
        },
        // Model
        ShowAddModelDialog:function() {
          $scope.vm.QuotaStore.AddOrModifyModelInfoCategory = {};
          var tempArr = $scope.vm.QuotaStore.QuotaCategory.slice(0);
          $scope.vm.QuotaStore.AddOrModifyModelInfoCategory.Type = tempArr[0];
          $('#addQuotaModel').modal('show');
        },
        ShowDeleteModelDialog:function(item) {
          $scope.vm.QuotaStore.DeleteModelItem = item;
          $('#deleteQuotaStoreModel').modal('show');
        },
        ShowModifyModelDialog:function(item) {
          $scope.vm.QuotaStore.CurrentInfo = item;
          var tempObj = new Object();
          for (var key in item){
            tempObj[key] = item[key];
          }
          $scope.vm.QuotaStore.AddOrModifyModelInfoCategory = tempObj;
          $('#addQuotaModel').modal('show');
        },
        AddModel:function() {
          var url = 'BMSKnowledge/AddKnowledgeInfo',
              param = angular.extend({
                "Type": '',
                "Name": '',
                "Description": '',
                "Clinic": '',
                "Suggestion": ''
              },$scope.vm.QuotaStore.AddOrModifyModelInfoCategory);
          for(x in param) {
            if (param[x].length == 0) {
              util.showFade('所填信息不能为空');
              return;
            }
          }
          ajax.PostZstj(url,param,function(result){
            //success code == 1
            if (result != false) {
              //排除 null
              $scope.vm.QuotaStore.List.unshift(result);
              $('#addQuotaModel').modal('hide');
            }
          });
        },
        DeleteModel:function() {
          var url = 'BMSKnowledge/RemoveKnowledgeInfo',
              param = {
                'Id':$scope.vm.QuotaStore.DeleteModelItem.Id
              };
          ajax.PostZstj(url,param,function(){
            $scope.vm.QuotaStore.List.remove($scope.vm.QuotaStore.DeleteModelItem);
          });
        },
        ModifyModel:function() {
          var url = 'BMSKnowledge/ModifyKnowledgeInfo',
              param = $scope.vm.QuotaStore.AddOrModifyModelInfoCategory;
          for(x in param) {
            if (param[x].length == 0) {
              util.showFade('所填信息不能为空');
              return;
            }
          }
          ajax.PostZstj(url,param,function(result) {
            for (var key in $scope.vm.QuotaStore.AddOrModifyModelInfoCategory){
              $scope.vm.QuotaStore.CurrentInfo[key] = $scope.vm.QuotaStore.AddOrModifyModelInfoCategory[key];
              $('#addQuotaModel').modal('hide');
            }
          });
        },
        paginationConf:{
          totalItems: 0,
          currentPage: 1,    //当前所在的页
          itemsPerPage: 10,  //每页展示的数据条数
          pagesLength: 9,   //分页条目的长度（如果设置建议设置为奇数）
          perPageOptions: [10, 20, 30, 40, 50],    //可选择显示条数的数组
          rememberPerPage: 'QuotaStorePerPage',  //使用LocalStorage记住所选择的条目数的名称
          onChange: function () {
            if ($scope.vm.QuotaStore.paginationConf.currentPage != 0 ) {
              $scope.vm.QuotaStore.OnSearch();
            }
          }
        }
      },
      DiseaseStore:{
        List:[],
        Search:{
          'Type':'',
          'Name':'',
          'PageNum':1,
          'PageSize':10
        },
        AddCategoryName:'',
        DeleteModelItem:{},
        DiseaseCategory:[],
        CurrentInfo:{
          'Id':'',
          'Type':'',
          'Name':'',
          'Description':'',
          'Clinic':'',
          'Suggestion':'',
          'Illness':'',//病因或危险因素
          'RecipeLife':'',//生活处方
          'RecipeFood':'',//饮食处方
          'RecipeSport':'',//运动处方
          'Risk':'',//风险及并发症
          'prognosis':''//预后
        },
        AddOrModifyModelInfoCategory:{//OrModify
          'Id':'',
          'Type': '',
          'Name': '',
          'Description': '',
          'Clinic': '',
          'Suggestion': '',
          'Illness':'',//病因或危险因素
          'RecipeLife':'',//生活处方
          'RecipeFood':'',//饮食处方
          'RecipeSport':'',//运动处方
          'Risk':'',//风险及并发症
          'prognosis':''//预后
        },
        OnLoad:function() {
          $scope.vm.SearchBoxName = '疾病名称：';
          $scope.vm.SearchBtnName = '添加疾病分类';
          $scope.vm.CurrentTab = 1;

          var url = 'BMSKnowledge/IllnessInfoList',
              param = angular.extend({
                'Type':'',
                'Name':'',
                'PageNum':1,
                'PageSize':10
              },$scope.vm.DiseaseStore.Search);

          ajax.PostZstj(url,param,function(result){
            //请求成功
            var sysVersionModel = new sysModel();
            $scope.vm.DiseaseStore.List = sysVersionModel.convertDiseaseStoreList(result);
            $scope.DiseasePaginationConf = $scope.vm.DiseaseStore.paginationConf;
            $scope.DiseasePaginationConf.totalItems = result.length;
          });
          $scope.vm.DiseaseStore.GetDiseaseTagsList();
        },
        OnSearch:function() {
          var url = 'BMSKnowledge/IllnessInfoList',
              ag = $scope.vm.DiseaseStore.Search;
          ag.PageNum = $scope.vm.DiseaseStore.paginationConf.currentPage;
          ag.PageSize = $scope.vm.DiseaseStore.paginationConf.itemsPerPage;
          ag.Type = $scope.vm.SearchTypeKey;
          ag.Name = $scope.vm.SearchNameKey;
          if (ag.PageNum == 0) {
            ag.PageNum = 1;
          }
          param = angular.extend({
            'Type':'',
            'Name':'',
            'PageNum':1,
            'PageSize':10
          },$scope.vm.DiseaseStore.Search);

          ajax.PostZstj(url,param,function(result){
            //请求成功
            var sysVersionModel = new sysModel();
            $scope.vm.DiseaseStore.List = sysVersionModel.convertDiseaseStoreList(result);
            $scope.DiseasePaginationConf = $scope.vm.DiseaseStore.paginationConf;
            $scope.DiseasePaginationConf.totalItems = result.length;
          })
        },
        OnSearchIllnessClick:function() {
          var url = 'BMSKnowledge/IllnessInfoList',
              ag = $scope.vm.DiseaseStore.Search;
          ag.PageNum = $scope.vm.DiseaseStore.paginationConf.currentPage;
          ag.PageSize = $scope.vm.DiseaseStore.paginationConf.itemsPerPage;
          ag.Type = $scope.vm.SearchTypeKey;
          ag.Name = $scope.vm.SearchNameKey;
          if (ag.PageNum == 0) {
            ag.PageNum = 1;
          }
          param = angular.extend({
            'Type':'',
            'Name':'',
            'PageNum':1,
            'PageSize':10
          },$scope.vm.DiseaseStore.Search);

          ajax.PostZstj(url,param,function(result){
            //请求成功
            var sysVersionModel = new sysModel();
            $scope.vm.DiseaseStore.List = sysVersionModel.convertDiseaseStoreList(result);
            $scope.DiseasePaginationConf = $scope.vm.DiseaseStore.paginationConf;
            $scope.DiseasePaginationConf.totalItems = result.length;
          })
        },
        GetDiseaseTagsList:function() {
          var url = 'BMSKnowledge/GetIllnessTagsList';
          ajax.PostZstj(url,{},function(result) {
            $scope.vm.DiseaseStore.DiseaseCategory = [];
            for (var i = 0; i < result.length; i++) {
              $scope.vm.DiseaseStore.DiseaseCategory.push(result[i]);
            }
          })
        },
        ShowAddCategory:function() {
          $('#addDiseaseCategory').modal('show');
        },
        SortCategory:function(oldIndex,newIndex){
          $scope.vm.DiseaseStore.DiseaseCategory[oldIndex] = $scope.vm.DiseaseStore.DiseaseCategory.splice(newIndex, 1, $scope.vm.DiseaseStore.DiseaseCategory[oldIndex])[0];
        },
        AddOrModifyTagList:function() {
          var increaseName = $scope.vm.DiseaseStore.AddCategoryName;
          if (increaseName.length == 0) {
            util.showFade('分类名不能为空');
            return ;
          }
          var isLoad = true;
          for (var i = 0; i < $scope.vm.DiseaseStore.DiseaseCategory.length; i++) {
            if (increaseName == $scope.vm.DiseaseStore.DiseaseCategory[i]) {isLoad = false;}
          }
          if (isLoad) {
            var url = 'BMSKnowledge/AddIlnessTagsList',
                tempArr = new Array();
            for (var i = 0; i < $scope.vm.DiseaseStore.DiseaseCategory.length; i++) {
              tempArr.push($scope.vm.DiseaseStore.DiseaseCategory[i]);
            }
            tempArr.push($scope.vm.DiseaseStore.AddCategoryName);
            var param = {'TagList':tempArr};
            ajax.PostZstj(url,param,function(result) {
              //success
              $scope.vm.DiseaseStore.DiseaseCategory.push(increaseName);
            });
          }else {
            util.showFade('该分类已添加');
          }
        },
        ResortedTagList:function() {
          var url = 'BMSKnowledge/AddIlnessTagsList',
              tempArr = new Array();
              for (var i = 0; i < $scope.vm.DiseaseStore.DiseaseCategory.length; i++) {
                tempArr.push($scope.vm.DiseaseStore.DiseaseCategory[i]);
              }
          var param = {'TagList':tempArr};
          ajax.PostZstj(url,param,function(result) {
            //success
            $('#addDiseaseCategory').modal('hide');
          });
        },
        DeleteTagList:function(item) {
          var url = 'BMSKnowledge/AddIlnessTagsList',
              tempArr = new Array();
              for (var i = 0; i < $scope.vm.DiseaseStore.DiseaseCategory.length; i++) {
                tempArr.push($scope.vm.DiseaseStore.DiseaseCategory[i]);
              }
              tempArr.remove(item);
          var param = {'TagList':tempArr};
          ajax.PostZstj(url,param,function(result) {
            //success
            $scope.vm.DiseaseStore.DiseaseCategory.remove(item);
          });
        },
        LookDiseaseInfoDetail:function(item) {
          $scope.vm.DiseaseStore.CurrentInfo = item;
          $('#preViewDiseaseInfoDetail').modal('show');
        },
        //model
        ShowAddModelDialog:function() {
          //清除数据，判断添加或编辑
          $scope.vm.DiseaseStore.AddOrModifyModelInfoCategory = {};
          var tempArr = $scope.vm.DiseaseStore.DiseaseCategory.slice(0);
          $scope.vm.DiseaseStore.AddOrModifyModelInfoCategory.Type = tempArr[0];
          $('#addDiseaseModel').modal('show');
        },
        AddModel:function() {

          var url = 'BMSKnowledge/AddIllnessInfo',
              param = angular.extend({
                'Type': '',
                'Name': '',
                'Description': '',
                'Clinic': '',
                'Suggestion': '',
                'Illness':'',//病因或危险因素
                'RecipeLife':'',//生活处方
                'RecipeFood':'',//饮食处方
                'RecipeSport':'',//运动处方
                'Risk':'',//风险及并发症
                'prognosis':''//预后
              },$scope.vm.DiseaseStore.AddOrModifyModelInfoCategory);
          for(x in param) {
            if (param[x].length == 0) {
              util.showFade('所填信息不能为空');
              return;
            }
          }
          ajax.PostZstj(url,param,function(result){
            //success code == 1
            if (result != false) {
              //排除 null
              $scope.vm.DiseaseStore.List.unshift(result);
              $('#addDiseaseModel').modal('hide');
            }
          });
        },
        ModifyModel:function() {
          var url = 'BMSKnowledge/ModifyIllnessInfo',
              param = $scope.vm.DiseaseStore.AddOrModifyModelInfoCategory;
          for(x in param) {
            if (param[x].length == 0) {
              util.showFade('所填信息不能为空');
              return;
            }
          }
          ajax.PostZstj(url,param,function(result) {
            for (var key in $scope.vm.DiseaseStore.AddOrModifyModelInfoCategory){
              $scope.vm.DiseaseStore.CurrentInfo[key] = $scope.vm.DiseaseStore.AddOrModifyModelInfoCategory[key];
              $('#addDiseaseModel').modal('hide');
            }
          });
        },
        ShowModifyModelDialog:function(item) {
          $scope.vm.DiseaseStore.CurrentInfo = item;
          var tempObj = new Object();
          for (var key in item){
            tempObj[key] = item[key];
          }
          $scope.vm.DiseaseStore.AddOrModifyModelInfoCategory = tempObj;
          $('#addDiseaseModel').modal('show');
        },
        ShowDeleteModelDialog:function(item) {
          $scope.vm.DiseaseStore.DeleteModelItem = item;
          $('#deleteDiseaseStoreModel').modal('show');
        },
        DeleteModel:function() {
          var url = 'BMSKnowledge/RemoveIllnessInfo',
              param = {
                'Id':$scope.vm.DiseaseStore.DeleteModelItem.Id
              };
          ajax.PostZstj(url,param,function(){
            $scope.vm.DiseaseStore.List.remove($scope.vm.DiseaseStore.DeleteModelItem);
          });
        },
        paginationConf:{
          totalItems: 0,
          currentPage: 1,    //当前所在的页
          itemsPerPage: 10,  //每页展示的数据条数
          pagesLength: 9,   //分页条目的长度（如果设置建议设置为奇数）
          perPageOptions: [10, 20, 30, 40, 50],    //可选择显示条数的数组
          rememberPerPage: 'DiseaseStorePerPage',  //使用LocalStorage记住所选择的条目数的名称
          onChange: function () {
            if ($scope.vm.DiseaseStore.paginationConf.currentPage != 0 ) {
              $scope.vm.DiseaseStore.OnSearch();
            }
          }
        }
      },
      Init:function() {
        $scope.vm.QuotaStore.OnLoad();
      }
    }).Init();
  }]);
  return app;
});
