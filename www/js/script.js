(function(angular) {
    'use strict';
    var beanApp = angular.module('beanApp', [])
    .controller('MainCtrl', ['$scope', function($scope) {
        $scope.data = data;
        $scope.newobj = newobj;
        $scope.graphs = (function(){ 
          return CreateGraphs();
        })();
     }])
    .directive('graph', [function() {
        return {
            restrict: 'A',
            templateUrl: 'views/graph.html'
        }
    }]);

    var CreateGraphs = (function(){

      var item = {colour: "puse"};

      function canvasInstance(){
        /*
          var canv = document.createElement('canvas');
          canv.id = "canvas_"+item.name;;
          canv.width = width;
          canv.height = height;
          canv.innerHTML = "Your browser does not support the HTML5 canvas tag.";
          document.getElementById('application').appendChild(canv);
          var ctx = canv.getContext("2d");
          ctx.data = item;
          return ctx;
          */
          console.log(item.colour);
          return item.colour;
      };

      return newobj;

    });

})(window.angular);