define(['indexApp',
	    'model/mall/groupAppointManageModel',
	    'common/util',
        'common/MallConst',
	    'service/baseService',
	    'bootStrapMultiselect'],function(app,vModel,util,mallConst) {
  app.controller('enterpriseStaffCtrl', function ($scope,$http, $routeParams,signValid,ajaxService,couponService) {
		
		signValid.ValidAccess('#/enterpriseAppointment/:EnterpriseId');
		
	    var Base={
                GoodsList: "BMSEnterpriseAppointment/GetGoodsList",//获取未删除的体检中心和商品
				ImportEmployeeList: "BMSEnterpriseAppointment/ImportEmployeeList",//导入员工excel,转换格式
	        	AddEmployeeList: "BMSEnterpriseAppointment/AddEmployeeList",//添加员工
	        	StaffList:"BMSEnterpriseAppointment/EmployeeList",//体检员工列表
	        	DeleteEmployee: "BMSEnterpriseAppointment/DeleteEmployee"//删除企员工信息
			};

		($scope.vm ={

	        //通用操作
	        Common: {
	          Init: function(){
		            signValid.ValidAccess('#/EnterpriseStaff');// 缓存登录验证
		            $(".navli:eq(5)").addClass("active").siblings().removeClass("active");
		            $('body').css('overflow', 'auto');
		        }
	        },
			EnterpriseStaff:{

	          //下拉列表中的常量
	          const:{
		            AppointStateList:mallConst.EnterpriseAppointmentState,//预约状态
		            SexList:mallConst.Sex,//性别
		            MarryList:mallConst.Marry//婚否
	          },
	          //模块数据
	          data:{
            	checkedAll:false,
	            supplierInfoList:[],//供应商信息
	            appointmentList:[],//团检预约列表信息
	            searchParams: {
	                PageNum: 1,
	                Count: 10,
		            EnterpriseId:$routeParams.EnterpriseId,
	                Name: "",
	                Mobile: "",
	                IdCard: "",
	                Gender: -1,
	                Married: -1
	            }
	          },
	          DeleteEmployeeId:'',//删除员工的id
	          //清除按钮
	          Onclear:function(){
	            //搜索框值重置
	            $scope.vm.EnterpriseStaff.data.searchParams = {
	                PageNum: 1,
	                Count: 10,
		            EnterpriseId:$routeParams.EnterpriseId,
	                Name: "",
	                Mobile: "",
	                IdCard: "",
	                Gender: -1,
	                Married: -1
	            };
	          },
	          //全选
	          OnCheckedAll: function(){
	            for(var i=0; i< $scope.vm.EnterpriseStaff.appointmentList.length; i++){
	              var item = $scope.vm.EnterpriseStaff.appointmentList[i];
	              item.isChecked = $scope.vm.EnterpriseStaff.data.checkedAll;
	            }
	          },
	          OnInCSV:function(){
					var url = Base.ImportEmployeeList,
	                    params = {
	                        file:{
	                            uploadFile: document.getElementById("xlsFile").files[0]
	                        }
	                    };
	                if (!params.file.uploadFile){
	                    util.showFade("请选择需要导入的xls！");
	                	return;
	                }else if (params.file.uploadFile.name.split('.').pop() != "xls"){
	                    util.showFade("请选择正确的xls文件！");
	                	return;
	                }
	                util.ajaxMALLFile(url, params, function(result){
	                    if (result.Code == 1){

	                        //清空fileSelector
	                        var File = $("#xlsFile");
	                        File.after(File.clone().val(""));
	                        File.remove();

	                        //获取数据，添加员工
	                        var tempParams = {'EnterpriseId':$routeParams.EnterpriseId,'EmployeeInfo':result.Data};
	                        ajaxService.PostMall(Base.AddEmployeeList,tempParams,function(result){
				               //加载列表数据
				               $scope.vm.EnterpriseStaff.OnLoad();
	                        });
	                    }else{
	                    	util.showFade(result.Message);
						}
	                }, function (error){
	                    util.showFade(error);
	                });
	          },
	          //导出excel表格
	          OnOutCSV:function(){
	            var sourceData = [];
	            var columnNameList = ["姓名","身份证号","手机号","性别","婚否","体检中心","体检套餐","售价","预约时间","预约状态"];
	            var ecportList = $scope.vm.EnterpriseStaff.appointmentList;
	            ecportList.forEach(function(item, index, array){
	              if(item.isChecked){
		              sourceData.push({
						'Name':item.Name,
						'IDCard':"\t"+item.IDCard,
						'Mobile':item.Mobile,
						'Gender':item.Gender,
						'Married':item.Married,
						'DepartName':item.DepartName,
						'GoodsName':item.GoodsName,
						'GoodsSalesPrise':item.GoodsSalesPrise,
						'appointTime':item.appointTime,
						'appointState':item.appointState
		              })
	              }
	            })
				console.log(sourceData)
	            if(sourceData.length==0){
	            	util.showFade("请勾选客户信息！");
	            	return false;
	            }
	            util.CreateCSV(columnNameList, sourceData);
	          },
	          //删除员工
	          OnShowDeleteEmployeeDialog:function(item) {
	          	  $scope.vm.EnterpriseStaff.DeleteEmployeeId = item.EmployeeId;
	          	  //根据id来判断员工是否可以删除
	          	  var state = item.State;
	          	  if(state == -1||state == 130){//未在app端预约，或者已经取消，可以删除
	          	  	   $('#deleteEnterpriseAppointment').modal('show');
	          	  }else if(state == 105||state == 120||state == 125){//提示不可以删除
	          	  	   $('#cannotDeleteEnterpriseAppointment').modal('show');
	          	  }
	          },
	          OnDeleteEmployee:function() {
	          	var params = {'EmployeeId':$scope.vm.EnterpriseStaff.DeleteEmployeeId};
	          	ajaxService.PostMall(Base.DeleteEmployee,params,function(result) {
	          	  	$('#deleteEnterpriseAppointment').modal('hide');
		            //加载列表数据
		            $scope.vm.EnterpriseStaff.OnLoad();
	          	});
	          },
	          OnSearch:function(){
	          	    var param = $scope.vm.EnterpriseStaff.data.searchParams;
	          	    var params = {
		                PageNum: $scope.vm.EnterpriseStaff.pageModel.currentPage==0?1:$scope.vm.EnterpriseStaff.pageModel.currentPage,
		                Count: $scope.vm.EnterpriseStaff.pageModel.itemsPerPage,
		                EnterpriseId:$routeParams.EnterpriseId,
		                Name: param.Name,
		                IdCard: param.IdCard,
		                Mobile: param.Mobile,
		                Gender: param.Gender==-1?null:param.Gender,
		                Married: param.Married==-1?null:param.Married
	          	    }
	              ajaxService.PostMall(Base.StaffList,params,function(result) {
	                  var viewModel = new vModel();
	                  $scope.pageConfig = $scope.vm.EnterpriseStaff.pageModel;
		              $scope.pageConfig.totalItems = result.Counts;
		              $scope.vm.EnterpriseStaff.appointmentList = viewModel.conventEmployeeList(result.EmployeeList);
	              });

	          },
	          //初始化加载页面
	          OnLoad:function(){
	              var param = {
		                PageNum: 1,
		                Count: 10,
		                EnterpriseId:$routeParams.EnterpriseId,
		                Name: "",
		                IdCard: "",
		                Mobile: "",
		                Gender: null,
		                Married: null
	              }
	              ajaxService.PostMall(Base.StaffList,param,function(result) {
	                  var viewModel = new vModel();
	                  $scope.pageConfig = $scope.vm.EnterpriseStaff.pageModel;
		              $scope.pageConfig.totalItems = result.Counts;
		              $scope.vm.EnterpriseStaff.appointmentList = viewModel.conventEmployeeList(result.EmployeeList);
	              });
	          },
			  pageModel:{
		          totalItems: 0,
		          currentPage: 1,    //当前所在的页
		          itemsPerPage: 10,  //每页展示的数据条数
		          pagesLength: 9,   //分页条目的长度（如果设置建议设置为奇数）
		          perPageOptions: [10, 30, 50, 100, 200,500],    //可选择显示条数的数组
		          rememberPerPage: 'EnterpriseStaffAppointmentPerPage',  //使用LocalStorage记住所选择的条目数的名称
		          onChange: function () {
		            if ($scope.vm.EnterpriseStaff.pageModel.currentPage != 0 ) {
		                $scope.vm.EnterpriseStaff.OnSearch();
		            }
		          }
		       },
	          //模块初始化
	          Init:function(){
	              //加载列表数据
	              $scope.vm.EnterpriseStaff.OnLoad();
	          }  
			},
		     //模块初始化
		    Init: function(){
		        //模块通用初始化
		        $scope.vm.Common.Init();
		          
		        //模块初始化
		        $scope.vm.EnterpriseStaff.Init();
		    }

		}).Init();
	});
	return app;
})
