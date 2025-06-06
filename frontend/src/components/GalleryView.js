import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

function GalleryView({ books }) {
  // Helper function to normalize authors
  const normalizeAuthors = (authors) => {
    if (Array.isArray(authors)) return authors;
    if (typeof authors === 'string') return [authors];
    return ['Unknown Author'];
  };

  return (
    <div className="gallery">
      {books.map((book) => (
        <Card key={book.index} className="book-card">
          <CardMedia
            component="img"
            height="200"
            image={book.coverImage}
            alt={book.title}
          />
          <CardContent>
            <Typography variant="h6">{book.title}</Typography>
            <Typography variant="body2">{normalizeAuthors(book.authors).join(', ')}</Typography>
            <Typography variant="body2">{book.publisher}</Typography>
            <Typography variant="body2">Likes: {book.likes}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default GalleryView;