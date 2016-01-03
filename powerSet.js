/**
 * Created by alaindemour on 12/27/15.
 */

"use strict"
const _ = require('lodash')

// Fast powerset computation, no dependencies on anything
function powerSet(input) {
  let complexity = 0
  let accu = [[]]
  const len = input.length
  for (let i = 0; i < len; i++) {
    let ele = input[i]
    const acculen = accu.length
    for (let j = 0; j < acculen; j++){
      // use concat because we need a brand new array each time, push would be in place and would not do the job here
      let newarray = accu[j].concat([ele])
      complexity++
      accu.push(newarray)
    }
  }
  console.log(`Powerset complexity ${complexity}`)
  return accu
}



// generates all subset of element of a given size, from a given array, but only starting at some position
function allSubSetsOfSize(fromArr, subsetSize, startAt) {
  let subsize = (typeof subsetSize !== 'undefined') ? subsetSize : 1
  let at = (typeof startAt !== 'undefined') ? startAt : 0
  let len = fromArr.length

  // Base and Pathological Cases

  // Impossibility, subset is larger than enclosing set
  if (subsize > len - at) {
    return []
  }

  // Empty Set
  if (subsize === 0) {
    return [[]]
  }

  // Singletons
  if (subsize === 1) {
    // TBD replace with some immutable collection module
    let result = []
    for (let i = at; i < len; i++) {
      result.push([fromArr[i]])
    }
    return result
  }

  // identity, subset is the same as enclosing set
  if (subsetSize === len - at) {
    return [fromArr.slice(at)]
  }

  // General Case
  let result = []
  for (let i = at; i < len; i++) {
    let current = fromArr[i]
    let reduced = allSubSetsOfSize(fromArr, subsize - 1, i + 1)
    let reducedLen = reduced.length
    for (let k = 0; k < reducedLen; k++) {
      let e = [current].concat(reduced[k])
      result.push(e)
    }
  }
  return result
}



module.exports = {
  allSubSetsOfSize: allSubSetsOfSize
  , powerSet : powerSet
}