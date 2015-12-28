/**
 * Created by alaindemour on 12/27/15.
 */

"use strict"
const allSubsets = require('./sets').allSubsets
const Item = require('./Item')

class Knapsack {
  constructor(capacity) {
    this.capacity = capacity
  }

  bruteForce(listOfItems) {
    let max = new Item(0, 0)
    let all = allSubsets(listOfItems)
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
