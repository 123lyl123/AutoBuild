(function(){
	var Init ={
		initValue: initValue,
		isPhone: isPhone,
		isInt: isInt,
		isName: isName,
		controlTime: function(){
			/*倒计时控制*/
			var InterValObj; //timer变量，控制时间  
		    var count = 60; //间隔函数，1秒执行  
		    var curCount;//当前剩余秒数    
		    var codeLength = 5;//验证码长度
		    function startTask(){
		        curCount = count;  
		    	//设置button效果，开始计时
		        $("#btnSendCode").off('click', getValidCode); 
		        // fish.one("#btnSendCode").attr("disabled", "true"); 
		        $("#btnSendCode").addClass('noActive');
		        $("#btnSendCode span").removeClass('none');  
		        $("#btnSendCode span i").html(curCount);  
		        InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次 
		    }
		    //倒计时秒数判断函数  
		    function SetRemainTime() {  
		        if (curCount == 0) {                  
		            timerStyle();       
		        }  
		        else {  
		            curCount--;  
		            $("#btnSendCode span i").html(curCount);  
		        }  
		    }
		    /*重置倒计时状态*/
		     function timerStyle(){
		    	window.clearInterval(InterValObj);//停止计时器
		        $("#btnSendCode").on('click', getValidCode); 
		        // fish.one("#btnSendCode").removeAttr("disabled");   
		        $("#btnSe原生代表的ndCode").removeClass('noActive');//启用按钮  
		        $("#btnSendCode span").addClass('none');
		    }
		},
		jumpTop: jumpTop,
		getTop: getTop,
		setString: setString,
		tabControl: tabControl,
		getTime: getTime,
		utility: function(){
			 function isFunction(e) {
		        return !!e && !e.nodeName && e.constructor != String && e.constructor != RegExp && e.constructor != Array &&
		            /function/i.test(e + "")
		    }
		    function typeDeepOf(e) {
		        return "object" != typeof e ? typeof e : Object.prototype.toString.apply(e).slice(8, -1).toLowerCase()
		    }
		    function getUrlParam(e, t) {
		        var n = new RegExp("(^|&)" + e + "=([^&]*)(&|$)"),
		            a = window.location.search.substr(1).match(n);
		        return "string" == typeof t && t.length && (a = (t.split("?")[1] || "").match(n)), null != a ?
		            decodeURIComponent(a[2]) : null
		    }
		    function formatUrl(e) {
		        function t(e, t, n) {
		            a[decodeURIComponent(t)] = decodeURIComponent(n)
		        }
		        "string" == typeof e && e.length || (e = window.location.href);
		        var n = /(?:[?&]+)([^&]+)=([^&]+)/g,
		            a = {};
		        return e.replace(n, t), a
		    }
		    function cookie(e, t, n) {
		        var a, i, o, s;
		        return arguments.length > 1 && "[object Object]" !== String(t) ? (n = $.extend({}, n), null !== t && void 0 !==
		            t || (n.expires = -1), "number" == typeof n.expires && (a = 24 * n.expires * 60 * 60 * 1e3, i = n.expires =
		            new Date, i.setTime(i.getTime() + a)), t = String(t), document.cookie = [encodeURIComponent(e), "=", n.raw ?
		                t : encodeURIComponent(t), n.expires ? "; expires=" + n.expires.toUTCString() : "", n.path ? "; path=" +
		                n.path : "", n.domain ? "; domain=" + n.domain : "", n.secure ? "; secure" : ""].join("")) : (n = t || {},
		            s = n.raw ? function (e) {
		            return e
		        } : decodeURIComponent, (o = new RegExp("(?:^|; )" + encodeURIComponent(e) + "=([^;]*)").exec(document.cookie)) ?
		            s(o[1]) : null)
		    }
		    function filter(e, t, n) {
		        function a(e) {
		            return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
		        }
		        if ("array" !== typeDeepOf(e) || 0 === e.length) return e;
		        for (var i = new RegExp(a(t), "i"), o = !1, s = [], r = 0, l = e.length; r < l; r++) o = i.test(e[r].label || e[
		                r].value || e[r]), n && isFunction(n) && (o = n.call(e, i, e[r])), o && s.push(e[r]);
		        return s
		    }
		    function forEach(e, t) {
		        if ("array" !== typeDeepOf(e) || 0 === e.length) return e;
		        for (var n = 0, a = e.length; n < a && (!isFunction(t) || t.apply(e, [n, e[n]]) !== !1); n++);
		    }
		    function unique(e) {
		        if ("array" !== typeDeepOf(e) || 0 === e.length) return e;
		        for (var t = [], n = 0, a = e.length; n < a; n++) t.indexOf(e[n]) == -1 && t.push(e[n]);
		        return t
		    }
		    function parseString(e) {
		        function t() {
		            var e = arguments[0],
		                t = [],
		                n = this,
		                a = function (e) {
		                    return "object" == typeof e && null != e ? $.isArray(e) ? i(e) : n.jsonParseString(e) :
		                        /^(string|number)$/.test(typeof e) ? "'" + e + "'" : e
		                }, i = function (e) {
		                    if ("object" != typeof e || !$.isArray(e)) return "";
		                    for (var t = "[", a = 0; a < e.length; a++) t += n.jsonParseString(e[a]) + ",";
		                    return e.length > 0 && (t = t.substring(0, t.length - 1)), t += "]"
		                };
		            for (var o in e) t.push("'" + o + "':" + a(e[o]));
		            return "{" + t.join(",") + "}"
		        }
		        function n(e) {
		            try {
		                return e()
		            } catch (t) {
		                return t
		            }
		        }
		        var a, i = typeDeepOf(this);
		        return "object" !== i && "array" !== i ? this.toString() : (a = n(function () {
		            return JSON.stringify(e)
		        }), "string" == typeof a ? a : (a = n(function () {
		            return t(e)
		        }), "string" == typeof a ? a : this.toString()))
		    }
		    return String.prototype.format = function () {
		        for (var e = this.valueOf(), t = 0; t < arguments.length; t++) {
		            var n = new RegExp("\\{" + t + "\\}", "gm");
		            e = e.replace(n, arguments[t])
		        }
		        return e
		    }, String.prototype.parseJSON = function () {
		        var str = this.valueOf(),
		            fn = function (e) {
		                try {
		                    return e()
		                } catch (t) {
		                    return t
		                }
		            }, obj;
		        return str.length ? (obj = fn(function () {
		            return JSON.parse(str)
		        }), "object" === typeDeepOf(obj) || "array" === typeDeepOf(obj) ? obj : (obj = fn(function () {
		            return new Function("return " + str)()
		        }), "object" === typeDeepOf(obj) || "array" === typeDeepOf(obj) ? obj : (obj = fn(function () {
		            return eval("(" + str + ")")
		        }), "object" === typeDeepOf(obj) || "array" === typeDeepOf(obj) ? obj : new Error("请使用合格的JSON字符格式！")))) : new Error(
		            "空字符串不是一个合格的JSON格式！")
		    }, {
		        isFunction: isFunction,
		        typeDeepOf: typeDeepOf,
		        getUrlParam: getUrlParam,
		        formatUrl: formatUrl,
		        cookie: cookie,
		        filter: filter,
		        forEach: forEach,
		        unique: unique,
		        parseString: parseString
		    }
		}
	}
	//表单累数据的验证;

	/* 初始化表单元素的默认值，兼容IE+8 */
	function initValue(){
		/*使用jqury库下操作*/
		$(selector).each(function(){
			var data = $(this).attr("attr-value");
			var dataval = $.trim($(this).val());   //去除表单值前后的空格
			if(dataval == ""){
				$(this).css("color:#9e9c98");
				$(this).val(dataval);
			}
			$(this).on("focus",function(){
				var data = $(this).attr("attr-value");
				var val = $.trim($(this).val());
				$(this).css("color:#333");
				if(data == val){
					$(this).val("");
				}
			});
			$(this).on("blur",function(){
				var data = $(this).attr("attr-value");
				var val = $.trim($(this).val());
				if(val == ""){
					$(this).css("color:#9e9c98");
					$(this).val(data);
				}
			});
		})
	}

	//正则表达式验证数据格式 
	
	/*合法手机号？*/
	function isPhone(value){
		return /^(13[0-9]|15[0-9]|17[0-9]|18[0-9]|147)\d{8}$/i.test(value);
	}
	/*整数的规定值*/
	function isInt(value){
		return (value >= 10)?true:false;
	}
	/*姓名验证*/
	function isName(value){
		// 英文合格
		if(/^[a-zA-Z\s]+$/.test(value)){
			return true;
		}

		// 中文、大于1个汉字合格。
		if(/^[\u4e00-\u9fa5]+$/.test(value) && value.length>1){
			return true;
		}
		// 其他格式不合格
		return false;
	}

    //滚动条原生操作

    /*设置滚动条滚动高度*/
    function jumpTop(value){
		document.documentElement.scrollTop = value;
		document.body.scrollTop = value;
	}

    /*获取滚动条滚动的高度*/
    function getTop(){
		return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
	}

	/*截取指定长度的字符串*/
	function setString(str, len) {  
	    var strlen = 0;  
	    var s = "";  
	    for (var i = 0; i < str.length; i++) {  
	        if (str.charCodeAt(i) > 128) {  
	            strlen += 2;  
	        } else {  
	            strlen++;  
	        }  
	        s += str.charAt(i);  
	        if (strlen >= len) {  
	            return s+"...";  
	        }  
	    }  
	    return s;  
	}

	//Tab导航(基于jQuery)
	function tabControl(){
		var tempvalue = fish.one(window).height();
		$(window).on("scroll",function(){
			if(getTop() <= tempvalue){
				$(".tab-nav ul li").removeClass("tab-current");
				$(".side-nav ul li").removeClass("nav-current");
				$(".side-nav").addClass("none");
			}
			else{
				if(getTop() < (fish.one(fish.all(".line-detail")).offset().top-100)){
					$(".side-nav ul li").removeClass("nav-current");
					$(".tab-nav ul li").removeClass("tab-current");
				}
				$(".side-nav").removeClass("none");
				$(".line-detail").each(function(item,i){
					if(getTop() > (fish.one(this).offset().top - 100)){
						$(".side-nav ul li").removeClass("nav-current");
						$(fish.all(".side-nav ul li")[i]).addClass("nav-current");
						$(".tab-nav ul li").removeClass("tab-current");
						$(fish.all(".tab-nav ul li")[i]).addClass("tab-current");
					}
				});
			}
		});
		$(".tab-nav ul li").each(function(item,i){
			$(this).on("click",function(){
				$(".side-nav ul li").removeClass("nav-current");
				$($(".side-nav ul li")[i]).addClass("nav-current");
				$(".tab-nav ul li").removeClass("tab-current");
				$($(".tab-nav ul li")[i]).removeClass("tab-current");
				jumpTop($($(".line-detail")[i]).offset().top);
			})
		});
		$(".side-nav ul li").each(function(item,i){
			$(this).on("click",function(){
				$(".side-nav ul li").removeClass("nav-current");
				if(i == 5){
					jumpTop(0);
				}
				else{
					$(".tab-nav ul li").removeClass("tab-current");
					$($(".tab-nav ul li")[i]).addClass("tab-current");
					$(fish.all(".side-nav ul li")[i]).addClass("nav-current");
					jumpTop($($(".line-detail")[i]).offset().top);
				}
				
			})
		});
	}

	/*日期转换双斜杠*/
	function getTime(value){
		return (new Date(Date.parse(value.replace(/-/g,"/"))));
	}
})();