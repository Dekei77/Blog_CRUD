import React, { useState, useEffect } from 'react';
import { Typography, Result, Spin } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import BlogForm from '../components/BlogForm';
import { getBlogPostById, updateBlogPost } from '../services/blogservice';
import { BlogPost } from '../types';
import { showNotification } from '../utils/notification';

const { Title } = Typography;

const EditBlogPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      
      try {
        const postId = parseInt(id, 10);
        const fetchedPost = await getBlogPostById(postId);
        
        if (!fetchedPost) {
          setError('Post not found');
          return;
        }
        
        setPost(fetchedPost);
      } catch (error) {
        setError('Failed to load blog post');
        showNotification('error', 'Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (values: Pick<BlogPost, 'title' | 'text'>) => {
    if (!post) return;
    
    setSubmitting(true);
    try {
      await updateBlogPost(post.id, values);
      showNotification('success', 'Post updated successfully');
      navigate(`/blog/${post.id}`);
    } catch (error) {
      showNotification('error', 'Failed to update post');
      console.error('Error updating post:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div style={{ padding: '24px' }}>
        <Result status="404" title="404" subTitle={error || 'Post not found'} />
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Edit Blog Post</Title>
      <BlogForm 
        initialValues={{ title: post.title, text: post.text }}
        loading={submitting}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default EditBlogPage;
