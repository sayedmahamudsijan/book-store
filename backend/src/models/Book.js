export class Book {
  constructor(index, isbn, title, authors, publisher, coverImage, reviews, likes) {
    this.index = index;
    this.isbn = isbn;
    this.title = title;
    this.authors = authors;
    this.publisher = publisher;
    this.coverImage = coverImage; // Base64 or URL
    this.reviews = reviews; // Array of { author, text }
    this.likes = likes;
  }
}