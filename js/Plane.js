
function Plane(owner){
	
	var me = this;
	var lastFrame = -1000; //上一次发子弹的帧
	
	var isDown = false;
	
	var angle = 0;
	var distance = 0;
	
	this.init = function(){
		this.game = owner;
		
		var resplaneimg = window.resource.plane.img;		
		var img = this.eleimage = new Image();
		img.src = resplaneimg.src;
		
		this.width = resplaneimg.width;
		this.height = resplaneimg.height;		
		this.x = (this.game.width - this.width)/2; //初始化x坐标
		this.y = this.game.height - this.height; //y坐标
		this.speed = 6;
		
		this.isDown = false;
		this.distance = 0;
		this.rad = 0;  //初始移动弧度
		
		this.mx = this.x + this.width / 2;
		this.my = this.y + this.height / 2;
		
		//子弹集合
		this.bullets = [];
		
		this.game.ui.appendChild(img);
		
		//事件对象
		this.game.ui.addEventListener("mousemove", doMove);
		this.game.ui.addEventListener("mousedown", doDown);
		this.game.ui.addEventListener("mouseup", doUp);
		
		//移动端触摸事件
		this.game.ui.addEventListener("touchstart", touchStart);
		this.game.ui.addEventListener("touchmove", touchMove);
		this.game.ui.addEventListener("touchend", touchEnd);
	}
	
	function getTouch(){
		var touch = event.touches[0];  //得到第一个触摸点
		// 第一个触摸点的坐标
		var x = touch.pageX;
		var y = touch.pageY;
		
		//移动目标点
		me.mx = x;
		me.my = y;
		
		//飞机中间坐标
		var cx = me.x + me.width / 2;
		var cy = me.y + me.height / 2;

		var dx = me.mx - cx;
		var dy = me.my - cy;
		var d = Math.sqrt(dx * dx + dy * dy);

		//移动的弧度
		var rad = me.rad = Math.atan2(dy, dx);
	}
	
	
	function touchStart() {
		console.log("touch start");
		var touch = event.touches[0];
		if(!me.isDown && touch) {
			//触摸点的标识
			me.touchID = touch.identifier;
			me.isDown = true;
			//console.log("down id:", this.touchID);
		}
		event.stopPropagation();
		event.preventDefault();
		//console.log(event);
		//获得触摸点
		getTouch();
	}

	function touchMove() {
		console.log("touch move");
		if(me.isDown) {
			//获取触摸点
			getTouch();
		}
	}

	function touchEnd() {
		console.log("touch end");
		var touchs = event.changedTouches;
		for(var i = 0; i < touchs.length; i++) {
			if(touchs[i].identifier == me.touchID) {
				//console.log("up id:", this.touchID);
				me.isDown = false;
				me.touchID = undefined;
			}
		}
	}
	
	
		function doMove(e){
		if(isDown){
			
			compute();
		}
		
	}
	function doUp(e){
		if(e.which == 1){
			isDown = false;
		}
	}
	
	function doDown(e){
		if(e.which == 1) {
			isDown = true;
			compute();
		}
	}
	
	function compute(){
		var x = event.offsetX;
		var y = event.offsetY;
		
		//移动目标点
		me.mx = x;
		me.my = y;
		
		//飞机中间坐标
		var cx = me.x + me.width / 2;
		var cy = me.y + me.height / 2;

		var dx = me.mx - cx;
		var dy = me.my - cy;
		var d = Math.sqrt(dx * dx + dy * dy);

		//移动的弧度
		var rad = me.rad = Math.atan2(dy, dx);
	}
	
	this.paint = function(){
		this.eleimage.style.left = this.x+'px';
		this.eleimage.style.top = this.y+'px';
		for (var i = this.bullets.length - 1; i >= 0; i--) {
			var bullet = this.bullets[i];
			bullet.paint();
		}
	}
	
	//改数据
	this.update = function(frames){
//		//飞机移动
		//飞机中间坐标
		var cx = this.x + this.width / 2;
		var cy = this.y + this.height / 2;

		//计算距离
		var dx = this.mx - cx;
		var dy = this.my - cy;
		this.distance = Math.sqrt(dx * dx + dy * dy);

		//飞机飞行
		if(this.distance > this.speed) {
			var dx = this.speed * Math.cos(this.rad);
			var dy = this.speed * Math.sin(this.rad);

			this.x = this.x + dx;
			this.y = this.y + dy;
		}

		
		//修改子弹数据
		//注意：需要从后往前
		for (var i = this.bullets.length -1; i >= 0; i--) {
			var bullet = this.bullets[i];
			bullet.update(frames);
		}
		
		//制造子弹
		if(frames - lastFrame > 10){
		
			var bullet = new Bullet(this); //把飞机对象传给子弹
			this.bullets.push(bullet); //将制造的子弹放入子弹集合
			lastFrame = frames;
		}
	}
	
	//删除子弹
	this.removeBullet = function(bullet){
		for (var i = 0; i < this.bullets.length; i++) {
			var temp = this.bullets[i];
			
			if(temp == bullet){
				this.bullets.splice(i,1);
				this.game.ui.removeChild(bullet.bulletEle);
				return;
			}
		}
	}
	
	this.attack = function(){
		this.eleimage.src = resource.plane_1.img.src;
		this.game.over();
	}
	
	this.reset = function(){
		this.x = (this.game.width - this.width)/2; //初始化x坐标
		this.y = this.game.height - this.height; //y坐标
		
		this.isDown = false;
		this.distance = 0;
		this.rad = 0;  //初始移动弧度
		
		this.mx = this.x + this.width / 2;
		this.my = this.y + this.height / 2;
		
		this.eleimage.src = resource.plane.img.src;
	}
	
	this.init();
}
