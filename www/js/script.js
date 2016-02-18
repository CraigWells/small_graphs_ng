(function(angular) {
    'use strict';
    var beanApp = angular.module('beanApp', [])
    .controller('MainCtrl', ['$scope', function($scope) {}]);

    beanApp.factory('graphData', function(){
        // Perform the data manipulation 
        var height = 80,
            width = 180;

        function init(){
            var len = data.length;    
            for(var i = 0; i < len; i++){
                calculateValues(data[i], calculateDifs);
                data[i].height = height;
                data[i].width = width;
            } 
            return data;
        };       

        function calculateValues(item, callback){
            var values = [];
            for(var key in item.columnValues){
                values.push(item.columnValues[key]);
            }
            item.values = values;
            callback(item, plotPoints);
        };

        function calculateDifs(item, callback){
            item.pointsY = [];
            var len = item.values.length,
                lowest = getLowestValue(item.values),
                range = getHeighestValue(item.values) - lowest,
                increment = height / range; 
            for(var i=0; i<len;i++){
                item.pointsY.push(height - (item.values[i] - lowest) * increment);
            }
            callback(item);
        };

        function plotPoints(item){
            var range = item.pointsY.length - 1,
                spacesX = Math.floor(width / range),
                count = 0;
            item.pointsX = [];
            item.pointsX.push(count);
            for(var i = 0; i < range; i++){
                count += spacesX;
                item.pointsX.push(count);
            }
        };

        function getHeighestValue(values){
            return Math.max.apply(null, values);
        };

        function getLowestValue(values){
            return Math.min.apply(null, values);
        };

        return init();
    });

    beanApp.factory('graphRenderer', function(){

        function drawGraph(item){

            var settings = {
                "a" : 0,
                "b" : item.height/2,
                "c" : item.width,
                "d" : item.height/2,
                "colour" : "#909090"
            }; 

            var drawingCanvas = document.getElementById(item.name);
            var context = drawingCanvas.getContext("2d");
            // draw median
            context.beginPath();
            context.moveTo(settings.a, settings.b);
            context.lineTo(settings.c, settings.d);
            context.strokeStyle = settings.colour;
            context.stroke();
            // draw graph line
            var len = item.pointsX.length;
            context.beginPath();
            for(var i = 0; i < len; i++){
                context.lineTo(item.pointsX[i], item.pointsY[i]);
            }
            context.strokeStyle="red";
            context.stroke();            
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

        return function(graphData){

            angular.forEach(graphData, function(item) {
                drawGraph(item);
            });

        };
    });    

    beanApp.directive('graphs', ['graphData', '$timeout', 'graphRenderer', function(graphData, $timeout, graphRenderer) {
        return {
            restrict: 'E',
            templateUrl: 'views/graph.html',
            link: function(scope, element) {
                scope.graphs = graphData;
                $timeout(function () {
                    graphRenderer(graphData); 
                });
            }
        }
    }]);

    function getGraphData(){
        var canv = document.getElementById('item_1');
        canv.width = 280;
        canv.height = 150;
        var ctx = canv.getContext("2d");
        return data;
    };

})(window.angular);