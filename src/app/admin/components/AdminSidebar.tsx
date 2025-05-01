'use client';

import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  InboxOutlined,
  LogoutOutlined,
  AccountBookOutlined,
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';

const { Sider } = Layout;

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // 初始菜单项
  const baseMenuItems = [
    {
      key: '/admin/dashboard',
      icon: <DashboardOutlined />,
      label: '控制台',
    },
    {
      key: '/admin/customers',
      icon: <TeamOutlined />,
      label: '客户管理',
    },
    {
      key: '/admin/orders',
      icon: <ShoppingCartOutlined />,
      label: '订单管理',
    },
    {
      key: '/admin/products',
      icon: <InboxOutlined />,
      label: '库存管理',
    },
    {
      key: '/admin/raw-materials',
      icon: <AccountBookOutlined />,
      label: '原材料管理',
    },
    {
      key: '/admin/accounting',
      icon: <AccountBookOutlined />,
      label: '账本管理',
    },
    {
      key: '/admin/login',
      icon: <LogoutOutlined />,
      label: '退出登录',
      style: { marginTop: 'auto' },
    },
  ];
  const [menuItems, setMenuItems] = useState(baseMenuItems);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('erp_user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          if (user.role === 'admin') {
            setMenuItems([
              ...baseMenuItems.slice(0, 5),
              {
                key: '/admin/permission',
                icon: <TeamOutlined style={{ color: '#f5222d' }} />, // 红色图标
                label: '权限管理',
              },
              ...baseMenuItems.slice(5),
            ]);
          }
        } catch {}
      }
    }
  }, []);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div className="p-4 text-white text-center text-xl font-bold">
        {collapsed ? '后台' : '后台管理'}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[pathname]}
        items={menuItems}
        onClick={({ key }) => router.push(key)}
      />
    </Sider>
  );
}