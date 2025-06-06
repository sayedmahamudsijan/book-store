import React from 'react';
import { Box, Typography } from '@mui/material';

function BookDetails({ book }) {
  return (
    <Box sx={{ margin: 2 }}>
      <img src={book.coverImage} alt={book.title} style={{ width: 200, height: 300 }} />
      <Typography variant="h6">{book.title}</Typography>
      <Typography>By {book.authors}</Typography>
      <Typography>Publisher: {book.publisher}</Typography>
      <Typography>Likes: {book.likes}</Typography>
      <Typography>Reviews:</Typography>
      {book.reviews.map((review, index) => (
        <Box key={index} sx={{ marginTop: 1 }}>
          <Typography><strong>{review.author}</strong>: {review.text}</Typography>
        </Box>
      ))}
    </Box>
  );
}

export default BookDetails;