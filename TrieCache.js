/**
 * Created by alaindemour on 1/10/16.
 */

"use strict"

class TrieCache {

    constructor(dimension) {
        if (!dimension || dimension <= 0) {
            throw new Error(`TrieCache needs a strictly positive dimension`)
        }
        this.map = new Map()
        this.dimension = dimension
    }


    get(...theKeys) {
        if (theKeys.length !== this.dimension) {
            throw new Error(`dimension mistmatch on the TrieCache`)
        }
        let i = 0
        let current = this.map
        while (i < this.dimension) {
            let dimi = theKeys[i]
            current = current.get(dimi)
            i++
            if (!current) return undefined
        }
        return current
    }

    // note that this is the opposite calling conversion as ES6 Maps
    set(value, ...theKeys) {
        if (theKeys.length !== this.dimension) {
            throw new Error(`dimension mistmatch on the TrieCache`)
        }
        let i = 0
        let current = this.map
        while (i < this.dimension - 1) {
            let dimi = theKeys[i]
            let tmp = current.get(dimi)
            if (!tmp) {
                let newmap = new Map()
                current.set(dimi, newmap)
                current = newmap
            }
            else {
                current = tmp
            }
            i++
        }
        let dimi = theKeys[i]
        current.set(dimi, value)
    }
}






module.exports = TrieCache