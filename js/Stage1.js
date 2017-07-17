function Stage1(owner) {
	var me = this;
	this.enemies = [];

	this.init = function() {
		this.game = owner;

		var img = window.resource.bg_game.img
		this.game.setSize(img.width, img.height);

		this.bgY = 0;
		this.bgSpeed = 1;

		this.plane = new Plane(owner);
	}

	//画界面
	this.paint = function() {
		this.game.ui.style.backgroundPositionY = this.bgY + "px";

		this.plane.paint();
		
		//画小兵
		for(var i = this.enemies.length - 1; i >= 0; i--) {
			this.enemies[i].paint();
		}
	}

	//改数据
	this.update = function(frames) {
		this.bgY += this.bgSpeed;

		this.plane.update(frames);
		
		//修改小兵
		for(var i = this.enemies.length - 1; i >= 0; i--) {
			this.enemies[i].update();
		}

		//发射小兵
		var num = 0;
		if(frames % 50 == 0) {
			num = 1;
		}
		if(frames % 250 == 0) {
			num = 2;
		}
		if(frames % 500 == 0) {
			num = 3;
		}
		if(num != 0) {
			new Enemy(num,this);
		}
	}
	
	this.removeEnemy=function(enemy){
		for(var i = 0; i < this.enemies.length; i++) {
			var temp = this.enemies[i];

			if(temp == enemy) {
				this.enemies.splice(i, 1);
				this.game.ui.removeChild(enemy.el)
				return;
			}
		}
	}
	
	this.reset = function(){
		this.plane.reset();
		for(var i = this.enemies.length - 1; i >= 0; i--){
			this.removeEnemy(this.enemies[i]);
		}
	}

	this.init();
}