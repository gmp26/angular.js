/**
 * @ngdoc directive
 * @name mgc.directive:mgcDraggable
 *
 * @description
 * Apply mgc-draggable attribute to an element to make it draggable.
 * 
 * This directive uses jQuery-ui draggable. You can pass [options to jQuery-ui draggable](http://api.jqueryui.com/draggable/)
 * through the value of this attribute or globally via mgcConfig. e.g.
 * 
 * ````
 *     mgc-draggable = "{ appendTo: document.body }"
 * ````
 * 
 *
 * @element CONTAINER
 * @example
   <example module="mgc">
     <file name="index.html">
      <div mgc-draggable>item 2 - drag me</div>
      <div mgc-draggable>item 3 - drag me</div>
      <div mgc-draggable>item 1 - drag me</div>
      <div mgc-draggable>item 4 - drag me</div>
      <div mgc-draggable>Drag me too <img mgc-draggable src="http://angularjs.org/img/AngularJS-small.png"></div>
     </file>
     <file name="scenario.js">
       it('should allow user to drag the items', function() {
       });
     </file>
   </example>
   **/
angular.module('mgc').directive('mgcDraggable', [
  'mgc.config', function(mgcConfig) {
    var options;
    options = {};
    if (mgcConfig.draggable != null) {
      angular.extend(options, mgcConfig.draggable);
    }
    return {
      require: '?ngModel',
      link: function(scope, element, attrs, ngModel) {
        var onStart, onUpdate, opts, _start, _update;
        opts = angular.extend({}, options, scope.$eval(attrs.mgcOptions));
        if (ngModel != null) {
          onStart = function(e, mgc) {
            return mgc.item.data('mgc-draggable-start', mgc.item.index());
          };
          onUpdate = function(e, mgc) {
            var end, start;
            start = mgc.item.data('mgc-draggable-start');
            end = mgc.item.index();
            ngModel.$modelValue.splice(end, 0, ngModel.$modelValue.splice(start, 1)[0]);
            return scope.$apply();
          };
          _start = opts.start;
          opts.start = function(e, mgc) {
            onStart(e, mgc);
            if (typeof _start === "function") {
              _start(e, mgc);
            }
            return scope.$apply();
          };
          _update = opts.update;
          opts.update = function(e, mgc) {
            onUpdate(e, mgc);
            if (typeof _update === "function") {
              _update(e, mgc);
            }
            return scope.$apply();
          };
        }
        return element.draggable(opts);
      }
    };
  }
]);
