import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Table, TableBody, TableCell, TableHead, TableRow, Collapse, Box, Typography } from '@mui/material';
import axios from 'axios';
import BookDetails from './BookDetails';

function BookTable({ books, page, setPage, updateBooks, region, seed, avgLikes, avgReviews }) {
  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
    fetchBooks(page);
  }, [page, region, seed, avgLikes, avgReviews]);

  const fetchBooks = async (pageNum) => {
    try {
      const response = await axios.get('http://localhost:3001/api/books', {
        params: { seed, page: pageNum, region, avgLikes, avgReviews }
      });
      updateBooks(response.data, pageNum === 0);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleRowClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  // Helper function to normalize authors to an array
  const normalizeAuthors = (authors) => {
    if (Array.isArray(authors)) return authors;
    if (typeof authors === 'string') return [authors];
    return ['Unknown Author']; // Fallback for undefined or other types
  };

  return (
    <div className="table-container">
      <InfiniteScroll
        dataLength={books.length}
        next={() => setPage(page + 1)}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Index</TableCell>
              <TableCell>ISBN</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Publisher</TableCell>
              <TableCell>Likes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book, idx) => (
              <React.Fragment key={book.index}>
                <TableRow
                  hover
                  onClick={() => handleRowClick(idx)}
                  style={{ cursor: 'pointer' }}
                >
                  <TableCell>{book.index}</TableCell>
                  <TableCell>{book.isbn}</TableCell>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{normalizeAuthors(book.authors).join(', ')}</TableCell>
                  <TableCell>{book.publisher}</TableCell>
                  <TableCell>{book.likes}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={expandedRow === idx} timeout="auto" unmountOnExit>
                      <Box margin={1}>
                        <BookDetails book={book} />
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </InfiniteScroll>
    </div>
  );
}

export default BookTable;