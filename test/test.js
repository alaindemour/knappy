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
const pseudoY = require('../Ycombinator').pseudoY
const memoY = require('../Ycombinator').memoY


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
    let cache = new TrieCache()
    let smallcache = new TrieCache()

    describe('When looking up an element at coordinate never hit yet', () => {
        it('shoud return undefined', () => {
            let x = cache.get(2, 35, 4, 9)
            assert.equal(x, undefined)
        })
    })

    describe('When setting  an element at coordinates never hit yet, then retrieving it', () => {
        it('shoud return the element', () => {
            cache.set("Boo", 2, 36, 5, 9)
            let y = cache.get(2, 36, 5, 9)
            assert.equal(y, "Boo")
        })
    })

    describe('When setting  an element at coordinates already set, then retrieving it', () => {
        it('shoud return the  latest element', () => {
            cache.set("Baa", 2, 36, 5, 9)
            let y = cache.get(2, 36, 5, 9)
            assert.equal(y, "Baa")
        })
    })

    describe('When using a TrieCache of dimension 1', () => {
        it('should work like in higher dimensions', () => {
            let z = smallcache.get(3)
            assert.equal(z, undefined)
            smallcache.set("Buu", 8)
            z = smallcache.get(8)
            assert.equal(z, "Buu")
        })
    })


    describe('Trying to lookup an element with coordinates with a number of dimensions less than the TrieMap dimension', function () {
        it('Should generate a mismatch exception', function () {
            assert.throws(
                function () {
                    x = cache.get(4, 5)
                },
                /mistmatch/
            )
        })
    })


    describe('Trying to lookup an element with coordinates with a number of dimensions higher than the TrieMap dimension', function () {
        it('Should generate a mismatch exception', function () {
            assert.throws(
                function () {
                    x = cache.get(4, 5, 6, 7, 8, 8, 9)
                },
                /mistmatch/
            )
        })
    })
})

describe ('YCombinator', function() {


    describe('After using a pseudoY combinator style operator to generate a recursive factorial function', function() {

        function preFac(pre) {
            return (n) =>  n > 1 ? n * pre(n - 1) : 1
        }
        let fac = pseudoY(preFac)

        it('should compute fact(5) as 120', function() {
            let x = fac(5)
            assert.equal(x,120)
        })
        it('should compute fact(4) as 24', function() {
            let x = fac(4)
            assert.equal(x,24)
        })
        it('should compute fact(0) as 1', function() {
            let x = fac(0)
            assert.equal(x,1)
        })
        it('should compute fact(1) as 1', function() {
            let x = fac(1)
            assert.equal(x,1)
        })
    })

    describe('After generate a recrusive fibonacci function with the pseudo pseudoY combinator', function() {


        function preFib(pre) {
            return function(n){
                if (n === 0) return 0
                if (n === 1) return 1
                return pre(n-1) + pre(n-2)
            }
        }

        let fib = pseudoY(preFib)

        it('should compute fib(0) as 0', function() {
            let x = fib(0)
            assert.equal(x,0)
        })
        it('should compute fib(1) as 1', function() {
            let x = fib(1)
            assert.equal(x,1)
        })
        it('should compute fib(3) as 2', function() {
            let x = fib(3)
            assert.equal(x,2)
        })
        it('should compute fib(4) as 3', function() {
            let x = fib(4)
            assert.equal(x,3)
        })
        it('should compute fib(5) as 5', function() {
            let x = fib(5)
            assert.equal(x,5)
        })
    })


    describe('After using a memoY combinator style operator to generate a recursive factorial function', function() {

        function preFac(pre) {
            return (n) =>  n > 1 ? n * pre(n - 1) : 1
        }
        let fac = memoY(preFac)

        it('should compute fact(5) as 120', function() {
            let x = fac(5)
            assert.equal(x,120)
        })
        it('should compute fact(4) as 24', function() {
            let x = fac(4)
            assert.equal(x,24)
        })
        it('should compute fact(0) as 1', function() {
            let x = fac(0)
            assert.equal(x,1)
        })
        it('should compute fact(1) as 1', function() {
            let x = fac(1)
            assert.equal(x,1)
        })
    })

    describe('After generate a recrusive fibonacci function with the memoizing pseudoY combinator', function() {


        function preFib(pre) {
            return function(n){
                if (n === 0) return 0
                if (n === 1) return 1
                return pre(n-1) + pre(n-2)
            }
        }

        let fib = memoY(preFib)

        it('should compute fib(0) as 0', function() {
            let x = fib(0)
            assert.equal(x,0)
        })
        it('should compute fib(1) as 1', function() {
            let x = fib(1)
            assert.equal(x,1)
        })
        it('should compute fib(3) as 2', function() {
            let x = fib(3)
            assert.equal(x,2)
        })
        it('should compute fib(4) as 3', function() {
            let x = fib(4)
            assert.equal(x,3)
        })
        it('should compute fib(5) as 5', function() {
            let x = fib(5)
            assert.equal(x,5)
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

    describe('When computing knapsack recursive with the sextet [item1,item2,item3,item4,item5,item6]', () => {
        it('the benefit shoudl be 260 and should be identical whether computed using recursive and recursive with pseudoY combinator', () => {
            let smallerKnapsack = new Knapsack({capacity: 30})

            let YrecResult = smallerKnapsack.zeroOneKnapsackRecursiveY(sextet)
            let recResult = smallerKnapsack.zeroOneKnapsackRecursive(sextet)
            assert.equal(260, recResult[0].cumul)
            assert.equal(260, YrecResult[0].cumul)
        })
    })


    //describe('When computing knapsack recursive with the sextet [item1,item2,item3,item4,item5,item6]', () => {
    //    it('the benefit shoudl be 260 and should be identical whether computed using recursive and recursive with memoY combinator', () => {
    //        let smallerKnapsack = new Knapsack({capacity: 30})
    //
    //        let YrecResult = smallerKnapsack.zeroOneKnapsackRecursiveMemoY(sextet)
    //        let recResult = smallerKnapsack.zeroOneKnapsackRecursive(sextet)
    //        assert.equal(260, recResult[0].cumul)
    //        assert.equal(260, YrecResult[0].cumul)
    //    })
    //})

})
