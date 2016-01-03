/**
 * Created by alaindemour on 12/27/15.
 */


"use strict"

const _ = require('lodash')
const sets = require('./powerSet')
const allSubSetsOfSize = sets.allSubSetsOfSize
const all = sets.powerSet
const Knapsack = require('./Knapsack')
const Item = require('./Item')

//
//let x = ['a', 'b', 'c', 'd', 'e']
//
//let y = all(x)
//
//console.log(y.length)





//let startTime = Date.now()
//let p = all(['a','b','c','d','e','f','g','h','i','j','k','l','m','o','p','q','r','s','t'])
//let endTime = Date.now()
//
////console.log(p)
//console.log(endTime - startTime)


let target = new Knapsack({capacity : 30})

let item1 = new Item({benefit: 60, cost:10 , name : 'item1'})
let item2 = new Item({benefit: 100, cost: 20, name : 'item2'})
let item3 = new Item({benefit: 120, cost: 30, name : 'item3'})
let item4 = new Item({benefit: 90, cost: 10, name : 'item4'})
let item5 = new Item({benefit: 75, cost: 13, name : 'item5'})
let item6 = new Item({benefit: 110, cost: 10, name : 'item6'})
let item7 = new Item({benefit: 80, cost: 5, name : 'item7'})
let item8 = new Item({benefit: 80, cost: 5, name : 'item8'})
let item9 = new Item({benefit: 1, cost: 1, name : 'item9'})
let item10 = new Item({benefit: 1, cost: 1, name : 'item10'})
let item11 = new Item({benefit: 1, cost: 1, name : 'item11'})
let item12 = new Item({benefit: 1000, cost: 1000, name : 'item12'})
let item13 = new Item({benefit: 1000, cost: 1000, name : 'item13'})




let x = [item1, item2,item3,item4,item5,item6,item7,item8,item9,item10,item11,item12,item13]

let result = target.zeroOneKnapsackRecursive(x)
let boo = target.bruteForce(x)

let totalBenefit = result[0].cumul
console.log(`totalBenefit : ${totalBenefit}`)
console.log(result)
console.log(boo.benefit)