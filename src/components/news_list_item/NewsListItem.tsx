import { CommentOutlined, CalendarOutlined } from '@ant-design/icons';
import { Avatar, Button, Space, Card } from 'antd';
import React, { useEffect, useState } from 'react';
import randomWords from 'random-words';
import Comments from '../comments/Comments';
import { Link, useParams } from 'react-router-dom';
import { postItem, postList } from '../../App';
import { getPost } from '../../api/API';

export type commentMap = {
  [id: number]: postItem;
};

export interface NewsListItemProps {
  newsJson: postList;
  setPosts: (posts: postList) => void;
}

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const NewsListItem: React.FC<NewsListItemProps> = ({ newsJson, setPosts }) => {
  const [comments, setComments] = useState<commentMap>({});
  const [loadingComments, setLoadingComments] = useState(false);
  const [story, setStory] = useState<postItem>();
  const { id = '' } = useParams();
  const item = newsJson.find((item) => item.id.toString() === id);

  const fetchComments = async () => {
    setLoadingComments(true);

    let commentsList: commentMap = {};

    const fetchKids = async (kids: number[] | undefined) => {
      if (kids) {
        for (let i = 0; i < kids.length; i++) {
          const comment = await getPost(kids[i]);
          commentsList = { ...commentsList, [kids[i]]: comment };
          setComments(commentsList);
          if (kids) await fetchKids(comment.kids);
        }
      }
    };

    const storyItem = item || (await getPost(Number(id)));
    setStory(storyItem);
    await fetchKids(storyItem.kids);
    if (storyItem) setComments({ ...commentsList, [Number(id)]: storyItem });

    setLoadingComments(false);
  };

  useEffect(() => {
    fetchComments();
  }, []);
  if (!story) return <Link to={`/error404`}>Error 404</Link>;

  return (
    <div>
      <Button type="primary">
        <Link to={`/news/${id}`}> Refresh comments</Link>
      </Button>
      <Button type="primary" style={{ marginLeft: 16 }}>
        <Link to={'/'}>Back to news</Link>
      </Button>

      <Card
        title={
          <div>
            <Avatar style={{ marginRight: 16 }} src={`https://robohash.org/${randomWords(5)}`} />
            {story?.title}
          </div>
        }
        extra={<a href={story?.url}>More</a>}
      >
        <Card>
          {`by: ${story?.by}`}
          <br />
          {[
            <IconText icon={CommentOutlined} text={`${story?.descendants}`} key="list-vertical-star-o" />,
            <br />,
            <IconText
              icon={CalendarOutlined}
              text={`${new Date((story?.time ? story?.time : 0) * 1000)}`}
              key="data"
            />,
          ]}
        </Card>
        <Comments comments={comments} storyId={Number(id)} />
      </Card>
    </div>
  );
};

export default NewsListItem;
