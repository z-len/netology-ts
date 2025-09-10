import Cart from '../service/Cart';
import Book from '../domain/Book';
import MusicAlbum from '../domain/MusicAlbum';
import Movie from '../domain/Movie';


describe('Cart', () => {
  let cart: Cart;
  let book: Book;
  let album: MusicAlbum;
  let movie: Movie;

  beforeEach(() => {
    cart = new Cart();
    book = new Book(1001, 'War and Piece', 'Leo Tolstoy', 2000, 1225);
    album = new MusicAlbum(1008, 'Meteora', 'Linkin Park', 900);
    movie = new Movie(
      1011,
      'The Avengers',
      1500,
      2012,
      'USA',
      'Avengers Assemble!',
      ['fantasy', 'action', 'adventure'],
      143
    );
  });

  test('new cart should be empty', () => {
    expect(cart.items.length).toBe(0);
  });

  test('should add items to cart and return them', () => {
    cart.add(book);
    cart.add(album);
    cart.add(movie);

    const items = cart.items;

    expect(items.length).toBe(3);
    expect(items[0]).toEqual(book);
    expect(items[1]).toEqual(album);
    expect(items[2]).toEqual(movie);
  });

  test('get items should return a copy of the array', () => {
    cart.add(book);

    const firstCall = cart.items;
    const secondCall = cart.items;

    expect(firstCall).toEqual(secondCall);
    expect(firstCall).not.toBe(secondCall);
  });

  // Тесты для calculateTotalCost
  describe('calculateTotalCost', () => {
    test('should return 0 for empty cart', () => {
      expect(cart.totalCost()).toBe(0);
    });

    test('should calculate total cost correctly', () => {
      cart.add(book);
      cart.add(album);
      cart.add(movie);

      // 2000 + 900 + 1500 = 4400
      expect(cart.totalCost()).toBe(4400);
    });
  });

  // Тесты для calculateTotalCostWithDiscount
  describe('calculateTotalCostWithDiscount', () => {
    test('should apply 0% discount correctly', () => {
      cart.add(book);
      cart.add(album);

      expect(cart.totalCostDiscount(0)).toBe(2900);
    });

    test('should apply 10% discount correctly', () => {
      cart.add(book);
      cart.add(album);
      cart.add(movie);

      // 4400 - 10% = 3960
      expect(cart.totalCostDiscount(10)).toBe(3960);
    });

    test('should apply 100% discount correctly', () => {
      cart.add(book);

      expect(cart.totalCostDiscount(100)).toBe(0);
    });

    test('should throw error for negative discount', () => {
      expect(() => cart.totalCostDiscount(-5))
        .toThrow('Процент скидки должен быть от 0 и до 100');
    });

    test('should throw error for discount greater than 100', () => {
      expect(() => cart.totalCostDiscount(150))
        .toThrow('Процент скидки должен быть от 0 и до 100');
    });
  });

  // Тесты для removeItemById
  describe('removeItemById', () => {
    test('should remove existing item', () => {
      cart.add(book);
      cart.add(album);
      cart.add(movie);

      cart.removeItemById(1008); // Удаляем альбом

      expect(cart.items.length).toBe(2);
      expect(cart.items).toEqual([book, movie]);
      expect(cart.items.find(item => item.id === 1008)).toBeUndefined();
    });

    test('should throw error when removing non-existing item', () => {
      cart.add(book);

      expect(() => cart.removeItemById(999))
        .toThrow('Элемент с 999 отсутствует в корзине');
    });

    test('should handle removing from empty cart', () => {
      expect(() => cart.removeItemById(1001))
        .toThrow('Элемент с 1001 отсутствует в корзине');
    });

    test('should remove the correct item when multiple items exist', () => {
      const anotherBook = new Book(1002, 'Test Book', 'Test Author', 500, 300);
      cart.add(book);
      cart.add(anotherBook);

      cart.removeItemById(1001); // Удаляем первую книгу

      expect(cart.items.length).toBe(1);
      expect(cart.items[0]).toEqual(anotherBook);
    });
  });
});
