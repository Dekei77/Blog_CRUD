import React, { useState } from 'react';
import { Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import BlogForm from '../components/BlogForm';
import { createBlogPost } from '../services/blogservice';
import { BlogPost } from '../types';
import { showNotification } from '../utils/notification';

const { Title } = Typography;

const CreateBlogPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (values: Pick<BlogPost, 'title' | 'text'>) => {
    setLoading(true);
    try {
      const newPost = await createBlogPost(values);
      showNotification('success', 'Post created successfully');
      navigate(`/blog/${newPost.id}`);
    } catch (error) {
      showNotification('error', 'Failed to create post');
      console.error('Error creating post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Create New Blog Post</Title>
      <BlogForm loading={loading} onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateBlogPage;
