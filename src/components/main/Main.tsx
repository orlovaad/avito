import { Button } from 'antd';
import { postList } from '../../App';
import NewsList from '../news_list/NewsList';

export interface MainProps {
  setNews: () => void;
  showLoading: boolean;
  postList: postList;
}

function Main({ setNews, showLoading, postList }: MainProps) {
  return (
    <div>
      <Button type="primary" loading={showLoading} onClick={() => setNews()}>
        Refresh News!
      </Button>
      <NewsList newsJson={postList}></NewsList>
    </div>
  );
}
export default Main;
