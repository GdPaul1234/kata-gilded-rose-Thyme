class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
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
          if (element.quality < 50) element.quality++;
          break;
        case 'Backstage passes to a TAFKAL80ETC concert':
          element.quality = 0;
          break;
        case 'Sulfuras, Hand of Ragnaros':
          // noop
          break;
        default:
          if (element.quality > 0) element.quality--;
          break;
      }
    }
  }

  #updateQualityWhenLessThan50(element) {
    if (element.quality < 50) {
      element.quality++;

      if (element.name == 'Backstage passes to a TAFKAL80ETC concert' && element.quality < 50) {
        if (element.sellIn < 11) element.quality++;
        if (element.sellIn < 6) element.quality++;
      }
    }
  }

  updateQuality() {
    for (const element of this.items) {
      switch (element.name) {
        case 'Aged Brie':
        case 'Backstage passes to a TAFKAL80ETC concert':
          this.#updateQualityWhenLessThan50(element);
          break;
        default:
          if (element.quality > 0 && element.name != 'Sulfuras, Hand of Ragnaros') element.quality--;
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
