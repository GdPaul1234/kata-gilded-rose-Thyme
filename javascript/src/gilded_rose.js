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
          if (element.quality < 50)
            element.quality++;
          break;
        case 'Backstage passes to a TAFKAL80ETC concert':
          element.quality = 0;
          break;
        case 'Sulfuras, Hand of Ragnaros':
          // noop
          break;
        default:
          if (element.quality > 0)
            element.quality--;
          break;
      }
    }
  }

  updateQuality() {
    for (const element of this.items) {
      if (element.name != 'Aged Brie' && element.name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (element.quality > 0 && element.name != 'Sulfuras, Hand of Ragnaros') {
          element.quality = element.quality - 1;
        }
      } else {
        if (element.quality < 50) {
          element.quality = element.quality + 1;
          if (element.name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (element.quality < 50) {
              if (element.sellIn < 11) {
                element.quality = element.quality + 1;
              }
              if (element.sellIn < 6) {
                element.quality = element.quality + 1;
              }
            }
          }
        }
      }
      if (element.name != 'Sulfuras, Hand of Ragnaros') {
        element.sellIn = element.sellIn - 1;
      }
      this.#updateQualityWhenNegativeSellIn(element);
    }

    return this.items;
  }
}
module.exports = {
  Item,
  Shop
}
