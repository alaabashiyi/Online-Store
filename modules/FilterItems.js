export default class filterItems {
  resetFilter() {
    [...document.querySelectorAll("#items-container div.item")].forEach(
      (curr) => {
        curr.style.display = "flex";
      }
    );
  }

  categoryFilter(event) {
    const el = event.target;
    const clickedFilter = event.target.dataset.filter;

    this.resetFilter();

    if (el.dataset.filter) {
      [...document.querySelectorAll("#items-container div.item")].forEach(
        (curr) => {
          if (curr.type.cat != clickedFilter) {
            curr.style.display = "none";
          }
        }
      );
    }
    if (el.dataset.filter == "all") {
      [...document.querySelectorAll("#items-container div.item")].forEach(
        (curr) => {
          if (curr.style.display == "none") {
            curr.style.display = "flex";
          }
        }
      );
    }
  }

  addListenersForLinks() {
    [...document.querySelectorAll("a.filter-all-items")].forEach((cur) =>
      cur.addEventListener("click", (event) => {
        event.preventDefault();
        this.categoryFilter(event);
      })
    );
  }
}
