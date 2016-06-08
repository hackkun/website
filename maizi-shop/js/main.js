// 当前时间
(function(){
	
	var weekArr = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
	var date = new Date();
	
	var week = date.getDay();
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	var day = date.getDate();
	
	var curTime = year + '/' + month + '/' + day + ' ' + weekArr[week];
	
	$('#cur-date').text(curTime);
	
})();

// banner轮播
(function(){
	
	var $box = $('.m-banner');
	var $imgs = $box.find('li');
	var $links = $box.find('i');
	
	$links.on('click',function(){
		var index = $(this).index();
		$imgs.eq(index).addClass('show').siblings().removeClass('show');
		$(this).addClass('active').siblings().removeClass('active');
	});
	
})();

// 购物车计算
(function(){
	
	var $car = $('.car');
	var $num = $('.num');
	var $price = $('.price');
	var $money = $('.money');
	var $allPrice = $('.allPrice');
	var $factPrice = $('.face-price');
	var $number = $('.number');
	var $updateNum = $('.update-num');
	
	
	
	
	
	$updateNum.click(function(){
		
		caluMoney();
		
	});
	
	
	function caluMoney(){
		var allNum = 0;
		var total = 0;
		$price.each(function(){
			var num = $(this).parent().find('.num').val();
			var money = parseInt($(this).parent().find('.money').text().substring(1));
			$(this).text( '$' + num * money + '.00' );
		});
		
		$num.each(function(index,element){
			allNum += parseInt($(this).val());
			total += parseInt($price.eq(index).text().substring(1));
		});
		
		$car.text( allNum + '件商品 合计' + total + '元' );
		$num.text(allNum);
		$allPrice.text('$' + total + '.00');
		$factPrice.text('$' + total + '.00');
		$('.sort').text(total);
	}
	
	
	
})();
