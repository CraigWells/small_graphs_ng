var GraphCreator = (function(){

	var numberOfItems = data.length;

	function init(){
		createCanvas();
	};

	function createCanvas(){
		for(var i = 0; i < numberOfItems; i++){
			createCanvasInstance(data[i], calculateValues, i);
		}
	};

	function createCanvasInstance(item, callback, count){
		var canv = document.createElement('canvas');
		canv.id = "canvas_"+item.name;;
		canv.width = 300;
		canv.height = 150;
		canv.innerHTML = "Your browser does not support the HTML5 canvas tag.";
		document.getElementById('application').appendChild(canv);
		var ctx = canv.getContext("2d");
		ctx.data = item;
		callback(ctx, count);
	};

	function calculateValues(canvasItem, count){
		canvasItem.data.values = [];
		for(key in data[count].columnValues){
				canvasItem.data.values.push(data[count].columnValues[key]);
		}
		calcDif(canvasItem);
	};

	function calcDif(canvasItem){
		var values = canvasItem.data.values;
		canvasItem.data.difs = [];
		var len = canvasItem.data.values.length;
		for(var i=0; i<len;i++){
			if(i != (len-1)){
				var thisDif = (values[i+1]-values[i]);
				canvasItem.data.difs.push(thisDif);
			}
		}
		plotPoints(canvasItem);
	};

	function plotPoints(canvasItem){
		var range = canvasItem.data.difs.length;
		var spacesX = Math.floor(canvasItem.canvas.clientWidth / range);
		canvasItem.data.pointsX = [];
		var count = 0;
		for(var i = 0; i < range; i++){
			count += spacesX;
			canvasItem.data.pointsX.push(count);
		}
		drawMedian(canvasItem);
		plotLine(canvasItem);
	};

	function drawMedian(canvasItem, callback){
		var ypos = canvasItem.canvas.clientHeight/2;
		drawMedianLine(
			{
				"a" : 0,
				"b" : ypos,
				"c" : 300,
				"d" : ypos,
				"colour" : "#909090",
				"canvasItem" : canvasItem
			}
		);
	};

	function drawMedianLine(settings){
		settings.canvasItem.beginPath();
		settings.canvasItem.moveTo(settings.a, settings.b);
		settings.canvasItem.lineTo(settings.c, settings.d);
		if(settings.colour){
			settings.canvasItem.strokeStyle = settings.colour;
		}else{
			settings.canvasItem.strokeStyle = "#000000"
		};
		settings.canvasItem.stroke();
	};

	function plotLine(canvasItem){
		var len = canvasItem.data.pointsX.length;
		var ypos = canvasItem.canvas.clientHeight/2;
		canvasItem.beginPath();
		console.log(canvasItem);
		for(var i = 0; i < len; i++){
			drawLineTo(
				{
					"x" : canvasItem.data.pointsX[i],
					"y" : ypos + canvasItem.data.difs[i],
					"canvasItem" : canvasItem
				}
			);
		}
		canvasItem.strokeStyle="red";
		canvasItem.stroke();
	};

	function drawLineTo(settings){
		settings.canvasItem.lineTo(settings.x, settings.y);
	};

	return init();
})();