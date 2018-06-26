/**
 * Created by hzguest3 on 2017/6/8.
 */
define(['indexApp', 'common/util', 'common/const', 'model/mall/PaybackModel']
  , function (app, util, config, PaybackModel) {
    app.controller('paybackCtrl', function ($scope, $http, signValid) {

      var _PaybackCollection,
        startDateTextBox, endDateTextBox;

      //分页参数
      $scope.pageConfig = {
        totalItems: 0,
        currentPage: 1,    //当前所在的页
        itemsPerPage: 10,  //每页展示的数据条数
        pagesLength: 9,   //分页条目的长度（如果设置建议设置为奇数）
        perPageOptions: [10, 30, 50, 100, 200, 500],    //可选择显示条数的数组
        rememberPerPage: 'PaybackPerPage',  //使用LocalStorage记住所选择的条目数的名称
        onChange: function () {
          if ($scope.pageConfig.currentPage != 0) {
            _PaybackCollection.GetList();
          }
        }
      }

      var BaseUrl = {
        GetList: "BMSPayBack/PayBackList",
        PayBackExecuting: "BMSPayBack/SetPayBackExecuting"
      };

      ($scope.vm = {
        PaybackCollection: {
          data: {
            searchParams: {
              OrderId: "",
              State: -1
            },
            payBackList: [],
            payBackCheckAll: false,
            chartData: {
              orderIds: [],
              paybackAmounts: [],
              orderState: [],
              remarks: [],
              lastUpdateTime: []
            }
          },

          //设置搜索预约状态
          SetSearchState: function (State) {
            _PaybackCollection.data.searchParams.State = State;
            _PaybackCollection.data.payBackCheckAll = false;
            $scope.pageConfig.currentPage = 1;
          },

          //重设搜索相关参数
          ResetSearchParams: function () {
            _PaybackCollection.data.searchParams = {
              OrderId: "",
              State: _PaybackCollection.data.searchParams.State
            }
            startDateTextBox[0].value = "";
            endDateTextBox[0].value = "";
          },

          CheckAll: function () {
            _PaybackCollection.data.payBackList.forEach(function (item, index, array) {
              item.Selected = _PaybackCollection.data.payBackCheckAll;
            })
          },

          GetList: function () {
            var params = {
              "PageNum": $scope.pageConfig.currentPage,
              "Count": $scope.pageConfig.itemsPerPage,
              "OrderId": _PaybackCollection.data.searchParams.OrderId,
              "startTime": startDateTextBox.val(),
              "endTime": endDateTextBox.val() ? endDateTextBox.val() + " 23:59:59" : endDateTextBox.val(),
              "State": _PaybackCollection.data.searchParams.State
            }
            var url = BaseUrl.GetList;
            util.ajaxMALLPost($http, url, params, function (result) {
              if (result.Code == 1 && result.Data != null) {
                _PaybackCollection.data.payBackList = [];
                $scope.pageConfig.totalItems = result.Data.Counts;
                result.Data.PayBackList.forEach(function (item, idex, array) {
                  var paybackModel = PaybackModel.ConvertPayBackModel(item);
                  _PaybackCollection.data.payBackList.push((paybackModel));
                });
              }
            }, function (err) {
              util.showFade(err);
            })
          },

          ExecutePayBack: function () {
            var orderIds = _PaybackCollection.data.payBackList
              .filter(function (item) {
                return item.Selected;
              }).map(function (item) {
                return item.OrderId;
              });
            if (orderIds.length == 0) {
              util.showFade("请至少选择一条记录进行操作！");
              return;
            }
            var params = {
              "OrderIds": orderIds
            };
            var url = BaseUrl.PayBackExecuting;
            util.ajaxMALLPost($http, url, params, function (result) {
              if (result.Code == 1 && result.Data) {
                _PaybackCollection.GetList();
              }
              util.showFade(result.Message);
            }, function (err) {
              util.showFade(err);
            })
          },

          ExportCSV: function () {
            var sourceData = [];
            var columnNameList = ["订单编号", "支付流水号", "订单状态", "退款金额", "备注", "创建时间", "最后修改时间"];
            _PaybackCollection.data.payBackList.forEach(function (item, index, array) {
              sourceData.push({
                "OrderId": item.OrderId+"\t",
                "PayId": item.PayId+"\t",
                "StateFormat": item.StateFormat,
                "Amount": item.Amount,
                "Remark": item.Remark,
                "CreateDate": item.CreateDate,
                "LastUpdateDate": item.LastUpdateDate
              })
            })
            util.CreateCSV(columnNameList, sourceData);
          },
          Init: function () {
            _PaybackCollection.GetList();
          }
        },

        Init: function () {
          //缓存登录验证
          signValid.ValidAccess("#/mallPayback");
          //侧边栏样式
          $(".navli:eq(5)").addClass("active").siblings().removeClass("active");
          $('body').css('overflow', 'auto');

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
          _PaybackCollection = $scope.vm.PaybackCollection;
          _PaybackCollection.Init();
        }

      }).Init();

    });
    return app;
  });
