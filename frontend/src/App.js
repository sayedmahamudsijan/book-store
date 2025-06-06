import React, { useState } from 'react';
import Controls from './components/Controls';
import BookTable from './components/BookTable';
import GalleryView from './components/GalleryView';
import './App.css';

function App() {
  const [region, setRegion] = useState('en-US');
  const [seed, setSeed] = useState(42);
  const [avgLikes, setAvgLikes] = useState(0);
  const [avgReviews, setAvgReviews] = useState(0);
  const [viewMode, setViewMode] = useState('table');
  const [page, setPage] = useState(0);
  const [books, setBooks] = useState([]);

  const updateBooks = (newBooks, reset = false) => {
    setBooks(prev => reset ? newBooks : [...prev, ...newBooks]);
  };

  return (
    <div className="App">
      <Controls
        region={region}
        setRegion={setRegion}
        seed={seed}
        setSeed={setSeed}
        avgLikes={avgLikes}
        setAvgLikes={setAvgLikes}
        avgReviews={avgReviews}
        setAvgReviews={setAvgReviews}
        viewMode={viewMode}
        setViewMode={setViewMode}
        page={page}
        setPage={setPage}
        updateBooks={updateBooks}
      />
      {viewMode === 'table' ? (
        <BookTable
          books={books}
          page={page}
          setPage={setPage}
          updateBooks={updateBooks}
          region={region}
          seed={seed}
          avgLikes={avgLikes}
          avgReviews={avgReviews}
        />
      ) : (
        <GalleryView books={books} />
      )}
    </div>
  );
}

export default App;