function addListItem() {
    const list = document.getElementById('dynamicList');
    const newItem = document.createElement('li');
    newItem.textContent = `New Item ${list.children.length + 1}`;
    list.appendChild(newItem);
}

function removeLastItem() {
    const list = document.getElementById('dynamicList');
    if (list.children.length > 0) {
        list.removeChild(list.lastElementChild);
    } else {
        alert('No more items to remove!');
    }
}

function createNewElement() {
    const ul = document.getElementById('newList');
    const li = document.createElement('li');
    li.textContent = 'A newly created list item';
    ul.appendChild(li);
}

function cloneFirstItem() {
    const list = document.getElementById('cloneList');
    const firstItem = list.firstElementChild;
    const clonedItem = firstItem.cloneNode(true);
    list.appendChild(clonedItem);
}

function insertBeforeItem() {
    const list = document.getElementById('insertList');
    const newItem = document.createElement('li');
    newItem.textContent = 'Inserted Before First Item';
    const firstItem = list.firstElementChild;
    list.insertBefore(newItem, firstItem);
}

function replaceChildItem() {
    const list = document.getElementById('replaceList');
    const newItem = document.createElement('li');
    newItem.textContent = 'Replaced First Item';
    const oldItem = list.firstElementChild;
    list.replaceChild(newItem, oldItem);
}

function checkChildNodes() {
    const list = document.getElementById('childNodesList');
    if (list.hasChildNodes()) {
        alert('This node has child nodes.');
    } else {
        alert('This node has no child nodes.');
    }
}
