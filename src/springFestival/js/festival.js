;
(function(win) {
    //从地址栏获取参数
    function getQuery(name, def, symbol) {
        symbol = symbol || '#';
        var reg = new RegExp("(^|\\" + symbol + "|&)" + name + "=([^&]*)(\\s|&|$)", "i");
        if (reg.test(location.href)) return unescape(RegExp.$2.replace(/\+/g, " "));
        return def;
    }

    //webp+lazy(简化图片加载样式)
    (function webpAndLazy($dom) {
        loadWebp({
            attr: 'data-src',
            img: $dom,
            replace: true,
            fn: function() {
                $dom.lazyload({
                    effect: 'fadeIn'
                });
            }
        })
    })($(".main_content li img"));

    var bind = {
        Init: function() {
            this.bindEvent();
            this.layerEvent();
            $(win).trigger('scroll'); //页面初始加载，判断滚动条位置
            var myScroll = new IScroll('footer'); //针对页面底部的问题描述作滚动初始化

        },
        bindEvent: function() {
            $(".side_top").on("click", function(event) { //滚动条滚动到顶部
                $(win).scrollTop(0);
                event.preventDefault();
            });
            $(win).on("scroll", function() { //滚动条监测
                var scroll = $(this).scrollTop();
                $(".side_top").toggleClass("op_1", scroll > 0);
            });

            $(".side_left").click(function() {
                var query = getQuery("action", "", "?") || getQuery("action", "", "&");
                var tmpArray = ["success", "fail", "default"];
                query = tmpArray.indexOf(query) == -1 ? "default" : query;
                $(".layer-" + query).openPop();
            });
        },
        layerEvent: function() {
            //打开弹窗
            $.fn.openPop = function() {
                $(this).removeClass('none');
                $('.box', this).addClass('ts');
                $('.layer-bg').off('click').on('click', function(e) {
                    if ($(this).get(0) == e.target) {
                        $(this).addClass('none');
                        $('.box', this).removeClass('ts');
                    }
                    e.preventDefault();
                });

            };

            //关闭弹窗
            $.fn.closePop = function() {
                $('.layer-bg').addClass('none');
                $('.box', this).removeClass('ts');
            };
        }
    }
    $(function() {
        bind.Init();
    })
})(window)