/*

	- rewrite difs so the values map to the document height (ie does not exceed window hight)

*/

var GraphCreator = (function(){

	var numberOfItems = data.length;
	var canvasItem;

	function init(){
		createCanvas();
	};

	function createCanvas(){
		for(var i = 0; i < numberOfItems; i++){
			canvasItem = createCanvasInstance(data[i]);
			calculateValues(i);
			calcDif();
			plotPoints();
			drawMedian(
				{
					"a" : 0,
					"b" : canvasItem.canvas.clientHeight/2,
					"c" : 300,
					"d" : canvasItem.canvas.clientHeight/2,
					"colour" : "#909090"
				}
			);	
			plotLine();
		}
	};

	function createCanvasInstance(item){
		var canv = document.createElement('canvas');
		canv.id = "canvas_"+item.name;;
		canv.width = 300;
		canv.height = 150;
		canv.innerHTML = "Your browser does not support the HTML5 canvas tag.";
		document.getElementById('application').appendChild(canv);
		var ctx = canv.getContext("2d");
		ctx.data = item;
		return ctx;
	};

	function calculateValues(count){
		canvasItem.data.values = [];
		for(key in data[count].columnValues){
				canvasItem.data.values.push(data[count].columnValues[key]);
		}
	};

	function calcDif(){
		var values = canvasItem.data.values;
		canvasItem.data.difs = [];
		var len = canvasItem.data.values.length;
		for(var i=0; i<len;i++){
			if(i != (len-1)){
				var thisDif = (values[i+1]-values[i]);
				canvasItem.data.difs.push(thisDif);
			}
		}
	};

	function plotPoints(){
		var range = canvasItem.data.difs.length;
		var spacesX = Math.floor(canvasItem.canvas.clientWidth / range);
		canvasItem.data.pointsX = [];
		var count = 0;
		for(var i = 0; i < range; i++){
			count += spacesX;
			canvasItem.data.pointsX.push(count);
		}
	};

	function drawMedian(settings){
		canvasItem.beginPath();
		canvasItem.moveTo(settings.a, settings.b);
		canvasItem.lineTo(settings.c, settings.d);
		if(settings.colour){
			canvasItem.strokeStyle = settings.colour;
		}else{
			canvasItem.strokeStyle = "#000000"
		};
		canvasItem.stroke();
	};

	function plotLine(){
		var len = canvasItem.data.pointsX.length;
		var ypos = canvasItem.canvas.clientHeight/2;
		canvasItem.beginPath();
		for(var i = 0; i < len; i++){
			drawLineTo(
				{
					"x" : canvasItem.data.pointsX[i],
					"y" : ypos + canvasItem.data.difs[i]
				}
			);
		}
		canvasItem.strokeStyle="red";
		canvasItem.stroke();
	};

	function drawLineTo(settings){
		canvasItem.lineTo(settings.x, settings.y);
	};

	return init();
})();