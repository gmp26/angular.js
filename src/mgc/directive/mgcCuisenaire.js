'use strict';

/**
 * @ngdoc directive
 * @name mgc.directive:mgcRod
 *
 * @description
 * Creates a cuisenaire rod manipulative.
 *
 * @element ANY
 * @example
   <example module="mgc">
     <file name="script.js">
       function RodCtrl($scope) {
           // Variables defined within this scope may be used to evaluate functions
           // defined within the same scope. So here, we can define functions of
           // x, of y, or of (x,y).
           $scope.rodUnit = 30; // pixels
           $scope.rods = [
             {number: 1, horizontal:true, x:0, y:0},
             {number: 2, horizontal:true, x:0, y:1},
             {number: 3, horizontal:true, x:0, y:2},
             {number: 4, horizontal:true, x:0, y:3},
             {number: 5, horizontal:true, x:0, y:4},
             {number: 6, horizontal:true, x:0, y:5},
             {number: 7, horizontal:true, x:0, y:6},
             {number: 8, horizontal:true, x:0, y:7},
             {number: 9, horizontal:true, x:0, y:8},
             {number: 10, horizontal:true, x:0, y:9}
           ];
       };
     </file>
     <file name="index.html">
     <style>
       .rod {
         height: 30px;
         border: 2px solid #888;
         -webkit-border-radius: 3px;
         -moz-border-radius: 3px;
         -ms-border-radius: 3px;
         border-radius: 3px;  
       }
       .n1 {
         width: 30px;
         background-color: #ffffff;
       }
       .n2 {
         width: 60px;
         background-color: #ff0000;
       }
       .n3 {
         width: 90px;
         background-color: #88cc44;
       }       
       .n4 {
         width: 120px;
         background-color: #98105c;
       }
       .n5 {
         width: 150px;
         background-color: #ffd124;
       }    
       .n6 {
         width: 180px;
         background-color: #257570;
       }
       .n7 {
         width: 210px;
         background-color: #000000;
       }
       .n8 {
         width: 240px;
         background-color: #783a07;
       }
       .n9 {
         width: 270px;
         background-color: #2b4eb4;
       }
       .n10 {
         width: 300px;
         background-color: #ff4b00;
       }       
       </style>
     <div ng-controller="RodCtrl" >
       <!--<div ng-repeat="rod in rods">-->
         <mgc-rod ng-repeat="rod in rods" class="rod n{{rod.number}}" rod="{{rod.number}}" x="{{rod.x}}" y="{{rod.y}}">
       <!--</div>-->
     </div>
     </file>
     <file name="scenario.js">
       it('should display a stack of rods', function() {
       });
     </file>
   </example>
   **/
angular.module('mgc').directive('mgcRod', function() {

  return {
    restrict: 'E', // 
    compile: function(element, attrs) {
      var rod = attrs.rod;
      var x = attrs.x;
      var y = attrs.y;
      var htmlText = '<div class="rod n'+rod+'"></div>';
      element.replaceWith(htmlText);
    }
    
    /*
    template: '<div class="rod1 horizontal"></div>',
    replace: true,
    link: function (scope, element, attrs) {
      console.log("scope = "+scope);
      console.log("element = "+element);
      console.log("attrs = "+attrs);
    }
    */
  };
});
