const DOMAIN_URL = 'https://hacker-news.firebaseio.com';
const PATH_MAXID = '/v0/maxitem.json?print=pretty';
const PATH_START_NEWS = '/v0/item/';
const PATH_END_NEWS = '.json?print=pretty';

// получить пачку из 100 новостей с самых свежих
function getAmountNews(setMaxId: (id: number) => void, setNews: (news: any) => any) {
  fetch(`${DOMAIN_URL}${PATH_MAXID}`)
    .then((res) => res.json())
    .then(
      (result) => {
        setMaxId(result);
        for (let i = 0; i < 100; i++) {
          getNews(result - i, setNews);
        }
      },
      (error) => console.log(error)
    );
}
// получить новость
const getNews = (id: Number, setNews: (news: any) => any) => {
  fetch(`${DOMAIN_URL}${PATH_START_NEWS}${id}${PATH_END_NEWS}`)
    .then((res) => res.json())
    .then(
      (result) => {
        if (result) setNews((news: string | any[]) => news.concat(result));
      },
      (error) => console.log(error)
    );
};

export default getAmountNews;
