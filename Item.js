/**
 * Created by alaindemour on 12/27/15.
 */
"use strict"

class Item {
  constructor(benefit, cost) {
    this.benefit = benefit
    this.cost = cost
  }
}

Item.value = function value (listOfItems) {
  let sumOfBenefits = 0
  let sumOfCosts = 0
  for (let item of listOfItems){
    sumOfBenefits = sumOfBenefits + item.benefit
    sumOfCosts = sumOfCosts + item.cost
  }

  return new Item(sumOfBenefits,sumOfCosts)
}


module.exports = Item
