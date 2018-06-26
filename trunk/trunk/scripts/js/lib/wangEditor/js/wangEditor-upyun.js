/* eslint-disable no-undef */
define(['common/const',
       'common/util' ,'wangEditor', 'upyunMu'],function(Const,util){
     var isLoaded=false;
    // ------- 配置上传的初始化事件 -------
    function uploadInit () {
        // this 即 editor 对象
        var editor = this;
        // 编辑器中，触发选择图片的按钮的id
        var btnId = editor.customUploadBtnId;
        // 编辑器中，触发选择图片的按钮的父元素的id
        var containerId = editor.customUploadContainerId;
        UploadFileFinishHandler = null;
        var tempId = randomString(8);//动态给file框赋值(默认为8位的字符串)
        var jqueryId = "#"+tempId;

        var $input = $("<input type='file' style='display:none;' id="+tempId+'>');

        var $uploadContent = editor.$uploadContent;
        $uploadContent.append($input)

        function randomString(len) {//随机生成文件上传input的id
        　　len = len || 32;
        　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        　　var maxPos = $chars.length;
        　　var pwd = '';
        　　for (i = 0; i < len; i++) {
        　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        　　}
        　　return pwd;
        }

        var obj = document.getElementById(containerId);
        obj.addEventListener("click",function(ev){//点击上传按钮手动打开文件上传框
            $input.click();
        });

        var inputObj = document.getElementById(tempId);

        inputObj.addEventListener("change",function(ev){
            var file = $(jqueryId).val();
            var fileName = getFileName(file);
            function getFileName(o){
                var pos=o.lastIndexOf("\\");
                return o.substring(pos+1);
            }

          var extName = fileName.split('.').pop(),
              ext = {jpg: true, jpeg: true, png: true, gif: false};
              if(file!=null&&fileName!=''){
                if(!ext[extName]){
                    util.showFade('请选择正确格式的图片！');
                    return;
                }
              }

            util.showAjaxLoading();
          var filePath = String.prototype.format('{0}/{1}.{2}', Const.ComboConfig.Common, util.randomString(32), extName);

             UploadFileFinishHandler=function(e){
                var path = Const.ComboConfig.ComboBaseUrl +e.detail["path"];
                editor.command(null, 'insertHtml', '<img src="' + path + '" style="max-width:100%;"/>');
             }
             var instance = new Sand({
                bucket: Const.ComboConfig.bucket,
                expiration: parseInt((new Date().getTime() + 3600000) / 1000),
                form_api_secret: Const.ComboConfig.form_api_secret
                });
             instance.upload(filePath, jqueryId);

        });
        if(!isLoaded){
            document.addEventListener('uploaded', function(e){
                if(UploadFileFinishHandler){
                    UploadFileFinishHandler(e);
                    util.hideAjaxLoading();
                }
            });
            isLoaded=true;
        }

    }

	return uploadInit;
});
