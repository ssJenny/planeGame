function Bullet(owner){
	var me = this;
	this.init = function(){
		this.plane = owner;
		this.game = this.plane.game;
		
		//读取子弹图片资源
		var resBulleimg = window.resource.bullet.img;
		var img = this.bulletEle = new Image();
		img.src = resBulleimg.src;
		
		//设置子弹宽高
		this.width = resBulleimg.width;
		this.height = resBulleimg.height;
		
		//子弹的x、y坐标
		this.cx = this.plane.x + this.plane.width/2; 
		this.cy = this.plane.y - this.height/2; 
		this.speed = 10; //子弹速度

		this.paint();
		
		//将子弹添加到页面中
		this.game.ui.appendChild(this.bulletEle);
	}
	this.paint = function(){
		//
		this.x = this.cx - this.width / 2;
		this.y = this.cy - this.height / 2;
		this.bulletEle.style.left = this.x+'px';
		this.bulletEle.style.top = this.y+'px';
	}
	this.update = function(){
		this.cy -= this.speed;
		if(this.cy < -this.height/2){
			//
			this.plane.removeBullet(this);
		}
		
		//子弹碰撞
		var cy = this.cy;
		var cx = this.cx;
		var enemies = this.game.stage.enemies;
		for(var i = 0; i < enemies.length; i++){
			var enemy = enemies[i];
			var x0 = enemy.x;
			var x1 = enemy.x + enemy.width;
			var y0 = enemy.y;
			var y1 = enemy.y + enemy.height;
			
			if(cx > x0 && cx < x1 && cy > y0 && cy < y1){
				
				enemy.attack(); //销毁敌机
				this.plane.removeBullet(this);
			}
		}
	}
	this.init();
}
