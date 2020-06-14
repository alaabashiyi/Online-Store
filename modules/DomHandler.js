const itemsContainer = document.querySelector("#items-container");
const cartContainer1 = document.querySelector("#shopping-cart-1");
const cartContainer2 = document.querySelector("#shopping-cart-2");
const checkoutMsgBox = [...document.querySelectorAll(".checkout-msg-box")];

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

export default class DomHandler {
  constructor(alaa, cart) {
    this.alaa = alaa;
    this.cart = cart;
  }
  listener() {
    document.querySelectorAll("div.item button").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.cart.addProduct(e.target.parentNode.type);
        this.updateShoppingCart(this.cart.products);
        this.addTypeToCartItems(this.cart.products);
        this.saveCartToLocalStorage(this.cart.products);
      });

      document
        .querySelector("#checkout-cart-1")
        .addEventListener("click", (e) => {
          this.checkoutCart();
        });

      document
        .querySelector("#checkout-cart-2")
        .addEventListener("click", (e) => {
          this.checkoutCart();
        });
    });

    document.querySelector("#clear-cart-1").addEventListener("click", () => {
      this.cart.clearCart();
      this.updateShoppingCart(this.cart.products);
    });
    document.querySelector("#clear-cart-2").addEventListener("click", () => {
      this.cart.clearCart();
      this.updateShoppingCart(this.cart.products);
    });
  }

  checkoutCart() {
    try {
      this.cart.checkout(this.alaa);
      this.cart.ship("Israel");
      this.cart.clearCart();
      this.updateShoppingCart(this.cart.products);

      checkoutMsgBox.forEach((cartCont) => {
        cartCont.innerHTML = `
      <div class="alert alert-warning alert-dismissible fade show" role="alert">
         <strong>Thank You!</strong> You should receive an email about your order. and it will be shipped soon!
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
         <span aria-hidden="true">&times;</span>
         </button>
      </div>
      `;
      });
    } catch (err) {
      checkoutMsgBox.forEach((errMsgC) => {
        errMsgC.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
          <h4 class="alert-heading">Oops!</h4>
            <p>${err.message}.</p>
          <hr>
            <p class="mb-0">There was an error.</p>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
      </div>`;
      });
    }
  }

  checkoutAlert() {}

  saveCartToLocalStorage(prods) {
    localStorage.setItem("cartItems", JSON.stringify(prods));
  }

  async getItemsFromServer() {
    const response = await fetch("./data/data.json");
    const data = await response.json();

    this.addItemsFromServer(data.products);
    return data;
  }

  addItemsFromServer(jsonArr) {
    jsonArr.forEach((prod) => {
      const item = `

      <div class="col-6 col-lg-4 col-md-4 col-sm-6 bg-white item" id="${
        prod.id
      }">
            <h4>${prod.name}</h4>
            <img src="imgs/${prod.imgURL}.jpg" alt="" />
            <span>Price: ${formatter.format(prod._price)}</span>
            <button class="btn btn-info">
              Add to cart
            </button>
          </div>
      `;
      itemsContainer.insertAdjacentHTML("beforeend", item);
      document.querySelector("#user-balance-1").innerText = formatter.format(
        this.alaa.balance
      );
      document.querySelector("#user-balance-2").innerText = formatter.format(
        this.alaa.balance
      );
    });

    this.listener();
    this.addTypeToProducts(jsonArr);
  }

  //Renders the shopping cart as HTML elements.
  updateShoppingCart(cartt) {
    const allItems = cartt.map((prod) => {
      return `<div class="col-sm-12 bg-light item-in-cart" id="${prod.id}">
            <div class="cart-item-pic-info">
            <img src="imgs/${prod.imgURL}.jpg" alt="" />
            <div class="left-side-cart-item">
            <h5>${prod.name}</h5>
            
            <small>${formatter.format(Number(prod._price))}</small>
            </div>
            </div>
            <button class="btn btn-danger">Remove</button>
          </div>`;
    });

    cartContainer1.innerHTML = "";
    cartContainer2.innerHTML = "";
    cartContainer1.insertAdjacentHTML("beforeend", allItems.join(""));
    cartContainer2.insertAdjacentHTML("beforeend", allItems.join(""));

    this.numberOfCartItems();
    document.querySelector(
      "#cart-total-price-1 small"
    ).innerText = formatter.format(this.cart.totalPrice);
    document.querySelector(
      "#cart-total-price-2 small"
    ).innerText = formatter.format(this.cart.totalPrice);
    document.querySelector("#user-balance-1").innerText = formatter.format(
      this.alaa.balance
    );
    document.querySelector("#user-balance-2").innerText = formatter.format(
      this.alaa.balance
    );

    this.addTypeToCartItems(this.cart.products);
  }

  numberOfCartItems() {
    document
      .querySelectorAll(".number-of-cart-items")
      .forEach((itm) => (itm.innerText = this.cart.products.length));
  }

  addTypeToProducts(products) {
    products.forEach((prod) => {
      [...document.querySelectorAll("div.item")].forEach((itm) => {
        if (itm.id == prod.id) {
          itm.type = prod;
        }
      });
    });
  }

  addTypeToCartItems(products) {
    products.forEach((prod) => {
      [...document.querySelectorAll("div.item-in-cart")].forEach((itm) => {
        if (itm.id == prod.id) {
          itm.type = prod;
        }
      });
    });

    this.removeItemFromCart();
  }

  removeItemFromCart() {
    document.querySelectorAll("div.item-in-cart button").forEach((rmbtn) => {
      rmbtn.addEventListener("click", (e) => {
        this.cart.removeProduct(e.target.parentNode.type);
        this.updateShoppingCart(this.cart.products);
        this.saveCartToLocalStorage(this.cart.products);
      });
    });
  }
}
