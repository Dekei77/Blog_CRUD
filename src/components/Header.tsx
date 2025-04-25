import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const location = useLocation();
  const selectedKey = location.pathname.includes('/blog') ? '1' : '2';

  return (
    <AntHeader style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%', display: 'flex', alignItems: 'center' }}>
      <div className="demo-logo" style={{ color: 'white', fontWeight: 'bold', fontSize: '18px', marginRight: '24px' }}>
        Blog App
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[selectedKey]}
        items={[
          {
            key: '1',
            label: <Link to="/blog">Blog</Link>,
          },
          {
            key: '2',
            label: <Link to="/fake-api">Fake API</Link>,
          },
        ]}
        style={{ flex: 1, minWidth: 0 }}
      />
    </AntHeader>
  );
};

export default Header;