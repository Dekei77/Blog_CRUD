import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';
import BlogList from '../components/BlogList';
import { getBlogPosts } from '../services/blogservice';
import { BlogPost } from '../types';
import { showNotification } from '../utils/notification';

const { Title } = Typography;

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const pageSize = 10;

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { posts: fetchedPosts, total: totalPosts } = await getBlogPosts(page, pageSize);
      setPosts(fetchedPosts);
      setTotal(totalPosts);
    } catch (error) {
      showNotification('error', 'Failed to load blog posts');
      console.error('Error fetching blog posts:', error);
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
      <BlogList
        posts={posts}
        loading={loading}
        total={total}
        page={page}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default BlogPage;
