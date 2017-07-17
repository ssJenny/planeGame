
function GamePage(){
	this.init = function(){
		this.ele = document.getElementById("p2");
		
		this.pop = document.getElementById("pop");
	}
	
	this.show = function(){
		this.ele.style.display = "block";
	}
	this.hide = function(){
		this.ele.style.display = "none";
	}
	
	this.showPop = function(){
		this.pop.style.display = "block";
	}
	this.hidePop = function(){
		this.pop.style.display = "none";
	}
	
	this.init();
}
