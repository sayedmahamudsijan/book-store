import React from 'react';
import { TextField, Select, MenuItem, Slider, Button, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';

function Controls({ region, setRegion, seed, setSeed, avgLikes, setAvgLikes, avgReviews, setAvgReviews, viewMode, setViewMode, page, setPage, updateBooks }) {
  const handleRandomSeed = () => {
    const newSeed = Math.floor(Math.random() * 1000000);
    setSeed(newSeed);
    setPage(0);
    fetchBooks(newSeed, 0, region, avgLikes, avgReviews, true);
  };

  const fetchBooks = async (seedVal, pageVal, regionVal, likesVal, reviewsVal, reset) => {
    const response = await axios.get('http://localhost:3001/api/books', {
      params: { seed: seedVal, page: pageVal, region: regionVal, avgLikes: likesVal, avgReviews: reviewsVal }
    });
    updateBooks(response.data, reset);
  };

  const handleExport = async () => {
    const response = await axios.get('http://localhost:3001/api/export', {
      params: { seed, pages: page + 1, region, avgLikes, avgReviews },
      responseType: 'blob'
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'books.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="controls">
      <FormControl>
        <InputLabel>Region</InputLabel>
        <Select value={region} onChange={(e) => { setRegion(e.target.value); setPage(0); fetchBooks(seed, 0, e.target.value, avgLikes, avgReviews, true); }}>
          <MenuItem value="en-US">English (USA)</MenuItem>
          <MenuItem value="de-DE">German (Germany)</MenuItem>
          <MenuItem value="ja-JP">Japanese (Japan)</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Seed"
        type="number"
        value={seed}
        onChange={(e) => { setSeed(e.target.value); setPage(0); fetchBooks(e.target.value, 0, region, avgLikes, avgReviews, true); }}
      />
      <Button onClick={handleRandomSeed}>Random Seed</Button>
      <div>
        <label>Average Likes: {avgLikes}</label>
        <Slider
          value={avgLikes}
          onChange={(e, val) => { setAvgLikes(val); setPage(0); fetchBooks(seed, 0, region, val, avgReviews, true); }}
          min={0}
          max={10}
          step={0.1}
        />
      </div>
      <TextField
        label="Average Reviews"
        type="number"
        value={avgReviews}
        onChange={(e) => { setAvgReviews(e.target.value); setPage(0); fetchBooks(seed, 0, region, avgLikes, e.target.value, true); }}
        inputProps={{ step: 0.1 }}
      />
      <FormControl>
        <InputLabel>View Mode</InputLabel>
        <Select value={viewMode} onChange={(e) => setViewMode(e.target.value)}>
          <MenuItem value="table">Table</MenuItem>
          <MenuItem value="gallery">Gallery</MenuItem>
        </Select>
      </FormControl>
      <Button onClick={handleExport}>Export to CSV</Button>
    </div>
  );
}

export default Controls;