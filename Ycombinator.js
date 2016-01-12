/**
 * Created by alaindemour on 1/7/16.
 */

"use strict"

const TrieCache = require('./TrieCache')

// Pseudo Y combinator, more like a fixed point generator, not claim to lambda calculus purity
function pseudoY(f) {
    return f((...params) => {
        let result = pseudoY(f)(...params)
        return result
    })
}

// Memoizing Y combinator
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

    let result = cachingY(f)
    result.getHits = () => memo.sucessfulHits
    return result
}

module.exports = {
    pseudoY
    ,memoY
}



