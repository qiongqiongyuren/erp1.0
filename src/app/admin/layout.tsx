'use client';

import { Layout } from 'antd';
import AdminSidebar from './components/AdminSidebar';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const { Content } = Layout;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';
  
  // 本地存储用户信息
  const [userInfo, setUserInfo] = useState<{ username: string; role: string } | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('erp_user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          setUserInfo({ username: user.username, role: user.role });
        } catch {}
      }
    }
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {!isLoginPage && <AdminSidebar />}
      <Layout style={{ marginLeft: !isLoginPage ? 200 : 0, transition: 'margin-left 0.2s' }}>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
          <div className="mb-4 flex justify-between items-center">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow"
              onClick={() => window.location.href = '/'}
            >
              回到首页
            </button>
            <div className="text-gray-600 text-sm">
              {userInfo ? (
                <span>
                  当前用户：<b>{userInfo.username}</b>（<b>{userInfo.role === 'admin' ? '管理员' : userInfo.role}</b>）
                </span>
              ) : null}
            </div>
          </div>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
} 