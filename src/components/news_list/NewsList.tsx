import { StarOutlined, CalendarOutlined } from '@ant-design/icons';
import { Avatar, List, Space } from 'antd';
import randomWords from 'random-words';
import React from 'react';
import { Link } from 'react-router-dom';
import { postList } from '../../App';

export interface NewsListProps {
  newsJson: postList;
}

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const NewsList: React.FC<NewsListProps> = ({ newsJson }) => (
  <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: (page) => {
        console.log('json ', newsJson);
      },
      pageSize: 5,
    }}
    dataSource={newsJson}
    renderItem={(item) => (
      <List.Item
        key={item.id}
        actions={[
          <IconText icon={StarOutlined} text={`${item.score}`} key="list-vertical-star-o" />,
          <IconText icon={CalendarOutlined} text={`${new Date(item.time * 1000)}`} key="data" />,
        ]}
      >
        <List.Item.Meta
          avatar={<Avatar src={`https://robohash.org/${randomWords(5)}`} />}
          title={
            <Link key={item.id} to={`/news/${item.id}`}>
              {item.title}
            </Link>
          }
          description={`by: ${item.by}`}
        />
      </List.Item>
    )}
  />
);

export default NewsList;
