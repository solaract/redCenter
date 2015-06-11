/**
 * Created by zxy on 2015/6/11.
 */
var exchangeImgs = $('#right_contair_exchange img');
var imgs_helper = function(i){
    exchangeImgs[i].height = exchangeImgs[i].width;
};
var imgsLen = exchangeImgs.length;
for(var i = 0;i<imgsLen;i++){
    imgs_helper(i);
}
