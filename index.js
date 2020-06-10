const VAT = 1.17;

const alaa = new Customer("Alaa Bashiyi", 7590);

const cart = new ShoppingCart();

const domUpdates = new DomHandler();

const filters = new filterItems();

const sortit = new Sortby();

domUpdates.getItemsFromServer();

domUpdates.listener();

domUpdates.updateShoppingCart(cart.products);

filters.addListenersForLinks();

sortit.listeners();

// cart.removeProduct(gamingpc);

// try {
//   cart.checkout(alaa);

//   cart.ship("Israel");
//   console.log("shipped");
// } catch (err) {
//   console.log(
//     err.message,
//     `Total price is ${cart.totalPrice} and you your balance is ${alaa.balance}`
//   );
// }

async function getThemItems() {
  const response = await fetch("./data/data.json");
  const data = await response.json();

  this.addItemsFromServer(data);
  console.log(data);
  return data;
}
