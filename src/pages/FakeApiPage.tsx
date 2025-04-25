import React, { useState, useEffect } from 'react';
import { Typography, List, Card, Spin, Pagination } from 'antd';
import { getFakePosts } from '../services/fakeApiService';
import { FakeApiPost } from '../types';
import { showNotification } from '../utils/notification';

const { Title, Paragraph } = Typography;

const FakeApiPage: React.FC = () => {
  const [posts, setPosts] = useState<FakeApiPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const pageSize = 10;

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { posts: fetchedPosts, total: totalPosts } = await getFakePosts(page, pageSize);
      setPosts(fetchedPosts);
      setTotal(totalPosts);
    } catch (error) {
      showNotification('error', 'Failed to load posts from Fake API');
      console.error('Error fetching fake API posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Posts from Fake API</Title>
      <Spin spinning={loading}>
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={posts}
          renderItem={(post) => (
            <List.Item>
              <Card title={post.title}>
                <Paragraph>{post.body}</Paragraph>
                <div style={{ marginTop: '10px', fontStyle: 'italic' }}>
                  User ID: {post.userId}
                </div>
              </Card>
            </List.Item>
          )}
        />
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Pagination
            current={page}
            pageSize={pageSize}
            total={total}
            onChange={handlePageChange}
          />
        </div>
      </Spin>
    </div>
  );
};

export default FakeApiPage;
