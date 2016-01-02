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

  // The list of items can be unsorted, we will sort
  zeroOneKnapsackRecursive(listOfItems) {

    let capacity = this.capacity
    let numberOfPicks = listOfItems.length

    // position zero unused in this memo table, just to keep the mapping clear and obivious
    let memo = []
    for (let i = 0 ; i <= listOfItems.length ; i++) {
      memo[i] = []
    }
    let memoHits = 0

    // The listOfItem is assumed to be sorted in decreasing benfits (most benefit first)
    // before this method is called.
    function bestMax(listOfItems, capacity, numberOfPicks) {

      let item = listOfItems[numberOfPicks - 1]

      // Base Cases
      if (numberOfPicks === 0 || capacity <= 0) {
        return [{compoundedBenefit: 0, item : null}]
      }

      // normal base case which ends recursion
      if (numberOfPicks === 1) {
        if (item.cost <= capacity) {
          memo[numberOfPicks][capacity] = [{compoundedBenefit: item.benefit, item: item}]
          return [{compoundedBenefit: item.benefit, item: item}]
        }
        else {
          memo[numberOfPicks][capacity]= [{compoundedBenefit: 0, item: null}]
          return [{compoundedBenefit: 0, item: null}]
        }
      }

      // memoized case, we have already computed this subproblem
      let solution = memo[numberOfPicks][capacity]
      if (solution) {
        memoHits++
        return solution
      }

      // general case
      let pathA = bestMax(listOfItems, capacity, numberOfPicks - 1)
      let pathB = bestMax(listOfItems, capacity - item.cost, numberOfPicks - 1)
      let totalBenefitB = pathB[0].compoundedBenefit + item.benefit
      let max = null

      if (pathA[0].compoundedBenefit > totalBenefitB) {
        max = pathA
      }
      else {
        pathB.unshift({compoundedBenefit: totalBenefitB, item: item})
        max = pathB
      }
      memo[numberOfPicks][capacity] = max
      return max
    }

    let sorted = listOfItems.sort()
    let finalSolution = bestMax(sorted, capacity, numberOfPicks)
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
