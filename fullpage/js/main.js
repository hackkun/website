// 登录验证
(function(){
	
	$('input[name=loginbtn]').on('click',function(){
		var $username = $('input[name=username]');
		var $password = $('input[name=password]');
		var $verify = $('input[name=verify]');
		
		var valUsername = $username.val();
		var valPassword = $password.val();
		var valVerify = $verify.val();
		var $tips = $('.tips');
		
		if( valUsername == '' ){
			$username.focus();
			$tips.text('输入名不能为空');
			return;
		}
		if( valPassword == '' ){
			$username.focus();
			$tips.text('请输入密码');
			return;
		}
		if( valVerify == '' ){
			$username.focus();
			$tips.text('请输入验证码');
			return;
		}
		
		$tips.text('');
		
	});
	
	
})();

// 导航标题和侧边栏切换
(function(){
	
	var $headmenu = $('.m-headmenu');
	var $sideTitle = $('.m-side').find('dt');
	
	var hideOff = true;
	
	$headmenu.on('click','li',function(ev){
		
		if( $(this).children().width() == 120 || $(this).children().width() > 70 ){
			return;
		}else{
			$headmenu.find('a').animate({width:70},200).css('backgroundColor','#22b7eb');
			$(this).children().animate({width:120},200).css('backgroundColor','#62d2f9');
		}
		
		$('.m-side').eq( $(this).index() ).addClass('m-side-show').siblings().removeClass('m-side-show');
	});
	
	$sideTitle.on('click',function(){
		
		$(this).siblings().slideToggle().end().toggleClass('active');
		
	});
	
	$('#hide-sidemenu').on('click',function(){
		
		if( hideOff ){
			$('.g-side').animate({left:-190},200,function(){
				$('.g-side').css('display','none');
				hideOff = false;
			});
			$('.g-main').animate({left: 0},200);
		}else{
			$('.g-side').animate({left:0},200,function(){
				hideOff = true;
			}).css('display','block');
			$('.g-main').animate({left: 187},200);
		}
	});
	
})();

// 栏目管理checkbox选中
(function(){
	
	var $all = $('#all-check');
	var $checkbox = $('.m-table tbody').find('[type=checkbox]');
	
	// 控制全部选中，全部取消
	$all.on('click',function(){
		if( $(this).prop('checked') ){
			$checkbox.prop('checked', true);
		}else{
			$checkbox.prop('checked', false);
		}
	});
	
	// 每个checkbox的判断
	for( var i=0;i<$checkbox.length;i++ ){
		
		$checkbox[i].onclick = function(){
			
			if( this.checked ){
				var bOff = true;
				
				for( var i=0;i<$checkbox.length;i++ ){
					if( !$checkbox[i].checked ){
						bOff = false;
					}
				}
				
				if( bOff ){
					$all[0].checked = true;
				}else{
					$all[0].checked = false;
				}
				
			}else {
				$all[0].checked = false;
			}
			
		};
		
	}
	
})();
