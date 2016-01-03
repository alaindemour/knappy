/**
 * Created by alaindemour on 12/27/15.
 */


"use strict"

const sets = require('./powerSet')
const allSubSetsOfSize = sets.allSubSetsOfSize
const all = sets.powerSet
const Knapsack = require('./Knapsack')
const Item = require('./Item')



//let startTime = Date.now()
//let p = all(['a','b','c','d','e','f','g','h','i','j','k','l','m','o','p','q','r','s','t'])
//let endTime = Date.now()
//
////console.log(p)
//console.log(endTime - startTime)


let target = new Knapsack({capacity : 50})

let item1 = new Item({benefit: 60, cost:10 , name : 'item1'})
let item2 = new Item({benefit: 100, cost: 20, name : 'item2'})
let item3 = new Item({benefit: 120, cost: 30, name : 'item3'})
let item4 = new Item({benefit: 90, cost: 10, name : 'item4'})


let x = [item1, item2,item3,item4]


let result = target.zeroOneKnapsackRecursive(x)

let totalBenefit = result[0].cumul

console.log(`totalBenefit : ${totalBenefit}`)
console.log(result)