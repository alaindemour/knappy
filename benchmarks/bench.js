/**
 * Created by alaindemour on 1/11/16.
 */

"use strict"

const _ = require('lodash')
const assert = require('assert')
const sets = require('../powerSet')
const allSubSetsOfSize = sets.allSubSetsOfSize
const powerSet = sets.powerSet
const Knapsack = require('../Knapsack')
const Item = require('../Item')
const TrieCache = require('../TrieCache')
const pseudoY = require('../Ycombinator').pseudoY
const memoY = require('../Ycombinator').memoY


let smallerKnapsack = new Knapsack({capacity: 2000})

let sextet = []

for (let i = 0; i < 20; i++){
    let b = Math.floor(Math.random * 100)
    let c = Math.floor(Math.random * 100)
    sextet.push(new Item({benefit: b, cost: c, name : `${i}`}))
}


//let item1 = new Item({benefit: 60, cost: 10, name: 'item1'})
//let item2 = new Item({benefit: 100, cost: 20, name: 'item2'})
//let item3 = new Item({benefit: 120, cost: 30, name: 'item3'})
//let item4 = new Item({benefit: 90, cost: 10, name: 'item4'})
//let item5 = new Item({benefit: 75, cost: 13, name: 'item5'})
//let item6 = new Item({benefit: 110, cost: 10, name: 'item6'})

//let sextet = [item1, item2, item3, item4, item5, item6]

let before = 0
let after = 0

before = Date.now()
let YMemoizedRecursiveResult = smallerKnapsack.zeroOneKnapsackRecursiveMemoY(sextet)
after = Date.now()
console.log(`Y combinator memoized recursive took ${after - before}  msec`)


//before = Date.now()
//let bruteForceResult = smallerKnapsack.bruteForce(sextet)
//after = Date.now()
//console.log(`Brute Force took ${after - before}  msec`)

//before = Date.now()
//let naiveRecursiveResult = smallerKnapsack.zeroOneKnapsackRecursive(sextet)
//after = Date.now()
//console.log(`Naive Recursive took ${after - before}  msec`)

//before = Date.now()
//let handMemoizedRecursiveResult = smallerKnapsack.zeroOneKnapsackRecursiveFixedSizeMemo(sextet)
//after = Date.now()
//console.log(`Hand Memoized Recursive took ${after - before}  msec`)

//before = Date.now()
//let YRecursiveResult = smallerKnapsack.zeroOneKnapsackRecursiveY(sextet)
//after = Date.now()
//console.log(`Y combinator recursive took ${after - before}  msec`)


//before = Date.now()
//let dynaHandMemo = smallerKnapsack.zeroOneKnapsackRecursiveGenericMemo(sextet)
//after = Date.now()
//console.log(`dynamic hand memo took ${after - before}  msec`)