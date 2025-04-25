import React from 'react';
import { Typography, Divider, Space, Button, Popconfirm, Spin, Result } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';

const { Title, Paragraph } = Typography;

interface BlogDetailProps {
  post: BlogPost | null;
  loading: boolean;
  error: string | null;
  onDelete: () => void;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ post, loading, error, onDelete }) => {
  if (loading) {
    return <Spin size="large" style={{ display: 'block', margin: '20px auto' }} />;
  }

  if (error) {
    return <Result status="error" title="Error" subTitle={error} />;
  }

  if (!post) {
    return <Result status="404" title="404" subTitle="Post not found" />;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title>{post.title}</Title>
        <Space>
          <Link to={`/blog/${post.id}/edit`}>
            <Button type="primary" icon={<EditOutlined />}>
              Edit
            </Button>
          </Link>
          <Popconfirm
            title="Delete this post?"
            description="Are you sure you want to delete this post?"
            onConfirm={onDelete}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      </div>
      <Divider />
      <Paragraph style={{ fontSize: '16px', whiteSpace: 'pre-wrap' }}>{post.text}</Paragraph>
      <Divider />
      <Link to="/blog">
        <Button>Back to Blog List</Button>
      </Link>
    </div>
  );
};

export default BlogDetail;
