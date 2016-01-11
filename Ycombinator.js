/**
 * Created by alaindemour on 1/7/16.
 */

"use strict"

const TrieCache = require('./TrieCache')

// Pseudo pseudoY combinator
function pseudoY(f) {
    return f((...params) => {
        let result = pseudoY(f)(...params)
        return result
    })
}

function  memoY(f) {

    let memo = new TrieCache(f.length)

    function cachingY(f) {
        return f((...params) => {
            let memoizedResult = memo.get(...params)
            if (memoizedResult) {
                return memoizedResult
            }
            let result = cachingY(f)(...params)
            memo.set(result,...params)
            return result
        })
    }
    return cachingY(f)
}

module.exports = {
    pseudoY
    ,memoY
}



