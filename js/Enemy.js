
//子弹由第一关卡产生，传递类型与第一关卡对象
function Enemy(type,owner){
	
	// 
	function rand(min, max){
		return Math.random() * (max - min) + min;
	}
	
	//读取敌机资源
	//正常敌机
	function getEnemyRes1(type){
		switch (type){
			case 1:
				return resource.enemy1;
			case 2:
				return resource.enemy2;
			case 3:
				return resource.enemy3;
		}
	}
	
	//发生碰撞
	function getEnemyRes2(type){
		switch (type){
			case 1:
				return resource.enemy1_2;
			case 2:
				return resource.enemy2_2;
			case 3:
				return resource.enemy3_2;
		}
	}
	
	
	this.init = function(){
		this.speed = 2;
		this.type = type;
		this.life = Math.pow(3,type - 1); //生命值
		this.time = 20 * type;
		this.stage = owner;
		this.game = owner.game;
		
		var img = this.el = new Image();
		
		//根据传递的类型获取敌机图片资源，并赋给创建的图片
		var resImg = getEnemyRes1(type).img;
		var img = this.el = new Image();
		img.src = resImg.src;
		
		//根据图片的大小设置敌机的大小
		this.width = resImg.width;
		this.height = resImg.height;
		
		//敌机随机出现的位置
		this.x = rand(0, game.width - this.width);
		this.y = -this.height;

		
		//存入敌机集合
		this.stage.enemies.push(this);
		
		this.game.ui.appendChild(img); //将敌机图片添加到页面中
		this.paint();
	}
	
	this.update = function(){
		this.y += this.speed;
		console.log(this.y);
		
		//检查边界
		if(this.y > this.game.height){
			this.stage.removeEnemy(this);
		}
		
		//开始倒计时
		if(this.life <= 0) {
			this.time--;
		}

		if(this.time < 0) {
			this.stage.removeEnemy(this);
		}

		//检查碰撞
		var x0 = this.x;
		var x1 = this.x + this.width;
		var y0 = this.y;
		var y1 = this.y + this.height;

		var plane = this.stage.plane;
		var cx0 = plane.x + plane.width / 2;
		var cy0 = plane.y + 15;
		var c0 = cx0 > x0 && cx0 < x1 && cy0 > y0 && cy0 < y1;

		var cx1 = plane.x + 15;
		var cy1 = plane.y + plane.height * 0.75;
		var c1 = cx1 > x0 && cx1 < x1 && cy1 > y0 && cy1 < y1;
		
		var cx2 = plane.x + 50;
		var cy2 = plane.y + plane.height * 0.75;
		var c2 = cx2 > x0 && cx2 < x1 && cy2 > y0 && cy2 < y1;

		if(c0 || c1 || c2) {
			plane.attack();
		}
	}
	
	this.paint = function() {
		this.el.style.left = this.x + "px";
		this.el.style.top = this.y + "px";
	}

	this.attack = function() {
		this.life--;

		if(this.life >= 0){
			this.game.addScore(10 * this.type);
		}
		
		//冒烟
		if(this.life == 0) {
			this.el.src = getEnemyRes2(this.type).src;
			this.game.addScore(50 * this.type)
		}
	}
	
	
	this.init();
}
