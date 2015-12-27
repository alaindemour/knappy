/**
 * Created by alaindemour on 12/27/15.
 */

"use strict"

const assert = require('assert')
const sets = require('../sets')
const allSubSetsOfSize = sets.allSubSetsOfSize


describe('subsets of a given sizes', () => {

    let x = ['a','b','c','d','e']

    describe('When calling with an array of objects [a,b,c,d,e] and default size and start position', () => {
        it('should return the exact same array', () => {
            assert.deepEqual(x,allSubSetsOfSize(x))
        })
    })

    describe('When calling with an array of objects [a,b,c,d,e] for subsets of size zero i.e. empty set', () => {
        it('should return a single empty array', () => {
            assert.deepEqual([],allSubSetsOfSize(x,0))
        })
    })

})




