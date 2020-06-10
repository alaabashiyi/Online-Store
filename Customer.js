class Customer {
  constructor(name, balance) {
    this.name = name;
    this.balance = balance;
  }

  buy(amount) {
    if (this.balance >= amount) {
      this.balance -= amount;
    } else {
      throw "NO enought balance";
    }
  }
}
