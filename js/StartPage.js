

//加载开始页
function StartPage(){
	var me = this;
	this.onstart;
	this.init = function(){
		this.ele = document.getElementById("p1");
		this.btn = document.getElementById("startBtn");
		
		this.btn.onclick = function(){
			console.log(1);
			me.onstart && me.onstart();
		}
	}
	
	this.show = function(){
		this.ele.style.display  = "block";
	}
	
	this.hide = function(){
		this.ele.style.display  = "none";
	}
	this.init();
}
