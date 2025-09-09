import Cart from '../service/Cart';
import Book from '../domain/Book';
import MusicAlbum from '../domain/MusicAlbum';
import Movie from '../domain/Movie';

test('new card should be empty', () => {
  const cart = new Cart();

  expect(cart.items.length).toBe(0);
});

test('should add items to cart and return them', () => {
  const cart = new Cart();

  // Создаем тестовые данные
  const book = new Book(1001, 'War and Piece', 'Leo Tolstoy', 2000, 1225);
  const album = new MusicAlbum(1008, 'Meteora', 'Linkin Park', 900);
  const movie = new Movie(
    1011,
    'The Avengers',
    1500,
    2012,
    'USA',
    'Avengers Assemble!',
    ['fantasy', 'action', 'adventure'],
    143
  );

  // Добавляем элементы
  cart.add(book);
  cart.add(album);
  cart.add(movie);

  // Получаем элементы из корзины
  const items = cart.items;

  // Проверяем количество элементов
  expect(items.length).toBe(3);

  // Проверяем, что элементы добавлены корректно и имеют правильные свойства
  // Книга
  expect(items[0]).toEqual(book);
  expect(items[0].id).toBe(1001);
  expect(items[0].name).toBe('War and Piece');
  expect(items[0].price).toBe(2000);

  // Альбом
  expect(items[1]).toEqual(album);
  expect(items[1].id).toBe(1008);
  expect(items[1].name).toBe('Meteora');
  expect(items[1].price).toBe(900);

  // Фильм
  expect(items[2]).toEqual(movie);
  expect(items[2].id).toBe(1011);
  expect(items[2].name).toBe('The Avengers');
  expect(items[2].price).toBe(1500);
});
