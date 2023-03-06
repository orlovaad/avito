import { BrowserRouter, Routes, Link } from 'react-router-dom';
import { Route } from 'react-router';
import Main from './components/main/Main';
import Error404 from './components/error/Error404';
import React, { useEffect, useState } from 'react';
import './App.css';
import { getMaxId, getPost } from './api/API';
import NewsListItem from './components/news_list_item/NewsListItem';

export type postList = Array<postItem>;
export type postItem = {
  id: number;
  by: string;
  title?: string;
  text?: string;
  deleted?: boolean;
  dead?: boolean;
  score?: number;
  time: number;
  url?: string;
  kids?: number[];
  descendants?: number[];
  type: string;
};
const POST_COUNT = 150;
export type postMap = {
  [id: number]: postItem;
};

function App() {
  const [maxId, setMaxId] = useState(0);
  const [posts, setPosts] = useState<postMap>({});
  const [loading, setLoading] = useState(false);

  async function setData() {
    setLoading(true);

    const resultId = await getMaxId();

    let postResult: postMap = {};
    for (let i = resultId; i >= resultId - POST_COUNT; i--) {
      const post = await getPost(i);

      if (post && post.type === 'story' && !post.deleted && !post.dead) {
        postResult = { ...postResult, [i]: post };
        setPosts(postResult);
      }
    }

    setMaxId(resultId);
    setLoading(false);
  }

  useEffect(() => {
    const interval = setInterval(setData, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const postList = Object.values(posts);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          index={true}
          element={
            <Link to="/">
              <Main setNews={setData} showLoading={loading} postList={postList} />
            </Link>
          }
        />
        <Route path="/news/:id" element={<NewsListItem newsJson={postList} setPosts={setPosts} />} />
        <Route path="/error404" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
