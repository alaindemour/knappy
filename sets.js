/**
 * Created by alaindemour on 12/27/15.
 */

"use strict"

let sampleItem = {benefit: 4, cost : 2}

// generates all subset of element of a given size, from a given array, but only starting at some position
function allSubSetsOfSize(fromArr,subsetSize,startAt) {

  let subsize = (typeof subsetSize  !== 'undefined') ? subsetSize : 1
  let at = (typeof startAt  !== 'undefined') ? startAt : 0

  console.log(`fromArr ${fromArr} subsetSize ${subsetSize}  startAt ${startAt}`)

  if (subsize > fromArr.length - at){
    return []
  }

  if (subsize === 0) {
    return []
  }

  if (subsize === 1) {
    // TBD replace with some immutable collection module
    return fromArr.slice(at,at+1)
  }

  if (subsetSize === fromArr.length - startAt) {
    return fromArr.slice(at)
  }

  let result = []
  for (let i = at ; i < fromArr.length; i++) {
    for (let j = i+1; j < fromArr.length; j++){
      let reduced = allSubSetsOfSize(fromArr,subsize- 1,j)
      let e = [fromArr[i]].concat(reduced)
      result.push(e)
    }
  }
  return result
}


module.exports = {
  allSubSetsOfSize : allSubSetsOfSize
}