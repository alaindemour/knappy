/**
 * Created by alaindemour on 12/27/15.
 */
"use strict"

class Item {
  constructor(params) {
    this.benefit = params.benefit
    this.cost = params.cost
  }

  static value(listOfItems) {
    let sumOfBenefits = 0
    let sumOfCosts = 0
    for (let item of listOfItems){
      sumOfBenefits = sumOfBenefits + item.benefit
      sumOfCosts = sumOfCosts + item.cost
    }

    return new Item({benefit: sumOfBenefits, cost: sumOfCosts})
  }
}


module.exports = Item
