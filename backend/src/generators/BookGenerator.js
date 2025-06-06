import { Faker, en, de, ja } from '@faker-js/faker';
import { SeedHelper } from '../utils/SeedHelper.js';
import { Book } from '../models/Book.js';

export class BookGenerator {
  static #locales = {
    'en-US': en,
    'de-DE': de,
    'ja-JP': ja
  };

  static generateBooks(seed, page, count, region, avgReviews, avgLikes) {
    const rng = SeedHelper.getSeededRandom(seed, page);
    const faker = new Faker({ locale: this.#locales[region] });
    faker.seed(Math.floor(rng() * 1000000));

    const books = [];
    const startIndex = page * count + 1;

    for (let i = 0; i < count; i++) {
      const title = faker.lorem.words({ min: 2, max: 5 }).replace(/\b\w/g, c => c.toUpperCase());
      const authors = Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => 
        `${faker.person.firstName()} ${faker.person.lastName()}`);
      const publisher = faker.company.name();
      const isbn = faker.commerce.isbn();
      // Placeholder for cover image (use a free image API or generate base64)
      const coverImage = `https://picsum.photos/seed/${rng() * 1000000}/200/300`;

      books.push(new Book(
        startIndex + i,
        isbn,
        title,
        authors.join(', '),
        publisher,
        coverImage,
        [],
        0
      ));
    }

    return books;
  }
}