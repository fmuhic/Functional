// USAGE: const F = require('./functional')

// Desc:
//      Add 2 numbers.
//
// Args:
//      x (Num): First operand
//      y (Num): Second operand
//
// Return:
//      Result (Num)
//
// Example: 
//      const res = F.add(3)(7)
//      res // 10
//
add = x => y => x + y;


// ____________________________________________________________________________
// Desc:
//      Multiply 2 numbers.
// Args:
//      x (Num): First operand
//      y (Num): Second operand
//
// Return:
//      Result (Num)
//
// Example: 
//      const res = F.mult(3)(7)
//      res // 21
//
mult = x => y => x * y;


// ____________________________________________________________________________
// Desc:
//      Divide 2 numbers.
// Args:
//      x (Num): First operand
//      y (Num): Second operand
//
// Return:
//      Result (Num)
//
// Example: 
//      const res = F.mult(21)(7)
//      res // 3
//
div = x => y => x / y;


// ____________________________________________________________________________
// Desc:
//      Negate Number
// Args:
//      x (Num): First operand
//
// Return:
//      Result (Num)
//
// Example: 
//      const res = F.negate(10)
//      res // -10
//
negate = x => (-x);


// ____________________________________________________________________________
// Desc:
//      Always returns its argument
// Args:
//      x (SomeType): Value of any type
//
// Return:
//      x
//
// Example: 
//      const res = F.identity('javascript')
//      res // 'javascript'
//
identity = x => x;


// ____________________________________________________________________________
// Desc:
//      Compose N functions (left to right).
//
// Args:
//      fs (Functions): Comma separated list of unary function,
//                      except for the first function which can take arbitrary 
//                      number of arguments.
//
// Return:
//      Result (Any)
//
// Example: 
//      const res = F.pipe(F.add(10), F.mult(2), F.negate)(5)
//      res // (((10 + 5) * 2) * -1) = 30
//
pipe = (...fs) => fs.reduce((f, g) => (...xs) => g(f(...xs)));


// ____________________________________________________________________________
// Desc:
//      Allow function that takes multiple arguments to be called as sequence
//      of functions which take one or more arguments
//
// Args:
//      fs (Functions): N-ary function
//
// Return:
//      Result (Function)
//
// Example: 
//      sum = (a, b, c, c) => a + b + c + d
//      csum = R.curry(sum)
//      // All invocations below will yield same result
//      csum(1)(2)(3)(4)
//      csum(1, 2)(3)(4)
//      csum(1, 2, 3)(4)
//      csum(1)(2, 3)(4)
//
curry = f => {
    return (...xs) => {
        if (xs.length === 0)
            throw Error('Provide at least one parameter');
        if (xs.length >= f.length)
            return f(...xs);
        return curry(f.bind(null, ...xs));
    };
};




// ____________________________________________________________________________
// Export
module.exports = {

    'add'      : add,
    'mult'     : mult,
    'div'      : div,
    'negate'   : negate,
    'identity' : identity,
    'pipe'     : pipe,
    'curry'    : curry
}
