define([], function () {
  var _self = {};
  _self.ApiEnv = 'test';//接口环境 liu9999 test
  //  _self.ApiEnv = 'test';//接口环境
  _self.AppKey = 'HZ_API_V2';
  _self.AppSecret = '1!2@3#4$5%6^';
  //接口列表
  _self.BaseUrl = {};
  _self.BaseUrl.local = 'http://HZP229HQL:19949/api/';
  _self.BaseUrl.zhuli = 'http://HZP229HQL:8888/api/';
  _self.BaseUrl.gaotangDEV = 'http://HZ3BN04D2:19949/api/';
  _self.BaseUrl.gaotang = 'http://HZ3BN04D2:8310/api/';
  _self.BaseUrl.dev = 'http://hzswvajgs01:90/api/';
  _self.BaseUrl.test = 'http://hzswvajgs01:91/api/';
  // _self.BaseUrl.test = 'http://hzdjl89j92:9999/api/';
  _self.BaseUrl.pro = 'http://hc.ihaozhuo.com:90/api/';;
  _self.BaseUrl.liu = 'http://hzdjl89j92:9696/api/';
  _self.BaseUrl.liu9999 = 'http://hzdjl89j92:9999/api/';
  // _self.BaseUrl.liu = 'http://hzdjl89j92:19949/api/';

  _self.getBaseUrl = function () {
    return _self.BaseUrl[_self.ApiEnv];
  };
  _self.WebApp = {
    URL:{
      pro: 'http://webapp.hc.ihaozhuo.com',
      test: 'http://hzswvajgs01:100',
      dev: 'http://10.50.50.89:8081'
    },
    GetURL: function(){
      return _self.WebApp.URL[_self.ApiEnv] || _self.WebApp.URL['dev'];
    }
  };
  _self.autoSend = {
    TIP: '，请点击',
    DATE: {
      'default': '[MDATA[{MM}月{dd}日]]的体检电子报告已完成,'
    },
    EXT: {
      'default': ' 退订回N'
    },
    GetURL: function () {
      return _self.WebApp.GetURL() +  '/SpacePush.html#';
    }
  };


  //掌上体检接口
  _self.ZSTJApiEnv = 'test';//接口环境

  _self.ZSTJAppKey = 'HZ_PME_API_V1';
  _self.ZSTJAppSecret = '1!2@3#4$5%6^';
  //接口列表
  _self.BaseZSTJUrl = {};
  _self.BaseZSTJUrl.local = 'http://HZP229HQL:19949/api/V3/';
  _self.BaseZSTJUrl.zhuli = 'http://hzdyu1205:25007/api/V3/';
  _self.BaseZSTJUrl.libo = 'http://HZGWGGDC2:19999/api/V3/';
  _self.BaseZSTJUrl.gaotangdebug = 'http://hz3bn04d2/ZSTJ/api/V3/';
  _self.BaseZSTJUrl.gaotang = 'http://HZ3BN04D2:8070/api/V3/';
  _self.BaseZSTJUrl.liu = 'http://hzdjl89j92:9696/api/V3/';
  _self.BaseZSTJUrl.xzl = 'http://hzd6tx24d2:803/api/V3/';
  _self.BaseZSTJUrl.xzldebug = 'http://hzd6tx24d2/zstj/api/V3/';
  _self.BaseZSTJUrl.xzlpub='http://hzd6tx24d2:803/api/V3/';
  _self.BaseZSTJUrl.zhangzhongyaodebug='http://hz3b904d2/ZSTJ/api/V3/';
  _self.BaseZSTJUrl.zzyPub='http://hz3b904d2:803/api/V3/';
  _self.BaseZSTJUrl.xiongwei = 'http://hz75thbd2/ZSTJ/api/V3/';
  _self.BaseZSTJUrl.xiongweidebug = "http://hz75thbd2/ZSTJ/api/V3/";
  _self.BaseZSTJUrl.zhu = "http://hzcjq5xj2:7788/api/V3/";
  _self.BaseZSTJUrl.dev = 'http://hzswvajgs01:90/api/V3/';
  _self.BaseZSTJUrl.test = 'http://hzswvajgs01:142/api/V3/';
  _self.BaseZSTJUrl.pro = "http://zstj.ihaozhuo.com:91/api/V3/";

  _self.SimpleContentLinkPreForamt='http://hz3bn04d2:7200/TitleNew.html#/title/';

  _self.getBaseZSTJUrl = function () {
    return _self.BaseZSTJUrl[_self.ZSTJApiEnv];
  };

  //商城接口
  _self.MALLApiEnv = 'test';//接口环境
  _self.MALLAppKey = 'HZ_HZM_API_V1';
  _self.MALLAppSecret = '1!2@3#4$5%6^';
  //接口列表
  _self.BaseMALLUrl = {};
  _self.BaseMALLUrl.xiongweidebug='http://hz75thbd2/hzm/api/';
  _self.BaseMALLUrl.xiongweipublish='http://hz75thbd2:806/api/';
  _self.BaseMALLUrl.xzlpub='http://hzd6tx24d2:801/api/';
  _self.BaseMALLUrl.xzldebug = 'http://hzd6tx24d2/HZM/api/';
  _self.BaseMALLUrl.tsppub = 'http://hz2wzsg82:801/api/';
  _self.BaseMALLUrl.tspdebugger = 'http://hz2wzsg82:809/api/';
  _self.BaseMALLUrl.zzyPub='http://hz3b904d2:801/api/';
  _self.BaseMALLUrl.zhu='http://hzcjq5xj2:6677/api/';
  _self.BaseMALLUrl.test='http://hzswvajgs01:20000/api/';
  _self.BaseMALLUrl.pro='http://hc.ihaozhuo.com:92/api/';
  _self.getBaseMALLUrl = function () {
    return _self.BaseMALLUrl[_self.MALLApiEnv];
  };

  //微信接口
  _self.WechatApiEnv = 'zhu';//接口环境
  _self.WechatAppKey = 'HZ_WECHAT_API_V1';
  _self.WechatAppSecret = '1!2@3#4$5%6^';
  //接口列表
  _self.BaseWechatUrl = {};
  _self.BaseWechatUrl.zzydebug='http://hz75thbd2/hzm/api/';
  _self.BaseWechatUrl.tspdebug='http://hz2wzsg82:8088/wechat-webapp/api/';
  // _self.BaseWechatUrl.test='http://wxdev.hz-health.com.cn/wechat/api/';
  _self.BaseWechatUrl.test='http://hz3b904d2:1025/api/';
  _self.BaseWechatUrl.pro='http://hc.ihaozhuo.com:92/api/';
  _self.getBaseWechatUrl = function () {
    return _self.BaseWechatUrl[_self.WechatApiEnv];
  };

  return _self;
});
