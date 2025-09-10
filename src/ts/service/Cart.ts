import Buyable from '../domain/Buyable';

export default class Cart {
  private _items: Buyable[] = [];

  add(item: Buyable): void {
    this._items.push(item);
  }

  get items(): Buyable[] {
    return [...this._items];
  }

  totalCost(): number {
    return this._items.reduce((total, item) => {
      return total + item.price
    }, 0);
  }

  totalCostDiscount(discountPercent: number): number {
    if (discountPercent < 0 || discountPercent > 100) {
      throw new Error('Процент скидки должен быть от 0 и до 100');
    }

    const total = this.totalCost();
    return total * (1 - discountPercent / 100);
  }

  removeItemById(id: number): void {
    const indexToRemove = this._items.findIndex(item => item.id === id);

    if (indexToRemove === -1) {
      throw new Error(`Элемент с ${id} отсутствует в корзине`);
    }

    this._items.splice(indexToRemove, 1);
  }
}
