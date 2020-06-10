class Product {
  constructor(name, price, shippableTo, hasVAT, cat, imgURL, id) {
    this.name = name;
    this._price = price;
    this.shippableTo = shippableTo;
    this.hasVAT = hasVAT;
    this.cat = cat;
    this.imgURL = imgURL;
    this.id = id;
  }

  get price() {
    if (this.hasVAT) {
      return this._price * VAT;
    }
    return this._price;
  }
}
