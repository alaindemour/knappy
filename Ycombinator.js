/**
 * Created by alaindemour on 1/7/16.
 */

"use strict"

// Pseudo Y combinator
function Y(f) {
    return f((x, y) => {
        let result = Y(f)(x, y)
        return result
    })
}



module.exports = Y

