(function(angular) {
  'use strict';
var beanApp = angular.module('beanApp', [])
.controller('MainCtrl', ['$scope', function($scope) {
    $scope.graph = {
        name : "graph A",
        text : "Some kind of fucking controller or sumt",
        json : data
    };

    console.log(data);
  }])
.directive('graph', [function() {
    return {
      restrict: 'A',
      templateUrl: 'views/graph.html'
    }
  }])
})(window.angular);