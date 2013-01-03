'use strict'

/**
 * @ngdoc directive
 * @name mgc.directive:mgcEval
 *
 * @description
 *
 * Evaluate a numerical expression as defined in a sanitised javascript syntax. 
 * You can leave out 'Math.' from expressions such as Math.sin and Math.PI. 
 * Use * for multiply, / for divide, () for grouping. 
 *
 *
 * @element ANY
 * @example
   <doc:example>
     <doc:source>
     <script>
       function Ctrl($scope) { 
           $scope.x = 0;
       };
     </script>
     <div ng-controller="Ctrl">   
        If <i>x</i> is <input type="number" min="-10" max="10" ng-model="x"><br/>
        then <i>x</i><sup>2</sup> is: <span class="mgc-eval" f="(x)->x*x" sigfigs="3"> </span><br/>
     </div>
     </doc:source>
   </doc:example>
  */
  angular.module('mgc').directive('mgcEval', ['funcGen', function(funcGen) {
	var fg = funcGen;

  return {
    restrict: 'CA', // 
    scope: true,	
    link: function (scope, element, attrs) {

			var f = fg.define(attrs.f);
			
			scope.x = scope.x | 0;
			attrs.sigfigs = attrs.sigfigs | 3;

			console.log("mgcEval: " + element.html());

	    scope.$watch('x', function (newVal, oldVal) {
			  console.log(attrs.sigfigs);
				element.html(f(scope.x).toPrecision(attrs.sigfigs));
	    });
	  }
  };
}]);