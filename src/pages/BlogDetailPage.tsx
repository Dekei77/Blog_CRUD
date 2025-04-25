import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { getBlogPostById, deleteBlogPost } from '../services/blogservice';
import { BlogPost } from '../types';
import BlogDetail from '../components/BlogDetail';
import { showNotification } from '../utils/notification';

const BlogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPost = useCallback(async () => {
    if (!id) return;
    
    setLoading(true);
    try {
      const postId = parseInt(id, 10);
      const fetchedPost = await getBlogPostById(postId);
      
      if (!fetchedPost) {
        setError('Post not found');
        return;
      }
      
      setPost(fetchedPost);
    } catch (err) { 
      const errorMessage = 'Failed to load blog post';
      setError(errorMessage);
      showNotification('error', errorMessage);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const handleDelete = async () => {
    if (!post) return;
    
    try {
      await deleteBlogPost(post.id);
      showNotification('success', 'Post deleted successfully');
      navigate('/blog');
    } catch (error) {
      showNotification('error', 'Failed to delete post');
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <BlogDetail
        post={post}
        loading={loading}
        error={error}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default BlogDetailPage;
