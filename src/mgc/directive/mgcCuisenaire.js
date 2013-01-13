'use strict';

/**
 * @ngdoc directive
 * @name mgc.directive:mgcCuisenaire
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
           $scope.number = 5;
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
       .space {
         background-color: #fffffb;
         overflow: hidden;
       }
       .over {
         border:1px solid red;
       }
       .rod {
         height: 30px;
         border: 2px solid #888;
         -webkit-border-radius: 3px;
         -moz-border-radius: 3px;
         -ms-border-radius: 3px;
         border-radius: 3px;
         position:relative;

         transition: -transform 0.25s;
         -moz-transition: -moz-transform 0.25s;
         -webkit-transition: -webkit-transform 0.25s;
         -o-transition: -o-transform 0.25s;

         transform: rotate(45deg);
         -webkit-transform-origin:0% 0%; 

         cursor: move;
       }
       .rotated {
         -webkit-transform: rotate(90deg);
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
       <div ng-controller="RodCtrl">
         <div class="well">
           <div>Drag out a new <input style="width:80px" type="number" ng-model="number" min="1" max="10" ng-value="5"> rod</div>
           <div mgc-rod-factory="{{number}}"></div>
         </div>
         <div mgc-cuisenaire-board class="well space">
           <!--
           <div ng-repeat="rod in rods" style="position:relative; top:0px; left:0px">
             <div mgc-rod="{{$index}}" class="rod n{{rod.number}}" draggable="true">
           </div>
           -->
         </div>
       </div>

     </file>
     <file name="scenario.js">
       it('should display a stack of rods', function() {
       });
     </file>
   </example>
   **/
angular.module('mgc')
  .directive('mgcRodFactory', function() {
    return {
      link: function(scope, element, attrs) {
        element.bind("dragstart", function(e) {
          scope.dragSource = element;
          e.dataTransfer.setData('text/plain', ""+scope.number);
        });

        attrs.$observe('mgcRodFactory', function(number) {
          element.removeClass("rod n1 n2 n3 n4 n5 n6 n7 n8 n9 n10"); //remove all classes
          element.addClass("rod");
          element.addClass("n"+number);
          element.attr("draggable", "true");
        });
      }
    };
  })
  .directive('mgcCuisenaireBoard', function() {
    return {
      link: function(scope, element, attrs) {

        element.bind("drop", function(e) {
          if (e.stopPropagation) e.stopPropagation();
          var number = e.dataTransfer.getData('text/plain');
          console.log("dropped "+number);
          //element.append('<div mgcRod="'+number+'" class="rod n'+number+'" draggable="true">');
          return false;
        });

        element.bind('dragover', function (e) {
          if (e.preventDefault) e.preventDefault(); // allows us to drop
          element.addClass('over');
          //e.dataTransfer.dropEffect = 'copy';
          return false;
        });

        // to get IE to work
        element.bind('dragenter', function (e) {
          element.addClass('over');
          return false;
        });

      }
    }; 
  })
  .directive('mgcRod', function() {

  return {
    restrict: 'A',
    scope: false,
    link: function(scope, element, attrs) {
      
      var rod = scope.rod;
      var el = element;

      element.bind("dragstart", function(e) {
        this.style.opacity = '0.5';
      });

      element.bind("click", function(e) {
        console.log("click @"+e.pageX + "," + e.pageY);
        if(element.hasClass("rotated"))
          element.removeClass("rotated");
        else 
          element.addClass("rotated");
      });

      console.log("number = "+rod.number+" x="+rod.x+" y="+rod.y+" horiz="+rod.horizontal);

      attrs.$observe('mgcRod', function(value) {
        console.log('mgcRod = '+value);
      });

    }
  };
});
