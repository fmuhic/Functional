// USAGE: const F = require('./functional')

module.exports = {

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
    add : x => y => x + y,


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
    mult : x => y => x * y,


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
    div : x => y => x / y,


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
    negate : x => (-x),


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
    identity : x => x,


    // ____________________________________________________________________________
    // Desc:
    //      Compose N functions (left to right) by applying each function to imput (x)
    //      and redirect output to a next function.
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
    pipe : (...fs) => fs.reduce((f, g) => (...xs) => g(f(...xs)))
}
