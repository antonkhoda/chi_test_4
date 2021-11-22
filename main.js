import * as contriller from "./modules/controller.js";

let sourceUrl = "http://localhost:3000/comments";
let input = document.querySelector(".js-mainInput");
let itemBlock = document.querySelector(".js-itemBlock");
let itemInfo = document.querySelector(".itemInfo");
let form = document.forms.mainForm;

contriller.getAllItems(sourceUrl, itemInfo, itemBlock);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  contriller.addNewItem(sourceUrl, form.mainFormText.value);
});

itemBlock.addEventListener("click", (event) => {
  if (event.target.dataset.pointer == "deleteItem") {
    contriller.deteteItem(sourceUrl, event.target.closest(".item").id);
  }

  if (event.target.dataset.pointer == "changeStatusItem") {
    contriller.changeItem(sourceUrl, event.target.closest(".item").id, event.target.checked);
  }
});