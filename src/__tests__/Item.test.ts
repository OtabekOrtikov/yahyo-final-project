import { Item } from '../Item';

describe('Item', () => {
  it('constructs with name, quantity, category and default isChecked=false', () => {
    const apple = new Item('Apple', 5, 'Fruit');
    expect(apple.name).toBe('Apple');
    expect(apple.quantity).toBe(5);
    expect(apple.category).toBe('Fruit');
    expect(apple.isChecked).toBe(false);
  });

  it('allows toggling the isChecked property manually', () => {
    const bread = new Item('Bread', 2);
    expect(bread.isChecked).toBe(false);
    bread.isChecked = true;
    expect(bread.isChecked).toBe(true);
  });
});
