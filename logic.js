var GraphCreator = (function(){

	var numberOfItems = data.length;
	var canvasInstances = [];

	function init(){
		createCanvas();
		console.log(canvasInstances);
	};

	function createCanvas(){
		for(var i = 0; i < numberOfItems; i++){
			createCanvasInstance(data[i], calculateValues);
		}
	};

	function createCanvasInstance(item, callback){
		var canvas_id = "canvas_"+item.name;
		var canv = document.createElement('canvas');
		canv.id = canvas_id;
		canv.width = 300;
		canv.height = 150;
		canv.innerHTML = "Your browser does not support the HTML5 canvas tag.";
		document.getElementById('application').appendChild(canv);
		var ctx = canv.getContext("2d");
		ctx.data = item;
		canvasInstances.push(callback(ctx));
	};

	function calculateValues(canvasItem){
		console.log("callback");
		var len = data.length;
		for(var i=0; i<len;i++){
			console.log(i);
			canvasItem.data.values = [];
			for(key in data[i].columnValues){
				canvasItem.data.values.push(data[i].columnValues[key]);
			}
			calcDif(canvasItem);
		}
		return canvasItem;
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
		console.log(canvasItem);
		var spacesX = Math.floor(canvasItem.canvas.clientWidth / range);
		canvasItem.data.pointsX = [];
		var count = 0;
		for(var i = 0; i < range; i++){
			count += spacesX;
			canvasItem.data.pointsX.push(count);
		}
		drawMedian(canvasItem, plotLine);
	};

	function drawMedian(canvasItem, callback){
		var ypos = canvasItem.canvas.clientHeight/2;
		drawLine(
			{
				"a" : 0,
				"b" : ypos,
				"c" : 300,
				"d" : ypos,
				"colour" : "#909090",
				"canvasItem" : canvasItem,
				"callback" : callback
			}
		);
	};

	function drawLine(settings){
		settings.canvasItem.beginPath();
		settings.canvasItem.moveTo(settings.a, settings.b);
		settings.canvasItem.lineTo(settings.c, settings.d);
		if(settings.colour){
			settings.canvasItem.strokeStyle = settings.colour;
		}else{
			settings.canvasItem.strokeStyle = "#000000"
		};
		settings.canvasItem.stroke();
		if(settings.callback){settings.callback(settings.canvasItem)};
	};

	function plotLine(canvasItem){
		console.log("plot lines");
		console.log(canvasItem.data.pointsX);
		console.log(canvasItem.data.difs);
	};

	return init();
})();