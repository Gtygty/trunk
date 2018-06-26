define(['indexApp', 'common/util', 'common/const','common/MallConst', 'model/pushManagementModel']
  , function (app, util, Const, mallConst,pushManagementModel) {
    app.controller('pushManagementCtrl', function ($scope, $http, signValid)   {

      var _PushManagement,startDateTextBox, endDateTextBox,RegisterStartTimeBox,RegisterEndTimeBox,ReportStartTimeBox,ReportEndTimeBox,ConsultStartTimeBox,ConsultEndTimeBox;

      //分页参数
      $scope.pageConfig =  {
        totalItems: 0,
        currentPage: 1,    //当前所在的页
        itemsPerPage: 10,  //每页展示的数据条数
        pagesLength: 9,   //分页条目的长度（如果设置建议设置为奇数）
        perPageOptions: [10, 30, 50, 100, 200, 500],    //可选择显示条数的数组
        rememberPerPage: 'promoteOrderPage',  //使用LocalStorage记住所选择的条目数的名称
        onChange: function () {
          if ($scope.pageConfig.currentPage != 0 ) {
            _PushManagement.GetList();
          }
        }
      }

      //项目请求地址
      var BaseUrl = {
          AddMultiJPush: "BMSMultiJPush/AddMultiJPush",
          MultiJPushList: "BMSMultiJPush/MultiJPushList",
          MultiPush: "BMSMultiJPush/MultiPush",
          ModifyMultiPush: "BMSMultiJPush/ModifyMultiPush"
      };

      ($scope.vm = {

        PushManagement:{

          data:{
            Id:"",
            searchParams:{
                "Count": 10,
                "PageNum": 1,
                "Title": "",
                "State": -1,
                "StartTime": null,
                "EndTime": null
            },
            addParams:{
              "Title": "",
              "Content": "",
              "Type": 300,
              "ImageUrl": "",
              "H5LinkUrl": "",
              "NativeAndroidClassName": "",
              "NativeAndroidParams": "",
              "NativeIOSClassName": "",
              "NativeIOSParams": "",
              "RegisterStartTime": "",
              "RegisterEndTime": "",
              "ReportStartTime": "",
              "ReportEndTime": "",
              "ConsultStartTime": "",
              "ConsultEndTime": ""
           },
           pushList:[],
           remarkParam:{
              Id:"",
              Remark:""
           },
            Size: { "width":'', "height":'' }
          },

          //状态
          PushManagementStateList:[ 
             {Value: -1,Text:" --全部-- "}
            ,{Value: 0,Text:"未发布"}
            ,{Value: 1,Text:"已发布"}
          ],
          //活动类型
          PushManagementActivityList:[
            //  {Value: -1,Text:" --请选择-- "}
            // ,{Value: 200,Text:"报告解读"}
            // ,{Value: 210,Text:"添加报告"}
            // ,{Value: 220,Text:"健康档案"}
            // ,{Value: 230,Text:"自测问卷"}
            // ,{Value: 240,Text:"步步为赢"}
            // ,{Value: 250,Text:"中医专家"}
            {Value: 1,Text:"网页"}
            ,{Value: 2,Text:"原生"}
          ],

          //重设搜索相关参数
          Onclear :function(){
            _PushManagement.data.searchParams.Title = "";
            _PushManagement.data.searchParams.State = -1;
            startDateTextBox[0].value = "";
            endDateTextBox[0].value = "";
          },

          //上传照片
          OnUploadImage: function () {
            btnImage = $('#inputAddSrc')[0].files[0],
            width = _PushManagement.data.Size.width,
            height = _PushManagement.data.Size.height;

            if(!btnImage){
              util.showFade('请选择您要上传的图片！');
              return;
            }
            var size = btnImage.size / 1024,
                ext = {},
                extName = btnImage.name.split('.').pop();
            if(ext[extName]){
              util.showFade('请选择您要上传的图片！');
              return;
            }
            if(width>710 || height>300){//750*390
              util.showFade('图片宽高不能超过710*300');
              return;
            }

            var filePath = String.prototype.format('{0}/{1}.{2}', Const.ComboConfig.activityMessageImg, util.randomString(32), extName),
                instance = new Sand({
                  bucket: Const.ComboConfig.bucket,
                  expiration: parseInt((new Date().getTime() + 3600000) / 1000),
                  form_api_secret: Const.ComboConfig.form_api_secret
                });
            util.showAjaxLoading();
            instance.upload(filePath, '#inputAddSrc');
          },

          //上传完毕回调
          OnAdUploadImageCallBack: function (data) {
            $scope.vm.PushManagement.data.addParams.ImageUrl = Const.ComboConfig.ComboBaseUrl + data['path'];
            $scope.$apply();
            util.hideAjaxLoading();
          },

          //获取列表
          GetList:function(){
            var url = BaseUrl.MultiJPushList;
            var params = _PushManagement.data.searchParams;
            var params = {
                "PageNum": $scope.pageConfig.currentPage==0?1:$scope.pageConfig.currentPage,
                "Count": $scope.pageConfig.itemsPerPage,
                "Title": params.Title,
                "State": params.State,
                "StartTime": startDateTextBox.val()==""?null:startDateTextBox.val(),
                "EndTime": endDateTextBox.val()?endDateTextBox.val()+" 23:59:59":null
            }
            util.showAjaxLoading();
            util.ajaxZSTJPost($http,url,params,function(result){
              if (result.Code == 1 && result.Data != null){
                _PushManagement.data.pushList = [];
                result.Data.MultiJPushList.forEach(function(item ,idex, array){
                  var model = pushManagementModel.ConvertInfo(item);
                  _PushManagement.data.pushList.push((model));
                });
                $scope.pageConfig.totalItems = result.Data.Count;
              }else {
                util.showFade(result.Message);
              }
              util.hideAjaxLoading();
            },function(err){
              util.hideAjaxLoading();
              util.showFade(err);
            })
          },

          OnAdd:function(){
            var params = _PushManagement.data.addParams;
            RegisterStartTimeBox.val("");
            RegisterEndTimeBox.val("");
            ReportStartTimeBox.val("");
            ReportEndTimeBox.val("");
            ConsultStartTimeBox.val("");
            ConsultEndTimeBox.val("");
            params.Title = null;
            params.Content = null;
            params.Type = 1;
            params.ImageUrl = null;
            var file = $("#inputAddSrc");
            file.after(file.clone().val(""));
            file.remove();
            //将图片清空
            $('.mb').find('img').attr("src","")
            params.H5LinkUrl = null;
            params.NativeAndroidClassName = "";
            params.NativeAndroidParams = "";
            params.NativeIOSClassName = "";
            params.NativeIOSParams = "";
            params.RegisterStartTime = null;
            params.RegisterEndTime = null;
            params.ReportStartTime = null;
            params.ReportEndTime = null;
            params.ConsultStartTime = null;
            params.ConsultEndTime = null;
            $('#panelAddOrModPushManagement').modal('show');
          },

          OnAddParams:function(){
            var url = BaseUrl.AddMultiJPush;
            var params = _PushManagement.data.addParams;
            params.RegisterStartTime = RegisterStartTimeBox.val();
            params.RegisterEndTime = RegisterEndTimeBox.val()?RegisterEndTimeBox.val()+" 23:59:59":RegisterEndTimeBox.val();
            params.ReportStartTime = ReportStartTimeBox.val();
            params.ReportEndTime = ReportEndTimeBox.val()?ReportEndTimeBox.val()+" 23:59:59":ReportEndTimeBox.val();
            params.ConsultStartTime = ConsultStartTimeBox.val();
            params.ConsultEndTime = ConsultEndTimeBox.val()?ConsultEndTimeBox.val()+" 23:59:59":ConsultEndTimeBox.val();
            if(!params.Title){
              util.showFade('请填写标题！');
              return false;
            }
            if(params.Title.length>30){
              util.showFade('标题在30个字符内！');
              return false;
            }
            if(!params.Content){
              util.showFade('请填写内容！');
              return false;
            }
            if(params.Content.length>30){
              util.showFade('内容在30个字符内！');
              return false;
            }
            if(params.Type==-1){
              util.showFade('请选择活动类型！');
              return false;
            }
            if (!params.ImageUrl) {
              util.showFade('请选择图片！');
              return false;
            }
            if (params.Type == 1 && !params.H5LinkUrl) {
              util.showFade('请输入网页链接！');
              return false;
            }
            if (params.Type == 2 && (!params.NativeAndroidClassName.length 
            || !params.NativeAndroidParams.length
            || !params.NativeIOSClassName.length
            || !params.NativeIOSParams.length)) {
              util.showFade('请输入原生参数！');
              return false;
            }
            if( params.RegisterStartTime==""&&params.RegisterEndTime==""
                &&params.ReportStartTime==""&&params.ReportEndTime==""
                &&params.ConsultStartTime==""&&params.ConsultEndTime==""){
              util.showFade('必选一个推送人群时间段！');
              return false;
            }
            util.showAjaxLoading();
            util.ajaxZSTJPost($http,url,params,function(result){
              if (result.Code == 1 && result.Data != null){
                _PushManagement.GetList();
                util.showFade(result.Message);
              }else {
                util.showFade(result.Message);
              }
              util.hideAjaxLoading();
              $('#panelAddOrModPushManagement').modal('hide');
            },function(err){
              util.hideAjaxLoading();
              util.showFade(err);
            })
          },

          //备注弹框
          OnRemarkDialog:function(item){
              _PushManagement.data.remarkParam.Id = item.Id;
              _PushManagement.data.remarkParam.Remark = item.Remark;
              $('#RemarkDialog').modal('show');
          },

          //编辑备注
          OnModifyRemark:function(){
            var url = BaseUrl.ModifyMultiPush;
            var params = _PushManagement.data.remarkParam;
            util.showAjaxLoading();
            util.ajaxZSTJPost($http,url,params,function(result){
              if (result.Code == 1 && result.Data != null){
                _PushManagement.GetList();
                util.showFade(result.Message);
              }else {
                util.showFade(result.Message);
              }
              util.hideAjaxLoading();
              $('#RemarkDialog').modal('hide');
            },function(err){
              util.hideAjaxLoading();
              util.showFade(err);
            })
          },

          //发布弹框
          OnPushDialog:function(item){
              _PushManagement.data.Id = item.Id;
              $('#OnPushDialogs').modal('show');
          },

          //发布
          OnPush:function(item){
            var url = BaseUrl.MultiPush;
            var params = {
                Id:_PushManagement.data.Id
            };
            util.showAjaxLoading();
            util.ajaxZSTJPost($http,url,params,function(result){
              if (result.Code == 1 && result.Data != null){
                _PushManagement.GetList();
                util.showFade(result.Message);
              }else {
                util.showFade(result.Message);
              }
              util.hideAjaxLoading();
              $('#OnPushDialogs').modal('hide');
            },function(err){
              util.hideAjaxLoading();
              util.showFade(err);
            })
          },

          Init:function(){
              _PushManagement.GetList();

              document.addEventListener('uploaded', function(e){
                _PushManagement.OnAdUploadImageCallBack(e.detail);
              });

              $('#inputAddSrc').change(function (){   
                  var current = _PushManagement.data,
                      file = this.files[0],
                      _URL = window.URL || window.webkitURL;
                      img = new Image();
                  img.src = _URL.createObjectURL(file);
                  img.onload = function(){
                      current.Size.width = this.width;
                      current.Size.height = this.height;
                  };
              });
          }

        },

        Init :function(){
          //缓存登录验证
          signValid.ValidAccess("#/pushManagement");
          //侧边栏样式
          $(".navli:eq(4)").addClass("active").siblings().removeClass("active");
          $('body').css('overflow', 'auto');
          //初始化时间空间
          startDateTextBox = $('#startDate');
          endDateTextBox = $('#endDate');
          $.timepicker.dateRange(
            startDateTextBox,
            endDateTextBox,
            {
              changeMonth: true,
              buttonImageOnly: true,
              dateFormat: 'yy/mm/dd',
              monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
              dayNamesMin: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
              minInterval: (1000 * 60 * 60 * 24 * 0) // 0 days
            }
          );
          //初始化时间空间
          RegisterStartTimeBox = $('#RegisterStartTime');
          RegisterEndTimeBox = $('#RegisterEndTime');
          $.timepicker.dateRange(
            RegisterStartTimeBox,
            RegisterEndTimeBox,
            {
              changeMonth: true,
              buttonImageOnly: true,
              dateFormat: 'yy/mm/dd',
              monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
              dayNamesMin: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
              minInterval: (1000 * 60 * 60 * 24 * 0) // 0 days
            }
          );
          //初始化时间空间
          ReportStartTimeBox = $('#ReportStartTime');
          ReportEndTimeBox = $('#ReportEndTime');
          $.timepicker.dateRange(
            ReportStartTimeBox,
            ReportEndTimeBox,
            {
              changeMonth: true,
              buttonImageOnly: true,
              dateFormat: 'yy/mm/dd',
              monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
              dayNamesMin: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
              minInterval: (1000 * 60 * 60 * 24 * 0) // 0 days
            }
          );
          //初始化时间空间
          ConsultStartTimeBox = $('#ConsultStartTime');
          ConsultEndTimeBox = $('#ConsultEndTime');
          $.timepicker.dateRange(
            ConsultStartTimeBox,
            ConsultEndTimeBox,
            {
              changeMonth: true,
              buttonImageOnly: true,
              dateFormat: 'yy/mm/dd',
              monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
              dayNamesMin: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
              minInterval: (1000 * 60 * 60 * 24 * 0) // 0 days
            }
          );
          _PushManagement = $scope.vm.PushManagement;
          _PushManagement.Init();
        }

      }).Init();

    });
    return app;
  });
