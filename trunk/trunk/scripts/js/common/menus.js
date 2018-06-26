/* eslint-disable no-undef */

// -- TODO --  
// 为避免权限Code重复，请仅注释该文件下的代码
// -- TODO --  
define([], function () {
  var _self = {
    Data: [
      {
        "code": "10000",
        "name": "系统管理",
        "action": "",
        "checked": false,
        "children": [
          {
            "code": "10001",
            "name": "服务机构",
            "action": "#/server",
            "checked": false
          },
          {
            "code": "10004",
            "name": "服务管理",
            "action": "#/serviceManagement",
            "checked": false
          },
          {
            "code": "10002",
            "name": "账号管理",
            "action": "#/userManagement",
            "checked": false
          }
          // ,
          // {
          //   "code": "10003",
          //   "name": "接口日志查询",
          //   "action": "#/journaled",
          //   "checked": false
          // }
        ]
      },
      // {
      //   "code": "20000",
      //   "name": "医学数据管理",
      //   "action": "",
      //   "checked": false,
      //   "children": [
      //     {
      //       "code": "20001",
      //       "name": "分组管理",
      //       "action": "#/group",
      //       "checked": false
      //     },
      //     {
      //       "code": "20002",
      //       "name": "常用短语",
      //       "action": "#/usually",
      //       "checked": false
      //     },
      //     {
      //       "code": "20003",
      //       "name": "客户机构调整",
      //       "action": "#/customlist",
      //       "checked": false
      //     },
      //     {
      //       "code": "20004",
      //       "name": "咨询量统计",
      //       "action": "#/consultStatistic",
      //       "checked": false
      //     },
      //     {
      //       "code": "20005",
      //       "name": "问卷题库",
      //       "action": "#/questionLibrary",
      //       "checked": false
      //     },
      //     {
      //       "code": "20006",
      //       "name": "问卷调查",
      //       "action": "#/questionDetail",
      //       "checked": false
      //     },
      //      {
      //       "code": "20007",
      //       "name": "图片维护",
      //       "action": "#/dspPictureManage",
      //       "checked": false
      //     }

      //   ]
      // },
      {
        "code": "30000",
        "name": "运营管理",
        "action": "",
        "checked": false,
        "children": [
          {
            "code": "30001",
            "name": "短信推广",
            "action": "#/message",
            "checked": false
          }
          // ,
          // {
          //   "code": "30002",
          //   "name": "短信效果分析",
          //   "action": "#/messageStatistic",
          //   "checked": false
          // },
          // {
          //   "code": "30003",
          //   "name": "地推统计",
          //   "action": "#/regionStatistics",
          //   "checked": false
          // }
        ]
      },
      // {
      //   'code': '50000',
      //   'name': '质量管理',
      //   'action': '',
      //   'checked': false,
      //   'children': [
      //     {
      //       'code': '50001',
      //       'name': '竟争力分析',
      //       'action': '#/doctorPower',
      //       'checked': false
      //     }
      //   ]
      // },
      {
        "code": "40000",
        "name": "掌上体检",
        "action": "",
        "checked": false,
        "children": [
          // {
          //   "code": "40001",
          //   "name": "机构信息维护",
          //   "action": "#/bannerExaminationApp",
          //   "checked": false
          // },
          {
            "code": "40010",
            "name": "机构信息维护",
            "action": "#/departInfo",
            "checked": false
          },
          //  {
          //   "code": "40004",
          //   "name": "套餐分类",
          //   "action": "#/bannerExaminationApp",
          //   "checked": false
          // },
          {
            "code": "40002",
            "name": "信息列表管理",
            "action": "#/informationListExaminationApp",
            "checked": false
          },
          {
            "code": "40003",
            "name": "意见反馈管理",
            "action": "#/FeedbackExaminationApp",
            "checked": false
          },
          // {
          //   "code": "40004",
          //   "name": "套餐标签",
          //   "action": "#/PackageLabelApp",
          //   "checked": false
          // },
          {
            "code": "40005",
            "name": "评价管理",
            "action": "#/comment",
            "checked": false
          },
          {
            "code": "40006",
            "name": "图标维护",
            "action": "#/icoManagement",
            "checked": false
          },
          // {
          //   "code": "40007",
          //   "name": "问答圈",
          //   "action": "#/answers",
          //   "checked": false
          // },
          // {
          //   "code": "40008",
          //   "name": "活动群组",
          //   "action": "#/activityGroup",
          //   "checked": false
          // },
          {
            "code": "40009",
            "name": "运行状态",
            "action": "#/systemSetting",
            "checked": false
          },
          {
            "code": "40010",
            "name": "知识库",
            "action": "#/knowledgeStore",
            "checked": false
          },
          {
            "code": "40011",
            "name": "活动位管理",
            "action": "#/activePosition",
            "checked": false
          }
          ,
          {
            "code": "40012",
            "name": "APP推送管理",
            "action": "#/pushManagement",
            "checked": false
          }
          ,
          {
            "code": "40013",
            "name": "服务订单管理",
            "action": "#/simpleServiceManagement",
            "checked": false
          }
        ]
      },
       {
        "code": "50000",
        "name": "商城管理",
        "action": "",
        "checked": false,
        "children": [
           {
            "code": "50002",
            "name": "服务商管理",
            "action": "#/mallSupplierInfo",
            "checked": false
          },
          {
            "code": "50003",
            "name": "商品管理",
            "action": "#/mallGoodsManagement",
            "checked": false
          },
          {
            "code": "50004",
            "name": "商品信息补充",
            // "action": "#/mallGoodsSupplement",
            "action": "#/mallGoodsType",
            "checked": false
          },
          {
            "code": "50005",
            "name": "订单管理",
            "action": "#/mallOrder",
            "checked": false
          },
          {
            "code": "50006",
            "name": "预约管理",
            "action": "#/mallAppointment",
            "checked": false
          },
          {
            "code": "50007",
            "name": "退款管理",
            "action": "#/mallPayback",
            "checked": false
          },
          {
            "code": "50008",
            "name": "优惠券管理",
            "action": "#/mallCouponManagement",
            "checked": false
          },
          {
            "code": "50009",
            "name": "团检企业管理",
            "action": "#/enterpriseAppointment",
            "checked": false
          },
          {
            "code": "50010",
            "name": "团检预约管理",
            "action": "#/groupAppointManage",
            "checked": false
          },
          {
            "code": "50011",
            "name": "预约指标库管理",
            "action": "#/physicalExamEventQuota",
            "checked": false
          },
          // {
          //   "code": "50012",
          //   "name": "中医专家",
          //   "action": "#/promoteOrder",
          //   "checked": false
          // },
          {
            "code": "50013",
            "name": "电话预约",
            "action": "#/telAppointment",
            "checked": false
          },
          {
            "code": "50014",
            "name": "团检加项",
            "action": "#/goodsAddItem",
            "checked": false
          }
        ]
       }
    ]
  };

  return _self;
});
