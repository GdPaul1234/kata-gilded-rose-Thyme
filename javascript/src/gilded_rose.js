class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this._quality = quality;
  }

  get quality() {
    return this._quality;
  }

  set quality(value) {
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
    // Quality drops to 0 after the concert
    if (element.sellIn <= 0) {
      element.quality = 0;
      return;
    }

    element.quality++;
    if (element.sellIn < 11) element.quality++;
    if (element.sellIn < 6) element.quality++;
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
