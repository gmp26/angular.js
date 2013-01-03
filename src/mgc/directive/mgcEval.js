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
   <doc:example module="mgc">
     <doc:source>
     <script>
       function Ctrl($scope) {
           // Variables defined within this scope may be used to evaluate functions
           // defined within the same scope. So here, we can define functions of
           // x, of y, or of (x,y). 
           $scope.x = 0;
           $scope.y = 0;
       };
     </script>
     <div ng-controller="Ctrl">
     <p> 
        If <i>x</i> is <input type="number" min="-10" max="10" ng-model="x">
        then <i>x</i><sup>2</sup> is: <span class="mgc-eval" f="x->x*x" sigfigs="3"> </span><br/>
     </p>
     <p> 
        If <i>y</i> is <input type="number" min="-10" max="10" ng-model="y">
        then <i>xy</i> is: <span class="mgc-eval" f="(x,y)->x*y" sigfigs="3"> </span><br/>
     </p>
    
     </div>
     </doc:source>
     <doc:scenario>
       it('should evaluate functions of x and (x,y)', function() {
         expect(element('.doc-example-live span:first').html()).toEqual("0.00");
         expect(element('.doc-example-live span:last').html()).toEqual("0.00");

         input('x').enter(2);
         input('y').enter(5);

         expect(element('.doc-example-live span:first').html()).toEqual("4.00");
         expect(element('.doc-example-live span:last').html()).toEqual("10.0");
       });
     </doc:scenario>
   </doc:example>
   */
  angular.module('mgc').directive('mgcEval', ['$funcGen', function($funcGen) {
    var fg = $funcGen;
    // console.log("mgcEval defined");
    return {
      restrict: 'C', // 
      scope: true,	
      link: function (scope, element, attrs) {

        var f = fg.define(attrs.f);

        attrs.sigfigs = attrs.sigfigs | 3;

        // console.log("mgcEval: " + element.html());

        scope.$watch(function (scope) {
          // console.log("$watch x1: "+scope.x+" newval="+newVal +" oldVal="+oldVal);
          // collect arguments to f from the scope
          //console.log("watch params = "+f.params + " type:"+typeof f.params);
          var args = f.params.map(function(p) {return scope[p];});
          //console.log("args ="+args.toString());
          var result = f.apply(this, args);
          element.html(result.toPrecision(attrs.sigfigs));
        });

      }
    };
  }
]);