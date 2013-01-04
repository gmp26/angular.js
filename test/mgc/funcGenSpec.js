'use strict';

/*global jasmine,describe,xdescribe,iit,it,xit,expect,beforeEach,afterEach,beforeAll,afterAll,spyOn,runs,waits,waitsFor*/
/*global angular,module,inject */

describe('funcGenSpec', function() {

  var fg; // = funcGen();

  beforeEach(module('mgc'));

  beforeEach(inject(['$funcGen', function(funcGen) {
    fg = funcGen;
  }]));

  it('should make polynomials', function() {
    expect(fg.poly(1,2,3)(1)).toBe(6);
    expect(fg.poly(1,2,3)(2)).toBe(11);
    expect(fg.poly(1,2,3,4)(1)).toBe(10);
    expect(fg.poly(1,2,3,4)(-1)).toBe(2);
    expect(fg.poly(1,2,3,4)(-2)).toBe(-2);
    expect(fg.poly(1,2,3,4)(2)).toBe(26);
    expect(fg.poly(1,0,0,0,0)(3)).toBe(81);
  });

  it('should make a linear functions', function() {
    expect(fg.poly(0, 0)(100)).toBe(100*0);
    expect(fg.poly(0,1)(-100)).toBe(-100*0+1);
    expect(fg.poly(1,0)(-100)).toBe(-100*1 + 0);
    expect(fg.poly(2,3)(1)).toBe(2*1+3);
  });

  it('should make quadratics', function() {
    expect(fg.poly(1,6,-25)(5)).toBe(30);
  });

  it('should make rational functions', function() {
    expect(fg.rational(3,2)(2,3)(4)).toBe((3*4+2)/(2*4+3));
    expect(fg.rational(3,2)(2,3)(1)).toBe((3*1+2)/(2*1+3));
  });

  it('should create functions from js definitions', function() {
    expect(fg.define('x,y -> x*y')(3,4)).toBe(12);
    expect(fg.define('a,b,x -> a*x+b')(3,4,5)).toBe(19);
    expect(fg.define('(a,b,x) -> a*x+b')(3,4,5)).toBe(19);

    expect(
      Math.abs(
        fg.define('x -> Math.sin(x)')(Math.PI/6) - 0.5
        ) < 1e-6
      ).toBe(true);
  });

  it('should insert \'Math.\' before maths functions', function() {
    var rf = fg.define('x -> sin(x)*cos(x)');
    expect(rf.body.toString()).toBe('Math.sin(x)*Math.cos(x)');
  });

  it('should replace repeated functions and PI', function() {
    var rf = fg.define('x -> sin(x)*sin(PI)');
    expect(rf.body.toString()).toBe('Math.sin(x)*Math.sin(Math.PI)');
  });

  it('should cover these Math functions', function() {
    expect(fg.define('x -> asin(x)').body).toBe('Math.asin(x)');
    expect(fg.define('x -> acos(x)').body).toBe('Math.acos(x)');
    expect(fg.define('x -> atan(x)').body).toBe('Math.atan(x)');
    expect(fg.define('x -> sin(x)').body).toBe('Math.sin(x)');
    expect(fg.define('x -> cos(x)').body).toBe('Math.cos(x)');
    expect(fg.define('x -> tan(x)').body).toBe('Math.tan(x)');
    expect(fg.define('x -> sinh(x)').body).toBe('Math.sinh(x)');
    expect(fg.define('x -> cosh(x)').body).toBe('Math.cosh(x)');
    expect(fg.define('x -> tanh(x)').body).toBe('Math.tanh(x)');
    expect(fg.define('x -> exp(x)').body).toBe('Math.exp(x)');
    expect(fg.define('x -> log(x)').body).toBe('Math.log(x)');
    expect(fg.define('x -> ceil(x)').body).toBe('Math.ceil(x)');
    expect(fg.define('x -> floor(x)').body).toBe('Math.floor(x)');
    expect(fg.define('x -> round(x)').body).toBe('Math.round(x)');
    expect(fg.define('x -> sqrt(x)').body).toBe('Math.sqrt(x)');
    expect(fg.define('x -> abs(x)').body).toBe('Math.abs(x)');
    expect(fg.define('x -> atan2(x)').body).toBe('Math.atan2(x)');
    expect(fg.define('x -> PI').body).toBe('Math.PI');
    expect(fg.define('x -> LN2').body).toBe('Math.LN2');
    expect(fg.define('x -> LN10').body).toBe('Math.LN10');
    expect(fg.define('x -> LOG2E').body).toBe('Math.LOG2E');
    expect(fg.define('x -> LOG10E').body).toBe('Math.LOG10E');
    expect(fg.define('x -> SQRT1_2').body).toBe('Math.SQRT1_2');
    expect(fg.define('x -> SQRT2').body).toBe('Math.SQRT2');
  });

});