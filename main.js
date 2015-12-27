/**
 * Created by alaindemour on 12/27/15.
 */


"use strict"

const sets = require('./sets')
const allSubSetsOfSize = sets.allSubSetsOfSize

let x = ['a','b','c','d','e','f']

let result = allSubSetsOfSize(x,2)

console.log(result)
