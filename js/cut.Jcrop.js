//jQuery(function($){
var face = $('.left_face');
var $face_img = $('.left_face img');
var jcrop_api;
var boundx,boundy;
//点击头像弹出侧栏
face.popover({
    title:'自定义头像',
    trigger:'click',
    template:'<div class="popover font_fa" role="tooltip">' +
        '<div class="arrow"></div>' +
        '<h3 class="popover-title"></h3>' +
        '<div id="cut">' +
        '<form id="up_form" action="#" enctype="multipart/form-data" method="post">' +
            '<p>选择图片（支持jpg、png、gif）</p>' +
            '<div class="up_content">' +
                '<div class="up_box">' +
                    '<div id="up_txt"></div>' +
                    '<button class="up_button btn btn-primary">浏览..</button>' +
                    '<input id="up_file" name="file" type="file" accept="image/*">' +
                '</div>' +
                '<input class="btn btn-primary up_next" type="button" value="下一步">' +
            '</div>' +
            '<div id="cut_face">'+
            '<img id="target" alt="[Jcrop Example]" />'+
            '<div id="preview-pane">'+
            '<div class="preview-container">'+
            '<img class="jcrop-preview" alt="Preview" />'+
            '</div>'+
            '</div>'+
            '<div class="clearfix"></div>'+
            '<input type="hidden" id="x" name="x">'+
            '<input type="hidden" id="y" name="y">'+
            '<input type="hidden" id="w" name="w">'+
            '<input type="hidden" id="h" name="h">'+
            '<input class="cxbtn btn btn-primary" type="submit" value="上传头像">'+
            '<input class="cut_close btn btn-primary" type="button" value="上一步">'+
            '</div>'+
        '</form>' +
        '</div>' +
        '</div>'
//<form id="up_form" action="#" enctype="multipart/form-data" method="post"><div class="up_content"><div class="up_box"><div id="up_txt"></div><div class="up_button">浏览..</div><input id="up_file" name="file" type="file"></div><input class="up_submit" type="submit" value="上传"></div></form>
});

//初始化侧栏
face.popover('show');

var $up_form = $('#up_form');
var $up_file = $('#up_file');
var $up_txt = $('#up_txt');
var $cut = $('#cut');
var $up_p = $('#up_form p');
var $up_content = $('.up_content');
var $cut_face = $('#cut_face');
var $cut_img = $('#target');
var $cut_preview = $('.jcrop-preview');
var $cut_sub = $('.cxbtn');

//初始化侧栏
face.bind('hide.bs.popover',function(){
    $cut_face.css('display','none');
    $up_p.css('display','block');
    $up_content.css('display','block');
    $up_file.val('');
    $up_txt.html('');
});



//var img_url;
//获得file中图片本地路径
var getImgUrl = function(id){
    var img_file,
        img_url;
    if(typeof id === "string"&&id !== ''){
        img_file = document.getElementById(id);
    }
    else{
        img_file = id;
    }
    //取得图片本地路径
    if(navigator.userAgent.toLocaleLowerCase().indexOf('msie') !== -1) {
        img_file.select();
        //IE下取得图片的本地路径
        img_url = document.selection.createRange().text;
    }
//    } else if(isFirefox = navigator.userAgent.indexOf("Firefox")>0) {
    else{
        if (img_file.files) {  // Firefox下取得的是图片的数据
            if(img_file.files.item(0).getAsDataURL){
                img_url = img_file.files.item(0).getAsDataURL()
            }
            else{
                img_url = window.URL.createObjectURL(img_file.files.item(0));
            }
        }
        else{
            img_url = img_file.value;
        }
    }
    return img_url;
};
//图片提前加载
var img_ready = function(){
    var img_url;
    //取得图片本地路径
    img_url = getImgUrl('up_file');
    //填充src
    $cut_img.attr('src',img_url);
    $cut_preview.attr('src',img_url);
    //运行jcrop
    if($('.jcrop-holder')[0] === undefined){
        cut_img();
    }
    else{
        jcrop_api.setImage(img_url);
        select(jcrop_api);
        $("[alt = '[Jcrop Example]']").bind('load',function(){
            select(jcrop_api);
        });
    }
};
//图片input验证
var img_check = function(){
    var file = this.value;
    //必须为jpg、png或gif
    var jpg = file.match(/[^\\]+.jpg/);
    var png = file.match(/[^\\]+.png/);
    var gif = file.match(/[^\\]+.gif/);
    if(jpg!==null){
//        up_txt.innerHTML=jpg[0];
        $up_txt.html(jpg[0]);
        img_ready();
    }
    else if(png!==null){
//        up_txt.innerHTML=png[0];
        $up_txt.html(png[0]);
        img_ready();
    }
    else if(gif!==null){
//        up_txt.innerHTML=gif[0];
        $up_txt.html(gif[0]);
        img_ready();
    }
    else if(file === ''){
        $up_txt.html('');
    }
    else{
        alert('请选择正确的图片格式');
    }
};
//绑定input验证change事件
$up_file.bind('change',img_check);

//下一步按钮
$('.up_next').bind('click',function(){
    //上传图片不能为空
    if($up_txt.html() === ''||$up_txt.html() === null){
        alert('请先选择图片');
        return false;
    }
    var file = $('#up_file').val();
    var jpg = file.match(/[^\\]+.jpg/);
    var png = file.match(/[^\\]+.png/);
    var gif = file.match(/[^\\]+.gif/);
    if(!jpg&&!png&&!gif){
        alert('请选择正确的图片格式');
        return false;
    }


    $('.arrow').css('top','20%');
    //显示与隐藏
    $up_p.css('display','none');
    $up_content.css('display','none');
    $cut_face.css('display','block');
});
//上一步按钮
$('.cut_close').bind('click',function(){
    $cut_face.css('display','none');
    $up_p.css('display','block');
    $up_content.css('display','block');
    $('.arrow').css('top','50%');
});
//数据上传验证
var cut_check = new form_check({
    form:'#up_form',
    check:[function(){
        var x = typeof parseInt($('#x').val()) === 'number';
        var y = typeof parseInt($('#y').val()) === 'number';
        var w = typeof parseInt($('#w').val()) === 'number';
        var h = typeof parseInt($('#h').val()) === 'number';
        if(x&&y&&w&&h){
            return true;
        }
        return false;
    }],
    success:function(e){
        $cut_sub.button('loading');
        jcrop_api.disable();
        var x = $('#x').val();
        var y = $('#y').val();
        var w = $('#w').val();
        var h = $('#h').val();
        var img_data = {
            x:x,
            y:y,
            w:w,
            h:h
        };
//        img_data = JSON.stringify(img_data);
        $.ajaxFileUpload({
            url:'#',
            secureuri:false,
            fileElementId:'up_file',
            dataType: 'json',
            data:img_data,
            success:function(data){
                var respond = $.parseJSON(data);
                $cut_sub.button('reset');
                jcrop_api.enable();
                if(typeof respond.error !== "string"&&respond.error !== ''){
                    alert(respond.error);
                }
                else{
                    face.popover('hide');
                    $face_img.attr('src',respond.imgUrl);
                }
            },
            error:function(){
                $cut_sub.button('reset');
                jcrop_api.enable();
                alert('上传失败，请重试');
                return false
            }
        });
        //清空之前的选择
        $up_file.val('');
        $up_txt.html('');
        //上传成功会解绑change,重新绑定
        $('#up_file').bind('change',img_check);
        return false;
    }
});
cut_check.run();

face.popover('hide');
//绘制选框
var select = function(api){
    // 改变图片实际宽长参数
    var bounds = api.getBounds();
    boundx = bounds[0];
    boundy = bounds[1];
    //绘制截取框
    if(bounds[0] > bounds[1]){
        api.setSelect([0,0,bounds[1],bounds[1]]);
    }
    else{
        api.setSelect([0,0,bounds[0],bounds[0]]);
    }
//    alert(1);
};
    // Create variables (in this scope) to hold the API and image size
var cut_img = function(){
    var
        // Grab some information about the preview pane
        $preview = $('#preview-pane'),
        $pcnt = $('#preview-pane .preview-container'),
        $pimg = $('#preview-pane .preview-container img'),
        $tar = $('#target'),
        holder = $('.jcrop-holder')[0],

        xsize = $pcnt.width(),
        ysize = $pcnt.height();
//        tar_wid = $tar.width(),
//        tar_hei = $tar.height();

    // if(tar_wid > tar_hei){
    //   $tar.css('width','300px');
    // }
    // else{
    //   $tar.css('height','300px');
    // }
    // console.log('init',[xsize,ysize]);

    //裁剪设置
    $tar.Jcrop({
//      maxSize:[400,400],
      minSize:[100,100],
      boxWidth:300,
      bgColor:'rgb(129,129,129)',
      keySupport:false,
//      allowSelect:false,
      onChange: updatePreview,
      onSelect: updateCoords,
      aspectRatio: 1
    },function(){
//        var bounds = this.getBounds();
//        boundx = bounds[0];
//        boundy = bounds[1];
        select(this);
      // console.log(bounds);
      // 保存this(jcrop)到jcrop_api
      jcrop_api = this;

      // Move the preview into the jcrop container for css positioning
      $preview.appendTo(jcrop_api.ui.holder);
    });

    function updatePreview(c)
    {
      // console.log(c);
      if (parseInt(c.w) > 0)
      {
        //宽长放大倍数
        var rx = xsize / c.w;
        var ry = ysize / c.h;
//          console.log(c);
        // console.log($pimg.css('width'));
        // console.log(boundx);
        // console.log(Math.round(rx * boundx) + 'px');
//          console.log(boundx);
          //绘制预览框
        $pimg.css({
          width: Math.round(rx * boundx) + 'px',
          height: Math.round(ry * boundy) + 'px',
          marginLeft: '-' + Math.round(rx * c.x) + 'px',
          marginTop: '-' + Math.round(ry * c.y) + 'px'
        });
        // console.log($pimg.css('width'));
      }
    }
    //填写表单
    function updateCoords(c){
      $('#x').val(Math.round(c.x));
      $('#y').val(Math.round(c.y));
      $('#w').val(Math.round(c.w));
      $('#h').val(Math.round(c.h));
    }

};
//});