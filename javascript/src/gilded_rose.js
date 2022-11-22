class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn; // number of days we have to sell the item
    this._quality = quality; // how valuable the item
  }

  get quality() {
    return this._quality;
  }

  set quality(value) {
    // The Quality of an item is never negative
    // The Quality of an item is never more than 50
    this._quality = Math.min(Math.max(0, value), 50);
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  #updateQualityWhenNegativeSellIn(element) {
    if (element.sellIn < 0) {
      switch (element.name) {
        case 'Aged Brie':
          element.quality++;
          break;
        case 'Backstage passes to a TAFKAL80ETC concert':
        case 'Sulfuras, Hand of Ragnaros':
          // noop
          break;
        default:
          element.quality--;
          break;
      }
    }
  }

  #updateQualityOfBackStagePass(element) {
    if (element.sellIn <= 0) {
      // Quality drops to 0 after the concert
      element.quality = 0;
    } else if (element.sellIn < 6) {
      // Quality increases by 2 when there are 10 days or less
      element.quality += 3;
    } else if (element.sellIn < 11) {
      // Quality increases by 3 when there are 5 days or less
      element.quality+= 2;
    } else {
      // Else Quality increase by 1
      element.quality++;
    }
  }

  updateQuality() {
    for (const element of this.items) {
      switch (element.name) {
        case 'Aged Brie':
          element.quality++;
          break;
        case 'Backstage passes to a TAFKAL80ETC concert':
          this.#updateQualityOfBackStagePass(element);
          break;
        case 'Sulfuras, Hand of Ragnaros':
          // noop
          break;
        default:
          element.quality--;
          break;
      }

      if (element.name != 'Sulfuras, Hand of Ragnaros') element.sellIn--;
      this.#updateQualityWhenNegativeSellIn(element);
    }

    return this.items;
  }
}
module.exports = {
  Item,
  Shop
}
