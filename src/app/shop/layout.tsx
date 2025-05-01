'use client';

import { Layout, Menu, Button } from 'antd';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';

const { Header, Content, Footer } = Layout;

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    {
      key: '/',
      label: '首页',
    },
    {
      key: '/products',
      label: '产品列表',
    },
    {
      key: '/about',
      label: '关于我们',
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="flex items-center">
          <div className="text-white text-xl font-bold mr-8">
            我的商城
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[pathname]}
            items={menuItems}
            onClick={({ key }) => router.push(key)}
            style={{ flex: 1, minWidth: 0 }}
          />
        </div>
        <div className="flex items-center">
          <Button
            type="text"
            icon={<ShoppingCartOutlined />}
            onClick={() => router.push('/cart')}
            style={{ color: 'white' }}
          >
            购物车
          </Button>
          <Button
            type="text"
            icon={<UserOutlined />}
            onClick={() => router.push('/shop/login')}
            style={{ color: 'white' }}
          >
            登录
          </Button>
        </div>
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 24 }}>
        {children}
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        {new Date().getFullYear()} 我的商城 版权所有
      </Footer>
    </Layout>
  );
} 