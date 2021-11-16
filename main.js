let url = "http://localhost:3000/comments";
let input = document.querySelector(".mainInput");
let itemBlock = document.querySelector(".itemBlock");
let itemInfo = document.querySelector('.itemInfo')

function createItemBlock(obj) {
    let item = document.createElement("div");
    item.classList.add("item");
    item.id = obj.id;
    let changeStatusItem = document.createElement("input");
    changeStatusItem.type = "checkbox";
    changeStatusItem.checked = obj.completed;
    changeStatusItem.classList.add("changeStatusItem");
    let text = document.createElement("span");
    if (changeStatusItem.checked) text.classList.add("itemTextChecked");
    text.textContent = obj.title;
    let deleteItem = document.createElement("div");
    deleteItem.classList.add("deleteItem");
    item.appendChild(changeStatusItem);
    item.appendChild(text);
    item.appendChild(deleteItem);
    itemBlock.appendChild(item);
}

function quantityItem(quantity, length) {
    if (length > 0) {
        if (quantity === 1){
            itemInfo.textContent = quantity + ' item left';
        } else {
            itemInfo.textContent = quantity + ' items left';
        }
    } else {
        itemInfo.classList.add('displayNone');
    }
}

function addNewItem(itemTitle) {
    fetch(url, {
            method: "POST",
            body: JSON.stringify({
                title: itemTitle,
                completed: false,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Ошибка HTTP: " + response.status);
            }
        });
}

function changeItem(itemId, itemCompletedStatus) {
    fetch(url + "/" + itemId, {
            method: 'PATCH',
            body: JSON.stringify({
                completed: itemCompletedStatus,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Ошибка HTTP: " + response.status);
            }
        });
}

function getAllItems() {
    fetch(url)
        .then((response) => response.json())
        .then((json) => {
            let quantity = 0;
            json.forEach(element => {
                createItemBlock(element);
                if (!element.completed) quantity++;
            });
            quantityItem(quantity, json.length)
        });
}

function deteteItem(itemId) {
    fetch(url + "/" + itemId, {
        method: 'DELETE',
    });
}

getAllItems();

input.addEventListener("change", (event) => {
    addNewItem(event.target.value);
});

itemBlock.addEventListener("click", (event) => {
    if (event.target.classList.contains('deleteItem')) {
        deteteItem(event.target.closest('.item').id);
    }

    if (event.target.classList.contains('changeStatusItem')) {
        changeItem(event.target.closest('.item').id, event.target.checked);
    }
});