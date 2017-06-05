var ImgSrc, DescInfo, dataForWeixin, href, tit;

function loaded() {
    if ($("#wxShare").length > 0) {
        DescInfo = $("[name=tcDesc]").val();
        ImgSrc = $("[name=tcshareimg]").val();
        href = $("[name=tcshareurl]").val();
        tit = $("[name=tcsharetext]").val()
    } else {
        if ($("body img").length < 1 || location.href.match("http://touch.17u.cn/[^/]*") == "http://touch.17u.cn/") {
            ImgSrc = "http://img1.40017.cn/touch/cn/public/webapp-icon.png"
        } else {
            ImgSrc = $("body img")[0].src
        }
        var a = $("head meta[name=description]").attr("content");
        if (a != undefined) {
            DescInfo = $("head meta[name=description]").attr("content")
        } else {
            DescInfo = "\u540c\u7a0b\u7f51\u662f\u4e2d\u56fd\u9886\u5148\u7684\u624b\u673a\u4e00\u7ad9\u5f0f\u65c5\u6e38\u9884\u8ba2\u5e73\u53f0\uff0c\u63d0\u4f9b30000\u591a\u5bb6\u666f\u70b9\u95e8\u7968\u3001\u7279\u4ef7\u673a\u7968\u3001\u7279\u60e0\u9152\u5e97\u7b49\u9884\u8ba2\u670d\u52a1\uff1b\u4e13\u4e1a\u670d\u52a1\u3001\u54c1\u8d28\u4fdd\u969c\uff0c\u8ba9\u60a8\u7684\u65c5\u884c\u66f4\u5b89\u5fc3\uff1b\u5b9e\u60e0\u7684\u4ef7\u683c\u3001\u7b80\u5355\u7684\u6d41\u7a0b\uff0c\u8ba9\u60a8\u7684\u65c5\u884c\u66f4\u8d34\u5fc3\uff01"
        }
        href = location.href;
        if (href.match("/selftrip/tripdetail-") != null) {
            tit = $(".mt").html().trim(" ", "")
        } else {
            tit = $("header h1").html()
        }
    }
    dataForWeixin = {
        appId: "",
        MsgImg: "",
        TLImg: ImgSrc,
        url: href,
        title: tit,
        desc: DescInfo,
        fakeid: "",
        callback: function() {}
    }
}
(function() {
    var a = function() {
        WeixinJSBridge.on("menu:share:timeline", function(b) {
            loaded();
            (dataForWeixin.callback)();
            WeixinJSBridge.invoke("shareTimeline", {
                img_url: dataForWeixin.TLImg,
                img_width: "120",
                img_height: "120",
                link: dataForWeixin.url,
                desc: dataForWeixin.desc,
                title: dataForWeixin.title
            }, function(c) {})
        });
        WeixinJSBridge.on("menu:share:appmessage", function(b) {
            loaded();
            WeixinJSBridge.invoke("sendAppMessage", {
                img_url: dataForWeixin.TLImg,
                img_width: "120",
                img_height: "120",
                link: dataForWeixin.url,
                desc: dataForWeixin.desc,
                title: dataForWeixin.title
            }, function(c) {})
        });
        WeixinJSBridge.on("menu:share:weibo", function(b) {
            loaded();
            WeixinJSBridge.invoke("shareWeibo", {
                content: dataForWeixin.desc,
                img_url: dataForWeixin.TLImg,
                img_width: "120",
                img_height: "120",
                desc: dataForWeixin.desc,
                url: dataForWeixin.url,
                title: dataForWeixin.title
            }, function(c) {
                (dataForWeixin.callback)()
            })
        })
    };
    if (document.addEventListener) {
        document.addEventListener("WeixinJSBridgeReady", a, false)
    } else {
        if (document.attachEvent) {
            document.attachEvent("WeixinJSBridgeReady", a);
            document.attachEvent("onWeixinJSBridgeReady", a)
        }
    }
})();