/* eslint-disable no-undef */
define(['sysConfig'], function (sysConfig) {
  var constData = {};
  constData.PostionCategory = 1000;         // 职称类型

  //套餐分类名称
  // constData.packageNames = [
  //   {text:'--请选择分类--', value:0},
  //   {text:'性别', value:1},
  //   {text:'类型', value:2},
  //   {text:'价格', value:3}
  // ];

  //套餐标签
  constData.PackageTypes = [
    { Name: '性别', Id: 1 },
    { Name: '类型', Id: 2 },
    { Name: '价格', Id: 3 }
  ];

  constData.AccountRoleTypes = [
    { text: '---请选择角色---', value: -1 },
    { text: 'admin', value: 0 },
    { text: '运维', value: 1 },
    { text: '医生', value: 2 },
    { text: '管理者', value: 3 }];

  constData.AccountDeptTypes = [
    { text: '上海好卓', value: -1 }];

  constData.SupplierTypes = [          /* 服务商类型 */
    { text: "--全部服务商--", value: -1 },
    { text: "体检中心", value: 0 },
    { text: "实体供应商", value: 1 }];

  constData.AutoSendExecTypes = [          /* 自动发送执行状态 */
    { text: '--全部状态--', value: -1 },
    { text: '执行中', value: 1 },
    { text: '已结束', value: 0 },
    { text: '已暂停', value: 2 }];

  constData.AutoSendSelectPlan = [
    { text: '--请选择--', value: -1 },
    { text: '全部', value: 0 },
    { text: '团检', value: 1 },
    { text: '个检', value: 2 }];

  constData.AutoSendTimeitem = [
    { text: '0', value: 0 },
    { text: '1', value: 1 },
    { text: '2', value: 2 },
    { text: '3', value: 3 },
    { text: '4', value: 4 },
    { text: '5', value: 5 },
    { text: '6', value: 6 },
    { text: '7', value: 7 },
    { text: '8', value: 8 },
    { text: '9', value: 9 },
    { text: '10', value: 10 },
    { text: '11', value: 11 },
    { text: '12', value: 12 },
    { text: '13', value: 13 },
    { text: '14', value: 14 },
    { text: '15', value: 15 },
    { text: '16', value: 16 },
    { text: '17', value: 17 },
    { text: '18', value: 18 },
    { text: '19', value: 19 },
    { text: '20', value: 20 },
    { text: '21', value: 21 },
    { text: '22', value: 22 },
    { text: '23', value: 23 },
    { text: '24', value: 24 },
    { text: '25', value: 25 },
    { text: '26', value: 26 },
    { text: '27', value: 27 },
    { text: '28', value: 28 },
    { text: '29', value: 29 },
    { text: '30', value: 30 },
    { text: '31', value: 31 },
    { text: '32', value: 32 },
    { text: '33', value: 33 },
    { text: '34', value: 34 },
    { text: '35', value: 35 },
    { text: '36', value: 36 },
    { text: '37', value: 37 },
    { text: '38', value: 38 },
    { text: '39', value: 39 },
    { text: '40', value: 40 },
    { text: '41', value: 41 },
    { text: '42', value: 42 },
    { text: '43', value: 43 },
    { text: '44', value: 44 },
    { text: '45', value: 45 },
    { text: '46', value: 46 },
    { text: '47', value: 47 },
    { text: '48', value: 48},
    { text: '49', value: 49 },
    { text: '50', value: 50 },
    { text: '51', value: 51 },
    { text: '52', value: 52 },
    { text: '53', value: 53 },
    { text: '54', value: 54 },
    { text: '55', value: 55 },
    { text: '56', value: 56},
    { text: '57', value: 57 },
    { text: '58', value: 58 },
    { text: '59', value: 59 },
    { text: '60', value: 60},
    { text: '61', value: 61 },
    { text: '62', value: 62 },
    { text: '63', value: 63 },
    { text: '64', value: 64},
    { text: '65', value: 65 },
    { text: '66', value: 66 },
    { text: '67', value: 67 },
    { text: '68', value: 68},
    { text: '69', value: 69 },
    { text: '70', value: 70 },
    { text: '71', value: 71 },
    { text: '72', value: 72 },
    { text: '73', value: 73 },
    { text: '74', value: 74 },
    { text: '75', value: 75 },
    { text: '76', value: 76 },
    { text: '77', value: 77 },
    { text: '78', value: 78 },
    { text: '79', value: 79 },
    { text: '80', value: 80 },
    { text: '81', value: 81 },
    { text: '82', value: 82 },
    { text: '83', value: 83 },
    { text: '84', value: 84 },
    { text: '85', value: 85 },
    { text: '86', value: 86 },
    { text: '87', value: 87 },
    { text: '88', value: 88 },
    { text: '89', value: 89 },
    { text: '90', value: 90 }
  ];

  constData.JobTypes = [
    { text: '请选择服务状态', value: -1 },
    { text: '全职', value: 0 },
    { text: '兼职', value: 1 }];

  constData.RankTypes = [
    { text: "请选择等级", value: -1 },
    { text: '三甲医院', value: 0 },
    { text: '民营医院', value: 1 }];

  constData.GroupTypes = [
    { text: '请选择分组类型', value: -1 },
    { text: '各项指标正常', value: 0 },
    { text: '其它', value: 1 },
    { text: '慢病(需计算指标)', value: 2 },
    { text: '复检优先回复', value: 3 }];

  constData.RequestTypes = [
    { text: '请选择请求方', value: -1 },
    { text: '上海好卓', value: 'FromHZ' },
    { text: '杭州优健康', value: 'FromYJK' },
    { text: '数据中心', value: 'FromDC' }];

  constData.ExecuteTypes = [
    { text: '请选择执行状态', value: -1 },
    { text: '成功', value: true },
    { text: '失败', value: false }];

  constData.WipeData = [
    { text: '清除一天前数据', value: 1 },
    { text: '清除三天前数据', value: 3 },
    { text: '清除七天前数据', value: 7 },
    { text: '清除一个月前数据', value: 30 }
  ];

  constData.AnswersReply = [
    { title: '全部', value: -1 },
    { title: '已回复', value: 0 },
    { title: '未回复', value: 1 }
  ];

  constData.AnswersState = [
    { title: '全部', value: -1 },
    { title: '上架', value: 1 },
    { title: '下架', value: 0 }
  ];

  constData.FeedBackData = [
    { text: '全部', value: '' },
    { text: '是', value: true },
    { text: '否', value: false }
  ];

  // 问卷类型[questionManagement] 0：非评测类型；1：评测类型；
  constData.QuestionTypeData = [
    { text: '请选择', value: -1 },
    { text: '评测类型', value: 1 },
    { text: '非评测类型', value: 0 }
  ];

  // 问卷类型[questionManagement] 0：非评测类型；1：评测类型；
  constData.PhysicalExamTypeData = [
    { text: '其他', value: 1, selected: false },
    { text: '健康证', value: 2, selected: false },
    { text: '疾病筛查', value: 3, selected: false },
    { text: '入职体检', value: 4, selected: false }
  ];

  constData.findJobText = function (value) {
    var items = constData.JobTypes;
    for (var j = 0; j < items.length; j++) {
      var item = items[j];
      if (item.value == value) {
        return item.text;
      }
    }
    return '未知';
  };

  var upyunEnvPath = '';
  if (sysConfig.ApiEnv != 'pro') {
    upyunEnvPath = '/test';
  }

  constData.ComboConfig = {
    ComboBaseUrl: 'http://zhangshangtijian.b0.upaiyun.com',
    bucket: 'zhangshangtijian',
    form_api_secret: 'P7m/d7lpB92oXcyRsZqXz/XEig4=',

    comboPicPath: upyunEnvPath + '/default/comboPic/',
    reportIconPath: upyunEnvPath + '/default/reportIcon/',
    deptIconPath: upyunEnvPath + '/default/deptIcon/',
    departbanner: upyunEnvPath + '/default/departbanner/',                   // banner 上传banner图
    DepartHtml5Pic: upyunEnvPath + '/default/DepartHtml5Pic/',               // 地推H5页面图片
    DoctorHeader: upyunEnvPath + '/default/DoctorHeader',                   // 问答圈健管师头像
    Common: upyunEnvPath + "/Mall/Common/",                                    // 商城中的商品图片地
    MallGoods: upyunEnvPath + "/Mall/Goods/",                                  // 商城中的商品图片地
    MallDepart: upyunEnvPath + "/Mall/Depart/",                                // 商城机构或者供应商
    DoctorSendImages: '/default/DoctorSendImages',                          // 问答圈健管师头像
    ActivePositionImages: upyunEnvPath + "/default/ActivePositionImages",                          // 活动位图片
    activityMessageImg: upyunEnvPath + "/default/activityMessageImgs",             //推送活动消息图片

    ComboDefaultPicUrl: 'http://zhangshangtijian.b0.upaiyun.com/default/ComboDefault.jpg',
    ExportExcelUrl: 'http://resource.ihaozhuo.com/zstjapp/MECTemplate.xls'

  };
  constData.checkUnitCode = [{ value: 0 }, { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }];
  return constData;
});
