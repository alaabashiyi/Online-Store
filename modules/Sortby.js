const itemsContainer = document.querySelector("#items-container");

export default class Sortby {
  constructor() {
    // itemsContainer.innerHTML = "";
  }
  sortByLowPrice() {
    const lowprice = [...document.querySelectorAll("div.item")].sort(
      (a, b) => a.type._price - b.type._price
    );
    lowprice.forEach((lwprice) => {
      itemsContainer.insertAdjacentElement("beforeend", lwprice);
    });
  }

  sortByHighPrice() {
    const lowprice = [...document.querySelectorAll("div.item")].sort(
      (a, b) => b.type._price - a.type._price
    );
    lowprice.forEach((lwprice) => {
      itemsContainer.insertAdjacentElement("beforeend", lwprice);
    });
  }

  sortByVat() {
    [...document.querySelectorAll("div.item")].forEach((itm) => {
      if (itm.type.hasVAT) {
        itemsContainer.insertAdjacentElement("afterbegin", itm);
      }
    });
    [...document.querySelectorAll("div.item")].forEach((itm) => {
      if (!itm.type.hasVAT) {
        itemsContainer.insertAdjacentElement("afterbegin", itm);
      }
    });
  }

  sortByAZ() {
    const az = [...document.querySelectorAll("div.item")].sort((a, b) => {
      a.type.name > b.type.name ? 1 : b.type.name === a.type.name ? 1 : -1;
    });

    az.forEach((abc) => {
      itemsContainer.insertAdjacentElement("afterbegin", abc);
    });
  }

  listeners() {
    document.querySelectorAll(".sort-by-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        if (e.target.name == "low") {
          this.sortByLowPrice();
        }
        if (e.target.name == "high") {
          this.sortByHighPrice();
        }
        if (e.target.name == "vat") {
          this.sortByVat();
        }
        if (e.target.name == "az") {
          this.sortByAZ();
        }
      });
    });
  }
}
