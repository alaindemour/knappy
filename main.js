/**
 * Created by alaindemour on 12/27/15.
 */


"use strict"

const sets = require('./sets')
const allSubSetsOfSize = sets.allSubSetsOfSize
const all = sets.allSubsets
const Knapsack = require('./Knapsack')
const Item = require('./Item')

let target = new Knapsack(100)

let item1 = new Item(80,80)
let item2 = new Item(50,50)
let item3 = new Item(10,10)

let offer = [item1,item2,item3]

let result = target.bruteForce(offer)

console.log(result.benefit)

