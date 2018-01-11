//定义模块，加载头部、尾部资源
define(["jquery","cookie"],function($){
	//引入头部资源，透明导航
	$.ajax("/html/include/header.html").done(function(data){
		$(".header_rgb").html(data);
		$(".icon-jiantouxia").mouseenter(function(){
			$(".district").show();
		});
		$(".district").mouseleave(function(){
			$(".district").hide();
		});
		$(".icon-sousuo").mouseenter(function(){
			$(".icon-sousuo input").fadeIn();
		}).mouseleave(function(){
			$(".icon-sousuo input").fadeOut();	
		})
		LoadCartCount();
	});
	//黄色导航
	$.ajax("/html/header_2.html").done(function(data){
		$(".header_yellow").html(data);
		$(".icon-sousuo").mouseenter(function(){
			$(".icon-sousuo input").fadeIn();
		}).mouseleave(function(){
			$(".icon-sousuo input").fadeOut();
		})
		LoadCartCount();
	});
	
	function LoadCartCount()
	{	$.cookie.json = true;
		var _products = $.cookie("products") || [];
		var _productsCounts=0;
//		var p =JSON.parse(_products);
		//处理头部购物车的内容显示
		$.each(_products, function(index) {
			var cartAmount =_products[index].amount;
			_productsCounts+=cartAmount;
		});
		$("#cart-counts").text(_productsCounts);
	}
		
	//加载尾部资源
	$("footer").load("/html/include/footer.html");
});