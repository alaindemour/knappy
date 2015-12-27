/**
 * Created by alaindemour on 12/27/15.
 */

"use strict"

const assert = require('assert')
const sets = require('../sets')
const allSubSetsOfSize = sets.allSubSetsOfSize


describe('subsets of a given sizes', () => {
    describe('When calling with an array of objects [a,b,c,d,e] and default size and start position', () => {
        it('should return the exact same array', () => {
            let x = ['a','b','c','d','e']
            let result = allSubSetsOfSize(x)
            assert.deepEqual(x,result)
        })
    })
})




