/**
 * Created by alaindemour on 12/27/15.
 */

"use strict"
const powerSet = require('./sets').powerSet
const Item = require('./Item')

class Knapsack {
  constructor(params) {
    this.capacity = params.capacity
  }

  bruteForce(listOfItems) {
    let max = new Item({benefit:0, cost: 0})
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
