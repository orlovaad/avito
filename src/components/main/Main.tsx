import { Button } from 'antd';
import getAmountNews from '../api/API';

export interface MainProps {
  setMaxId: (id: number) => void;
  setNews: (news: any) => any;
  setLoading: (loading: boolean) => void;
  showLoading: boolean;
}

function Main({ setMaxId, setNews, setLoading, showLoading }: MainProps) {
  return (
    <div>
      <Button
        type="primary"
        loading={showLoading}
        onClick={() => getAmountNews({ setMaxId, setNews, setLoading, showLoading })}
      >
        Click me!
      </Button>
    </div>
  );
}
export default Main;
