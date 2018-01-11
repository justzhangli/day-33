require(["config"],function(){
	require(["load"],function(){
		
		console.log("hello");
		var lis = $("ul li"),
			len = lis.length,
			circles = $(".pages i"),
			currentIndex = 0,
			nextIndex = 1,
			timer = null,
			durations = 3000;
		
		function move(){
			//当前显示出来的图片淡出
			//即将显示出来的图片淡入
			//修改索引
			//设置计时自动轮播setInterval
			$(lis[currentIndex]).fadeOut();
			$(lis[nextIndex]).fadeIn();
			
			//处理小圆点样式
			$(circles[currentIndex]).removeClass("current");
			$(circles[nextIndex]).addClass("current");
			
			currentIndex = nextIndex;
			nextIndex++;
			if(nextIndex >= len){
				nextIndex = 0;
			}
		};
		timer = setInterval(move,durations);
		
		//鼠标点击小圆点，跳到对应下标的图片
		$.each(circles, function(index,circle) {
			$(circles[index]).click(function(){
				console.log("click");
				if (index === currentIndex) {
					return;
				}
				index = nextIndex;
				move();
			})
		});
		
		//移入的时候停止轮播，移出则启动轮播
		$("ul").mouseenter(function(){
			clearInterval(timer);
		});
		$("ul").mouseleave(function(){
			timer = setInterval(move,durations);
		});
		
		//点击翻页
		$(".prev").mousedown(function(){
			nextIndex = currentIndex - 1;
			if(nextIndex < 0){
				nextIndex = len - 1;
			}
			move()
			console.log('hello');
		});
		$(".next").mousedown(function(){
			move();
		})
		console.log(lis);
		console.log(circles);
		
		//处理滚动导航显示事件
		$(window).scroll(function(){
			//获取滚动高度值
			var _scrollTop = $(window).scrollTop();
			//获取轮播图布局高度
			var _height = $("nav").offset().top;
			//获取整个窗口的高度
			var _winHeight = $(window).height();
			//判断
			if(_scrollTop >= _winHeight - _height / 2 ){
				$(".header_yellow .top").hide();
				$(".header_rgb").stop().fadeOut();
				$(".header_yellow").stop().fadeIn();
				console.log("gun");
			}else{
				$(".header_rgb").stop().fadeIn();
				$(".header_yellow").stop().fadeOut();
			};	
		});
		
		
	});
});
