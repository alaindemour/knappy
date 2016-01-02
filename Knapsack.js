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

    // The listOfItem is assumed to be sorted in decreasing benfits (most benefit first)
    // before this method is called.
    function bestMax(listOfItems, capacity, pos, numberOfPicks, solutionPath) {

      // memoized case, we have already computed this subproblem
      let solution = memo.get(`${capacity}.${pos}.${numberOfPicks}`)
      if (solution) {
        solutionPath.concat(solution.solutionPath)
        return solution.item.benefit
      }

      // normal base case (not memoized)
      if (numberOfPicks === 1) {
        // going down from most beneficial to least
        for (let i = pos; i < listOfItems.length; i++) {
          let item = listOfItems[i]
          if (item.cost <= capacity) {
            solutionPath.push(item)
            console.log(`ELEMENTARY SOLUTION benefit: ${item.benefit} cost: ${item.cost}`)
            memo.set(`${capacity}.${pos}.${numberOfPicks}`, {item: item, solutionPath: solutionPath})
            return item.benefit
          }
        }
        return 0
      }

      // general case
      let item = listOfItems[pos]
      let subPathA = []
      let benefitA = bestMax(listOfItems, capacity, pos + 1, numberOfPicks - 1, subPathA)
      let itemB = []
      let pathB = []
      let subPathB = []
      let benefitB = bestMax(listOfItems, capacity - item.cost, pos + 1, numberOfPicks - 1, subPathB)
      let totalB = benefitB + item.benefit
      if (benefitA > totalB) {
        solutionPath.concat(subPathA)
        console.log(
          `solution for capacity ${capacity}, numberofPicks ${numberOfPicks - 1} is PathA ${subPathA[0].cost}`)
        return benefitA
      }
      else {
        console.log(`solution for capacity ${capacity}, numberofPicks ${numberOfPicks - 1} is PathB ${subPathB[0].cost}`)
        solutionPath.push(itemB)
        solutionPath.concat(subPathB)
        return totalB
      }
    }

    let sorted = listOfItems.sort()
    return bestMax(sorted, capacity, 0, numberOfPicks, solutionPath)

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
