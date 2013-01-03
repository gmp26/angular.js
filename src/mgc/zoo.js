'use strict';

/*global jasmine,describe,xdescribe,iit,it,xit,expect,beforeEach,afterEach,beforeAll,afterAll,spyOn,runs,waits,waitsFor*/
/*global angular,module,inject */

var $zoo = function() {return 1;};

angular.module('moggy', []).value('$zoo', $zoo());




