import * as contriller from "./modules/controller.js";

let sourceUrl = "http://localhost:3000/comments";
let input = document.querySelector(".js-mainInput");
let itemBlock = document.querySelector(".js-itemBlock");
let itemInfo = document.querySelector(".itemInfo");

contriller.getAllItems(sourceUrl, itemInfo, itemBlock);

input.addEventListener("change", (event) => {
    contriller.addNewItem(sourceUrl, event.target.value);
});

itemBlock.addEventListener("click", (event) => {
  if (event.target.dataset.pointer == "deleteItem") {
    contriller.deteteItem(sourceUrl, event.target.closest(".item").id);
  }

  if (event.target.dataset.pointer == "changeStatusItem") {
    contriller.changeItem(sourceUrl, event.target.closest(".item").id, event.target.checked);
  }
});