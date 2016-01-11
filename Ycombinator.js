/**
 * Created by alaindemour on 1/7/16.
 */

"use strict"

// Pseudo Y combinator
function Y(f) {
    return f((...params) => {
        let result = Y(f)(...params)
        return result
    })
}


module.exports = Y

