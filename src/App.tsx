import { Route, Switch } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';
import React, { useState } from 'react';
import getAmountNews from './components/api/API';
import './App.css';

function App() {
  const [maxId, setMaxId] = useState(0);
  const [news, setNews] = useState([]);
  // // получить пачку bp 100 новостей с конца
  // const getAmountNews = () => {
  //   fetch('https://hacker-news.firebaseio.com/v0/maxitem.json?print=pretty')
  //     .then((res) => res.json())
  //     .then(
  //       (result) => {
  //         setMaxId(result);
  //         for (let i = 0; i < 100; i++) {
  //           getNews(result - i);
  //         }
  //       },
  //       (error) => console.log(error)
  //     );
  // };
  // // получить новость
  // const getNews = (id: Number) => {
  //   fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
  //     .then((res) => res.json())
  //     .then(
  //       (result) => {
  //         if (result) setNews((news) => news.concat(result));
  //       },
  //       (error) => console.log(error)
  //     );
  // };

  // getAmountNews(setMaxId, setNews);
  console.log('news ', news);

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
