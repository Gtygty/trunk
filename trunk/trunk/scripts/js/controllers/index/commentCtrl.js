define(['indexApp', 'common/util', 'common/const', 'model/commentModel', 'jQueryUi', 'timePicker'], function (app, util, config, vModel) {
  app.controller('commentCtrl', function ($scope, $http, signValid) {

    var BASE = {
        Title: '',
        URLS: {
            Add: 'BMSComment/AddOrModify',
            // List: 'BMSComment/GetList',
            ManagerComments: 'BMSComment/GetManagerComments',
            UserComments: 'BMSComment/GetUserComments',
            Edit: 'BMSComment/AddOrModify',
            Del: 'BMSComment/Remove',
            Depart: 'ServiceDept/GetAllServiceDepts',
            Enabled: 'BMSComment/Enabled',
            Disabled: 'BMSComment/Disabled',
            Update:'BMSComment/UpdateSystemCommentDate'
        },
        GET: function(url, successCallback){
            util.ajaxGet($http, url, function(result){
                if (result.state == 1 && result.Data != null) { successCallback && successCallback(result.Data); } else { util.showFade(result.message); }
            }, BASE.ErrorCallback);
        },
        POST: function(url, param, successCallback){
            util.ajaxPost($http, url, param, function(result){
                if (result.state == 1 && result.Data != null) { successCallback && successCallback(result.Data); } else { util.showFade(result.message); }
            }, BASE.ErrorCallback);
        },
        ZPOST: function(url, param, successCallback){
            util.ajaxZSTJPost($http, url, param, function(result){
                if (result.Code == 1 && result.Data != null) { successCallback && successCallback(result.Data); } else { util.showFade(result.message); }
            }, BASE.ErrorCallback);
        },
        ErrorCallback: function (error) {
            util.showFade('获取数据失败');
        }
    };

    //分页参数
    $scope.pageConfig = {
        totalItems: 0,
        currentPage: 1,    //当前所在的页
        itemsPerPage: 10,  //每页展示的数据条数
        pagesLength: 9,   //分页条目的长度（如果设置建议设置为奇数）
        perPageOptions: [10, 30, 50, 100, 200, 500],    //可选择显示条数的数组
        rememberPerPage: 'UserCommentstManagePerPage',  //使用LocalStorage记住所选择的条目数的名称
        onChange: function () {
          if ($scope.pageConfig.currentPage != 0 ) {
            $scope.vm.commentCollection.List.OnClick(1);
        }
      }
    };

    $scope.vm = {
        commentCollection:{
            Departs:{                                                  // 初始化所有机构列表
               Data:[],
               Init:function(){
                 var $$this = $scope.vm.commentCollection.Departs,
                     $$vm = new vModel(),
                     $$Depart = [];

                 BASE.GET(BASE.URLS.Depart, function(result){
                     //console.log('----------初始化所有机构列表--------');
                     //console.log(result);
                     for(var i=0; i< result.length; i++){
                        var item = result[i],
                            viewModel = $$vm.convertFromDepart(item);
                        $$Depart.push(viewModel);
                     }
                     var unist = {
                         DepartCode: '-1',
                         Name: '---全部---'
                     };
                     $$Depart.unshift(unist);
                     $$this.Data = $$Depart;
                     //console.log($$this.Data);
                 });
               }
            },
            SelfList: {
                Data: [],
                selfCount: '0',
                SelfCurrent:{                  // 手动评价板块时间绑定
                    startDate: '',
                    endDate: ''
                },
                Current:{                      // 客户评价板块时间绑定
                    startDate: '',
                    endDate: ''
                },
                OnClickUpdateDate: function(){ // 点击更新系统时间 刷页面
                    BASE.ZPOST(BASE.URLS.Update, {},function(result){
                        if(result){
                            $scope.vm.Init();
                        }
                    });
                },
                InitDate: function(){
                    var self = $scope.vm.commentCollection.SelfList;
                      /* eslint-disable no-undef */
                      var startDateTextBox = $('#startSelfDate');
                      var endDateTextBox = $('#endSelfDate');
                      var startNextDate = $('#startNextDate');
                      var endNextDate = $('#endNextDate');
                      self.SelfCurrent.startDate = '';
                      self.SelfCurrent.endDate = '';
                      self.Current.startDate = '';
                      self.Current.endDate = '';
                      $.timepicker.dateRange(
                        startDateTextBox,
                        endDateTextBox,
                        {
                            changeMonth: true,
                            buttonImageOnly: true,
                            dateFormat: 'yy-mm-dd',
                            monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                            dayNamesMin: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
                            minInterval: (1000 * 60 * 60 * 24 * 0) // 0 days
                        }
                      );
                      $.timepicker.dateRange(
                        startNextDate,
                        endNextDate,
                        {
                            changeMonth: true,
                            buttonImageOnly: true,
                            dateFormat: 'yy-mm-dd',
                            monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                            dayNamesMin: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
                            minInterval: (1000 * 60 * 60 * 24 * 0) // 0 days
                        }
                      );

                },
                Init: function(){
                    var $$this = $scope.vm.commentCollection.SelfList;

                    $$this.InitDate();
                }
            },
            List: {            // 获取评价列表模块
               Data: [],                                                 // 评价列表数据
               ListCount: '0',
               Current:{                                                 // 点击查询绑定参数
                  DepartCode: '-1',
                  Sta: '-1'
               },
               val:[
                  {value: '-1',text:'---全部---'},
                  {value: '1',text:'已上架'},
                  {value: '0',text:'已下架'}
               ],
               OnClick: function(val){                                  // 点击查询 事件
                  var $$this = $scope.vm.commentCollection.List,
                      $$dept = $scope.vm.commentCollection.Departs,
                      $$selfList = $scope.vm.commentCollection.SelfList,
                      $$vm = new vModel(),
                      $$param = {},
                      $$tempData = [],
                      /* eslint-disable no-undef */
                      startDateTextBox = $('#startSelfDate').val(),
                      startNextDate = $('#startNextDate').val(),
                      endDateTextBox = '',
                      endNextDate = '';
                  if($('#endSelfDate').val()){
                      endDateTextBox = $('#endSelfDate').val()+' '+'23:59:59';
                  }
                  if($('#endNextDate').val()){
                      endNextDate = $('#endNextDate').val()+' '+'23:59:59';
                  }
                  if(val == 2){
                      $$param ={                                         // 手动评价页面参数
                          StartDate: startDateTextBox,
                          EndDate: endDateTextBox
                      };
                      BASE.ZPOST(BASE.URLS.ManagerComments,$$param,function(result) {
                        //用户评价
                        for(var i=0; i< result.length; i++){
                             var item = result[i],
                                 viewModel = $$vm.convertFromList(item);
                             for(var j=0;j<$$dept.Data.length;j++){
                                 if(viewModel.DepartCode == $$dept.Data[j].DepartCode){
                                     viewModel.Name = $$dept.Data[j].Name;
                                 }
                             }
                             $$tempData.push(viewModel);
                         }
                         $$selfList.Data = $$tempData;
                        //  console.log($$selfList.Data);
                         $$selfList.selfCount = $$tempData.length;
                      });
                  }else{
                      var Code = '';
                      if($$this.Current.DepartCode == -1){
                          Code = '';
                      }else{
                          Code = $$this.Current.DepartCode;
                      }
                      var pageIndex = $scope.pageConfig.currentPage;
                      if (pageIndex == 0) {
                        pageIndex = 1;
                      }
                      $$param ={                                         // 客户评价页面参数
                          DepartCode: Code,
                          StartDate: startNextDate,
                          EndDate: endNextDate,
                          Status: $$this.Current.Sta,
                          PageIndex: pageIndex,
                          PageSize: $scope.pageConfig.itemsPerPage
                      };
                      BASE.ZPOST(BASE.URLS.UserComments,$$param,function(result) {
                        $scope.pageConfig.totalItems = result.Total;
                        for(var i=0; i< result.Comments.length; i++){
                           var item = result.Comments[i],
                               viewModel = $$vm.convertFromList(item);
                           for(var j=0;j<$$dept.Data.length;j++){
                               if(viewModel.DepartCode == $$dept.Data[j].DepartCode){
                                   viewModel.Name = $$dept.Data[j].Name;
                               }
                           }
                           $$tempData.push(viewModel);
                       }
                           $$this.Data = $$tempData;
                          //  console.log($$this.Data);
                           $$this.ListCount = $$tempData.length;
                      });
                  }
                  // console.log('--------2.点击手动评价查询按钮---------');
                  // console.log($$param);
                  // BASE.ZPOST(BASE.URLS.ManagerComments, $$param,function(result){

                  //    for(var i=0; i< result.length; i++){
                  //        var item = result[i],
                  //            viewModel = $$vm.convertFromList(item);
                  //        for(var j=0;j<$$dept.Data.length;j++){
                  //            if(viewModel.DepartCode == $$dept.Data[j].DepartCode){
                  //                viewModel.Name = $$dept.Data[j].Name;
                  //            }
                  //        }
                  //        $$tempData.push(viewModel);
                  //    }
                  //    if(val == 2){
                        //  $$selfList.Data = $$tempData;
                        // //  console.log($$selfList.Data);
                        //  $$selfList.selfCount = $$tempData.length;
                  //    }else{
                  //        $$this.Data = $$tempData;
                  //       //  console.log($$this.Data);
                  //        $$this.ListCount = $$tempData.length;
                  //    }
                  // });
               },
               Init: function(){                                              // 初始化评价列表内容
                  var $$this = $scope.vm.commentCollection.List,
                      $$dept = $scope.vm.commentCollection.Departs,
                      $$selfList = $scope.vm.commentCollection.SelfList,
                      $$vm = new vModel(),
                      $$tempData = [],
                      $$tempSelfData = [],
                      $$param = {
                           StartDate: '',
                           EndDate: ''
                      };
                  //console.log($$param)
                  BASE.ZPOST(BASE.URLS.ManagerComments, $$param,function(result){
                     //console.log('--------1.初始化评价列表内容---------')
                     //console.log(result)
                     for(var i=0; i< result.length; i++){
                         var item = result[i],
                             viewModel = $$vm.convertFromList(item);
                         for(var j=0;j<$$dept.Data.length;j++){                // 添加机构名称
                             if(viewModel.DepartCode == $$dept.Data[j].DepartCode){
                                 viewModel.Name = $$dept.Data[j].Name;
                             }
                         }
                         if(viewModel.UserType == 1){                          // UserType 用户操作类型 1. 用户 2.管理员
                             $$tempData.push(viewModel);
                         }else{
                             $$tempSelfData.push(viewModel);
                         }
                     }
                     $$selfList.selfCount = $$tempSelfData.length;
                     $$selfList.Data = $$tempSelfData;
                     $$this.ListCount = $$tempData.length;
                     $$this.Data = $$tempData;
                     //console.log($$selfList.Data);
                     //console.log($$this.Data)
                     $$this.OnClick(1);
                  });
               }
            },
            Add: {                           // 添加评论模块
                Current: {
                    ID: 0,
                    DepartCodes:[],
                    Content: '',
                    Level: '',
                    Type: 1,
                    UserType: 2,
                    UserName: ''
                },
                // param:['1','2','3','4','5'], // 选择评星的参数
                param:[
                    {value:1,name:'starchecksun'},
                    {value:2,name:'starchecksun'},
                    {value:3,name:'starchecksun'},
                    {value:4,name:'starchecksun'},
                    {value:5,name:'starchecksun'}
                ],
                OnOpenDialog: function(){

                },
                OnClearContent:function(){             // 点击取消清空添加的数据
                     var $$this = $scope.vm.commentCollection.Add;
                     $$this.Current = {
                            ID: 0,
                            DepartCodes:[],
                            Content: '',
                            Level: '',
                            Type: 1,
                            UserType: 2,
                            UserName: ''
                     };
                     $$this.param = [
                        {value:1,name:'starchecksun'},
                        {value:2,name:'starchecksun'},
                        {value:3,name:'starchecksun'},
                        {value:4,name:'starchecksun'},
                        {value:5,name:'starchecksun'}
                     ];
                },
                OnStarClick:function(item){
                    var $$this = $scope.vm.commentCollection.Add;
                    for(var i=0;i<$$this.param.length;i++){
                        if($$this.param[i].value <= item.value){
                            $$this.param[i].name = 'starchecklight';
                        }else{
                            $$this.param[i].name = 'starchecksun';
                        }
                    }
                    $$this.Current.Level = item.value;
                },
                OnClick: function(){
                    var $$this = $scope.vm.commentCollection.Add,
                        $$selfList = $scope.vm.commentCollection.SelfList,
                        $$dept = $scope.vm.commentCollection.Departs,
                        $$vm = new vModel(),
                        $$Curren = $$this.Current;
                    if($$Curren.UserName == ''){
                        util.showFade('姓名不能为空');
                        return;
                    }else if($$Curren.UserName.length > 20){
                        util.showFade('姓名不能超过20个字符');
                        return;
                    }else if($$Curren.Level == ''){
                        util.showFade('请选择评价');
                        return;
                    }else if($$Curren.Content == ''){
                        util.showFade('内容不能为空');
                        return;
                    }else if($$Curren.Content.length > 100){
                        util.showFade('内容不能超过100');
                        return;
                    };
                    // var str=$$Curren.Content.replace(/(\r\n|\n|\r)/gm, '');
                    // 清除文本的换行符和空格
                    var str  =  $$Curren.Content.toString().replace(/[\r\n]/g, "").replace(/(^\s*)|(\s*$)/g, "");
                    $$Curren.Content = str;
                    // console.log(str);
                    BASE.ZPOST(BASE.URLS.Add, $$Curren, function(result){
                        for(var i=0; i< result.length; i++){
                            var item = result[i],
                                viewModel = $$vm.convertFromList(item);
                            for(var j=0;j<$$dept.Data.length;j++){
                                if(viewModel.DepartCode == $$dept.Data[j].DepartCode){
                                    viewModel.Name = $$dept.Data[j].Name;
                                }
                            }
                            //console.log($$Main.Data)
                            $$selfList.Data.push(viewModel);
                            $$selfList.selfCount =  $$selfList.Data.length;
                            /* eslint-disable no-undef */
                            $('#myListAdd').modal('hide');
                        }
                        $$this.OnClearContent();    // 添加成功后 清空数据
                    });
                }
            },
            Edit: {                        // 编辑评论模块
                Current: {},
                OnOpenDialog: function(item){
                    var $$this = $scope.vm.commentCollection.Edit;
                    $$this.Current = {
                        ID:item.ID,
                        Content:item.Content,
                        CreateDate: item.CreateDate,
                        DepartCode: item.DepartCode,
                        Level: item.Level,
                        Type: item.Type,
                        UserName: item.UserName,
                        UserType: item.UserType,
                        Status: item.Status,
                        star: item.star
                    };
                },
                OnClick: function(){
                    var $$this = $scope.vm.commentCollection.Edit,
                        $$selfList = $scope.vm.commentCollection.SelfList,
                        $$current={
                            Content: $$this.Current.Content,
                            CreateDate:$$this.Current.CreateDate,
                            DepartCodes:[],
                            ID: $$this.Current.ID,
                            Level:$$this.Current.Level,
                            Type: $$this.Current.Type,
                            UserName: $$this.Current.UserName,
                            UserType: $$this.Current.UserType,
                            Status: $$this.Current.Status
                        };
                    $$current.DepartCodes.push($$this.Current.DepartCode);
                    // console.log($$current)
                    // 清除文本的换行符和空格
                    var str  =  $$current.Content.toString().replace(/[\r\n]/g, "").replace(/(^\s*)|(\s*$)/g, "");
                    $$current.Content = str;
                    if($$current.Content == ''){
                        util.showFade('内容不能为空');
                        return;
                    }else if($$current.Content.length > 100){
                        util.showFade('内容不能超过100');
                        return;
                    };
                    BASE.ZPOST(BASE.URLS.Edit, $$current, function(result){
                        // console.log(result)
                        for(var i=0; i< $$selfList.Data.length; i++){
                            var item = $$selfList.Data[i];
                            if(item.ID == $$current.ID){
                                $$selfList.Data[i] = $$this.Current;
                                break;
                            }
                         };
                         $$this.Current = {};
                         /* eslint-disable no-undef */
                         $('#myListEdit').modal('hide');
                    });
                }
            },
            Del: {     // 删除功能模块
                Current: {
                      ID:[]
                },
                OnOpenDialog: function(item){                // 点击删除按钮
                    var $$this = $scope.vm.commentCollection.Del;

                    $$this.Current.ID.push(item.ID);
                },
                OnClick: function(){
                    var $$this = $scope.vm.commentCollection.Del,
                        $$selfList = $scope.vm.commentCollection.SelfList,
                        $$current = $$this.Current,
                        IDS = [];
                    IDS = $$current.ID;
                    BASE.ZPOST(BASE.URLS.Del, { IDS: IDS }, function(result){
                        if(result == true){
                            for(var n=0;n<IDS.length;n++){
                                for(var i=0; i< $$selfList.Data.length; i++){
                                    var item = $$selfList.Data[i];
                                    if(item.ID == IDS[n]){
                                        $$selfList.Data.splice(i, 1);
                                    }
                                }
                            }
                            $$selfList.selfCount =  $$selfList.Data.length;
                        }
                    });
                }
            },
            Check: {   // 全选的操作模块
                Current:{
                    Box: false
                },
                OnCheckedBox: function(item){
                    item.Checked = !item.Checked;
                },
                OnAllCheckedBox: function(){
                    var $$list = $scope.vm.commentCollection.List,
                        $$Check = $scope.vm.commentCollection.Check,
                        Checked = '';
                    if($$Check.Current.Box == true){
                        Checked = true;
                    }else{
                        Checked = false;
                    }
                    for(var i=0;i<$$list.Data.length;i++){
                       $$list.Data[i].Checked = Checked;
                    }
                }
            },
            Enabled:{  // 上下架功能模块
                Current: {
                    IDS: []
                },
                OnOpenDialog: function(val){
                    var $$this = $scope.vm.commentCollection.Enabled,
                        $$Check = $scope.vm.commentCollection.Check,
                        $$list = $scope.vm.commentCollection.List;
                    $$this.Current.IDS = [];
                    for(var i=0;i<$$list.Data.length;i++){
                        var self = $$list.Data[i];
                        if(self.Checked == true){
                            $$this.Current.IDS.push(self.ID);
                        }
                    }
                    if($$this.Current.IDS == ''){
                        util.showFade('请勾选评价列表');
                        return;
                    }
                    if(val == 1){
                        $('#myListUp').modal('show');
                    }else{
                        $('#myListDown').modal('show');
                    }
                    // console.log($$this.Current.IDS)
                },
                OnUpClick: function(val){      // 上架操作
                    var $$this = $scope.vm.commentCollection.Enabled,
                        $$list = $scope.vm.commentCollection.List,
                        $$Check = $scope.vm.commentCollection.Check,
                        item = { IDS:[] };
                    if(val){
                        item.IDS.push(val.ID);
                    }else{
                        item = $$this.Current;
                    }
                    // console.log(item);
                    BASE.ZPOST(BASE.URLS.Enabled, item, function(result){
                        if(result){
                            util.showFade('成功上架');
                            for(var i=0;i<$$list.Data.length;i++){
                                for(var j=0;j<item.IDS.length;j++){
                                    if($$list.Data[i].ID == item.IDS[j]){
                                        $$list.Data[i].Checked = false;
                                        $$list.Data[i].Status = 1;
                                    }
                                }
                            }
                            if(val == ''){
                                $$Check.Current.Box = false;
                            }
                        }
                    });
                },
                OnDownClick: function(val){  // 下架操作
                    var $$this = $scope.vm.commentCollection.Enabled,
                        $$list = $scope.vm.commentCollection.List,
                        $$Check = $scope.vm.commentCollection.Check,
                        item = { IDS:[] };
                    if(val){
                        item.IDS.push(val.ID);
                    }else{
                        item = $$this.Current;
                    }
                    // console.log(item);
                    BASE.ZPOST(BASE.URLS.Disabled, item, function(result){
                        if(result == true){
                            util.showFade('成功下架');
                            for(var i=0;i<$$list.Data.length;i++){
                                for(var j=0;j<item.IDS.length;j++){
                                    if($$list.Data[i].ID == item.IDS[j]){
                                        $$list.Data[i].Checked = false;
                                        $$list.Data[i].Status = 0;
                                    }
                                }
                            };
                            // console.log($$list.Data);
                            if(val == ''){
                                $$Check.Current.Box = false;
                            }
                        }
                    });
                }
            },
            Init: function(){
                var $$this = $scope.vm.commentCollection;

                $$this.List.Init();
                $$this.SelfList.Init();
                $$this.Departs.Init();
            }
        },
        Init: function(){
            var $$this = $scope.vm.commentCollection;

            signValid.ValidAccess('#/comment');                                           // 缓存登录验证
            /* eslint-disable no-undef */
            $('.nav li:eq(16)').addClass('active').siblings().removeClass('active');     // 侧边栏样式
            $('body').css('overflow', 'auto');
            $$this.Init();
        }
    };

    $scope.vm.Init();

  });
  return app;
});
