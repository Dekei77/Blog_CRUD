import { BlogPost } from '../types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getBlogPosts = async (page: number = 1, pageSize: number = 10): Promise<{ posts: BlogPost[], total: number }> => {
  await delay(500);
  const storedPosts = localStorage.getItem('blogPosts');
  const blogPosts: BlogPost[] = storedPosts ? JSON.parse(storedPosts) : [];
  
  const activePosts = blogPosts.filter(post => !post.deleted);
  
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedPosts = activePosts.slice(startIndex, endIndex);
  
  return { posts: paginatedPosts, total: activePosts.length };
};

export const getBlogPostById = async (id: number): Promise<BlogPost | null> => {
  await delay(500);
  const storedPosts = localStorage.getItem('blogPosts');
  const blogPosts: BlogPost[] = storedPosts ? JSON.parse(storedPosts) : [];
  const post = blogPosts.find(post => post.id === id && !post.deleted);
  return post || null;
};

export const createBlogPost = async (post: Omit<BlogPost, 'id' | 'deleted'>): Promise<BlogPost> => {
  await delay(500);
  const storedPosts = localStorage.getItem('blogPosts');
  const blogPosts: BlogPost[] = storedPosts ? JSON.parse(storedPosts) : [];
  
  const newPost: BlogPost = {
    ...post,
    id: Date.now(),
    deleted: false,
  };
  
  const updatedPosts = [...blogPosts, newPost];
  localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
  
  return newPost;
};

export const updateBlogPost = async (id: number, updatedPost: Pick<BlogPost, 'title' | 'text'>): Promise<BlogPost> => {
  await delay(500);
  const storedPosts = localStorage.getItem('blogPosts');
  const blogPosts: BlogPost[] = storedPosts ? JSON.parse(storedPosts) : [];
  
  const postIndex = blogPosts.findIndex(post => post.id === id);
  if (postIndex === -1) {
    throw new Error('Post not found');
  }
  
  const updatedPosts = [...blogPosts];
  updatedPosts[postIndex] = {
    ...updatedPosts[postIndex],
    ...updatedPost,
  };
  
  localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
  return updatedPosts[postIndex];
};

export const deleteBlogPost = async (id: number): Promise<void> => {
  await delay(500);
  const storedPosts = localStorage.getItem('blogPosts');
  const blogPosts: BlogPost[] = storedPosts ? JSON.parse(storedPosts) : [];
  
  const postIndex = blogPosts.findIndex(post => post.id === id);
  if (postIndex === -1) {
    throw new Error('Post not found');
  }
  
  const updatedPosts = [...blogPosts];
  updatedPosts[postIndex] = {
    ...updatedPosts[postIndex],
    deleted: true,
  };
  
  localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
};