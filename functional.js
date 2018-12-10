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
//      s = (a, b, c, d) => a + b + c + d
//      sum = curry(s)
//      // All invocations below will yield same result
//      sum(1)(2)(3)(4)
//      sum(1, 2)(3)(4)
//      sum(1, 2, 3)(4)
//      sum(1)(2, 3)(4)
//      sum(1)(2, 3, 4)
//      sum(1, 2, 3, 4)
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
//      const res = add(3)(7)
//      const res = add(3, 7)
//      // res is 10 in both cases
//
add = curry((x, y) => x + y);


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
//      const res = mult(3)(7)
//      const res = mult(3, 7)
//      // res is 21 in both cases
//
mult = curry((x, y) => x * y);


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
//      const res = div(21)(7)
//      const res = div(21, 7)
//      // res is 3 in both cases
//
div = curry((x, y) => x / y);


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
//      const res = negate(10)
//      // res is -10
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
//      const res = identity('javascript')
//      // res is 'javascript'
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
//      const res = pipe(add(10), mult(2), div(3)(5)
//      // res is calculated as (((10 + 5) * 2) / 3) = 10
//
pipe = (...fs) => fs.reduce((f, g) => (...xs) => g(f(...xs)));



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
