define(['indexApp', 'jquery', 'common/util', 'common/const', 'model/bannerAppModel', 'wangEditor'], function (app, $, util, Const, bannerAppModel) {
  app.controller('informationListExaminationAppCtrl', function ($scope, $http, signValid,$sce) {
    signValid.ValidAccess("#/informationListExaminationApp");                       //缓存登录验证
    //侧边栏样式
    $(".nav li:eq(16)").addClass("active").siblings().removeClass("active");
    $('body').css('overflow', 'auto');
    // var addEditor = new wangEditor('add-editor');
    // addEditor.config.menus = [
    //   'source', '|', 'bold', 'underline', 'italic', 'strikethrough', 'eraser', 'forecolor', 'bgcolor', '|', 'quote', 'fontfamily',
    //   'fontsize', 'head', 'alignleft', 'aligncenter', 'alignright', 'indent', 'img', 'video'];
    // addEditor.create();
    // var editEditor = new wangEditor('edit-editor');
    // editEditor.config.menus = [
    //   'source', '|', 'bold', 'underline', 'italic', 'strikethrough', 'eraser', 'forecolor', 'bgcolor', '|', 'quote', 'fontfamily',
    //   'fontsize', 'head', 'alignleft', 'aligncenter', 'alignright', 'indent', 'img', 'video'];
    // editEditor.create();

    $scope.editEditorHTML, $scope.addEditorHTML;

    $scope.vm = {
      data: {
        initData: [],     //初始化页面的数据
        addData: {          //添加的数据
          Description: '',
          Content: ''
        },
        editData:[],      //编辑时的数据,
        prevData: {       //预览时的数据
          Description: '',
          SimpleContent: '',
        },
        detailData: {     //删除时的数据
          Id: '',
          index:''
        },
        searchInfo: {     //搜索时的数据
          Description: ''
        },
        IsableClick:false
      },
      Init: function () {     //初始化页面
        var url = 'SimpleContent/GetSimpleContent';
        var data = {};
        $scope.vm.data.initData = [];
        util.ajaxZSTJPost($http, url, data, function (result) {
          if (result.Code == 1) {
            for (var i = 0; i < result.Data.length; i++) {
              var model = new bannerAppModel();
              model.convertFromSimpleContent(result.Data[i]);
              $scope.vm.data.initData.push(model);
            }
          }else{
            util.showFade(result.Message);
          }
        }, function (err) {
          util.showFade(err.Message);
        });
      },
      SearchInforma: function () {    //搜索时的方法
        var url = 'SimpleContent/GetSimpleContent';
        var DescriptionValue = $scope.vm.data.searchInfo.Description;
        var data = {
          Description: DescriptionValue
        };
        util.ajaxZSTJPost($http, url, data, function (result) {
          if (result.Code == 1) {
            if (result.Data.length > 0) {
              $scope.vm.data.initData = [];
              for (var i = 0; i < result.Data.length; i++) {
                var model = new bannerAppModel();
                model.convertFromSimpleContent(result.Data[i]);
                $scope.vm.data.initData.push(model);
              }
            } else {
              util.showFade('查询数据不存在');
            }
          }else{
            util.showFade(result.Message)
          }
        }, function (err) {
          util.showFade(err.Message);
        });
        $scope.vm.data.searchInfo.Description = "";
      },
      AddInit:function(){
        var self = $scope.vm.data.addData;
        self.Description = '',
        // self.Content = addEditor.clear();
        self.Content = $scope.addEditorHTML = '';
      },
      AddInforma: function () {       //添加时的保存数据方法
        var url = 'SimpleContent/AppendSimpleContent';
        var self = $scope.vm.data.addData;
        var descript = self.Description;
        // var contentValue = addEditor.$txt.text();
        // var contentLength = addEditor.$txt.html();
        var contentValue = $scope.addEditorHTML;
        var contentLength = $scope.addEditorHTML;
        var data = {
          Description: descript,
          Content: $scope.addEditorHTML
        }
        // var data = {
        //   Description: descript,
        //   Content: addEditor.$txt.html()
        // }
        if (data.Description.length <= 0) {
          util.showFade('请输入描述性文案');
          return;
        }else if (!contentValue.replace("<p><br></p>","")) {
          util.showFade('请输入正文内容');
          return;
        }else if (contentLength.length > 4000){
          util.showFade('输入内容超过限定长度');
          return;
        }
        $scope.vm.data.IsableClick = true;
        util.ajaxZSTJPost($http, url, data, function (result) {
          if (result.Code == 1) {
            if(result.Data){
                  util.showFade(result.Message);
                  $('#addInformationModel').click();
                  $scope.vm.data.IsableClick = false;
            }
          }else{
            util.showFade(result.Message);
          }
          $scope.vm.Init();
        }, function (err) {
          util.showFade(err.Message);
        })
      },
      EditInforma: function (item) {         //编辑
        $scope.vm.data.editData = [];
        var url = 'SimpleContent/GetSimpleContentDetail';
        var self = $scope.vm.data.editData;
        var data = {
          Id: item.Id
        };
        util.ajaxZSTJPost($http, url, data, function (result) {
          if (result.Code == 1) {
            var model = new bannerAppModel();
            model.convertFromSimpleContentDetail(result.Data);
            self.push(model);
            // editEditor.$txt.html(result.Data.SimpleContent);
            $scope.editEditorHTML = result.Data.SimpleContent;
          }
        }, function (err) {
          util.showFade(err.Message);
        })
      },
      EditSureInforma: function () {     //编辑时的保存方法

        var url = 'SimpleContent/UpdateSimpleContent';
        var description = $scope.vm.data.editData[0].Description;
        // var contentValue = editEditor.$txt.text();
        // var contentLength = editEditor.$txt.html();
        var contentLength = $scope.editEditorHTML;
        var contentValue = $scope.editEditorHTML;
        var data = {
          Id:$scope.vm.data.editData[0].Id,
          Description: description,
          SimpleContent: $scope.editEditorHTML
        }
        // var data = {
        //   Id:$scope.vm.data.editData[0].Id,
        //   Description: description,
        //   SimpleContent: editEditor.$txt.html()
        // }

        if (data.Description.length <= 0) {
          util.showFade('请输入描述性文案');
          return;
        }else if (!contentValue) {
          util.showFade('请输入正文内容');
          return;
        }else if (contentLength.length > 4000){
          util.showFade('输入内容超过限定长度');
          return;
        }

        $scope.vm.data.IsableClick = true;
        util.ajaxZSTJPost($http, url, data, function (result) {
          if (result.Code == 1) {
            if(result.Data){
              util.showFade(result.Message);
              $('#editInformationModel').click();
              $scope.vm.data.IsableClick = false;
              $scope.vm.Init();
            }
          }else{
            util.showFade(result.Message);
          }

          $scope.vm.data.addData = {
            Description: '',
            Content: addEditor.clear()
          }
        }, function (err) {
          util.showFade(err.Message);
        })

      },
      PrevInforma: function (item) {        //页面直接点击时的预览方法
        var url = 'SimpleContent/GetSimpleContentDetail';
        var data = {
          Id: item.Id
        }
        var self = $scope.vm.data.prevData;
        util.ajaxZSTJPost($http, url, data, function (result) {
          if (result.Code == 1) {
            self.Description = result.Data.Description;
            self.SimpleContent = $sce.trustAsHtml(result.Data.SimpleContent) ;
          }else{
            util.showFade(result.Message);
          }
        }, function (err) {
          util.showFade(err.Message);
        })
      },
      PrevAddInforma:function(){          //添加时的预览方法
        var contentValue = $sce.trustAsHtml($scope.addEditorHTML);
        $scope.vm.data.prevData = {
            Description:  $scope.vm.data.addData.Description,
            SimpleContent: contentValue,
        }
        // var contentValue = $sce.trustAsHtml(addEditor.$txt.html());
        // $scope.vm.data.prevData = {
        //     Description:  $scope.vm.data.addData.Description,
        //     SimpleContent: contentValue,
        // }
      },
      PrevEditInforma:function(){         //编辑时的预览方法
        var contentValue = $sce.trustAsHtml($scope.editEditorHTML);
        $scope.vm.data.prevData = {
            Description: $scope.vm.data.editData[0].Description,
            SimpleContent: contentValue,
        }
        // var contentValue = $sce.trustAsHtml(editEditor.$txt.html());
        // $scope.vm.data.prevData = {
        //     Description: $scope.vm.data.editData[0].Description,
        //     SimpleContent: contentValue,
        // }
      },
      DetailInforma: function (item,$index) {       //点击时的数据信息
        var self = $scope.vm.data.detailData
        $scope.vm.data.detailData.Id = item.Id;
        $scope.vm.data.detailData.index = $index;
      },
      DeleteInformaSure: function () {        //删除点击确定的方法
        var url = 'SimpleContent/DeleteSimpleContent';
        var data = {
          Id: $scope.vm.data.detailData.Id
        };

        util.ajaxZSTJPost($http, url, data, function (result) {
          if (result.Code == 1) {
            if (result.Data) {
              util.showFade(result.Message);
              var index = $scope.vm.data.detailData.index;
              $scope.vm.data.initData.splice(index,1);
            }
          }else{
            util.showFade(result.Message);
          }

        }, function (err) {
          util.showFade(err.Message);
        })

      }

    };

    $scope.vm.Init();
  });
  return app;
});
