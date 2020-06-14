export default class ShoppingCart {
  constructor() {
    this.initCart();
  }

  initCart() {
    const savedCartItems = localStorage.getItem("cartItems");

    this.products = JSON.parse(savedCartItems) || [];
    this.checkedOut = false;
  }

  addProduct(product) {
    this.products.push(product);
  }

  removeProduct(product) {
    const savedCartItems = localStorage.getItem("cartItems");
    let index = this.products.indexOf(product);
    this.products = JSON.parse(savedCartItems);
    if (index > -1) {
      this.products.splice(index, 1);
    }
  }

  clearCart() {
    this.products = [];
    localStorage.setItem("cartItems", JSON.stringify(this.products));
  }

  get totalPrice() {
    const totalprice = this.products.reduce(
      (extra, item) => (extra += Number(item._price)),
      0
    );
    return totalprice;
  }

  checkout(customer) {
    if (customer.balance >= this.totalPrice) {
      this.checkedOut = true;
      customer.buy(this.totalPrice);
    } else {
      throw new Error("You dont have enough money");
    }
  }

  //Only ships if checkedout above
  ship(country) {
    if (this.checkedOut) {
      this.products.forEach((product) => {
        if (!product.shippableTo.includes(country)) {
          throw new Error(`Can't ship ${product.name} to ${country}!`);
        }
      });
      this.initCart();

      return true;
    } else {
      throw new Error("Cart isn't checked out!");
    }
  }
}
