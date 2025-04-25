import axios from 'axios';
import { FakeApiPost } from '../types';

const API_URL = 'https://dummyjson.com/posts';

export const getFakePosts = async (page: number = 1, pageSize: number = 10): Promise<{ posts: FakeApiPost[], total: number }> => {
  try {
    const skip = (page - 1) * pageSize;
    const response = await axios.get(`${API_URL}?limit=${pageSize}&skip=${skip}`, {
      timeout: 10000 
    });

    const { posts: allPosts, total } = response.data;

    const paginatedPosts: FakeApiPost[] = allPosts.map((post: any) => ({
      id: post.id,
      title: post.title,
      body: post.body,
      userId: post.userId,
    }));

    return { posts: paginatedPosts, total };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message);
      console.error('Status:', error.response?.status);
      console.error('Response data:', error.response?.data);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};