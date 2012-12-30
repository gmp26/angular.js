angular.module('mgc.directives').directive('mgcEval', ['mgc.funcGen', function(funcGen) {
	var fg = funcGen;

  return {
    restrict: 'C', // the directive can be invoked only by using  mgc-eval="" in the template
    scope: true,	
    link: function (scope, element, attrs) {

			var f = fg.define(attrs.f);
			
			//scope.x = scope.x | 0;
			attrs.sigfigs = attrs.sigfigs | 3;

			console.log(element.html());

	    scope.$watch('x', function (newVal, oldVal) {
			  console.log(attrs.sigfigs);
				element.html(f(scope.x).toPrecision(attrs.sigfigs));
	    });
	  }
  };
}]);