/**
 * Created by alaindemour on 1/7/16.
 */

"use strict"

// Setup of the memo hash, we only pre-allocate one dimension: the smaller one





function memoY(dimension) {

    let memo = []
    for (let i = 0; i <= dimension ; i++) {
        memo[i] = []
    }
    let memoHits = 0

    return function Y(f) {
        return f((x, y) => {
            let hit = memo[x][y]
            if (hit) {
                memoHits++
                return hit
            }
            let result = Y(f)(x, y)
            memo[x][y] = result
            return result
        })
    }
}



var fac = Y(function(pre) {
    return function (n,y,z) {
        return n > 1 ? n * pre(n - 1,y,z) : 1
    }
})



let result = fac(4,'sss')

console.log(result)


