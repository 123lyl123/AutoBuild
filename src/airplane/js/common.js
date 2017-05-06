var Init = {
	/**
	 * [strlen 取得字符串的字节长度]
	 * @param  {[string]} str [字符串]
	 * @return {[string]}     [字符串]
	 */
	strlen: function(str) {
		var i = 0;
		var len;
		len = 0;
		for (i = 0; i < str.length; i++) {
			if (str.charCodeAt(i) > 255) len += 2;
			else len++;
		}
		return len;
	},
	/**
	 * [isnull ]
	 * @param  {[string]} str [description]
	 * @return {[boolean]}     [description]
	 */
	isnull: function(str) {
		var i;
		for (i = 0; i < str.length; i++) {
			if (str.charAt(i) != ' ') return false;
		}
		return true;
	},
	/**
	 * [isnumber 检测字符串是否全为数字]
	 * @param  {[string]} str [description]
	 * @return {[boolean]}     [description]
	 */
	isnumber: function(str) {
		var number_chars = "1234567890";
		var i;
		for (i = 0; i < str.length; i++) {
			if (number_chars.indexOf(str.charAt(i)) == -1) return false;
		}
		return true;
	},
	/**
	 * [verifyInput 检测指定文本框输入是否合法]
	 * @param  {[input控件]} input [description]
	 * @return {[boolean]}       [description]
	 */
	verifyInput: function(input) {
		var image;
		var i;
		var error = false;
		/* 长度校验 */
		if (strlen(input.value) > parseInt(input.maxsize)) {
			error = true;
		} else
		/* 非空校验 */
		if (input.nullable == "no" && isnull(input.value)) {
			error = true;
		} else {
			/* 数据类型校验 */
			switch (input.datatype) {
				case "number":
					if (isnumber(input.value) == false) {
						error = true;
					}
					break;
					/* 在这里可以添加多个自定义数据类型的校验判断 */
					/*  case datatype1: ... ; break;        */
					/*  case datatype2: ... ; break;        */
					/*  ....................................*/
				default:
					break;
			}
		}
		/* 根据有无错误设置或取消警示标志 */
		if (error) {
			return false;
		} else {
			return true;
		}
	},
	/**
	 * [verifyAll 检测指定form表单所有元素是否合法，用于表单的onsubmit事件]
	 * @param  {[控件]} myform [description]
	 * @return {[boolean]}        [description]
	 */
	verifyAll: function(myform) {
		var i;
		for (i = 0; i < myform.elements.length; i++) {
			/* 非自定义属性的元素不予理睬 */
			if (myform.elements[i].chname + "" == "undefined") continue;
			/* 校验当前元素 */
			if (verifyInput(myform.elements[i]) == false) {
				myform.elements[i].focus();
				return false;
			}
		}
		return true;
	},
	/**
	 * GetQueryValue(location.search,"name");
	 * [GetQueryValue 从地址栏提取变量的值]
	 * @param {[type]} sorStr [description]
	 * @param {[type]} panStr [description]
	 */
	GetQueryValue: function(sorStr, panStr) {
		var vStr = "";
		if (sorStr == null || sorStr == "" || panStr == null || panStr == "") return vStr;
		sorStr = sorStr.toLowerCase();
		panStr += "=";
		var itmp = sorStr.indexOf(panStr);
		if (itmp < 0) {
			return vStr;
		}
		sorStr = sorStr.substr(itmp + panStr.length);
		itmp = sorStr.indexOf("&");
		if (itmp < 0) {
			return sorStr;
		} else {
			sorStr = sorStr.substr(0, itmp);
			return sorStr;
		}
	},
	/**
	 * [getcookieval 获取解密的cookie字符串]
	 * @param  {[type]} offset [description]
	 * @return {[type]}        [description]
	 */
	getcookieval: function(offset) {
		var endstr = document.cookie.indexOf(';', offset);
		if (endstr == -1) endstr = document.cookie.length;
		return unescape(document.cookie.substring(offset, endstr));
	},
	/**
	 * [getcookie get cookie from]
	 * @param  {[type]} name [description]
	 * @return {[type]}      [description]
	 */
	getcookie: function(name) {
		var arg = name + '=';
		var alen = arg.length;
		var clen = document.cookie.length;
		var j = 0;
		while (j < clen) {
			var k = j + alen;
			if (document.cookie.substring(j, k) == arg) return getcookieval(k);
			j = document.cookie.indexOf('', j) + 1;
			if (j == 0) break;
		}
		return null;
	},
	/**
	 * [getTime 获取时间格式2016-10-10 00:00:00   2016/10/10 00:00:00]
	 * @param  {[type]} date [description]
	 * @return {[type]}      [description]
	 */
	getTime: function(date) {
		return Date.parse(date.replace(/-/g, "/"));
	},
	/**
	 * [EnCode 将str转换为编码用x分割如:20320x65x66x67x]
	 * @param {[type]} str [string]
	 */
	EnCode: function(str) {
		var s;
		var n;
		s = "";
		for (n = 0; n < str.length; n++)
			s = s + str.charCodeAt(n) + "x";
		return s;
	},
	/**
	 * [UnCode 将EnCode转换出的编码串再转为字符串]
	 * @param {[type]} str [string]
	 */
	UnCode: function(str) {
		var i;
		var scode;
		var rs;
		if (str == "") return "";
		i = str.indexOf("x", 0);
		rs = ""
		while (i > 0) {
			scode = str.substring(0, i)
			rs = rs + String.fromCharCode(scode);
			str = str.substring(i + 1);
			i = str.indexOf("x", 0);
		}
		return rs;
	},
	/**
	 * [bol_chinese 判断一个字符串是否为纯中文]
	 * @param  {[type]} str [字符串]
	 * @return {[type]}     [bool类型的变量]
	 */
	bol_chinese: function(str){
		var pattern = /[^\u4E00-\u9FA5]/;
		if(pattern.test(str)) 
			return false; //非中文
		else 
			return true; //纯中文
	},

	

};