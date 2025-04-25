import React from 'react';
import { List, Button, Typography, Spin, Empty } from 'antd';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';

const { Title, Paragraph } = Typography;

interface BlogListProps {
  posts: BlogPost[];
  loading: boolean;
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const BlogList: React.FC<BlogListProps> = ({ 
  posts, 
  loading, 
  total, 
  page, 
  pageSize, 
  onPageChange 
}) => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Title level={2}>Blog Posts</Title>
        <Link to="/blog/create">
          <Button type="primary">Create New Post</Button>
        </Link>
      </div>
      
      <Spin spinning={loading}>
        {posts.length > 0 ? (
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              current: page,
              pageSize: pageSize,
              total: total,
              onChange: onPageChange,
            }}
            dataSource={posts}
            renderItem={(post) => (
              <List.Item
                key={post.id}
                actions={[
                  <Link to={`/blog/${post.id}`}>
                    <Button type="link">Read More</Button>
                  </Link>,
                ]}
              >
                <List.Item.Meta
                  title={<Link to={`/blog/${post.id}`}>{post.title}</Link>}
                />
                <Paragraph ellipsis={{ rows: 2 }}>{post.text}</Paragraph>
              </List.Item>
            )}
          />
        ) : (
          <Empty description="No blog posts found" />
        )}
      </Spin>
    </div>
  );
};

export default BlogList;
