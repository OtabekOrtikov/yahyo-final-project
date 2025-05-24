import { Item } from './Item';

const STORAGE_KEY = 'shoppingList';

export class ShoppingList {
  private items: Item[] = [];

  constructor() {
    this.load();
  }

  /** Save the current items array as JSON in localStorage */
  private save(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
    } catch (e) {
      console.error('Failed to save shopping list', e);
    }
  }

  /** Load items from localStorage, if present, restoring Item instances */
  private load(): void {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: Array<{ name: string; quantity: number; category: string; isChecked: boolean }> =
          JSON.parse(raw);
        this.items = parsed.map(
          i => new Item(i.name, i.quantity, i.category, i.isChecked)
        );
      }
    } catch (e) {
      console.error('Failed to load shopping list', e);
      this.items = [];
    }
  }

  addItem(item: Item): void {
    this.items.push(item);
    this.save();
  }

  removeItem(index: number): void {
    this.items.splice(index, 1);
    this.save();
  }

  toggleItem(index: number): void {
    const item = this.items[index];
    if (item) {
      item.isChecked = !item.isChecked;
      this.save();
    }
  }

  getItems(): Item[] {
    return [...this.items];
  }

  getCategories(): string[] {
    return Array.from(
      new Set(
        this.items
          .map(i => i.category.trim())
          .filter(c => c !== '')
      )
    );
  }

  filterByCategory(category: string): Item[] {
    if (category === 'all') {
      return this.getItems();
    }
    return this.items.filter(i => i.category === category);
  }
}
