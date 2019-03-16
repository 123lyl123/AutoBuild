
(function(win) {
    //从地址栏获取参数
    function getQuery(name, def, symbol) {
        symbol = symbol || '#';
        var reg = new RegExp("(^|\\" + symbol + "|&)" + name + "=([^&]*)(\\s|&|$)", "i");
        if (reg.test(location.href)) return unescape(RegExp.$2.replace(/\+/g, " "));
        return def;
    }

    var bind = {
        Init: function() {
        },
        bindEvent: function() {
        }
    }
    $(function() {
        bind.Init();
    })
})(window);