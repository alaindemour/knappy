/**
 * Created by alaindemour on 1/10/16.
 */

"use strict"

// This is a slightly unusual class, it does not define shared method but SELF-style function directly on slots of the created object
// This is to allow the "late" initialization only with the first method is called, then the final methods are setup.
class TrieCache {

    constructor() {

        this.sucessfulHits = 0
        // set and get replace themselves after a first usage
        this.get = (...theKeys) => {
            this.map = new Map()
            this.dimension = theKeys.length
            this.get = this.commonGet
            this.set = this.commonSet
            return this.get(...theKeys)
        }

        this.set = (...theKeys) => {
            this.map = new Map()
            this.dimension = theKeys.length
            this.get = this.commonGet
            this.set = this.commonSet
            return this.set(...theKeys)
        }

        this.commonGet = (...theKeys) => {
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
            this.sucessfulHits++
            return current
        }

        // note that this is the opposite calling convention as the one used in ES6 Maps
        this.commonSet = (value, ...theKeys) => {
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
}


module.exports = TrieCache