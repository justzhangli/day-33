
require(["config"], function(){
	require(["jquery", "template", "load"], function($, template){
		$(".header_yellow").css({
			"display":"block",
			"position":"static"
		});
		
		// 异步加载列表页面数据，使用模板引擎渲染
		//读取cookie中的数据
		$.cookie.json = true;
		var _products = $.cookie("products") || [];
		console.log(_products);
		// 准备渲染数据
		var renderData = {products : _products};
		// 渲染数据
		var html = template("cart_template", renderData);
		$(".cart_body").html(html);
		
		//计算数量合计
		function caculateAmount(){
			$.each(_products,function(index,element){
				var amount_num = _products[index].amount;
				console.log(amount_num);
				$(".total_amount").text(amount_num)
			});
		};
		
	
		//查找id所表示的商品在products数组中的位置
		function exsit(id,products){
			var idex = -1;
			$.each(products,function(index,element){
				if (element.id == id) {
					idex = index;
					return false;
				}
			});
			return	idex;
		};

		//删除购物车中的商品
		$(".cart_body").delegate(".operate","click",function(){
			//获取删除的一行
			var _row = $(this).parent();
			//获取当前行的id
			var _id = $(_row).children(".id").text();
			console.log(_id);
			//找出下标
			var index = exsit(_id,_products);
			//删除数组中对应的下标元素
			_products.splice(index,1);
			console.log(_products);
			//重新保存到cookie中
			$.cookie("products",_products,{expires:7,path:"/"});
			//删除页面的DOM元素
			_row.remove();
			//数量合计的修改
			caculateAmount();
			//计算合计
			totalCaculate();
		})
		
		
		//修改商品数量通过+-
		$(".cart_body").delegate(".minus,.add","click",function(){
			
			var _row = $(this).parent().parent();
			
			var _id = $(_row).children(".id").text();
			
			var index = exsit(_id,_products);
			
			var _prod = _products[index];
			
			if ($(this).is(".add")) {
				_prod.amount++;
			} else{
				if(_prod.amount <= 1){
					return
				}
				_prod.amount--;
			};
			//保存到cookie中
			$.cookie("products",_products,{expires:7,path:"/"});
			//把数据显示到文本框中
			$(_row).find(".amount_num").val(_prod.amount);
			console.log(_prod.amount);
			//小计金额的计算
			$(_row).find(".sub").text(_prod.amount * _prod.price);
			//合计数量
			//数量合计的修改
			caculateAmount();
			//计算合计
			totalCaculate();
		});
			
			
		//输入的时候进行修改
		$(".cart_body").delegate(".amount_num","blur",function(){
		
			var _row = $(this).parents().parent();
			
			var _id = $(_row).children(".id").text();
			
			var index = exsit(_id,_products);
			
			var _prod = _products[index];
			
			// 判断输入格式是否正确
			if (!/^[1-9]\d*$/.test($(this).val())){ // 输入不合法，还原原有数量
				_prod.amount = $(".amount_num").val();
				return;
			};
			_prod.amount = $(".amount_num").val();
			$.cookie("products",_products,{expires:7,path:"/"});
			//小计金额的计算
			$(_row).find(".sub").text(_prod.amount * _prod.price);
			//计算合计
			totalCaculate();
			 //数量合计的修改
			caculateAmount();
		})
		
		
		//全选
		$(".ck_all").click(function(){
			//获取当前全选的复选框状态
			var currStatus = $(this).prop("checked");
			//将所有商品的选择状态设置为一致的状态
			$(".ck").prop("checked",currStatus);
			//计算合计
			totalCaculate();
		});
		$(".ck").click(function(){
			var status = $(".ck:checked").length === _products.length;
			$(".ck_all").prop("checked",status);
		});
		
		console.log(66666);
		//计算合计金额
		function totalCaculate(){
			var sum = 0;
			$(".ck:checked").each(function(index,element){
				sum += Number($(this).parents(".cart_body").find(".sub").text());
				console.log(sum);
			})
			$(".total_sub .total_monye").text(sum);
		};
		console.log($(".ck:checked"));
		 //数量合计的修改
		caculateAmount();
		//清空购物车
		$(".clear").click(function(){	
			$(".cart_body").children().remove();
			_products.splice(0,_products.length);
			console.log(_products);
			$.removeCookie("products");
			caculateAmount();
		});
	});
});