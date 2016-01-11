/**
 * Created by alaindemour on 1/7/16.
 */

"use strict"

// Setup of the memo hash, we only pre-allocate one dimension: the smaller one
function Y(f) {
    return f((x, y) => {
        let result = Y(f)(x, y)
        return result
    })
}

//function preFac(pre) {
//    return function (n, ...rest) {
//        return n > 1 ? n * pre(n - 1, ...rest) : 1
//    }
//}
//
//let fac = Y(preFac)
//
//
//
//let result = fac(4, 'sss')
//
//console.log(result)

module.exports = Y

