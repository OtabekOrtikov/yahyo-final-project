import { ShoppingList } from '../ShoppingList';
import { Item } from '../Item';

describe('ShoppingList', () => {
  let list: ShoppingList;

  // Clear any stored data before each test to isolate tests
  beforeEach(() => {
    localStorage.clear();
    list = new ShoppingList();
  });

  it('starts empty', () => {
    expect(list.getItems()).toEqual([]);
  });

  it('adds items correctly', () => {
    const milk = new Item('Milk', 1, 'Dairy');
    list.addItem(milk);
    expect(list.getItems()).toHaveLength(1);
    expect(list.getItems()[0]).toBe(milk);
  });

  it('removes items by index', () => {
    const a = new Item('A', 1), b = new Item('B', 2);
    list.addItem(a);
    list.addItem(b);
    list.removeItem(0);
    expect(list.getItems()).toEqual([b]);
  });

  it('toggles isChecked on the correct item', () => {
    const eggs = new Item('Eggs', 12);
    list.addItem(eggs);
    list.toggleItem(0);
    expect(list.getItems()[0].isChecked).toBe(true);
    list.toggleItem(0);
    expect(list.getItems()[0].isChecked).toBe(false);
  });

  it('returns unique non-empty categories', () => {
    list.addItem(new Item('Apple', 1, 'Fruit'));
    list.addItem(new Item('Banana', 2, 'Fruit'));
    list.addItem(new Item('Carrot', 3, 'Vegetable'));
    expect(list.getCategories().sort()).toEqual(['Fruit', 'Vegetable']);
  });

  it('filters items by category and respects "all"', () => {
    const apple = new Item('Apple', 1, 'Fruit');
    const bread = new Item('Bread', 1, 'Bakery');
    list.addItem(apple);
    list.addItem(bread);

    expect(list.filterByCategory('Fruit')).toEqual([apple]);
    expect(list.filterByCategory('Bakery')).toEqual([bread]);
    expect(list.filterByCategory('all')).toEqual([apple, bread]);
  });

  it('toggleItem with invalid index does nothing and does not throw', () => {
    expect(() => list.toggleItem(999)).not.toThrow();
    expect(list.getItems()).toEqual([]);
  });

  it('removeItem with invalid index does nothing and does not throw', () => {
    expect(() => list.removeItem(123)).not.toThrow();
    expect(list.getItems()).toEqual([]);
  });

  it('getItems returns a shallow copy; mutating returned array does not affect internal state', () => {
    const item = new Item('Test', 1);
    list.addItem(item);
    const itemsCopy = list.getItems();
    itemsCopy.pop();
    expect(list.getItems()).toHaveLength(1);
  });

  it('getCategories excludes blank or whitespace-only categories', () => {
    list.addItem(new Item('X', 1, ''));
    list.addItem(new Item('Y', 2, '   '));
    list.addItem(new Item('Z', 3, 'Category'));
    expect(list.getCategories()).toEqual(['Category']);
  });

  it('filterByCategory returns empty if category does not exist', () => {
    list.addItem(new Item('Apple', 1, 'Fruit'));
    expect(list.filterByCategory('Meat')).toEqual([]);
  });
});
