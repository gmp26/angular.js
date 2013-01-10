'use strict';

/**
 * @ngdoc directive
 * @name mgc.directive:mgcOrderCheck
 * @description
 *
 * Add the mgc-order-check attribute to a container element such as <ul> in conjunction
 * with mgc-key attributes on the content (e.g. <li> elements) which users are being asked
 * to put in the correct order.
 *
 * Drag and drop reordering is currently obtained by adding the ui-sortable attribute to the
 * container. This currently depends on the angular-ui and jquery-ui javascript frameworks.
 * 
 * @element CONTAINER
 *
 * @example 
  <example module="mgc" deps="foo">

    <file name="script.js">
      function SortCtrl($scope) {
        // optional score: set its initial value here
        $scope.score = 0;
      };
    </file>

    <file name="style.css">
      <style>
        .foo {border: 1px solid red;}
      </style>
      
    </file>

    <file name="index.html">
      <div ng-controller="SortCtrl" class="col2">
        <ul ui-sortable mgc-order-check class="vertical" score="spearman" >
          <li mgc-key="1" draggable="true">I should be 3rd</li>
          <li mgc-key="2" draggable="true">I should be 4th</li>
          <li mgc-key="3" draggable="true">I should be second</li>
          <li mgc-key="4" draggable="true">I should be last</li>
          <li mgc-key="5" draggable="true">I should be first</li>
        </ul>
      </div>
     </file>

     <file name="scenario.js">
       it('should display a stack of rods', function() {
       });
     </file>
   </example>
*/
angular.module('mgc')
.directive("mgcKey", function() {
  return {
    scope: false, // required so parent shares scope.mgcKeys
    restrict: "EACM", 
    link: function(scope, element, attrs) {
      if(scope.mgcKeys === undefined) scope.mgcKeys=[];
      scope.mgcKeys.push(attrs.mgcKey);     
    }
  };  
})
.directive('mgcOrderCheck', function() {
  
  var spearman = function(ar1, ar2) {
    if(ar1.length != ar2.length || ar1.length === 0)
      throw new Error("incompatible arrays");
    
    var mean = (ar1.length - 1)/2;
    var sumxy = 0;
    var sumx2 = 0;
    var sumy2 = 0;
    ar1.forEach(function(item, x) {
      var X = x - mean;
      var Y = ar2.indexOf(item) - mean;
      //console.log(X + ", " + Y);
      sumxy += X*Y;
      sumx2 += X*X;
      sumy2 += Y*Y;
    });
    return sumxy/Math.sqrt(sumx2*sumy2);
  };
  
  return {
    restrict:"EAC", 
    scope: {
      score: '='
    },

    link: function(scope, element, attrs, ctrl) {

      var sortElements = [];
      var score;

      var recheck = function() {

        check();
        scope.$apply();
      };

      var check = function() {
        if(scope.mgcKeys !== undefined) {
          // check order
          var userKeys = [];

          angular.forEach(element.children(), function(child, index) {
            //console.debug($(child).attr("mgc-key"));
            var k = $(child).attr("mgc-key");

            // push new value if different to allow for equal values
            if(userKeys[userKeys.length-1] != k) {
              userKeys.push(k);
            }
          });

          var sortedKeys = userKeys.concat().sort();
          //console.log("check scope = " + scope.$id);


          if(angular.equals(sortedKeys, userKeys)) {
            //console.log("correct");
            element.removeClass("wrong");
            element.addClass("right");
          }
          else {
            //console.log("wrong");
            element.removeClass("right");
            element.addClass("wrong");
          }
          
          scope.score =  spearman(sortedKeys, userKeys);
        }
      };

      element.on("sortstop", recheck);
      check();

    }
  };
});
