/**
 * Created by alaindemour on 12/27/15.
 */

"use strict"
const powerSet = require('./powerSet').powerSet
const Item = require('./Item')

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
    function bestMax(listOfItems, capacity, numberOfPicks, solutionPath) {


      // Base Cases

      // Pathological corner case
      if (numberOfPicks === 0) {
        return 0
      }

      // normal base case (not memoized)
      if (numberOfPicks === 1) {
        let item = listOfItems[0]
        if (item.cost <= capacity) {
          solutionPath.push(item)
          console.log(`ELEMENTARY SOLUTION benefit: ${item.benefit} cost: ${item.cost}`)
          memo.set(`${capacity}.${numberOfPicks}`, {item: item, solutionPath: solutionPath})
          return item.benefit
        }
        return 0
      }

      // memoized case, we have already computed this subproblem
      let solution = memo.get(`${capacity}.${numberOfPicks}`)
      if (solution) {
        memoHits++
        solutionPath.concat(solution.solutionPath)
        return solution.item.benefit
      }

      // general case
      // item to be tested
      let item = listOfItems[numberOfPicks -1]

      let subPathA = []
      let benefitA = bestMax(listOfItems, capacity, numberOfPicks - 1, subPathA)

      let subPathB = []
      let subBenefitsB = bestMax(listOfItems, capacity - item.cost, numberOfPicks - 1, subPathB)
      let totalBenefitB = subBenefitsB + item.benefit

      if (benefitA > totalBenefitB) {
        solutionPath.concat(subPathA)
//        console.log(`solution for capacity ${capacity}, numberofPicks ${numberOfPicks - 1} is PathA ${subPathA[0].cost}`)
        return benefitA
      }
      else {
        solutionPath.push(item)
        solutionPath.concat(subPathB)
//        console.log(`solution for capacity ${capacity}, numberofPicks ${numberOfPicks - 1} is PathB ${subPathB[0].cost}`)
        return totalBenefitB
      }
    }

    let sorted = listOfItems.sort()
    let finalSolution = bestMax(sorted, capacity,numberOfPicks, solutionPath)
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
