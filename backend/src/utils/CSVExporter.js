import Papa from 'papaparse';

export class CSVExporter {
  static exportToCSV(books) {
    const csvData = books.map(book => ({
      Index: book.index,
      ISBN: book.isbn,
      Title: book.title,
      Authors: book.authors,
      Publisher: book.publisher,
      Likes: book.likes,
      Reviews: book.reviews.length
    }));
    return Papa.unparse(csvData);
  }
}