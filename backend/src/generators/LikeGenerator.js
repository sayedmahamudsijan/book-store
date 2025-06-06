import { SeedHelper } from '../utils/SeedHelper.js';

export class LikeGenerator {
  static generateLikes(books, seed, page, avgLikes) {
    const rng = SeedHelper.getSeededRandom(seed + 2, page); // Different seed for likes
    return books.map(book => {
      const likeCount = this.#getRandomCount(avgLikes, rng);
      return { ...book, likes: likeCount };
    });
  }

  static #getRandomCount(avg, rng) {
    const floor = Math.floor(avg);
    const prob = avg - floor;
    return rng() < prob ? floor + 1 : floor;
  }
}