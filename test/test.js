/**
 * Created by alaindemour on 12/27/15.
 */

"use strict"


const _ = require('lodash')
const assert = require('assert')
const sets = require('../powerSet')
const allSubSetsOfSize = sets.allSubSetsOfSize
const powerSet = sets.powerSet
const Knapsack = require('../Knapsack')
const Item = require('../Item')
const TrieCache = require('../TrieCache')


describe(`powerset`, () => {
    describe('subsets of a given sizes', () => {

        let x = ['a', 'b', 'c', 'd', 'e']
        let singletonsOfx = _.chunk(x)


        describe('When calling with an array of objects [a,b,c,d,e] and default size and start position', () => {
            it('should return the exact an array of the all the singleton', () => {
                assert.deepEqual(singletonsOfx, allSubSetsOfSize(x))
            })
        })

        describe('When calling with an array of objects [a,b,c,d,e] for subsets of size zero i.e. empty set', () => {
            it('should return the empty set ', () => {
                assert.deepEqual([[]], allSubSetsOfSize(x, 0))
            })
        })

        describe('When calling with an array of objects [a,b,c,d,e] for subsets of size 2', () => {
            it('should return 10 subsets', () => {
                assert.equal(10, allSubSetsOfSize(x, 2).length)
            })
        })

        describe('When calling with an array of objects [a,b,c,d,e] for subsets of size 3', () => {
            it('should return 10 subsets', () => {
                assert.equal(10, allSubSetsOfSize(x, 3).length)
            })
        })

        describe('When calling with an array of objects [a,b,c,d,e] for subsets of size 4', () => {
            it('should return 5 subsets', () => {
                assert.equal(5, allSubSetsOfSize(x, 4).length)
            })
        })

        describe('When calling with an array of objects [a,b,c,d,e] for subsets of size 5', () => {
            it('should return 1 subsets', () => {
                assert.equal(1, allSubSetsOfSize(x, 5).length)
            })
        })

    })


    describe('set of all the subsets', () => {

        let x = ['a', 'b', 'c', 'd', 'e']

        describe('When computing the set of all the subsets of [a,b,c,d,e]', () => {
            it('should return 2^5 === 32 subsets', () => {
                assert.equal(32, powerSet(x).length)
            })
        })

    })
})


describe('TrieCache', () => {
    let cache = new TrieCache(3)
    let smallcache = new TrieCache(1)

    describe('When looking up an element at coordinate never hit yet', () =>{
        it('shoud return undefined', () => {
            let x = cache.get(2, 35, 4)
            assert.equal(x,undefined)
        })
    })

    describe('When setting  an element at coordinates never hit yet, then retrieving it', () =>{
        it('shoud return the element', () => {
            cache.set("Boo", 2, 36, 5)
            let y = cache.get(2, 36, 5)
            assert.equal(y, "Boo")
        })
    })

    describe('When setting  an element at coordinates already set, then retrieving it', () =>{
        it('shoud return the  latest element', () => {
            cache.set("Baa", 2, 36, 5)
            let y = cache.get(2, 36, 5)
            assert.equal(y, "Baa")
        })
    })



})


describe('knapsack', () => {

    let target = new Knapsack({capacity: 50})

    let item1 = new Item({benefit: 60, cost: 10, name: 'item1'})
    let item2 = new Item({benefit: 100, cost: 20, name: 'item2'})
    let item3 = new Item({benefit: 120, cost: 30, name: 'item3'})
    let item4 = new Item({benefit: 90, cost: 10, name: 'item4'})
    let item5 = new Item({benefit: 75, cost: 13, name: 'item5'})
    let item6 = new Item({benefit: 110, cost: 10, name: 'item6'})

    let offer = [item1, item2, item3]

    describe('When computing the brute force of the target knapsack', () => {
        it('the benefit shoudl be 200 and the list contains item2 and item3', () => {
            let result = target.bruteForce(offer)
            assert.equal(220, result.benefit)
        })
    })

    let singleton = [item1]

    describe('When computing knapsack recursive with the singleton item1', () => {
        it('the benefit shoudl be 60 and the list contains onl item1', () => {
            let result = target.zeroOneKnapsackRecursiveMemo(singleton)
            assert.equal(60, result[0].cumul)
        })
    })

    let pair = [item1, item2]

    describe('When computing knapsack recursive with the pair [item1,item2]', () => {
        it('the benefit shoudl be 160 and the list contains onl item1 item2', () => {
            let result = target.zeroOneKnapsackRecursiveMemo(pair)
            assert.equal(160, result[0].cumul)
        })
    })


    let triplet = [item1, item2, item3]

    describe('When computing knapsack recursive with the truplet [item1,item2,item3]', () => {
        it('the benefit shoudl be 220 and the list contains onl item1 item3', () => {
            let result = target.zeroOneKnapsackRecursiveMemo(triplet)
            assert.equal(220, result[0].cumul)
        })
    })

    let sextet = [item1, item2, item3, item4, item5, item6]


    describe('When computing knapsack recursive with the sextet [item1,item2,item3,item4,item5,item6]', () => {
        it('the benefit shoudl be 260 and should be identical whether computed using recursive and bruteforce', () => {

            let smallerKnapsack = new Knapsack({capacity: 30})

            let recResult = smallerKnapsack.zeroOneKnapsackRecursiveMemo(sextet)
            let bruteForceResult = smallerKnapsack.bruteForce(sextet)
            assert.equal(260, recResult[0].cumul)
            assert.equal(260, bruteForceResult.benefit)
        })
    })

    describe('When computing knapsack recursive with the sextet [item1,item2,item3,item4,item5,item6]', () => {
        it('the benefit shoudl be 260 and should be identical whether computed using recursive and recursive memo', () => {
            let smallerKnapsack = new Knapsack({capacity: 30})

            let recMemoResult = smallerKnapsack.zeroOneKnapsackRecursiveMemo(sextet)
            let recResult = smallerKnapsack.zeroOneKnapsackRecursive(sextet)
            assert.equal(260, recResult[0].cumul)
            assert.equal(260, recMemoResult[0].cumul)
        })
    })

})
