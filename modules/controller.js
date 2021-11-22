export function getAllItems(url, quantityItemBlock, fatherBlock) {
    fetch(url)
        .then((response) => response.json())
        .then((json) => {
            let quantity = 0;
            json.forEach((element) => {
                createItemBlock(element, fatherBlock);
                if (!element.completed) quantity++;
            });
            quantityItem(quantity, json.length, quantityItemBlock);
        });
}

export function addNewItem(url, itemTitle) {
    fetch(url, {
        method: "POST",
        body: JSON.stringify({
            title: itemTitle,
            completed: false,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    }).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    });
}

export function changeItem(url, itemId, itemCompletedStatus) {
    fetch(url + "/" + itemId, {
        method: "PATCH",
        body: JSON.stringify({
            completed: itemCompletedStatus,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    }).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    });
}

export function deteteItem(url, itemId) {
    fetch(url + "/" + itemId, {
        method: "DELETE",
    });
}

function createItemBlock(obj, fatherBlock) {
    let item = document.createElement("div");
    item.classList.add("item");
    item.id = obj.id;
    let changeStatusItem = document.createElement("input");
    changeStatusItem.type = "checkbox";
    changeStatusItem.checked = obj.completed;
    changeStatusItem.classList.add("changeStatusItem");
    changeStatusItem.dataset.pointer = "changeStatusItem";
    let text = document.createElement("span");
    if (changeStatusItem.checked) text.classList.add("itemTextChecked");
    text.textContent = obj.title;
    let deleteItem = document.createElement("div");
    deleteItem.classList.add("deleteItem");
    deleteItem.dataset.pointer = "deleteItem";
    item.appendChild(changeStatusItem);
    item.appendChild(text);
    item.appendChild(deleteItem);
    fatherBlock.appendChild(item);
}

function quantityItem(quantity, length, block) {
    if (length > 0) {
        if (quantity === 1) {
            block.textContent = quantity + " item left";
        } else {
            block.textContent = quantity + " items left";
        }
    } else {
        block.classList.add("displayNone");
    }
}