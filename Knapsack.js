/**
 * Created by alaindemour on 12/27/15.
 */

"use strict"
const powerSet = require('./powerSet').powerSet
const Item = require('./Item')
const _ = require('lodash')
const Ycombinator = require('./Ycombinator')

const pseudoY = Ycombinator.pseudoY
const memoY = Ycombinator.memoY
const TrieCache = require('./TrieCache')




class Knapsack {
    constructor(params) {
        this.capacity = params.capacity
    }


    zeroOneKnapsackRecursiveMemoY(listOfItems) {

        let capacity = this.capacity
        let numberOfPicks = listOfItems.length
        let bestMax = memoY(preBestMax)
        let result = bestMax(capacity, numberOfPicks)
        console.log(`all memo hits: ${bestMax.getHits()}`)
        return result

        function preBestMax(pre) {
            return function (capacity, numberOfPicks) {
                // Base case stops the recursion
                if (numberOfPicks === 0 || capacity === 0) {
                    return [{cumul: 0, item: null}]
                }

                // General recursive case
                let currentItem = listOfItems[numberOfPicks - 1]
                if (currentItem.cost > capacity) {
                    return pre(capacity, numberOfPicks - 1)
                }

                let A = pre(capacity - currentItem.cost, numberOfPicks - 1)
                let B = pre(capacity, numberOfPicks - 1)
                let pathAbenefit = A[0].cumul + currentItem.benefit
                let pathBbenefit = B[0].cumul

                return pathBbenefit > pathAbenefit ? B : [{cumul: pathAbenefit, item: currentItem}].concat(A)
            }
        }
    }

    // for benchmarking
    zeroOneKnapsackRecursiveFixedSizeMemo(listOfItems) {

        let capacity = this.capacity
        let numberOfPicks = listOfItems.length
        // position zero unused in this memo table, just to keep the mapping clear and obivious
        let memo = []
        for (let i = 0; i <= listOfItems.length; i++) {
            memo[i] = []
        }
        let memoHits = 0
        let complexity = 0

        function bestMax(capacity, numberOfPicks) {

            let hit = memo[numberOfPicks][capacity]
            if (hit) {
                memoHits++
                return hit
            }

            complexity++
            // Base case stops the recursion
            if (numberOfPicks === 0 || capacity === 0) {
                let result = [{cumul: 0, item: null}]
                memo[numberOfPicks][capacity] = result
                return result
            }

            // General recursive case
            let currentItem = listOfItems[numberOfPicks - 1]

            if (currentItem.cost > capacity) {
                return bestMax(capacity, numberOfPicks - 1)
            }
            let A = bestMax(capacity - currentItem.cost, numberOfPicks - 1)
            let B = bestMax(capacity, numberOfPicks - 1)
            let pathAbenefit = A[0].cumul + currentItem.benefit
            let pathBbenefit = B[0].cumul

            let result
            if (pathBbenefit > pathAbenefit) {
                result = B
            }
            else {
                result = [{cumul: pathAbenefit, item: currentItem}].concat(A)
                memo[numberOfPicks][capacity] = result
            }
            return result
        }

        let finalSolution = bestMax(capacity, numberOfPicks)
        console.log(`Memoized Hits: ${memoHits}`)
        console.log(`recursive complexity: ${complexity}`)
        console.log(`bottom up complexity: ${listOfItems.length * capacity}`)
        return finalSolution
    }


    // For testing and performance comparisons
    zeroOneKnapsackRecursive(listOfItems) {

        let capacity = this.capacity
        let numberOfPicks = listOfItems.length
        return bestMax(capacity, numberOfPicks)

        function bestMax(capacity, numberOfPicks) {
            // Base case stops the recursion
            if (numberOfPicks === 0 || capacity === 0) {
                return [{cumul: 0, item: null}]
            }

            // General recursive case
            let currentItem = listOfItems[numberOfPicks - 1]
            if (currentItem.cost > capacity) {
                return bestMax(capacity, numberOfPicks - 1)
            }

            let A = bestMax(capacity - currentItem.cost, numberOfPicks - 1)
            let B = bestMax(capacity, numberOfPicks - 1)
            let pathAbenefit = A[0].cumul + currentItem.benefit
            let pathBbenefit = B[0].cumul

            return pathBbenefit > pathAbenefit ? B : [{cumul: pathAbenefit, item: currentItem}].concat(A)
        }
    }

    // For testing and performance comparisons
    zeroOneKnapsackRecursiveY(listOfItems) {

        let capacity = this.capacity
        let numberOfPicks = listOfItems.length
        let bestMax = pseudoY(preBestMax)
        return bestMax(capacity, numberOfPicks)


        function preBestMax(pre) {
            return function (capacity, numberOfPicks) {
                // Base case stops the recursion
                if (numberOfPicks === 0 || capacity === 0) {
                    return [{cumul: 0, item: null}]
                }

                // General recursive case
                let currentItem = listOfItems[numberOfPicks - 1]
                if (currentItem.cost > capacity) {
                    return pre(capacity, numberOfPicks - 1)
                }

                let A = pre(capacity - currentItem.cost, numberOfPicks - 1)
                let B = pre(capacity, numberOfPicks - 1)
                let pathAbenefit = A[0].cumul + currentItem.benefit
                let pathBbenefit = B[0].cumul

                return pathBbenefit > pathAbenefit ? B : [{cumul: pathAbenefit, item: currentItem}].concat(A)
            }
        }
    }




    zeroOneKnapsackRecursiveGenericMemo(listOfItems) {

        let capacity = this.capacity
        let numberOfPicks = listOfItems.length
        // position zero unused in this memo table, just to keep the mapping clear and obivious
        let memo = new TrieCache()

        function bestMax(capacity, numberOfPicks) {

            let hit = memo.get(capacity,numberOfPicks)
            if (hit) {
                return hit
            }

            // Base case stops the recursion
            if (numberOfPicks === 0 || capacity === 0) {
                let result = [{cumul: 0, item: null}]
                memo.set(result,capacity,numberOfPicks)
                return result
            }

            // General recursive case
            let currentItem = listOfItems[numberOfPicks - 1]

            if (currentItem.cost > capacity) {
                return bestMax(capacity, numberOfPicks - 1)
            }
            let A = bestMax(capacity - currentItem.cost, numberOfPicks - 1)
            let B = bestMax(capacity, numberOfPicks - 1)
            let pathAbenefit = A[0].cumul + currentItem.benefit
            let pathBbenefit = B[0].cumul

            let result
            if (pathBbenefit > pathAbenefit) {
                result = B
            }
            else {
                result = [{cumul: pathAbenefit, item: currentItem}].concat(A)
                memo.set(result,capacity,numberOfPicks)
            }
            return result
        }

        let finalSolution = bestMax(capacity, numberOfPicks)
        return finalSolution
    }


    // brute for is simple if  very inefficient, to be used to unit testing the faster but more bug-prone versions
    bruteForce(listOfItems) {
        let max = new Item({benefit: 0, cost: 0})
        let all = powerSet(listOfItems)
        for (let sub of all) {
            let candidate = Item.value(sub)
            if (candidate.cost <= this.capacity) {
                if (candidate.benefit > max.benefit) {
                    max = candidate
                    max.list = sub
                }
            }
        }
        return max
    }

}


module.exports = Knapsack
