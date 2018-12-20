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
//                      except for first function which can take arbitrary 
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
// Desc:
//      Iterate over Iterable (Array, String) or Object,
//      apply function to every element and return the result.
//
// Args:
//      f (Function): Function to apply to every element of Functor.
//      xs (Array, String, Object ...): Functor over which we apply function f.
//
// Return:
//      Result (Iterable or Object depending on input)
//
// Example: 
//      let res = map(add(10), [1, 2, 3])
//      // res is [11, 12, 13]
//      let res = map(add(10), {'first': 1, 'second': 2, 'third': 3})
//      // res is {'first': 11, 'second': 12, 'third': 13}
//
map = curry((f, xs) => {
    if (_isIterable(xs))
        return _map(f, xs);
    else if (_isObject(xs))
        return _mapObject(f, xs);
    else 
        throw Error('Please provide Iterable or Object');
});


// ____________________________________________________________________________
// Desc:
//      Iterate over Iterable (Array, String, etc.) or Object,
//      and return all elements for which f(x) returns true.
//
// Args:
//      f (Function): Predicate function used to test all values of Iterable or Object.
//      xs (Array, String, Object ...): Iterable or Object over which we apply function f.
//
// Return:
//      Result (Iterable or Object depending on input)
//
// Example: 
//      const isNegative = (x) => x < 0;
//      let res = filter(isNegative, [-1, 2, -3, 4, -5])
//      // res is [-1, -3, -5]
//      let res = filter(isNegative, {'first': -1, 'second': 2, 'third': -3})
//      // res is {'first': -1, 'third': -3}
//
filter = curry((f, xs) => {
    if (_isIterable(xs))
        return _filter(f, xs);
    else if (_isObject(xs))
        return _filterObject(f, xs);
    else 
        throw Error('Please provide Iterable or Object');
});



// ____________________________________________________________________________
// Desc:
//      foldl is a way to represent catamorphism. By accumulating values on the left side,
//      it reduces Iterable to a single value. (See foldl in Haskell).
//      See also foldr.
//
// Args:
//      f (Function): Binary function used to reduce elements of Iterable.
//      acc (Any): Default value. If Iterable is empty this value is returned.
//      xs (Array, String ...): Iterable we are reducing.
//
// Return:
//      Result (Any)
//
// Example: 
//      let res = foldl(add, 10, [1, 2, 3, 4, 5])
//      // res = (((((10 + 1) + 2) + 3) + 4) + 5)
//
foldl = curry((f, acc, xs) => {
    for(let i = 0; i < xs.length; i++)
        acc = f(acc, xs[i]);
    return acc;
});


// ____________________________________________________________________________
// Desc:
//      foldr is a way to represent catamorphism. By accumulating values on the right side,
//      it reduces Iterable to a single value. (See foldr in Haskell).
//      See also foldl.
//
// Args:
//      f (Function): Binary function used to reduce elements of Iterable.
//      acc (Any): Default value. If Iterable is empty this value is returned.
//      xs (Array, String ...): Iterable we are reducing.
//
// Return:
//      Result (Any)
//
// Example: 
//      let res = foldr(add, 10, [1, 2, 3, 4, 5])
//      // res = (1 + (2 + (3 + (4 + (5 + 10)))))
//
foldr = curry((f, acc, xs) => {
    for(let i = xs.length - 1; i >= 0; i--)
        acc = f(xs[i], acc);
    return acc;
});




// ____________________________________________________________________________
// ____________________________________________________________________________
//
//    PRIVATE
// ____________________________________________________________________________
// ____________________________________________________________________________


_map = (f, xs) => {
    let len = xs.length;
    let result = Array(len);
    for(let i = 0; i < len; i++)
        result[i] = f(xs[i]);
    return result;
};

_mapObject = (f, xs) => {
    let result = new Object();
    for (let key in xs)
        if (xs.hasOwnProperty(key))
            result[key] = f(xs[key]);
    return result;
};

_filter = (f, xs) => {
    let len = xs.length;
    let result = []
    for(let i = 0; i < len; i++)
        if(f(xs[i]))
            result.push(xs[i]);
    return result;
};

_filterObject = (f, xs) => {
    let result = new Object();
    for (let key in xs)
        if (xs.hasOwnProperty(key))
            if(f(xs[key]))
                result[key] = xs[key];
    return result;
};

_isIterable = (x) => {
    if (x == null)
        return false;
    return typeof x[Symbol.iterator] === 'function';
};

_isObject = (x) => {
    if (x == null)
        return false;
    return typeof x === 'object';
};




// ____________________________________________________________________________
// ____________________________________________________________________________




// ____________________________________________________________________________
// Export
module.exports = {

    'add'      : add,
    'mult'     : mult,
    'div'      : div,
    'negate'   : negate,
    'identity' : identity,
    'pipe'     : pipe,
    'curry'    : curry,
    'map'      : map,
    'filter'   : filter,
    'foldl'    : foldl,
    'foldr'    : foldr
};
