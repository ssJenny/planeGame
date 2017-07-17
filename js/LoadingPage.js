
//预加载页面
function LoadingPage(){
	var me = this;
	
	
	this.init = function(){
		this.ele = document.getElementById("p0");
		this.eleText = document.getElementById("loading");
	}
	
	this.load = function (){
		//创建预加载对象
		var preload = new Preload();
		
		//关注加载事件
		preload.onprogress = function(num,total){
			me.eleText.innerText = Math.round(100 * num / total) + "%";
		}
		
		//关注加载完毕事件
		preload.onload = function(){
			console.log("over");
			
			me.onover && me.onover();
		}
		
		//加载图片
		preload.load();
	}
	
	this.show = function(){
		this.ele.style.display  = "block";
	}
	
	this.hide = function(){
		this.ele.style.display  = "none";
	}
	
	this.init();
}
