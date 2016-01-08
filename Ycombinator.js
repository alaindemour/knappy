/**
 * Created by alaindemour on 1/7/16.
 */

"use strict"


function Y(f) {

    
    var g = f((h => x => f(h(h))(x)) (h => x => f(h(h))(x)))
    return g
}


var fac = Y(function(f) {
    return function (n) {
        return n > 1 ? n * f(n - 1) : 1
    }
})


//function Y(f) {
//    let g =  x => f(y => (x(x))(y))
//    return g(g)
//}



//function fa(f) {
//
//    let foo = function foo(x) {
//        if (x === 0) return 1
//        x * f(x - 1)
//    }
//    return foo
//}
//
//
//let boo = Y(fa)
//let result = boo(3)

let result = fac(3)

console.log(result)
