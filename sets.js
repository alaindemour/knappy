/**
 * Created by alaindemour on 12/27/15.
 */

"use strict"

let sampleItem = {benefit: 4, cost : 2}

// generates all subset of element of a given size, from a given array, but only starting at some position
function allSubSetsOfSize(fromArr,subsetSize,startAt) {

  subsetSize = (typeof subsetSize  !== 'undefined') ? subsetSize : 1
  startAt = (typeof startAt  !== 'undefined') ? startAt : 0

  console.log(`subsetSize ${subsetSize} fromArr.length ${fromArr.length}`)
  if (subsetSize > fromArr.length){
    throw new Error('subset size larger than size of universe')
  }

  if (subsetSize === 1) {
    // TBD replace with some immutable collection module
    return fromArr.slice(startAt)
  }

  let result = []
  for (let i = 0 ; i < fromArr.length; i++) {
    for (let j = i+1; j < fromArr.length; j++){
      let reduced = allSubSetsOfSize(fromArr,j,subsetSize - 1)
      let e = [fromArr[i]].concat(reduced)
      result.push(e)
    }
  }
  return result
}


module.exports = {
  allSubSetsOfSize : allSubSetsOfSize
}