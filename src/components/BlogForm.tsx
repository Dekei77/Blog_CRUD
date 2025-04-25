import React from 'react';
import { Form, Input, Button, Spin } from 'antd';
import { BlogPost } from '../types';

const { TextArea } = Input;

interface BlogFormProps {
  initialValues?: Pick<BlogPost, 'title' | 'text'>;
  loading: boolean;
  onSubmit: (values: Pick<BlogPost, 'title' | 'text'>) => void;
}

const BlogForm: React.FC<BlogFormProps> = ({ initialValues, loading, onSubmit }) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [form, initialValues]);

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={onSubmit}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please enter a title' }]}
        >
          <Input placeholder="Enter post title" />
        </Form.Item>
        <Form.Item
          name="text"
          label="Content"
          rules={[{ required: true, message: 'Please enter content' }]}
        >
          <TextArea rows={8} placeholder="Enter post content" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            {initialValues ? 'Update Post' : 'Create Post'}
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default BlogForm;