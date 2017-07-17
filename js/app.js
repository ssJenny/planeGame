var pages = {};

function main(){
	pages.p0 = new LoadingPage(); //创建页面加载对象
	pages.p1 = new StartPage();
	pages.p2 = new GamePage();
	
	pages.p0.onover = enterStartPage;
	pages.p0.load();
}
function enterStartPage(){
	pages.p0.hide();
	pages.p1.show();
	pages.p1.onstart = startGame;
}

function startGame(){
	
	pages.p1.hide();
	pages.p2.show();
	
	//创建游戏，全局变量	
	window.game = new Game();
	game.start();
}
window.addEventListener("DOMContentLoaded",main);

//取消默认事件
function cancle(e){
	//取消默认操作
	e.preventDefault();
	//停止事件冒泡
	e.stopPropagation();
}

//取消鼠标右键事件
window.addEventListener("contextmenu",cancle);
//阻止选择事件 
window.addEventListener("selectstart",cancle);