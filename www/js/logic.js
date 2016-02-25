var GraphCreator = (function(){

	var numberOfItems = data.length,
		canvasItem,
		height = 150,
		width = 300;

	function init(){
		createCanvas();
	};

	function createCanvas(){
		for(var i = 0; i < numberOfItems; i++){
			canvasItem = createCanvasInstance(data[i]);
			calculateValues(i);
			calcDifs();
			plotPoints();
			drawMedian(
				{
					"a" : 0,
					"b" : height/2,
					"c" : 300,
					"d" : height/2,
					"colour" : "#909090"
				}
			);	
			plotLine();
			console.log(canvasItem);
		}
	};

	function createCanvasInstance(item){
		var canv = document.createElement('canvas');
		canv.id = "canvas_"+item.name;;
		canv.width = width;
		canv.height = height;
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

	function calcDifs(){
		canvasItem.data.pointsY = [];
		var values = canvasItem.data.values,
			len = canvasItem.data.values.length,
			lowest = getLowestValue(values),
			range = getHeighestValue(values) - lowest,
			increment = height / range;	
		for(var i=0; i<len;i++){
			canvasItem.data.pointsY.push(height - (values[i] - lowest) * increment);
		}
	};

	function getHeighestValue(values){
		return Math.max.apply(null, values);
	};

	function getLowestValue(values){
		return Math.min.apply(null, values);
	};

	function plotPoints(){
		var range = canvasItem.data.pointsY.length - 1,
			spacesX = Math.floor(width / range),
			count = 0;
		canvasItem.data.pointsX = [];
		canvasItem.data.pointsX.push(count);
		for(var i = 0; i < range; i++){
			count += spacesX;
			canvasItem.data.pointsX.push(count);
		}
	};

	function drawMedian(settings){
		canvasItem.beginPath();
		canvasItem.moveTo(settings.a, settings.b);
		canvasItem.lineTo(settings.c, settings.d);
		canvasItem.strokeStyle = settings.colour;
		canvasItem.stroke();
	};

	function plotLine(){
		var len = canvasItem.data.pointsX.length;
		canvasItem.beginPath();
		for(var i = 0; i < len; i++){
			canvasItem.lineTo(canvasItem.data.pointsX[i], canvasItem.data.pointsY[i]);
		}
		canvasItem.strokeStyle="red";
		canvasItem.stroke();
	};

	return init();
})();