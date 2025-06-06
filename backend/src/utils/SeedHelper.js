import seedrandom from 'seedrandom';

export class SeedHelper {
  static getSeededRandom(seed, page) {
    // Combine seed and page number for unique RNG per page
    const combinedSeed = `${seed}-${page}`;
    return seedrandom(combinedSeed);
  }
}