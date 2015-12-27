/**
 * Created by alaindemour on 12/27/15.
 */

"use strict"


let sampleItem = {benefit: 4, cost : 2}


// generates all subset of element of a given size, from a given array, but only starting at some position
function allSubSetsOfSize(fromArray,startAt,subsetSize) {

  if (size > arr.length){
    throw new Error('subset size larger than size of universe')
  }

  if (size === 1) {
    return fromArray.slice(startAt)
  }

  for (let i = 0 ; i < fromArray.length; i++) {
    for (let j = i+1; j < fromArray.length; j++){
      let reduced = allSubSetsOfSize(fromArray,j,subsetSize -1)
    }
  }



}

function allSubSets(arr) {



}