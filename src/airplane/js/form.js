(function() {

	$("form > .btn").click(function(e) {
		e.preventDefault();
		$("form").submit();
	});

	$(".btn-iframe").click(function() {
		$("[name='lyl']").attr("src", "http://www.baidu.com/");
	});

	$(".newWindow").click(function() {
		var msg = open("http://www.fenqile.com/", "xzy", "toolbar=no,scrollbars=no,menubar=no,screenX=100,screenY=100");

	});
	/**
	 * [description]
	 * @param  {[type]} event) [获取键值的编码]
	 * @return {[type]}        [void]
	 */
	$("[name='keyCode']").on("keypress", function(event) {
		console.info(event.which);
		if (event.which == 65) {
			event.preventDefault();
			/*添加代码*/
		}
	})

	//单选和多选按钮的选中状态
	// console.log($(this).attr("checked"));
	$("[name='sex']:eq(1)").prop("checked", true);
	$("#checkAll").click(function() {
		$('input[name="subBox"]').prop("checked", this.checked);
	});
	var $subBox = $("input[name='subBox']");
	$subBox.click(function() {
		$("#checkAll").prop("checked", $subBox.length == $("input[name='subBox']:checked").length ? true : false);
	});
	//下拉选择框
	$("#select_id").change(function() {
		//code...  
		// console.log($("#select_id :selected").text())  //获取Select选中项的Text
		// console.log($("#select_id")[0].selectedIndex);  //获取Select选中项的索引值
		console.log($("#select_id :last").get(0).index); //获取最大索引值
	});
	/** 
	 * jQuery设置Select的选中项 
	 */
	//$("#select_id").get(0).selectedIndex = 1;  //设置Select索引值为1的项选中  
	//$("#select_id").val(4); //设置Select的Value值为4的项选中

	//设置select 选中的text，通常可以在select回填中使用
	var numId = 33 //设置text==33的选中！
	var count = $("#select_id  option").length;
	for (var i = 0; i < count; i++) {
		if ($("#select_id").get(0).options[i].text == numId) {
			$("#select_id").get(0).options[i].selected = true;
			break;
		}
	}

	
})();