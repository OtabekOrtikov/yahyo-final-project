// src/index.ts
import { Item } from './Item';
import { ShoppingList } from './ShoppingList';

const form = document.getElementById('add-item-form') as HTMLFormElement;
const nameInput = document.getElementById('item-name') as HTMLInputElement;
const quantityInput = document.getElementById('item-quantity') as HTMLInputElement;
const categoryInput = document.getElementById('item-category') as HTMLInputElement;
const filterSelect = document.getElementById('filter-category') as HTMLSelectElement;
const itemList = document.getElementById('item-list') as HTMLUListElement;

const shoppingList = new ShoppingList();

function renderCategories(): void {
  const cats = shoppingList.getCategories();
  filterSelect.innerHTML =
    '<option value="all">All</option>' +
    cats.map(c => `<option value="${c}">${c}</option>`).join('');
}

function renderList(): void {
  const category = filterSelect.value;
  const items = shoppingList.filterByCategory(category);
  itemList.innerHTML = '';

  items.forEach((item, idx) => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    if (item.isChecked) li.classList.add('list-group-item-success');

    li.innerHTML = `
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          id="check-${idx}"
          ${item.isChecked ? 'checked' : ''}
        />
        <label class="form-check-label" for="check-${idx}">
          ${item.name} (${item.quantity}) ${item.category ? `[${item.category}]` : ''}
        </label>
      </div>
      <button
        class="btn btn-danger btn-sm"
        data-index="${idx}"
        aria-label="Remove ${item.name}"
      >
        Remove
      </button>
    `;
    itemList.appendChild(li);

    // toggle bought/unbought
    li.querySelector('input')!.addEventListener('change', () => {
      shoppingList.toggleItem(idx);
      renderList();
    });
    // remove item
    li.querySelector('button')!.addEventListener('click', () => {
      shoppingList.removeItem(idx);
      renderCategories();
      renderList();
    });
  });
}

// Handle new‐item submission
form.addEventListener('submit', e => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const qty = parseInt(quantityInput.value, 10);
  const cat = categoryInput.value.trim();

  if (name && qty > 0) {
    shoppingList.addItem(new Item(name, qty, cat));
    nameInput.value = '';
    quantityInput.value = '1';
    categoryInput.value = '';
    renderCategories();
    renderList();
  }
});

// Filter change
filterSelect.addEventListener('change', renderList);

// Initial render (loads from localStorage)
renderCategories();
renderList();
