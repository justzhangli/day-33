require(["config"],function(){
	require(["load"],function(){
		$(".header_yellow").css("position","static");
		$(".header_yellow .top").show();
		
		
		//用户注册
		//处理手机号验证
		$(function(){
			$(".in_phone_num").blur(function(){
				var regNum = /^1[3|4|5|8][0-9]\d{4,8}$/;
				var userPhone = $(".in_phone_num").val();
				$(".span2").text("*");
				if (!regNum.test(userPhone)) {
					$(".right .ck_phone").text("请输入准确有效的手机号！").css({
						"color":"red",
						"font-size":"12" + "px"
					});
				}else{
					$(".right .ck_phone").text("该手机号有效！").css({
						"color":"red",
						"font-size":"12" + "px"
					});
					$(".right .span1").text("√").css("color","red");
					$(".right .duanxin").text("获取验证码");
					$(".right .duanxin_ck").text("短信验证码：").show();
					$(".right .in_duanxin").text("请输入短信验证码！");
					$(".duanxin").show();
				}
			})
			//密码
			$(".in_password").blur(function(){
				var in_password = $(".in_password").val();
				var regPassword = /^\d{6,16}$/;
				console.log(in_password);
				if (!regPassword.test(in_password)) {
					$(".ck_password").text("密码只能由6-16位数字组成!").css("color","red");
				} else{
					$(".span3").text("√ ").css("color","red");
					$(".ck_password").hide();
				}
			});
			//确认密码
			$(".confirm_password").blur(function(){
				var in_password = $(".in_password").val(),
					conform_pw = $(".confirm_password").val();
				console.log(in_password);
				console.log(conform_pw);
				if (in_password === conform_pw) {
					$("form .span4").text("√").css("color","red");
				} else{
					$(".in_pw").text("二次密码输入不一致").show();
				}
			});
		});
		
		//处理用户登录
		$(function(){
			//alert("手机号/会员号或者密码有误!");
		})
		//处理图片验证码
		$(function(){
			function generate(){
				var url = "http://route.showapi.com/932-2?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7";
				var result = $.getJSON(url,function(data){
					$("form img").attr("src",data.showapi_res_body.image);
					$(".yanzheng").data("sid",data.showapi_res_body.sid);
				})
			};
			generate();
			$("form img").click(generate);
			$(".btn_register").click(function(){
				var _yanzheng = $(".yanzheng").val(),
					sid = $(".yanzheng").data("sid"),
					url = `http://route.showapi.com/932-1?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&checkcode=${_yanzheng}&sid=${sid}`;
					
				$.getJSON(url,function(data){
					if (data.showapi_res_body.valid) {
						alert("验证码输入错误！")
					} 
				})
			})
		})
	});
});
