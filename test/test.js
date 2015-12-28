/**
 * Created by alaindemour on 12/27/15.
 */

"use strict"


const _ = require('lodash')
const assert = require('assert')
const sets = require('../sets')
const allSubSetsOfSize = sets.allSubSetsOfSize
const allSubSets = sets.allSubsets


describe('subsets of a given sizes', () => {

    let x = ['a','b','c','d','e']
    let singletonsOfx = _.chunk(x)


    describe('When calling with an array of objects [a,b,c,d,e] and default size and start position', () => {
        it('should return the exact an array of the all the singleton', () => {
            assert.deepEqual(singletonsOfx,allSubSetsOfSize(x))
        })
    })

    describe('When calling with an array of objects [a,b,c,d,e] for subsets of size zero i.e. empty set', () => {
        it('should return the empty set ', () => {
            assert.deepEqual([[]],allSubSetsOfSize(x,0))
        })
    })

    describe('When calling with an array of objects [a,b,c,d,e] for subsets of size 2' , () => {
        it('should return 10 subsets', () => {
            assert.equal(10,allSubSetsOfSize(x,2).length)
        })
    })

    describe('When calling with an array of objects [a,b,c,d,e] for subsets of size 3' , () => {
        it('should return 10 subsets', () => {
            assert.equal(10,allSubSetsOfSize(x,3).length)
        })
    })

    describe('When calling with an array of objects [a,b,c,d,e] for subsets of size 4' , () => {
        it('should return 5 subsets', () => {
            assert.equal(5,allSubSetsOfSize(x,4).length)
        })
    })

    describe('When calling with an array of objects [a,b,c,d,e] for subsets of size 5' , () => {
        it('should return 1 subsets', () => {
            assert.equal(1,allSubSetsOfSize(x,5).length)
        })
    })

})


describe('set of all the subsets', () => {

    let x = ['a','b','c','d','e']

    describe('When computing the set of all the subsets of [a,b,c,d,e]', () => {
        it('should return 2^5 === 32 subsets', () => {
            assert.equal(32,allSubSets(x).length)
        })
    })

})




