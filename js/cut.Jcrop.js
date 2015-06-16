// jQuery(function($){
var face = $('.left_face');
face.popover({
    trigger:'click',
    template:'<div class="popover font_fa" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div id="cut"><form id="up_form" action="#" enctype="multipart/form-data" method="post"><p>选择图片（支持jpg、png、gif）</p><div class="up_content"><div class="up_box"><div id="up_txt"></div><button class="up_button btn btn-primary">浏览..</button><input id="up_file" name="file" type="file"></div><input class="btn btn-primary" type="submit" value="下一步"></div></form></div></div>'
//<form id="up_form" action="#" enctype="multipart/form-data" method="post"><div class="up_content"><div class="up_box"><div id="up_txt"></div><div class="up_button">浏览..</div><input id="up_file" name="file" type="file"></div><input class="up_submit" type="submit" value="上传"></div></form>
});
face.popover('show');
var up_txt = $('#up_txt');
var cut = $('#cut');
$('#up_file').bind('change',function(){
    var file = this.value;
//    console.log(file);
//    alert(1);
    var jpg = file.match(/[^\\]+.jpg/);
    var png = file.match(/[^\\]+.png/);
    var gif = file.match(/[^\\]+.gif/);
    if(jpg!=null){
//        up_txt.innerHTML=jpg[0];
        up_txt.html(jpg[0]);
    }
    else if(png!=null){
//        up_txt.innerHTML=png[0];
        up_txt.html(png[0]);
    }
    else if(gif!=null){
//        up_txt.innerHTML=gif[0];
        up_txt.html(gif[0]);
    }
    else{
        alert('请选择正确的图片格式')
    }
});
var file_check = new form_check({
    form:'#up_form',
    check:[function(){
        if(up_txt.html()==''||up_txt.html()==null){
            alert('请先选择图片');
            return false;
        }
        return true;
    }],
    success:function(){

    }
});
file_check.run();
    // Create variables (in this scope) to hold the API and image size
//    var jcrop_api,
//        boundx,
//        boundy,
//
//        // Grab some information about the preview pane
//        $preview = $('#preview-pane'),
//        $pcnt = $('#preview-pane .preview-container'),
//        $pimg = $('#preview-pane .preview-container img'),
//        $tar = $('#target'),
//        holder = $('.jcrop-holder')[0],
//
//        xsize = $pcnt.width(),
//        ysize = $pcnt.height(),
//        tar_wid = $tar.width(),
//        tar_hei = $tar.height();
//
//    // if(tar_wid > tar_hei){
//    //   $tar.css('width','300px');
//    // }
//    // else{
//    //   $tar.css('height','300px');
//    // }
//    // console.log('init',[xsize,ysize]);
//
//    $tar.Jcrop({
//      maxSize:[400,400],
//      minSize:[100,100],
//      boxWidth:400,
//      bgColor:'rgb(129,129,129)',
//      allowSelect:false,
//      onChange: updatePreview,
//      onSelect: updateCoords,
//      aspectRatio: 1
//    },function(){
//
//      // 图片实际宽长
//      var bounds = this.getBounds();
//      boundx = bounds[0];
//      boundy = bounds[1];
//      //绘制截取框
//      if(tar_wid > tar_hei){
//        this.setSelect([0,0,tar_hei,tar_hei]);
//      }
//      else{
//        this.setSelect([0,0,tar_wid,tar_wid]);
//      }
//      // console.log(bounds);
//      // 保存this(jcrop)到jcrop_api
//      jcrop_api = this;
//
//      // Move the preview into the jcrop container for css positioning
//      $preview.appendTo(jcrop_api.ui.holder);
//    });
//
//    function updatePreview(c)
//    {
//      // console.log(c);
//      if (parseInt(c.w) > 0)
//      {
//        //宽长放大倍数
//        var rx = xsize / c.w;
//        var ry = ysize / c.h;
//        // console.log($pimg.css('width'));
//        // console.log(boundx);
//        // console.log(Math.round(rx * boundx) + 'px');
//        $pimg.css({
//          width: Math.round(rx * boundx) + 'px',
//          height: Math.round(ry * boundy) + 'px',
//          marginLeft: '-' + Math.round(rx * c.x) + 'px',
//          marginTop: '-' + Math.round(ry * c.y) + 'px'
//        });
//        // console.log($pimg.css('width'));
//      }
//    };
//    function updateCoords(c){
//      $('#x').val(Math.round(c.x));
//      $('#y').val(Math.round(c.y));
//      $('#w').val(Math.round(c.w));
//      $('#h').val(Math.round(c.h));
//    };
//  // });