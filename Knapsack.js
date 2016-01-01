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


  zeroOneKnapsackRecursive(listOfItems) {

    let capacity = this.capacity
    let numberOfPicks = listOfItems.length
    let solutionPath = []
    let memo = new Map()

    let self = this

    // The listOfItem is assumed to be sorted in decreasing benfits (most benefit first)
    // before this method is called.
    function bestMax(listOfItems, capacity, numberOfPicks, solutionPath) {

      // memoized case, we have already computed this subproblem
      let solution = memo.get(`${capacity}${numberOfPicks}`)
      if (solution) {
        solutionPath.concat(solution.solutionPath)
        return solution.item.benefit
      }

      // normal base case (not memoized)
      if (numberOfPicks === 1) {
        // going down from most beneficial to least
        for (let item of listOfItems) {
          if (item.cost <= self.capacity) {
            solutionPath.push(item)
            console.log(`ELEMENTARY SOLUTION ${item.cost}`)
            memo.set(`${capacity}${numberOfPicks}`, {item: item, solutionPath: solutionPath})
            return item.benefit
          }
        }
      }

      // general case
      let subPathA = []
      let benefitA = bestMax(listOfItems, capacity, numberOfPicks - 1, subPathA)
      let pathB = []
      let maxBs = 0
      for (let item of listOfItems) {
        let subPathB = []
        let benefitB = self.bestMax(listOfItems, capacity - item.benefit, numberOfPicks - 1, subPathB)
        if (benefitB > maxBs) {
          maxBs = benefitB
          pathB = subPathB
        }
        if (benefitA > maxBs) {
          solutionPath.concat(subPathA)
          console.log(`solution for capacity ${capacity}, numberofPicks ${numberOfPicks - 1} is ${subPathA[0].cost}`)
          return benefitA
        }
        else {
          console.log(`solution for capacity ${capacity}, numberofPicks ${numberOfPicks - 1} is ${pathB[0].cost}`)
          solutionPath.concat(pathB)
          return maxBs
        }
      }
    }

    return bestMax(listOfItems, capacity, numberOfPicks, solutionPath)

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
