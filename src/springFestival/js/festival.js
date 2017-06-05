;(function(win){

	//webp+lazy(简化图片加载样式)
    (function webpAndLazy($dom) {
        loadWebp({
            attr: 'data-src',
            img: $dom,
            replace: true,
            fn: function() {
                $dom.lazyload({ effect: 'fadeIn' });
            }
        })
    })($(".main_content li img"));

    var bind = {
        Init: function(){
            this.bindEvent();
            $(win).trigger('scroll');  //页面初始加载，判断滚动条位置
            var myScroll = new IScroll('footer'); //针对页面底部的问题描述作滚动初始化
        },
        bindEvent: function(){
            $(".back_top").on("touchend", function(event){
                $(win).scrollTop(0);
                event.preventDefault();
            });
            $(win).on("scroll", function(){
                var scroll = $(this).scrollTop();
                $(".back_top").toggleClass("op_1" , scroll > 0);
            });
        }
    }
    $(function(){
        bind.Init();
    })
})(window)