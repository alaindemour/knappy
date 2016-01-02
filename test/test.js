/**
 * Created by alaindemour on 12/27/15.
 */

"use strict"


const _ = require('lodash')
const assert = require('assert')
const sets = require('../powerSet')
const allSubSetsOfSize = sets.allSubSetsOfSize
const powerSet = sets.powerSet
const Knapsack = require('../Knapsack')
const Item = require('../Item')

describe('subsets of a given sizes', () => {

  let x = ['a', 'b', 'c', 'd', 'e']
  let singletonsOfx = _.chunk(x)


  describe('When calling with an array of objects [a,b,c,d,e] and default size and start position', () => {
    it('should return the exact an array of the all the singleton', () => {
      assert.deepEqual(singletonsOfx, allSubSetsOfSize(x))
    })
  })

  describe('When calling with an array of objects [a,b,c,d,e] for subsets of size zero i.e. empty set', () => {
    it('should return the empty set ', () => {
      assert.deepEqual([[]], allSubSetsOfSize(x, 0))
    })
  })

  describe('When calling with an array of objects [a,b,c,d,e] for subsets of size 2', () => {
    it('should return 10 subsets', () => {
      assert.equal(10, allSubSetsOfSize(x, 2).length)
    })
  })

  describe('When calling with an array of objects [a,b,c,d,e] for subsets of size 3', () => {
    it('should return 10 subsets', () => {
      assert.equal(10, allSubSetsOfSize(x, 3).length)
    })
  })

  describe('When calling with an array of objects [a,b,c,d,e] for subsets of size 4', () => {
    it('should return 5 subsets', () => {
      assert.equal(5, allSubSetsOfSize(x, 4).length)
    })
  })

  describe('When calling with an array of objects [a,b,c,d,e] for subsets of size 5', () => {
    it('should return 1 subsets', () => {
      assert.equal(1, allSubSetsOfSize(x, 5).length)
    })
  })

})


describe('set of all the subsets', () => {

  let x = ['a', 'b', 'c', 'd', 'e']

  describe('When computing the set of all the subsets of [a,b,c,d,e]', () => {
    it('should return 2^5 === 32 subsets', () => {
      assert.equal(32, powerSet(x).length)
    })
  })

})

describe('knapsack', () => {

  let target = new Knapsack({capacity : 50})
  let item1 = new Item({benefit: 60, cost:10})
  let item2 = new Item({benefit: 100, cost: 20})
  let item3 = new Item({benefit: 120, cost: 30})


  let offer = [item1, item2, item3]

  describe('When computing the brute force of the target knapsack', () => {
    it('the benefit shoudl be 200 and the list contains item2 and item3', () => {
      let result = target.bruteForce(offer)
      assert.equal(220, result.benefit)
    })
  })

  let singleton = [item1]

  describe('When computing knapsack recursive with the singleton item1', () => {
    it('the benefit shoudl be 60 and the list contains onl item1', () => {
      let result = target.zeroOneKnapsackRecursive(singleton)
      assert.equal(60, result)
    })
  })

  let pair = [item1,item2]

  describe('When computing knapsack recursive with the pair [item1,item2]', () => {
    it('the benefit shoudl be 160 and the list contains onl item1 item2', () => {
      let result = target.zeroOneKnapsackRecursive(pair)
      assert.equal(160, result)
    })
  })


  let triplet = [item1,item2,item3]

  describe('When computing knapsack recursive with the truplet [item1,item2,item3]', () => {
    it('the benefit shoudl be 220 and the list contains onl item1 item3', () => {
      let result = target.zeroOneKnapsackRecursive(triplet)
      assert.equal(220, result)
    })
  })

})


