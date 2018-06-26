/* eslint-disable no-undef */
define(['indexApp', 'common/util', 'common/const', 'model/mall/SupplierManagerModel', 'emoji', 'service/baseService', 'model/messageAutoSendModel', 'bootStrapMultiselect']
  , function (app, util, constant, supplierManagerModel, emojiUtil, dir) {
  app.controller('supplierInfoCtrl', ['$scope', '$http', 'signValid', function ($scope, $http, signValid) {
    signValid.ValidAccess("#/mallSupplierInfo"); //缓存登录验证
    $(".navli:eq(5)").addClass("active").siblings().removeClass("active");
    $('body').css('overflow', 'auto');

    var Const = {
      defaultImgSrc : "http://zhangshangtijian.b0.upaiyun.com/default/deptIcon/MyxA46tzXnUD4Qbk1N8tqHdOYV2ZoI7g.png"
    }

    $scope.GlobalData={
      Urls: {
          GetTagListUrl: 'BMSSupplier/SupplierTags', //获取供应商标签列表
          UpdateTagUrl: 'BMSSupplier/AddOrModifySupplierTags', //变更标签
          GetDepartListUrl:'BMSSupplier/GetDeptList',
          ProvinceCityListUrl: 'BMSSupplier/ProvinceCityList', //省市列表
          GaoDeProvinceCityListUrl: 'BMSSupplier/AMapProvinceCityList',//高德城市列表
          AddMECSupplierUrl:'BMSSupplier/AddMECSupplier',
          ModifyMECSupplierUrl:'BMSSupplier/ModifyMECSupplier',
          SearchListUrl:'BMSSupplier/SearchSupplier',
          GetDetailUrl:'BMSSupplier/MECSupplierDetail',
          DeleteSupplierUrl:'BMSSupplier/DeleteSupplier'
        }
    }

    $scope.vm={
        ViewData:{
            InputTagValue:"",//添加tag输入框
            CurrentDeleteTag:"",//当前需要删除的tag
            InputSearchSupplierName:"",
            InputSearchSupplierCode:"",
            TagForAddSupplierSelectedList : [],
            SearchList:[],
            TagList:[],
            pageModel:{
              currentPage: 1,    //当前所在的页
              itemsPerPage: 10,  //每页展示的数据条数
              pagesLength: 9,   //分页条目的长度（如果设置建议设置为奇数）
              perPageOptions: [10, 20, 30, 40, 50],    //可选择显示条数的数组
              rememberPerPage: 'perPageItemsOne',  //使用LocalStorage记住所选择的条目数的名称
              onChange: function () {
                if($scope.vm.ViewData.pageModel.currentPage != 0){
                  $scope.vm.Event.SearchList();
                }
              }
            },
            Reset:function(){
              this.CurrentSupplierCode=null;
              this.CurrentDeleteItemCode="";//当前需要删除的item
              this.DepartSelectValue=-1;
              this.TagSelectValue="请选择";
              this.ProvinceSelectValue=-1;
              this.GaoDeProvinceSelectValue=-1;
              this.CitySelectValue=-1;
              this.RankSelectValue="请选择";
              this.ImageLogSrc = Const.defaultImgSrc;
              this.ImageBackgroundSrc = Const.defaultImgSrc;
              this.ImageAuthbookSrc = Const.defaultImgSrc;
              this.TagList=[];
              // this.TagForAddSupplierList=["请选择"];//tag所有选项
              this.TagForAddSupplierSelectedList=[];//tag被选择的选项
              // this.DepartList=[];//添加供应商时候下拉机构列表
              // this.OriginProvinceList=[];
              // this.OriginCityList=[];//所有的城市
              // this.OptionCityList=[];//选中省份的城市
              this.RankList=["请选择","三甲医院","二甲医院","公立医院","民营医院","体检中心"];
              this.WorkDayList=[];// 工作日
              this.WorkDaySelectedList=[];// 选中的工作日
              this.SuplierName="";//服务商名称
              this.ContactMember="";//对接人
              this.Email="";
              this.Telephone="";
              this.Worktime="";
              this.Address="";
              this.BusLine="";//乘车路线
              this.ParkSpace="";//停车位
              this.Longitude="";//经
              this.Latitude="";//纬
              this.BeforeDay="";//提前天数
              this.MaxBeforeDay="";//最大提前天数
              this.HasWIFI=0;
              this.GroupAppointLimit="";//最大上限
              this.Index=0;//权重
              this.Description="";
              this.UploadFileFinishHandler=null;
              var inputList = ["#InputFileAuthbook", "#InputFileBackground", "#InputFileLog"];
              inputList.forEach(function(item, index, array){
                var input = $(item);
                input.after(input.clone().val(""));
                input.remove();
              })
            }
        },
        Event:{
          GetTagList:function(){
            var url = $scope.GlobalData.Urls.GetTagListUrl;
            data = {};
            util.ajaxMALLPost($http, url, data, function (result) {
              if (result.Code == 1) {
                if (result.Data) {
                  $scope.vm.ViewData.TagList=[];
                  for (var i = 0; i <result.Data.length; i++) {
                    $scope.vm.ViewData.TagList.push(result.Data[i])
                  }
                }
              }
            }, function (err) {
              util.showFade(result.Message);
            });
          },
          AddTag: function () {
            var url = $scope.GlobalData.Urls.UpdateTagUrl;
            var newTag = $scope.vm.ViewData.InputTagValue;
            if (newTag === '') {
              util.showFade('请输入标签名称');
              return false;
            }
            for (var i = 0; i < $scope.vm.ViewData.TagList.length; i++) {
              if ($scope.vm.ViewData.TagList[i] == newTag) {
                util.showFade('标签名称重复');
                return false;
              }
            }
            var tags=[];
            for (var i = 0; i < $scope.vm.ViewData.TagList.length; i++) {
                var tag=$scope.vm.ViewData.TagList[i];
                tags.push(tag);
            }
            tags.push(newTag)
            var data = {
              'Tags': tags
            };
            util.ajaxMALLPost($http, url, data, function (result) {
              if (result.Code == 1) {
                if (result.Data) {
                  util.showFade(result.Message);
                  $scope.vm.ViewData.TagList=tags;
                }
              }
            });
          },
          BeforeDeleteTag:function(item){
              $scope.vm.ViewData.CurrentDeleteTag=item;
          },
          DeleteTag:function(){
            var url = $scope.GlobalData.Urls.UpdateTagUrl;
            var tags=[];
            for (var i = 0; i < $scope.vm.ViewData.TagList.length; i++) {
                var tag=$scope.vm.ViewData.TagList[i];
                if($scope.vm.ViewData.CurrentDeleteTag!=tag){
                  tags.push(tag);
                }
            }
            var data = {
              'Tags': tags
            };
            util.ajaxMALLPost($http, url, data, function (result) {
              if (result.Code == 1) {
                if (result.Data) {
                  util.showFade(result.Message);
                  $scope.vm.ViewData.TagList=tags;
                  $scope.vm.ViewData.CurrentDeleteTag="";
                }
              }
            });
          },
          ShowAddSupplierPannel:function(){
            $scope.vm.ViewData.Reset();
            $('#serviceManagedAdd').modal('show');
            $scope.vm.Method.InitSupplierPannel();
          },
          ChangeProvince:function(){
              $scope.vm.ViewData.OptionCityList=[];
              if($scope.vm.ViewData.ProvinceSelectValue!=-1){
                for (var i = 0; i < $scope.vm.ViewData.OriginCityList.length; i++) {
                  if ($scope.vm.ViewData.OriginCityList[i].ParentID == $scope.vm.ViewData.ProvinceSelectValue) {
                    $scope.vm.ViewData.OptionCityList.push($scope.vm.ViewData.OriginCityList[i]);
                  }
                }
              }
              $scope.vm.ViewData.OptionCityList.unshift({Name: '请选择',ID:-1,ParentID:-1});
              // $scope.vm.ViewData.OriginProvinceList.unshift({
              //   label: '请选择',
              //   title: '请选择',
              //   value: -1,
              //   selected: false});
              // $scope.vm.ViewData.CitySelectValue=-1;
          },
          //高德城市选择切换
          ChangeGaoDeProvince:function(){
            $scope.vm.ViewData.OptionGaoDeCityList=[];
            if($scope.vm.ViewData.GaoDeProvinceSelectValue!=-1){
              for (var i = 0; i < $scope.vm.ViewData.OriginGaoDeCityList.length; i++) {
                if ($scope.vm.ViewData.OriginGaoDeCityList[i].ParentID == $scope.vm.ViewData.GaoDeProvinceSelectValue) {
                  $scope.vm.ViewData.OptionGaoDeCityList.push($scope.vm.ViewData.OriginGaoDeCityList[i]);
                }
              }
            }
            $scope.vm.ViewData.OptionGaoDeCityList.unshift({Name: '请选择',ID:-1,ParentID:-1});
            console.log($scope.vm.ViewData.OriginGaoDeProvinceList);
            console.log($scope.vm.ViewData.OptionGaoDeCityList);
          },
          UploadLogImage:function(){
              var uploadFileFinishHandler=function(e){
                util.hideAjaxLoading();
                var path=constant.ComboConfig.ComboBaseUrl+e.detail["path"];
                $scope.vm.ViewData.ImageLogSrc=path;
                $scope.$apply();
              }
              $scope.vm.Method.UploadSingleImage("InputFileLog",uploadFileFinishHandler);
          },
          UploadBackgroundImage:function(){
              var uploadFileFinishHandler=function(e){
                util.hideAjaxLoading();
                var path=constant.ComboConfig.ComboBaseUrl+e.detail["path"];
                $scope.vm.ViewData.ImageBackgroundSrc=path;
                $scope.$apply();
              }
              $scope.vm.Method.UploadSingleImage("InputFileBackground",uploadFileFinishHandler);
          },
          UploadAuthbookImage:function(){
              var uploadFileFinishHandler=function(e){
                util.hideAjaxLoading();
                var path=constant.ComboConfig.ComboBaseUrl+e.detail["path"];
                $scope.vm.ViewData.ImageAuthbookSrc=path;
                $scope.$apply();
              }
              $scope.vm.Method.UploadSingleImage("InputFileAuthbook",uploadFileFinishHandler);
          },
          GetItemDetail:function(supplierCode){
            $scope.vm.ViewData.Reset();
            $scope.vm.ViewData.CurrentSupplierCode=supplierCode;
            var url=$scope.GlobalData.Urls.GetDetailUrl;
            var data={"SupplierCode":$scope.vm.ViewData.CurrentSupplierCode};

            util.ajaxMALLPost($http, url, data, function (result) {
              if (result.Code == 1) {
                if (result.Data) {
                    var detail= supplierManagerModel.convertSupplierDetail(result.Data);
                    $scope.vm.ViewData.DepartSelectValue=detail.BaseInfo.SupplierCode;
                    $scope.vm.ViewData.SuplierName=detail.BaseInfo.SupplierName;
                    $scope.vm.ViewData.RankSelectValue=detail.Other.MECLevel;
                    $scope.vm.ViewData.ProvinceSelectValue=detail.BaseInfo.Province;
                    $scope.vm.ViewData.CitySelectValue=detail.BaseInfo.City;
                    $scope.vm.ViewData.GaoDeProvinceSelectValue=detail.BaseInfo.AMapProvince;
                    $scope.vm.ViewData.GaoDeCitySelectValue=detail.BaseInfo.AMapCity;
                    $scope.vm.ViewData.TagForAddSupplierSelectedList=detail.BaseInfo.SupplierTags;
                    $scope.vm.ViewData.ContactMember=detail.BaseInfo.ContactName;
                    $scope.vm.ViewData.Telephone=detail.BaseInfo.ContactPhone;
                    $scope.vm.ViewData.Email=detail.BaseInfo.ContactMail;
                    $scope.vm.ViewData.Address=detail.BaseInfo.Address;
                    $scope.vm.ViewData.BusLine=detail.Other.Route;
                    $scope.vm.ViewData.ParkSpace=detail.Other.ParkingLot;
                    $scope.vm.ViewData.Longitude=detail.Other.Longitude;
                    $scope.vm.ViewData.Latitude=detail.Other.Latitude;
                    $scope.vm.ViewData.Worktime=detail.Other.WorkTime;
                    $scope.vm.ViewData.Index=detail.BaseInfo.Weight;
                    $scope.vm.ViewData.GroupAppointLimit=detail.BaseInfo.GroupAppointLimit;
                    $scope.vm.ViewData.BeforeDay=detail.Other.MinBookRange;
                    $scope.vm.ViewData.MaxBeforeDay=detail.Other.MaxBookRange;
                    $scope.vm.ViewData.WorkDaySelectedList=detail.Other.WorkDateList;
                    $scope.vm.ViewData.HasWIFI=detail.Other.MECInfo.HasWIFI;
                    $scope.vm.ViewData.ImageLogSrc=detail.Other.MECInfo.MECLogoImg;
                    $scope.vm.ViewData.ImageBackgroundSrc=detail.Other.MECInfo.MECBgImg;
                    $scope.vm.ViewData.ImageAuthbookSrc=detail.Other.MECInfo.MECAuthorImg;
                    $scope.vm.ViewData.Description=detail.Other.MECInfo.MECDesc;

                    $('#serviceManagedAdd').modal('show');
                    $scope.vm.Method.InitSupplierPannel();
                    console.log($scope.vm.ViewData)
                }
              }
            });
          },
          Add:function(){
            if($scope.vm.ViewData.DepartSelectValue==-1){
              alert("请选择服务商对应机构");
              return;
            }
            else if($scope.vm.ViewData.SuplierName.length==0){
              alert("请填写服务商机构名称");
              return;
            }
            else if($scope.vm.ViewData.RankSelectValue=="请选择"){
              alert("请选择等级等级");
              return;
            }
            else if($scope.vm.ViewData.TagForAddSupplierSelectedList.length==0){
              alert("请选择服务商标签");
              return;
            }
            else if($scope.vm.ViewData.ProvinceSelectValue==-1||$scope.vm.ViewData.CitySelectValue==-1){
              alert("请选择城市");
              return;
            }
            else if($scope.vm.ViewData.GaoDeProvinceSelectValue==-1||$scope.vm.ViewData.GaoDeCitySelectValue==-1){
              alert("请选择高德城市");
              return;
            }
            else if($scope.vm.ViewData.ContactMember.length==0){
              alert("请填写对接人");
              return;
            }
            else if(!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($scope.vm.ViewData.Email)){
              alert("请填写正确的Email");
              return;
            }
            else if($scope.vm.ViewData.Telephone.length==0){
              alert("请填写联系电话");
              return;
            }
            else if($scope.vm.ViewData.Worktime.length==0){
              alert("请填写工作时间");
              return;
            }
            else if($scope.vm.ViewData.Address.length==0){
              alert("请填写地址");
              return;
            }
            else if(!/^\d+(\.\d+)?$/.test($scope.vm.ViewData.Longitude) || !/^\d+(\.\d+)?$/.test($scope.vm.ViewData.Latitude)){
              alert("请填写正确格式的经纬度（整数或者小数）");
              return;
            }
            else if(!/^\d{1,3}}?$/.test($scope.vm.ViewData.BeforeDay) || !/^\d{1,3}}?$/.test($scope.vm.ViewData.MaxBeforeDay)){
              alert("请填写正确格式的前置天数和最大前置天数（整数）");
              return;
            }
            else if(parseInt($scope.vm.ViewData.BeforeDay)>parseInt($scope.vm.ViewData.MaxBeforeDay)){
              alert("前置天数不能大于最大前置天数");
              return;
            }
            else if($scope.vm.ViewData.WorkDaySelectedList.length==0){
              alert("请选择工作日");
              return;
            }
            else if(!/^\d{1,5}}?$/.test($scope.vm.ViewData.Index)){
              alert("请填写正确格式的权重");
              return;
            }
            else if($scope.vm.ViewData.ImageLogSrc == Const.defaultImgSrc){
              alert("请上传log图");
              return;
            }
            else if($scope.vm.ViewData.ImageBackgroundSrc == Const.defaultImgSrc){
              alert("请上传背景图");
              return;
            }
            else if($scope.vm.ViewData.Description.length==0){
              alert("请填写描述信息");
              return;
            }
            var data={};
            data.SupplierName=$scope.vm.ViewData.SuplierName;
            data.SupplierCode=$scope.vm.ViewData.DepartSelectValue;
            data.SupplierTags=[];
            data.ContactName=$scope.vm.ViewData.ContactMember;
            data.ContactPhone=$scope.vm.ViewData.Telephone;
            data.ContactMail=$scope.vm.ViewData.Email;
            data.Address=$scope.vm.ViewData.Address;
            data.Province=$scope.vm.ViewData.ProvinceSelectValue;
            data.AMapProvince=$scope.vm.ViewData.GaoDeProvinceSelectValue;
            data.City=$scope.vm.ViewData.CitySelectValue;
            data.AMapCity=$scope.vm.ViewData.GaoDeCitySelectValue;
            data.MECLevel=$scope.vm.ViewData.RankSelectValue;
            data.WorkTime=$scope.vm.ViewData.Worktime;
            data.Route=$scope.vm.ViewData.BusLine;
            data.ParkingLot=$scope.vm.ViewData.ParkSpace;
            data.Lng=$scope.vm.ViewData.Longitude;
            data.Lat=$scope.vm.ViewData.Latitude;
            data.HasWIFI=$scope.vm.ViewData.HasWIFI;
            data.MECLogoImg=$scope.vm.ViewData.ImageLogSrc== Const.defaultImgSrc ? null:$scope.vm.ViewData.ImageLogSrc;
            data.MECBgImg=$scope.vm.ViewData.ImageBackgroundSrc == Const.defaultImgSrc ? null:$scope.vm.ViewData.ImageBackgroundSrc;
            data.MECAuthorImg=$scope.vm.ViewData.ImageAuthbookSrc== Const.defaultImgSrc ? null:$scope.vm.ViewData.ImageAuthbookSrc;
            data.MECDesc=$scope.vm.ViewData.Description;
            data.MinBookRange=$scope.vm.ViewData.BeforeDay;
            data.MaxBookRange=$scope.vm.ViewData.MaxBeforeDay;
            data.WorkDateList=[];
            data.Weight=$scope.vm.ViewData.Index;
            data.GroupAppointLimit = $scope.vm.ViewData.GroupAppointLimit;
            var tagList=$scope.vm.ViewData.TagForAddSupplierSelectedList;
            for(var i=0;i<tagList.length;i++){
              data.SupplierTags.push(tagList[i]);
            }

            var workdayList=$scope.vm.ViewData.WorkDaySelectedList;
            for(var i=0;i<workdayList.length;i++){
              data.WorkDateList.push(workdayList[i]);
            }

            var url = $scope.GlobalData.Urls.AddMECSupplierUrl;
            if($scope.vm.ViewData.CurrentSupplierCode!=null){
              url = $scope.GlobalData.Urls.ModifyMECSupplierUrl;
            }
            util.ajaxMALLPost($http, url, data, function (result) {
              if (result.Code == 1) {
                alert("操作成功！")
                $("#serviceManagedAdd").modal("hide");
                $scope.vm.Event.SearchList();
              }
              else{
                alert(result.Message)
                //$("#serviceManagedAdd").modal("hide");
              }
            }, function (err) {
              util.showFade(result.Message);
            });

          },
          SearchList:function(){
            var params={
              "PageNum": $scope.vm.ViewData.pageModel.currentPage==0?1:$scope.vm.ViewData.pageModel.currentPage,
              "Count": $scope.vm.ViewData.pageModel.itemsPerPage,
              "SupplierName": $scope.vm.ViewData.InputSearchSupplierName,
              "SupplierCode": $scope.vm.ViewData.InputSearchSupplierCode
            }
            var url=$scope.GlobalData.Urls.SearchListUrl;
            util.showAjaxLoading();
            util.ajaxMALLPost($http,url,params, function(result){
                if (result.Code == 1) {
                    $scope.vm.ViewData.SearchList=[];
                    for(var i=0;i<result.Data.SupplierList.length;i++){
                      var item=supplierManagerModel.convertSearchResultItem(result.Data.SupplierList[i]);
                      $scope.vm.ViewData.SearchList.push(item);
                    }
                    $scope.searchListPaginationConf=$scope.vm.ViewData.pageModel;
                    $scope.searchListPaginationConf.totalItems = result.Data.Count;
                }
                else {
                    util.showFade(result.Message);
                }
                util.hideAjaxLoading();
              },function(error){
                util.showFade(error);
                util.hideAjaxLoading();
              });
          },
          BeforeDeleteSupplier:function(supplierCode){
            $scope.vm.ViewData.CurrentDeleteItemCode=supplierCode;
          },
          DeleteSupplier:function(){
            var params={
              "SupplierCode": $scope.vm.ViewData.CurrentDeleteItemCode
            }
            var url=$scope.GlobalData.Urls.DeleteSupplierUrl;
            util.ajaxMALLPost($http,url,params, function(result){
                if (result.Code == 1) {
                    alert("操作成功！");
                    $scope.vm.Event.SearchList();
                }
                else {
                    util.showFade(result.Message);
                }
              },function(error){
                util.showFade(error);
              });
          }
        },
        Method:{
          Init:function(){
            $scope.vm.Method.GetTagForAddSupplierList();
            $scope.vm.Method.GetDepartList();
            $scope.vm.Method.GetProvinceCityList();
            $scope.vm.Method.GetGaoDeProvinceCityList();

            document.addEventListener('uploaded', function(e){
                if($scope.vm.ViewData.UploadFileFinishHandler){
                  $scope.vm.ViewData.UploadFileFinishHandler(e);
                }
            });
          },
          InitSupplierPannel:function(){

            // $scope.vm.Method.GetTagForAddSupplierList();
            // $scope.vm.Method.GetDepartList();
            // $scope.vm.Method.GetProvinceCityList();

            var DepartListSetting= {
              enableFiltering: true,
              buttonWidth: 255,
              onChange: function(option, checked){
                $scope.vm.ViewData.DepartSelectValue = option[0].value;
              }
            }
            $scope.vm.ViewData.DepartList.forEach(function(item,index,array){
              if (item.value == $scope.vm.ViewData.DepartSelectValue){
                item.selected = true;
              }else {
                item.selected = false;
              }
            })

            $("#deptSelect").multiselect(DepartListSetting).multiselect('dataprovider', $scope.vm.ViewData.DepartList);
            if ($scope.vm.ViewData.DepartSelectValue != -1){
              $("#deptSelect").multiselect("disable");
            }
            $(".multiselect-search").css("width","100%");
            $(".multiselect-item").css("height","40px");
            $scope.vm.Event.ChangeProvince();
            $scope.vm.Event.ChangeGaoDeProvince();

            $scope.vm.ViewData.WorkDayList=[];
            $scope.vm.ViewData.WorkDayList.push({label:"周一",title: "周一",value:1, selected:false});
            $scope.vm.ViewData.WorkDayList.push({label:"周二",title: "周二",value:2, selected:false});
            $scope.vm.ViewData.WorkDayList.push({label:"周三",title: "周三",value:3, selected:false});
            $scope.vm.ViewData.WorkDayList.push({label:"周四",title: "周四",value:4, selected:false});
            $scope.vm.ViewData.WorkDayList.push({label:"周五",title: "周五",value:5, selected:false});
            $scope.vm.ViewData.WorkDayList.push({label:"周六",title: "周六",value:6, selected:false});
            $scope.vm.ViewData.WorkDayList.push({label:"周天",title: "周天",value:0, selected:false});
            var multiSetting= {
              allSelectedText: '全部选中',
              nSelectedText: '个被选中',
              nonSelectedText: '--全部--',
              buttonWidth: '181px',
              // includeSelectAllOption: true,
              onChange: function(option, checked) {
                var nonSelectedOptions = $('#workDaySelecter option').filter(function() {
                  return !$(this).is(':selected');
                });
                var selectedOptions = $('#workDaySelecter option').filter(function() {
                  return $(this).is(':selected');
                });
                var options = $('#workDaySelecter option');

                $scope.vm.ViewData.WorkDaySelectedList=[];
                selectedOptions.each(function() {
                    $scope.vm.ViewData.WorkDaySelectedList.push($(this).val());
                });
              }
            }

            //修改时候还原下拉选项
            // for(var i=0;i<$scope.vm.ViewData.WorkDaySelectedList.length;i++){
            //   var selectedDay=$scope.vm.ViewData.WorkDaySelectedList[i];
            //   for(var j=0;j<$scope.vm.ViewData.WorkDayList.length;j++){
            //     var dayItemObj=$scope.vm.ViewData.WorkDayList[j];
            //     if(dayItemObj.value==selectedDay){
            //       dayItemObj.selected=true;
            //     }else {
            //       dayItemObj.selected=false;
            //     }
            //   }
            // }
            $scope.vm.ViewData.WorkDayList.forEach(function(currentDay, index1, array1){
              currentDay.selected = false;
              $scope.vm.ViewData.WorkDaySelectedList.forEach(function(selectedDay, index, array){
                if(currentDay.value==selectedDay){
                    currentDay.selected=true;
                  }
              })
            })

            $("#workDaySelecter").multiselect(multiSetting).multiselect('dataprovider', $scope.vm.ViewData.WorkDayList);
            //修改时候还原下拉选项
            // for(var i=0;i<$scope.vm.ViewData.TagForAddSupplierSelectedList.length;i++){
            //   var selectedTag=$scope.vm.ViewData.TagForAddSupplierSelectedList[i];
            //   for(var j=0;j<$scope.vm.ViewData.TagForAddSupplierList.length;j++){
            //     var tagItemObj=$scope.vm.ViewData.TagForAddSupplierList[j];
            //     if(tagItemObj.value==selectedTag){
            //       tagItemObj.selected=true;
            //     }else {
            //       tagItemObj.selected = false;
            //     }
            //   }
            // }

            $scope.vm.ViewData.TagForAddSupplierList.forEach(function(currentTag, index1, array1){
              currentTag.selected = false;
              $scope.vm.ViewData.TagForAddSupplierSelectedList.forEach(function(selectedTag, index, array){
                if(currentTag.value==selectedTag){
                    currentTag.selected=true;
                  }
              })
            })

            $("#supplierTagSelecter").multiselect('dataprovider', $scope.vm.ViewData.TagForAddSupplierList);

          },
          GetDepartList: function () {
            var url = $scope.GlobalData.Urls.GetDepartListUrl;
            var departList = [];
            util.showAjaxLoading();
            util.ajaxMALLPost($http, url, {}, function (result) {
              if (result.Code == 1) {
                for(var i=0;i<result.Data.length;i++){
                  var item=supplierManagerModel.ConvertSelectItem(result.Data[i]);
                  var tag = {
                    label: item.text,
                    title: item.text,
                    value: item.value,
                    selected: false
                  };
                  departList.push(tag);
                }
                // departList.unshift({
                //   text: '请选择',
                //   value: -1
                // });
                departList.unshift({
                  label: '请选择',
                  title: '请选择',
                  value: -1,
                  selected: false
                });
                $scope.vm.ViewData.DepartList = departList;

              }
              util.hideAjaxLoading();
            },function(){
                util.hideAjaxLoading();
            });
          },
          GetTagForAddSupplierList: function () {
            var url = $scope.GlobalData.Urls.GetTagListUrl;
            data = {};
            util.ajaxMALLPost($http, url, data, function (result) {
              if (result.Code == 1) {
                if (result.Data) {
                  $scope.vm.ViewData.TagForAddSupplierList=[];
                  for (var i = 0; i <result.Data.length; i++) {
                    var tag = {
                      label: result.Data[i],
                      title: result.Data[i],
                      value: result.Data[i],
                      selected: false
                    };
                    $scope.vm.ViewData.TagForAddSupplierList.push(tag);
                  }
                  var multiSetting= {
                    allSelectedText: '全部选中',
                    nSelectedText: '个被选中',
                    nonSelectedText: '--全部--',
                    buttonWidth: '181px',
                    // includeSelectAllOption: true,
                    onDropdownHidden: function (option, checked, select) {

                    },
                    onChange: function(option, checked) {
                      var nonSelectedOptions = $('#supplierTagSelecter option').filter(function() {
                        return !$(this).is(':selected');
                      });
                      var selectedOptions = $('#supplierTagSelecter option').filter(function() {
                        return $(this).is(':selected');
                      });
                      var options = $('#supplierTagSelecter option');
                      $scope.vm.ViewData.TagForAddSupplierSelectedList=[];
                      selectedOptions.each(function() {
                          $scope.vm.ViewData.TagForAddSupplierSelectedList.push($(this).val());
                      });

                      if (selectedOptions.length >= 3) {
                        nonSelectedOptions.each(function() {
                          var input = $('input[value="' + $(this).val() + '"]');
                          input.prop('disabled', true);
                          input.parent('li').addClass('disabled');
                        });
                      }else {
                        options.each(function(){
                          var input = $('input[value="' + $(this).val() + '"]');
                          input.prop('disabled', false);
                          input.parent('li').removeClass('disabled');
                        });
                      }
                    }
                  }
                  //修改时候还原下拉选项
                  for(var i=0;i<$scope.vm.ViewData.TagForAddSupplierSelectedList.length;i++){
                    var selectedTag=$scope.vm.ViewData.TagForAddSupplierSelectedList[i];
                    for(var j=0;j<$scope.vm.ViewData.TagForAddSupplierList.length;j++){
                      var tagItemObj=$scope.vm.ViewData.TagForAddSupplierList[j];
                      if(tagItemObj.value==selectedTag){
                        tagItemObj.selected=true;
                      }else {
                        tagItemObj.selected = false;
                      }
                    }
                  }
                  $("#supplierTagSelecter").multiselect(multiSetting).multiselect('dataprovider', $scope.vm.ViewData.TagForAddSupplierList);

                }
              }
            }, function (err) {
              util.showFade(err.Message);
            });
          },
          GetProvinceCityList: function () {
            var url = $scope.GlobalData.Urls.ProvinceCityListUrl;
            util.ajaxMALLPost($http, url, {}, function (result) {
              if (result.Code == 1) {
                //省
                $scope.vm.ViewData.OriginProvinceList=[];
                for (var i = 0; i < result.Data.ProvinceList.length; i++) {
                  var item = supplierManagerModel.convertProvice(result.Data.ProvinceList[i]);
                  // var tag = {
                  //   label: item.Name,
                  //   title: item.Name,
                  //   value: item.ID,
                  //   selected: false
                  // };
                  $scope.vm.ViewData.OriginProvinceList.push(item);
                }
                $scope.vm.ViewData.OriginProvinceList.unshift({Name: '请选择',ID: -1});
                // $scope.vm.ViewData.OriginProvinceList.unshift({
                //   label: '请选择',
                //   title: '请选择',
                //   value: -1,
                //   selected: false});

                //市
                $scope.vm.ViewData.OriginCityList=[];
                $scope.vm.ViewData.OptionCityList=[];
                for (var i = 0; i < result.Data.CityList.length; i++) {
                  var item= supplierManagerModel.convertCity(result.Data.CityList[i]);
                  // var tag = {
                  //   label: item.Name,
                  //   title: item.Name,
                  //   value: item.ID,
                  //   selected: false,
                  //   ParentID : item.ParentID
                  // };
                  $scope.vm.ViewData.OriginCityList.push(item);
                }
                $scope.vm.ViewData.OptionCityList.push({Name: '请选择',ID: -1,ParentID:-1});
                // $scope.vm.ViewData.OptionCityList.unshift({
                //   label: '请选择',
                //   title: '请选择',
                //   value: -1,
                //   selected: false});
                if($scope.vm.ViewData.CitySelectValue!=-1){//修改时候添加默认省份时候，需要填充默认的市
                  var defaultValue=$scope.vm.ViewData.CitySelectValue;
                  $scope.vm.Event.ChangeProvince();
                  $scope.vm.ViewData.CitySelectValue=defaultValue;
                }
                // var OriginProvinceSetting= {
                //   enableFiltering: true,
                //   onChange: function(option, checked) {
                //     $scope.vm.ViewData.ProvinceSelectValue = option[0].value;
                //     $scope.vm.Event.ChangeProvince();
                //     $("#citySelect").multiselect(OptionCitySetting).multiselect('dataprovider', $scope.vm.ViewData.OptionCityList);
                //   }
                // }
                // var OptionCitySetting= {
                //   enableFiltering: true,
                //   onChange: function(option, checked){
                //     $scope.vm.ViewData.CitySelectValue = option[0].value;
                //   }
                // }
                // $("#provinceSelect").multiselect(OriginProvinceSetting).multiselect('dataprovider', $scope.vm.ViewData.OriginProvinceList);
                // $("#citySelect").multiselect(OptionCitySetting).multiselect('dataprovider', $scope.vm.ViewData.OptionCityList);

              }
            })
          },
          GetGaoDeProvinceCityList:function(){
            var url = $scope.GlobalData.Urls.GaoDeProvinceCityListUrl;
            util.ajaxMALLPost($http, url, {}, function (result) {
              if (result.Code == 1) {
                //省
                $scope.vm.ViewData.OriginGaoDeProvinceList=[];
                for (var i = 0; i < result.Data.ProvinceList.length; i++) {
                  var item = supplierManagerModel.convertAmpProvice(result.Data.ProvinceList[i]);
                  $scope.vm.ViewData.OriginGaoDeProvinceList.push(item);
                }
                $scope.vm.ViewData.OriginGaoDeProvinceList.unshift({Name: '请选择',ID: -1});
                //市
                $scope.vm.ViewData.OriginGaoDeCityList=[];
                $scope.vm.ViewData.OptionGaoDeCityList=[];
                for (var i = 0; i < result.Data.CityList.length; i++) {
                  var item= supplierManagerModel.convertAmpCity(result.Data.CityList[i]);
                  $scope.vm.ViewData.OriginGaoDeCityList.push(item);
                }
                $scope.vm.ViewData.OptionGaoDeCityList.push({Name: '请选择',ID: -1,ParentID:-1});
                if($scope.vm.ViewData.GaoDeCitySelectValue!=-1){//修改时候添加默认省份时候，需要填充默认的市
                  var defaultValue=$scope.vm.ViewData.GaoDeCitySelectValue;
                  $scope.vm.Event.ChangeGaoDeProvince();
                  $scope.vm.ViewData.GaoDeCitySelectValue=defaultValue;
                }
              }
            })
          },
          UploadSingleImage:function(fileInputId,callback) {
            var jqueryId="#"+fileInputId;
            var file= $(jqueryId)[0].files[0];
            if (!file){
              util.showFade('请选择您要上传的图片！');
              return;
            }
            var ext = '.' + file.name.split('.').pop();
            var config = {
              bucket: constant.ComboConfig.bucket,
              expiration: parseInt((new Date().getTime() + 3600000) / 1000),
              form_api_secret: constant.ComboConfig.form_api_secret
            };

            var instance = new Sand(config);
            var fileName = util.randomString(32) + ext;
            var pathName = constant.ComboConfig.MallDepart;
            util.showAjaxLoading();
            $scope.vm.ViewData.UploadFileFinishHandler=callback;
            instance.upload(pathName + fileName, jqueryId);
          }
      }
    }

    $scope.vm.Method.Init();
    $scope.vm.Event.SearchList();

  }]);
  return app;
});
