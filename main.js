/**
 * Created by alaindemour on 12/27/15.
 */


"use strict"

const sets = require('./powerSet')
const allSubSetsOfSize = sets.allSubSetsOfSize
const all = sets.powerSet
const Knapsack = require('./Knapsack')
const Item = require('./Item')
//
//let target = new Knapsack({capacity : 50})
//let item1 = new Item({benefit: 60, cost:10})
//let item2 = new Item({benefit: 100, cost: 20})
//let item3 = new Item({benefit: 120, cost: 30})
//
//let offer = [item1, item2, item3]
//
//
//let result = target.bruteForce(offer)
//
//console.log(result.benefit)


let startTime = Date.now()
let p = all(['a','b','c','d','e','f','g','h','i','j','k','l','m','o','p','q','r','s','t'])
let endTime = Date.now()

//console.log(p)
console.log(endTime - startTime)
