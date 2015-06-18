// jQuery(function($){
var face = $('.left_face');

//点击头像弹出侧栏
face.popover({
    trigger:'click',
    template:'<div class="popover font_fa" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div id="cut"><form id="up_form" action="#" enctype="multipart/form-data" method="post"><p>选择图片（支持jpg、png、gif）</p><div class="up_content"><div class="up_box"><div id="up_txt"></div><button class="up_button btn btn-primary">浏览..</button><input id="up_file" name="file" type="file" accept="image/*"></div><input class="btn btn-primary" type="submit" value="下一步"></div></form></div></div>'
//<form id="up_form" action="#" enctype="multipart/form-data" method="post"><div class="up_content"><div class="up_box"><div id="up_txt"></div><div class="up_button">浏览..</div><input id="up_file" name="file" type="file"></div><input class="up_submit" type="submit" value="上传"></div></form>
});

//初始化侧栏
face.popover('show');
face.bind('hide.bs.popover',function(){
    $('#up_form').css('display','block');
    $('#cut_face').css('display','none');
    $('#up_file').val('');
    $up_txt.html('');
});

var $up_form = $('#up_form');
var $up_txt = $('#up_txt');
var $cut = $('#cut');

//上传图片input验证
$('#up_file').bind('change',function(){
    var file = this.value;
//    console.log(file);
//    alert(1);
    var jpg = file.match(/[^\\]+.jpg/);
    var png = file.match(/[^\\]+.png/);
    var gif = file.match(/[^\\]+.gif/);
    if(jpg!==null){
//        up_txt.innerHTML=jpg[0];
        $up_txt.html(jpg[0]);
    }
    else if(png!==null){
//        up_txt.innerHTML=png[0];
        $up_txt.html(png[0]);
    }
    else if(gif!==null){
//        up_txt.innerHTML=gif[0];
        $up_txt.html(gif[0]);
    }
    else if(file === ''){
        $up_txt.html('');
    }
    else{
        alert('请选择正确的图片格式')
    }
});
//上传图片表单验证
var file_check = new form_check({
    form:'#up_form',
    check:[function(){
        //上传图片不能为空
        if($up_txt.html()==''||$up_txt.html()==null){
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
        return true;
    }],
    //ajax上传，返回图片url，回调进入预裁剪界面
    success:function(){
//        alert(1);
        $up_form.css('display','none');
        var img_url = "img/face.jpg";
        if($('#cut_face')[0] === undefined){
            $cut.append('<div id="cut_face">'+
                '<img src='+img_url+' id="target" alt="[Jcrop Example]" />'+
                '<div id="preview-pane">'+
                '<div class="preview-container">'+
                '<img src='+img_url+' class="jcrop-preview" alt="Preview" />'+
                '</div>'+
                '</div>'+
                '<div class="clearfix"></div>'+
                '<form id="cut_form" action="#" method="post">'+
                '<input type="hidden" id="x" name="x">'+
                '<input type="hidden" id="y" name="y">'+
                '<input type="hidden" id="w" name="w">'+
                '<input type="hidden" id="h" name="h">'+
                '<input class="cxbtn btn btn-primary" type="submit" value="上传头像">'+
                '<input class="cut_close btn btn-primary" type="button" value="上一步">'+
                '</form>'+
                '</div>');
            cut_img();
            $('.cut_close').bind('click',function(){
                $('#cut_face').css('display','none');
                $up_form.css('display','block');
//                return false;
            });
            var cut_check = new form_check({
                form:'#cut_form',
                check:[function(){
                    var x = typeof parseInt($('#x').val()) === 'number';
                    var y = typeof parseInt($('#y').val()) === 'number';
                    var w = typeof parseInt($('#w').val()) === 'number';
                    var h = typeof parseInt($('#h').val()) === 'number';
                    if(x&&y&&w&&h){
//                        alert(1);
                        return true;
                    }
                    return false;
                }]
            });
            cut_check.run();
        }
        else{
            $('#target').attr('src',img_url);
            $('.jcrop-preview').attr('src',img_url);
            $('#cut_face').css('display','block');
        }
        $('.arrow').css('top','20%');
        return false;
    }
});
file_check.run();
face.popover('hide');
    // Create variables (in this scope) to hold the API and image size
var cut_img = function(){
        var jcrop_api,
        boundx,
        boundy,

        // Grab some information about the preview pane
        $preview = $('#preview-pane'),
        $pcnt = $('#preview-pane .preview-container'),
        $pimg = $('#preview-pane .preview-container img'),
        $tar = $('#target'),
        holder = $('.jcrop-holder')[0],

        xsize = $pcnt.width(),
        ysize = $pcnt.height(),
        tar_wid = $tar.width(),
        tar_hei = $tar.height();

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
      allowSelect:false,
      onChange: updatePreview,
      onSelect: updateCoords,
      aspectRatio: 1
    },function(){

      // 图片实际宽长
      var bounds = this.getBounds();
      boundx = bounds[0];
      boundy = bounds[1];
      //绘制截取框
      if(tar_wid > tar_hei){
        this.setSelect([0,0,tar_hei,tar_hei]);
      }
      else{
        this.setSelect([0,0,tar_wid,tar_wid]);
      }
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
        // console.log($pimg.css('width'));
        // console.log(boundx);
        // console.log(Math.round(rx * boundx) + 'px');
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
  // });
};
