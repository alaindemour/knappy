/**
 * Created by alaindemour on 1/7/16.
 */

"use strict"

function Y(f) {
    return f((x,y,z) => Y(f)(x,y,z))
}


var fac = Y(function(pre) {
    return function (n,y,z) {
        return n > 1 ? n * pre(n - 1,y,z) : 1
    }
})



let result = fac(4,'sss')

console.log(result)


