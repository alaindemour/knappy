/**
 * Created by alaindemour on 12/27/15.
 */


"use strict"

const sets = require('./sets')
const allSubSetsOfSize = sets.allSubSetsOfSize
const all = sets.allSubsets
const Knapsack = require('./Knapsack')
const Item = require('./Item')

let target = new Knapsack({capacity : 50})
let item1 = new Item({benefit: 60, cost:10})
let item2 = new Item({benefit: 100, cost: 20})
let item3 = new Item({benefit: 120, cost: 30})

let offer = [item1, item2, item3]


let result = target.bruteForce(offer)

console.log(result.benefit)

