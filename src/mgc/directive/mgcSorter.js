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
  <example module="mui">

    <file name="script.js">
      function SortCtrl($scope) {
        // optional score: set its initial value here
        $scope.score = 0;
      };
    </file>

    <file name="style.css">
      .col1 {
        width: 30%;
        display: inline-block;
        text-align:right;
        vertical-align:middle;
      }

      .col2 {
        width: 60%;
        display: inline-block;
        vertical-align:top;
      }

      .col2.narrow {
        width:80px;
      }

      [ui-sortable] {
        list-style-type:none;
      }

      [ui-sortable].vertical {
        display: block; 
      }

      [ui-sortable].horizontal {
        display: inline-block;
      }

      [ui-sortable].vertical li{
        display: block;
        padding:5px;
      }

      [ui-sortable].horizontal li{
        display: inline; 
        padding-right: 5px;
      }

      [ui-sortable] li {
        background-color: white;
        padding:5px;
        margin:10px 5px 10px 5px;
        border-radius:5px;
        webkit-border-radius:5px;
        moz-border-radius:5px;
        box-shadow: 2px 2px 3px #888888;
        display: inline;
      }

      [mgc-order-check].right li {
        background-color: white;
        border: 3px solid rgb(128,255,128);
      }

      [mgc-order-check].wrong li {
        background-color: rgba(255,255,255,0.5);
        border: 3px solid rgb(255,200,200);
      }      
    </file>

    <file name="index.html">
      <div class="col1">
        Vertical layout class.
        Given x=2, sort:
      </div>
      <div ng-controller="SortCtrl" class="col2">
        <ul ui-sortable mgc-order-check class="well vertical" score="spearman" >
          <li mgc-key="3" >I should be 3rd</li>
          <li mgc-key="4" >I should be 4th</li>
          <li mgc-key="2" >I should be second</li>
          <li mgc-key="5" >I should be last</li>
          <li mgc-key="1" >I should be first</li>
        </ul>
        rank correlation = {{spearman | number:2}},<br />or roughly {{ (spearman+1)*50 | number:0}}% correct.
      </div>

      <br /><hr />

      <div class="col1">
        Same again, but sorting divs which are untargetted in the CSS.
      </div>
      <div ng-controller="SortCtrl" class="col2">
        <div ui-sortable mgc-order-check class="well vertical" score="spearman" >
          <div mgc-key="3" >I should be 3rd</div>
          <div mgc-key="4" >I should be 4th</div>
          <div mgc-key="2" >I should be second</div>
          <div mgc-key="5" >I should be last</div>
          <div mgc-key="1" >I should be first</div>
        </div>
        rank correlation = {{spearman | number:2}},<br />or roughly {{ (spearman+1)*50 | number:0}}% correct.
      </div>

      <br /><hr />
      <div class="col1">
        Same again, but sorting spans which are untargetted in the CSS.
      </div>
      <div ng-controller="SortCtrl" class="col2">
        <div ui-sortable mgc-order-check class="well vertical" score="spearman" >
          <span mgc-key="3" >[3rd]</span>
          <span mgc-key="4" >[4th]</span>
          <span mgc-key="2" >[second]</span>
          <span mgc-key="5" >[last]</span>
          <span mgc-key="1" >[first]</span>
        </div>
        rank correlation = {{spearman | number:2}},<br />or roughly {{ (spearman+1)*50 | number:0}}% correct.
      </div>

      <br /><hr />

      <div class="col1">
      Many correct answers.<br />
      Horizontal layout class.<br />
      Given x=0, sort:
      </div>
      <div ng-controller="SortCtrl" class="col2">
      <ul ui-sortable mgc-order-check class="horizontal" score="unused">
      <li mgc-key="1" >1</li>
      <li mgc-key="-1" >-1</li>
      <li mgc-key="0" >0</li>
      <li mgc-key="1" >1</li>
      <li mgc-key="-1" >-1</li>
      <li mgc-key="0" >0</li>
      </ul>
      </div>

      <br /><hr />

      <div class="col1">
      No order check at all on this one:
      </div>
      <div ng-controller="SortCtrl" class="col2">
      <ul ui-sortable class="horizontal" score="unused">
      <li mgc-key="2" >Egg</li>
      <li mgc-key="1" >Apple</li>
      <li mgc-key="1" >Carrot</li>
      <li mgc-key="1" >Burdock</li>
      <li mgc-key="1" >Dandelion</li>
      </ul>
      </div>
     </file>

     <file name="scenario.js">
       it('should display a stack of rods', function() {
       });
     </file>
   </example>
*/
angular.module('mui',['mgc','ui'])
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

      element.bind("sortstop", recheck);
      check();

    }
  };
});
