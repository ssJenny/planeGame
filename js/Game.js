
function Game(){
	
	var timer;
	var frames = 0; //记录帧
	var me = this;
	var score = 0;
	this.isOver = false;
	
	this.stage;
	this.start = function(){
		tick();  //调用计时函数
	}
	this.stop = function (){
		console.log("over");
		clearTimeout(timer);
	}
	
	this.init = function(){
		this.ui = document.getElementById("p2");
		this.eleFrames = document.getElementById("frames");
		this.container = document.getElementsByClassName("container")[0];
		this.elScore = document.getElementById("score");
		this.overScore = document.getElementById("show");
		this.stage = new Stage1(this);
	}
	
	this.addScore = function(num){
		score += num;
		this.elScore.innerText = score;
	}
	
	
	//画界面
	function paint(){
		me.eleFrames.innerText = frames;
		
		me.stage.paint();
	}
	this.setSize = function(width,height){
		this.width = width;
		this.height = height;
		this.container.style.width = width+'px';
		this.container.style.height = height+'px';
	}
	
	//改数据
	function update(){
		frames++;
		
		me.stage.update(frames);
	}
	
	function tick(){
		
		if(me.isOver){
			return;
		}
		paint();
		update();
		
		timer = setTimeout(tick,1000/60);
	}
	
	this.over = function(){
		me.isOver = true;
		window.pages.p2.showPop();
		me.overScore.innerText = score;
		this.stop();
	}
	
	this.reset = function(){
		me.isOver = false;
		window.pages.p2.hidePop();
		score = 0;
		this.stage.reset();
		this.start();
	}
	
	this.init();
}
