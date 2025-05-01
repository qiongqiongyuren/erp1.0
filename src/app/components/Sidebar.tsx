'use client';

import { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';

const { Sider } = Layout;

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    {
      key: '/',
      icon: <AppstoreOutlined />,
      label: '首页',
    },
    {
      key: '/products',
      icon: <ShoppingCartOutlined />,
      label: '产品管理',
    },
    {
      key: '/customers',
      icon: <TeamOutlined />,
      label: '客户管理',
    },
    {
      key: '/orders',
      icon: <UserOutlined />,
      label: '订单管理',
    },
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      className="min-h-screen"
    >
      <div className="h-8 m-4 bg-white/10" />
      <Menu
        theme="dark"
        selectedKeys={[pathname]}
        mode="inline"
        items={menuItems}
        onClick={({ key }) => router.push(key)}
      />
    </Sider>
  );
} 