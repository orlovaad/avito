import { postItem } from '../App';

const DOMAIN_URL = 'https://hacker-news.firebaseio.com';
const PATH_MAXID = '/v0/maxitem.json?print=pretty';
const PATH_START_NEWS = '/v0/item/';
const PATH_END_NEWS = '.json?print=pretty';

// получить пачку постов самых свежих
export const getMaxId = async () => {
  const response = await fetch(`${DOMAIN_URL}${PATH_MAXID}`);
  return await response.json();
};
// получить пост
export const getPost = async (idPost: number): Promise<postItem> => {
  const response = await fetch(`${DOMAIN_URL}${PATH_START_NEWS}${idPost}${PATH_END_NEWS}`);
  return await response.json();
};
