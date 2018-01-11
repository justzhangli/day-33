require(["config"],function(){
	require(["jquery","template","load"],function($, template){
		$(".header_yellow").css({
			"display":"block",
			"position":"static"
		});
		
		//加入购物车处理
		$.cookie.json = true;
		$.getJSON("/mock/list.json", function(data){
				console.log(data);
				// 准备渲染数据
				var renderData = {products : data.res_body.data};
				// 渲染数据
				var html = template("list_template", renderData);
				$(".main").html(html);
			})
			
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

		//保存创建数据
			var _products = $.cookie("products") || [];
			

		$(".main").delegate(".add_to_cart","click",function(){
			
			var _parent = $(this).parents(".right");
			console.log(_parent);
			var prod = {
				id:_parent.children(".id").text(),
				title:_parent.children(".title").text(),
				type:_parent.children(".detail").children(".type").text(),
				price:_parent.children(".detail").children(".price").text(),
				amount:1
			};
			console.log(prod);
			
			var index = exsit(prod.id,_products);
			if (index == -1) {
				_products.push(prod);
			}else{
				_products[index].amount++;				
			}
			//保存cookie数据
			$.cookie("products",_products,{expires:7,path:"/"});
		});
			
		
	   
		//滚动轮播
		var lis = $(".other_prod li"),
			len = lis.length,
			liWidth = $(lis[0]).width(),
			currentIndex = 0,
			nextIndex = 1,
			timer = null,
			durations = 3000;
		$(".other_prod").width(len * liWidth);
		function move(){
			var _left = -1 * nextIndex * liWidth;
			
			$(".other_prod").animate({
				left:_left
			},durations);
			currentIndex = nextIndex;
			nextIndex++;
			if (nextIndex >= len) {
				nextIndex = 0;
			}
		};
		timer = setInterval(move,durations);
		$(".other_prod").mouseenter(function(){
			clearInterval(timer);
		});
		$(".other_prod").mouseleave(function(){
			timer = setInterval(move,durations);
		});
		
		$(".prev").click(function(){
			nextIndex = currentIndex - 1;
			if (nextIndex < 0) {
				nextIndex = len -1;
			}
		});
		$(".next").click(function(){
			move();
		})
	})
})