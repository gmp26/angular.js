'use strict';

describe('funcGenSpec', function() {

    beforeEach(module('mgc'));

    var fg;

    beforeEach(function() {
        inject(function($injector) {
            fg = $injector.get('funcGen');
        });
    });

    iit('should make polynomials', function() {
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

		xit('could make chainable functions', function() {
			// but it doesn't!
			console.log(typeof(Math.sin));
			var f = fg.poly(Math.sin); 
			expect(f(0)(Math.PI/2)).toBe(1);
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
			expect(rf.f.toString()).toBe('Math.sin(x)*Math.cos(x)');
		});

		it('should replace repeated functions and PI', function() {
			var rf = fg.define('x -> sin(x)*sin(PI)');
			expect(rf.f.toString()).toBe('Math.sin(x)*Math.sin(Math.PI)');
		});
	
		it('should cover these Math functions', function() {
			expect(fg.define('x -> asin(x)').f).toBe('Math.asin(x)');
			expect(fg.define('x -> acos(x)').f).toBe('Math.acos(x)');
			expect(fg.define('x -> atan(x)').f).toBe('Math.atan(x)');
			expect(fg.define('x -> sin(x)').f).toBe('Math.sin(x)');
			expect(fg.define('x -> cos(x)').f).toBe('Math.cos(x)');
			expect(fg.define('x -> tan(x)').f).toBe('Math.tan(x)');
			expect(fg.define('x -> sinh(x)').f).toBe('Math.sinh(x)');
			expect(fg.define('x -> cosh(x)').f).toBe('Math.cosh(x)');
			expect(fg.define('x -> tanh(x)').f).toBe('Math.tanh(x)');
			expect(fg.define('x -> exp(x)').f).toBe('Math.exp(x)');
			expect(fg.define('x -> log(x)').f).toBe('Math.log(x)');
			expect(fg.define('x -> ceil(x)').f).toBe('Math.ceil(x)');
			expect(fg.define('x -> floor(x)').f).toBe('Math.floor(x)');
			expect(fg.define('x -> round(x)').f).toBe('Math.round(x)');
			expect(fg.define('x -> sqrt(x)').f).toBe('Math.sqrt(x)');
			expect(fg.define('x -> abs(x)').f).toBe('Math.abs(x)');
			expect(fg.define('x -> atan2(x)').f).toBe('Math.atan2(x)');
			expect(fg.define('x -> PI').f).toBe('Math.PI');
			expect(fg.define('x -> LN2').f).toBe('Math.LN2');
			expect(fg.define('x -> LN10').f).toBe('Math.LN10');
			expect(fg.define('x -> LOG2E').f).toBe('Math.LOG2E');
			expect(fg.define('x -> LOG10E').f).toBe('Math.LOG10E');
			expect(fg.define('x -> SQRT1_2').f).toBe('Math.SQRT1_2');
			expect(fg.define('x -> SQRT2').f).toBe('Math.SQRT2');
		});
		
});