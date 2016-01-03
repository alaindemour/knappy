/**
 * Created by alaindemour on 12/27/15.
 */

"use strict"
const powerSet = require('./powerSet').powerSet
const Item = require('./Item')
const list = require('./list')


class Knapsack {
  constructor(params) {
    this.capacity = params.capacity
  }

  zeroOneKnapsackRecursive(listOfItems) {

    let capacity = this.capacity
    let numberOfPicks = listOfItems.length

    // position zero unused in this memo table, just to keep the mapping clear and obivious
    let memo = []
    for (let i = 0; i <= listOfItems.length; i++) {
      memo[i] = []
    }
    let memoHits = 0

    // The listOfItem is assumed to be sorted in decreasing benfits (most benefit first)
    // before this method is called.
    function bestMax(listOfItems, capacity, numberOfPicks) {

      if (numberOfPicks === 0 || capacity === 0) {
        return [{cumul: 0, item: null}]
      }

      let currentItem = listOfItems[numberOfPicks - 1]

      if (currentItem.cost > capacity) {
        return bestMax(listOfItems, capacity, numberOfPicks - 1)
      }

      let A = bestMax(listOfItems, capacity - currentItem.cost, numberOfPicks - 1)
      let pathAbenefit = A[0].cumul + currentItem.benefit
      let B = bestMax(listOfItems, capacity, numberOfPicks - 1)
      let pathBbenefit = B[0].cumul

      let result
      if (pathBbenefit > pathAbenefit) {
        result = B
      }
      else {
        A.unshift({cumul: pathAbenefit, item: currentItem})
        result = A
      }

      return result
    }

    let finalSolution = bestMax(listOfItems, capacity, numberOfPicks)
    console.log(`Memoized Hits: ${memoHits}`)
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
