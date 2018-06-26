define(['angular', 'app/injector', 'common/BaseInfoManager', 'common/util', 'router', 'lib/tm.pagination', 'filter/baseFilter','sanitize'],
  function (angular, injector, BaseManager, Util) {
    var app = angular.module('indexApp', ['ngRoute', 'tm.pagination', 'index.baseFilter','ngSanitize']);

    var userInfo = BaseManager.UserInfoManager.GetUserInfo();
    app.config(function ($routeProvider) {
      if (!userInfo) {
        window.location.href = "/login.html";
        return;
      }
      $routeProvider
      // .when('/journaled', {
      //   templateUrl: 'html/index/journaled.html',
      //   controller: 'journaledCtrl'
      // })
      .when('/default', {
        templateUrl: 'html/index/home.html',
        controller: 'homeCtrl'
      }).when('/server', {
        templateUrl: 'html/index/server.html',
        controller: 'serverCtrl'
      })
      // .when('/customlist', {
      //   templateUrl: 'html/index/customlist.html',
      //   controller: 'customListCtrl'
      // })
      // .when('/group', {
      //   templateUrl: 'html/index/group.html',
      //   controller: 'groupCtrl'
      // })
      // .when('/consultStatistic', {
      //   templateUrl: 'html/index/consultStatistic.html',
      //   controller: 'consultStatisticCtrl'
      // })
      .when('/account', {
        templateUrl: 'html/index/consultStatistic.html',
        controller: 'consultStatisticCtrl'
      }).when('/userManagement', {
        templateUrl: 'html/index/userManagement.html',
        controller: 'userManagementCtrl'
      })
      // .when('/usually', {
      //   templateUrl: 'html/index/usually.html',
      //   controller: 'usuallyCtrl'
      // })
      .when('/groupEdit/:groupID/:groupName', {
        templateUrl: 'html/index/groupEdit.html',
        controller: 'groupEditCtrl'
      }).when('/message', {
        templateUrl: 'html/index/message.html',
        controller: 'messageCtrl'
      })
      // .when('/questionLibrary', {
      //   templateUrl: 'html/index/questionLibrary.html',
      //   controller: 'questionLibraryCtrl'
      // })
      // .when('/questionDetail', {
      //   templateUrl: 'html/index/questionDetail.html',
      //   controller: 'questionDetailCtrl'
      // })
      .when('/questionManagement/:questionId/:tabIndex', {
        templateUrl: 'html/index/questionManagement.html',
        controller: 'questionManagementCtrl'
      }).when('/questionStatistic', {
        templateUrl: 'html/index/questionStatistic.html',
        controller: 'questionStatisticCtrl'
      })
      // .when('/messageStatistic', {
      //   templateUrl: 'html/index/messageStatistic.html',
      //   controller: 'messageStatisticCtrl'
      // }).when('/regionStatistics', {
      //   templateUrl: 'html/index/regionStatistics.html',
      //   controller: 'regionStatisticsCtrl'
      // })
      .when('/bannerExaminationApp', {
        templateUrl: 'html/index/bannerExaminationApp.html',
        controller: 'bannerExaminationAppCtrl'
      }).when('/informationListExaminationApp', {
        templateUrl: 'html/index/informationListExaminationApp.html',
        controller: 'informationListExaminationAppCtrl'
      }).when('/FeedbackExaminationApp', {
        templateUrl: 'html/index/FeedbackExaminationApp.html',
        controller: 'FeedbackExaminationAppCtrl'
      }).when('/comment', {
        templateUrl: 'html/index/comment.html',
        controller: 'commentCtrl'
      })
      .when('/serviceManagement', {
        templateUrl: 'html/index/serviceManagement.html',
        controller: 'serviceManagementCtrl'
      }).when('/icoManagement', {
        templateUrl: 'html/index/icoManagement.html',
        controller: 'icoManagementCtrl'
      }).when('/answers', {
        templateUrl: 'html/index/answers.html',
        controller: 'answersCtrl'
      }).when('/activityGroup', {
        templateUrl: 'html/index/activityGroup.html',
        controller: 'activityGroupCtrl'
      })
      // .when('/dspPictureManage', {
      //   templateUrl: 'html/index/dspPictureManage.html',
      //   controller: 'dspPictureManageCtrl'
      // })
      .when('/systemSetting', {
        templateUrl: 'html/index/systemSetting.html',
        controller: 'systemSettingCtrl'
      }).when('/knowledgeStore', {
        templateUrl: 'html/index/knowledgeStore.html',
        controller: 'knowledgeStoreCtrl'
      })
      // .when('/doctorPower', {
      //   templateUrl: 'html/index/doctorPower.html',
      //   controller: 'doctorPowerCtrl'
      // })
      .when('/departInfo', {
        templateUrl: 'html/index/departInfo.html',
        controller: 'departInfoCtrl'
      }).when('/mallSupplierInfo',{
        templateUrl:'html/index/mall/SupplierInfo.html',
        controller:'supplierInfoCtrl'
      }).when('/mallGoodsManagement',{
        templateUrl:'html/index/mall/GoodsManagement.html',
        controller:'goodsCtrl'
      })
      //   .when('/mallGoodsSupplement',{GoodsManagementCtrl
      //   templateUrl:'html/index/mall/GoodsSupplement.html',
      //   controller:'goodsSupplementCtrl'
      // })
        .when('/mallGoodsType',{
        templateUrl:'html/index/mall/GoodsType.html',
        controller:'goodsTypeCtrl'
      }).when('/mallAppointment',{
        templateUrl:'html/index/mall/Appointment.html',
        controller:'appointmentCtrl'
      }).when('/mallCouponManagement',{
        templateUrl:'html/index/mall/CouponManagement.html',
        controller:'couponManagementCtrl'
      }).when('/enterpriseAppointment',{
        templateUrl:'html/index/mall/enterpriseAppointment.html',
        controller:'enterpriseAppointmentCtrl'
      }).when('/enterpriseAppointment/:EnterpriseId',{
        templateUrl:'html/index/mall/enterpriseStaff.html',
        controller:'enterpriseStaffCtrl'
      }).when('/mallPayback',{
        templateUrl:'html/index/mall/Payback.html',
        controller:'paybackCtrl'
      }).when('/mallOrder',{
        templateUrl:'html/index/mall/Order.html',
        controller:'orderCtrl'
      }).when('/groupAppointManage',{
        templateUrl:'html/index/mall/groupAppointManage.html',
        controller:'groupAppointManageCtrl'
      }).when('/physicalExamEventQuota',{
        templateUrl:'html/index/mall/physicalExamEventQuota.html',
        controller:'physicalExamEventQuotaCtrl'
      }).when('/promoteOrder',{
        templateUrl:'html/index/mall/promoteOrder.html',
        controller:'promoteOrderCtrl'
      }).when('/activePosition',{
        templateUrl:'html/index/activePosition.html',
        controller:'activePositionCtrl'
      }).when('/pushManagement',{
        templateUrl:'html/index/pushManagement.html',
        controller:'pushManagementCtrl'
      }).when('/telAppointment',{
        templateUrl:'html/index/mall/telAppointment.html',
        controller:'telAppointmentCtrl'
      }).when('/goodsAddItem',{
        templateUrl:'html/index/mall/goodsAddItem.html',
        controller:'goodsAddItemCtrl'
      }).when('/simpleServiceManagement',{
        templateUrl:'html/index/simpleServiceManagement.html',
        controller:'simpleServiceManagementCtrl'
      }).otherwise({
        redirectTo: '/default'
      });
    });
    //injector.AuthHandler(app);//header验证
    injector.HttpFilterHandler(app);//http拦截

    //公共部分Controller
    app.controller('sharedCtrl', ['$scope', '$http', function ($scope, $http) {
      if (!userInfo) {
        return;
      }
      $scope.userName = userInfo.name;
      //$scope.isActive = false;
      $scope.logOut = function () {
        BaseManager.UserInfoManager.Clear();
        window.location.href = "/login.html";
      };
      //$(".index-nav li").click(function () {
      //    // $(this).addClass("active").siblings().removeClass("active");
      //  $scope.isActive = true;
      //  if (this.id !== "message" && this.id !== "statistic") {
      //    BaseManager.DeptInfoManager.Clear();
      //  }
      //});
      $scope.vm = {
        InitNav: function () {                                             //获取当前用户的权限
          var userInfo = BaseManager.UserInfoManager.GetUserInfo(),
            data = BaseManager.MenuInfoManager.GetMenuInfo() || [],
            menus = userInfo.Menus || [];
          // console.log(BaseManager.MenuInfoManager.GetMenuInfo());
          for (var index = 0; index < data.length; index++) {
            var element = data[index];
            for (var index2 = 0; index2 < element.children.length; index2++) {
              var element2 = element.children[index2];
              for (var index3 = 0; index3 < menus.length; index3++) {
                var element3 = menus[index3];
                if (element3.PrevilegeCode === element2.code) {
                  element2.checked = true;
                }
              }
            }
          }
          BaseManager.MenuInfoManager.SetMenuInfo(data);
          // console.log(BaseManager.MenuInfoManager.GetMenuInfo());
          $scope.powersDist = data;
        },
        OnClickNav: function () {
          Util.showFade("您不具备该权限");
        }
      };
      $scope.vm.InitNav();

    }]);
    return app;
  });
