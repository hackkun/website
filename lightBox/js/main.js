;(function($){
	
	var Lightbox = function(){
		var _this = this;
		
		//创建遮罩和弹出框
		this.mask = $('<div id="mask">');
		this.pop = $('<div id="pop">');
		
		// body
		this.bodyNode = $(document.body);
		
		// 渲染剩下的DOM
		this.renderDOM();

		this.imgView = this.pop.find('.view');
		this.popImg = this.pop.find('.img');
		this.captionArea = this.pop.find('.caption');
		this.caption = this.pop.find('.title');
		this.prevBtn = this.pop.find('.btn-prev');
		this.nextBtn = this.pop.find('.btn-next');
		this.index = this.pop.find('.index');
		this.closeBtn = this.pop.find('.close-btn');
		
		this.groupName = null;
		this.groupData = [];
		
		//获取数据组，打开事件(事件委托)
		this.bodyNode.on('click', '*[data-role=lightbox]' ,function(){
			
			var curGroupName = $(this).data('group');
			if( curGroupName != _this.groupName ){
				_this.groupName = curGroupName;
				//根据当前组名获取同一组数据
				_this.getGroup();
			}
			
			// 初始化弹窗
			_this.initPop( $(this) );
			
			return false;
		});
	};
	
	Lightbox.prototype = {
		
		initPop: function(obj){
			var _this = this,
				src = obj.data('source'),
				id = obj.data('id');
				
			this.showMaskAndPop(src, id);
		},
		
		showMaskAndPop: function(src, id){
			var _this = this;
			
			this.imgView.hide();
			this.captionArea.hide();
			
			this.mask.fadeIn();
			
			var WIDTH = $(window).width(),
				HEIGHT = $(window).height();
				viewHeight = HEIGHT/2+10;
				
			this.popImg.css({
				width: WIDTH/2+10,
				height: HEIGHT/2+10
			});
				
			this.pop.css({
				width: WIDTH/2+10,
				height: HEIGHT/2+10,
				left: (WIDTH-(WIDTH/2+10))/2,
				top: -1000
			}).fadeIn().animate({
				top: (HEIGHT-viewHeight)/2
			},500,function(){
				
			});
		},
		
		getGroup: function(){
			var _this = this;
			var groupList = this.bodyNode.find('*[data-group='+this.groupName+']');
			
			this.groupData = [];
			
			groupList.each(function(){
				_this.groupData.push({
					src: $(this).data('source'),
					id: $(this).data('id'),
					caption: $(this).data('caption')
				});
			});
		},
		
		renderDOM: function(){
			var strDOM = '<div class="view"><img class="img" src="img/photo/1-1.jpg" /><span class="btn btn-prev"></span><span class="btn btn-next"></span></div><div class="caption"><div class="tip"><p class="title">图片标题</p><p class="index">1 of 4</p></div><a class="close-btn" href="javascript:;"></a></div>';			
			//插入到pop
			this.pop.html(strDOM);
			this.bodyNode.append(this.mask, this.pop);
		}
	};
	
	window['Lightbox'] = Lightbox;
	
})(jQuery);
