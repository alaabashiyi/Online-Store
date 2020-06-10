const inputs = [...document.querySelectorAll(".dash-input")];
const checkboxs = [...document.querySelectorAll(".checkboxes")];
const newRequest = new XMLHttpRequest();

class Dashboard {
  getInputs() {
    const countryList = [];

    checkboxs.forEach((checkboz) => {
      if (checkboz.checked == true) {
        countryList.push(checkboz.value);
      }
    });
    const values = inputs.map((input) => input.value);
    const newStoreItem = new Product(
      values[0],
      values[1],
      countryList,
      values[2],
      values[3],
      values[4]
    );

    console.log(newStoreItem);
    this.postData("http://localhost:3000/products", newStoreItem).then(
      (data) => data
    );
  }

  async postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });
  }

  listeners() {
    document.querySelector("#dash-submit").addEventListener("click", (e) => {
      e.preventDefault();
      this.getInputs();
    });
  }
}

const dashControl = new Dashboard();

dashControl.listeners();
