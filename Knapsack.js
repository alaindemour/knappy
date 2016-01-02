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
    let solutionPath = []
    let memo = new Map()
    let memoHits = 0

    // The listOfItem is assumed to be sorted in decreasing benfits (most benefit first)
    // before this method is called.
    function bestMax(listOfItems, capacity, numberOfPicks) {

      let item = listOfItems[numberOfPicks -1]

      // Base Cases
      // Pathological corner case
      if (numberOfPicks === 0) {
        return [{ head : 0, tail : null}]
      }

      // normal base case which ends recursion
      if (numberOfPicks === 1) {
        if (item.cost <= capacity) {
          memo.set(`${capacity}.${numberOfPicks}`, [{compoundedBenefit: item.benefit, item: item}])
          return [{ compoundedBenefit : item.benefit, item: item}]
        }
        else {
          memo.set(`${capacity}.${numberOfPicks}`, [{compoundedBenefit: 0, item: null}])
          return [{compoundedBenefit: 0, item: null}]
        }
      }

      // memoized case, we have already computed this subproblem
      let solution = memo.get(`${capacity}.${numberOfPicks}`)
      if (solution) {
        memoHits++
        return solution
      }

      // general case
      // item to be tested

      let benefitA = bestMax(listOfItems, capacity, numberOfPicks - 1)
      let subBenefitsB = bestMax(listOfItems, capacity - item.cost, numberOfPicks - 1)
      let totalBenefitB = subBenefitsB[0].compoundedBenefit + item.benefit
      let max = null

      if (benefitA[0].compoundedBenefit > totalBenefitB) {
//        console.log(`solution for capacity ${capacity}, numberofPicks ${numberOfPicks - 1} is PathA ${subPathA[0].cost}`)
        max = benefitA
      }
      else {
          subBenefitsB.unshift({compoundedBenefit :totalBenefitB, item : item})
//        console.log(`solution for capacity ${capacity}, numberofPicks ${numberOfPicks - 1} is PathB ${subPathB[0].cost}`)
        max = subBenefitsB
      }
      memo.set(`${capacity}.${numberOfPicks}`, max)
      return max
    }

    let sorted = listOfItems.sort()
    let finalSolution = bestMax(sorted, capacity,numberOfPicks)
    console.log(`Memoized Solutions: ${memo.size}`)
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
