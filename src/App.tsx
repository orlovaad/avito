import { BrowserRouter as Router, BrowserRouter, Routes } from 'react-router-dom';
import { Route } from 'react-router';
import Main from './components/main/Main';
import News from './components/news/News';
import Error404 from './components/error/Error404';
import React, { useState } from 'react';
import getAmountNews from './components/api/API';
import './App.css';

function App() {
  const [maxId, setMaxId] = useState(0);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  // getAmountNews(setMaxId, setNews);
  console.log('news ', news);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          index={true}
          element={<Main setMaxId={setMaxId} setNews={setNews} setLoading={setLoading} showLoading={loading} />}
        />
        <Route path="/news" element={<News />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
