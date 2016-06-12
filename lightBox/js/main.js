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
		this.curIndex = this.pop.find('.index');
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
		
		// 点击mask关闭
		this.mask.on('click',function(){
			$(this).fadeOut();
			_this.pop.fadeOut();
			_this.clear = false;
		});
		
		this.closeBtn.on('click',function(){
			_this.pop.fadeOut();
			_this.mask.fadeOut();
			_this.clear = false;
		});
		
		this.flag = true;
		
		//左右切换按钮
		this.prevBtn.hover(function(){
			if( !$(this).hasClass('disabled') && _this.groupData.length > 1 ){
				$(this).addClass('btn-show');
			}
		},function(){
			if( !$(this).hasClass('disabled') && _this.groupData.length > 1 ){
				$(this).removeClass('btn-show');
			}
		}).click(function(ev){
			if( !$(this).hasClass('disabled') && _this.flag ){
				_this.flag = false;
				ev.stopPropagation();
				_this.imgGoto('prev');
			}
		});
		
		this.nextBtn.hover(function(){
			if( !$(this).hasClass('disabled') && _this.groupData.length > 1 ){
				$(this).addClass('btn-show');
			}
		},function(){
			if( !$(this).hasClass('disabled') && _this.groupData.length > 1 ){
				$(this).removeClass('btn-show');
			}
		}).click(function(ev){
			if( !$(this).hasClass('disabled') && _this.flag ){
				_this.flag = false;
				ev.stopPropagation();
				_this.imgGoto('next');
			}
		});
		
		//窗口调整
		this.clear = false;
		var timer = null;
		$(window).on('resize',function(){
			if( _this.clear ){
				clearTimeout(timer);
				timer = setTimeout(function(){
					_this.loadImgSize(_this.groupData[_this.index].src);
				},300);
			}
		});
	};
	
	Lightbox.prototype = {
		
		imgGoto: function(dir){
			if( dir === 'prev' ){
				this.index--;
				if( this.index <= 0 ){
					this.prevBtn.addClass('disabled').removeClass('btn-show');
				}
				if( this.index != this.groupData.length-1 ){
					this.nextBtn.removeClass('disabled');
				}
			}else if( dir === 'next' ){
				this.index++;
				if( this.index >= this.groupData.length-1 ){
					this.nextBtn.addClass('disabled').removeClass('btn-show');
				}
				if( this.index != 0 ){
					this.prevBtn.removeClass('disabled');
				}
			}
			var src = this.groupData[this.index].src;
			this.loadImgSize(src);
		},
		
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
				
			this.pop.css({
				width: WIDTH/2+10,
				height: HEIGHT/2+10,
				left: (WIDTH-(WIDTH/2+10))/2,
				top: -1000
			}).fadeIn().animate({
				top: (HEIGHT-viewHeight)/2
			},500,function(){
				_this.loadImgSize(src);
				_this.clear = true;
			});
			
			// 根据当前点击元素的id，获取当前元素的索引
			this.index = this.getIndex(id);
			
			var groupDataLength = this.groupData.length;
			
			if( groupDataLength > 1 ){
				if( this.index === 0 ){
					this.prevBtn.removeClass('disabled');
					this.nextBtn.addClass('disabled');
				}else if( this.index === groupDataLength-1 ){
					this.prevBtn.removeClass('disabled');
					this.nextBtn.addClass('disabled');
				}else{
					this.prevBtn.removeClass('disabled');
					this.nextBtn.removeClass('disabled');
				}
			}
		},
		
		loadImgSize: function(src){
			var _this = this;
			this.preloadImg(src);
		},
		
		preloadImg: function(src){
			var _this = this;
			this.captionArea.hide();
			var img =  new Image();
			if( window.ActiveXObject ){
				img.onreadystatechange = function(){
					if( this.readyState == 'complete' ){
						var picWidth = img.width,
						picHeight = img.height;
						_this.popImg.attr('src',src);
						changePic(picWidth, picHeight);
					}
				};
			}else{
				img.onload = function(){
					var picWidth = img.width,
						picHeight = img.height;
						_this.popImg.attr('src',src);
						_this.changePic(picWidth, picHeight);
				};
			}
			img.src = src;
		},
		
		changePic: function(width, height){
			var WIDTH = $(window).width(),
				HEIGHT = $(window).height();
			var _this = this;
			
			var scale = Math.min(WIDTH/(width+10),HEIGHT/(height+10),1);
			width = width * scale;
			height = height * scale;
			
			this.pop.animate({
				width: width,
				height: height,
				left: (WIDTH-width)/2-5,
				top: (HEIGHT-height)/2-5
			},function(){
				_this.popImg.css({
					width: width,
					height: height
				});
				_this.imgView.fadeIn();
				_this.captionArea.fadeIn();
				_this.flag = true;
			});
			// 设置title
			this.caption.text(this.groupData[this.index].caption);
			this.curIndex.text( (this.index+1) + ' of ' + this.groupData.length );
		},
		
		getIndex: function(id){
			var index = 0;
			$(this.groupData).each(function(i){
				index = i;
				if( this.id === id ){
					return false;
				}
			});
			return index;
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
