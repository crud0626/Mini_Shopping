// fetch the items from the JSON file
function loadItems() {
  return fetch('data/data.json')
    .then(response => response.json())
    .then(json => json.items)
}

// Update the list with the given items
function displayItems(items) {
  const container = document.querySelector('.items');
  container.innerHTML = items.map(item => createHTMLString(item)).join('')
}

// HTML용 태그 return함수
function createHTMLString(item) {
  return `
    <li class="item" data-type=${item.type} data-color=${item.color}>
      <img src="${item.image}" alt="${item.type}" class="item__thumbnail" />
      <span class="item__description">${item.gender}, ${item.size}</span>
    </li>
  `;
}

// Event Listeners
function setEventListeners(items) {
  const logo = document.querySelector('.logo');
  const buttons = document.querySelector('.buttons');
  logo.addEventListener('click', () => displayItems(items));
  buttons.addEventListener('click', event => onButtonClick(event, items));
}

// Buttonclick 실행 함수
function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;
  
  const lis = document.querySelectorAll('.item'); // 기존 items를 li 태그로 생성

  if (key == null || value == null) {
    return;
  }
  updateItems(lis, value);
}

// Update
function updateItems(items, value) {
  items.forEach(item => {
    if (item.dataset.color === value || item.dataset.type === value) {
      item.classList.remove('none');
    } else {
      item.classList.add('none');
    }
  });
}


// main 실행 함수.
loadItems()
  .then(items => {
    displayItems(items);
    setEventListeners(items)
  })
  .catch(console.log);