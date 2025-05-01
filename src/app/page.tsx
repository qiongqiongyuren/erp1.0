'use client';

import { Button } from 'antd';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">欢迎使用ERP系统</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col items-center w-72">
          <span className="text-5xl mb-4">🛒</span>
          <h2 className="text-xl font-semibold mb-2">进入前台系统</h2>
          <p className="text-gray-500 mb-4">面向客户的购物与浏览体验</p>
          <Button type="primary" size="large" block onClick={() => router.push('/shop')}>进入前台</Button>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col items-center w-72">
          <span className="text-5xl mb-4">🛠️</span>
          <h2 className="text-xl font-semibold mb-2">进入后台管理</h2>
          <p className="text-gray-500 mb-4">员工与管理员的管理操作入口</p>
          <Button type="default" size="large" block onClick={() => router.push('/admin/dashboard')}>进入后台</Button>
        </div>
      </div>
    </div>
  );
}
