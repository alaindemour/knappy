/**
 * Created by alaindemour on 12/27/15.
 */

"use strict"


const _ = require('lodash')
const assert = require('assert')
const sets = require('../sets')
const allSubSetsOfSize = sets.allSubSetsOfSize


describe('subsets of a given sizes', () => {

    let x = ['a','b','c','d','e']
    let singletonsOfx = _.chunk(x)


    describe('When calling with an array of objects [a,b,c,d,e] and default size and start position', () => {
        it('should return the exact an array of the all the singleton', () => {
            assert.deepEqual(singletonsOfx,allSubSetsOfSize(x))
        })
    })

    describe('When calling with an array of objects [a,b,c,d,e] for subsets of size zero i.e. empty set', () => {
        it('should return a single empty array', () => {
            assert.deepEqual([],allSubSetsOfSize(x,0))
        })
    })

    describe('When calling with an array of objects [a,b,c,d,e] for subsets of size 2' , () => {
        it('should return 10 subsets', () => {
            assert.equal(10,allSubSetsOfSize(x,2).length)
        })
    })

})




