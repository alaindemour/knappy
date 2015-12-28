/**
 * Created by alaindemour on 12/27/15.
 */


"use strict"

const sets = require('./sets')
const allSubSetsOfSize = sets.allSubSetsOfSize
const all = sets.allSubsets


let x = ['a','b','c','d','e']
let y = ['a','b','c','d']

//let result = allSubSetsOfSize(x,4)

let result = all(x)

console.log(result)
console.log(result.length)
