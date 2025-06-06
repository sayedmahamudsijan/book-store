import { Faker, en, de, ja } from '@faker-js/faker';
import { SeedHelper } from '../utils/SeedHelper.js';

export class ReviewGenerator {
  static #locales = {
    'en-US': en,
    'de-DE': de,
    'ja-JP': ja
  };

  static generateReviews(books, seed, page, region, avgReviews) {
    const rng = SeedHelper.getSeededRandom(seed + 1, page); // Different seed for reviews
    const faker = new Faker({ locale: this.#locales[region] });
    faker.seed(Math.floor(rng() * 1000000));

    return books.map(book => {
      const reviewCount = this.#getRandomCount(avgReviews, rng);
      const reviews = Array.from({ length: reviewCount }, () => ({
        author: `${faker.person.firstName()} ${faker.person.lastName()}`,
        text: faker.lorem.sentences({ min: 1, max: 3 })
      }));
      return { ...book, reviews };
    });
  }

  static #getRandomCount(avg, rng) {
    const floor = Math.floor(avg);
    const prob = avg - floor;
    return rng() < prob ? floor + 1 : floor;
  }
}