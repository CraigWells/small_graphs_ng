var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

function addCanvasToDom(){
	var canvasInstance = "<canvas id=\""+canvas_id+"\" width=\"300\" height=\"150\>Your browser does not support the HTML5 canvas tag.</canvas>";
}

function valuesToArrays(){
	var len = data.length;
	for(var i=0; i<len;i++){
		data[i].values = [];
		for(key in data[i].columnValues){
			data[i].values.push(data[i].columnValues[key]);
		}
	}
};

function calcDifValues(){
	var len = data.length;
	for(var i=0; i < len; i++){
		calcDif(i);
	}
};	

function calcDif(count){
	var values = data[count].values;
	data[count].difs = [];
	var len = values.length;
	for(var i=0; i<len;i++){
		if(i != (len-1)){
			var thisDif = (values[i+1]-values[i]);
			data[count].difs.push(thisDif);
		}
	}
};

function plotPoints(){
	var range = data[0].difs.length;
	var spacesX = Math.floor(c.clientWidth / range);
	data[0].pointsX = [];
	var count = 0;
	for(var i = 0; i < range; i++){
		count += spacesX;
		data[0].pointsX.push(count);
	}
};

function drawGraph(){
	drawMedian();
	plotPoints();
};

function drawMedian(){
	var colour = "#909090"; 
	var ypos = c.clientHeight/2;
	drawLine(0, ypos, 300, ypos, colour);
};

function drawLine(a, b, c, d, colour){
	ctx.beginPath();
	ctx.moveTo(a, b);
	ctx.lineTo(c, d);
	if(colour){ctx.strokeStyle = colour;}else{ctx.strokeStyle = "#000000"};
	ctx.stroke();
};

function init(){
	addCanvasToDom();
	valuesToArrays();
	calcDifValues(0);
	drawGraph();
	console.log(data);
};


init();