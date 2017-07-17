
//预加载对象
function Preload(){
	
	//封装属性
	this.total = 0; //预加载数据总数
	
	//封装事件句柄
	this.onprogress;
	this.onload;
	
	this.init = function(){
		for(var k in window.resource){
			this.total++;
		}
	}
	

	//私有数据
	var me = this;
	var count = 0;
	
	//加载计数与通知
	function fnCount(e){
		count++; //计数器加1
		
		//触发加载进度
		if(me.onprogress){
			me.onprogress(count,me.total,e);
		}
		
		//是否加载完毕
		if(count == me.total){
			me.onload && me.onload();
		}
	}
	
	this.load = function(){
		//遍历资源数据
		for(var k in window.resource){
			var objImg = window.resource[k];
			
			var img = objImg.img = new Image(); 	//创建图片对象
			
			img.onload = fnCount; 	//下载计数
			img.onerror = fnCount;	//错误计数
			img.src = objImg.src; 		//赋值在计数下面
		}
	}
	this.init();
}
