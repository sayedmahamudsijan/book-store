import express from 'express';
import { BookGenerator } from '../generators/BookGenerator.js';
import { ReviewGenerator } from '../generators/ReviewGenerator.js';
import { LikeGenerator } from '../generators/LikeGenerator.js';
import { CSVExporter } from '../utils/CSVExporter.js';

const router = express.Router();

router.get('/books', (req, res) => {
  const { seed = 42, page = 0, count = 20, region = 'en-US', avgLikes = 0, avgReviews = 0 } = req.query;
  
  let books = BookGenerator.generateBooks(
    parseInt(seed),
    parseInt(page),
    parseInt(count),
    region,
    parseFloat(avgReviews),
    parseFloat(avgLikes)
  );
  
  books = ReviewGenerator.generateReviews(books, parseInt(seed), parseInt(page), region, parseFloat(avgReviews));
  books = LikeGenerator.generateLikes(books, parseInt(seed), parseInt(page), parseFloat(avgLikes));
  
  res.json(books);
});

router.get('/export', (req, res) => {
  const { seed = 42, pages = 1, region = 'en-US', avgLikes = 0, avgReviews = 0 } = req.query;
  const allBooks = [];
  
  for (let page = 0; page < parseInt(pages); page++) {
    let books = BookGenerator.generateBooks(parseInt(seed), page, 20, region, parseFloat(avgReviews), parseFloat(avgLikes));
    books = ReviewGenerator.generateReviews(books, parseInt(seed), page, region, parseFloat(avgReviews));
    books = LikeGenerator.generateLikes(books, parseInt(seed), page, parseFloat(avgLikes));
    allBooks.push(...books);
  }
  
  const csv = CSVExporter.exportToCSV(allBooks);
  res.header('Content-Type', 'text/csv');
  res.attachment('books.csv');
  res.send(csv);
});

export default router;