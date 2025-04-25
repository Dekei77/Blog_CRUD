import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import Header from './components/Header';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import CreateBlogPage from './pages/CreateBlogPage';
import EditBlogPage from './pages/EditBlogPage';
import FakeApiPage from './pages/FakeApiPage';
import 'antd/dist/reset.css';

const { Content, Footer } = Layout;

const App: React.FC = () => {
  return (
    <Router>
      <Layout className="layout" style={{ minHeight: '100vh' }}>
        <Header />
        <Content style={{ padding: '0 50px', marginTop: 24 }}>
          <div className="site-layout-content" style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <Routes>
              <Route path="/" element={<Navigate to="/blog" replace />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/create" element={<CreateBlogPage />} />
              <Route path="/blog/:id" element={<BlogDetailPage />} />
              <Route path="/blog/:id/edit" element={<EditBlogPage />} />
              <Route path="/fake-api" element={<FakeApiPage />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Blog App ©{new Date().getFullYear()}</Footer>
      </Layout>
    </Router>
  );
};

export default App;
