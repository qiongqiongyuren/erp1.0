'use client';

import { useState } from 'react';
import { Card, Form, Input, Button, message, Tabs } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

export default function ShopLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState('login');

  // 登录处理
  const onLogin = async (values: { username: string; password: string }) => {
    setLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (res.ok) {
        message.success('登录成功！');
        localStorage.setItem('erp_user', JSON.stringify(data));
        router.push('/shop');
      } else {
        message.error(data.error || '用户名或密码错误！');
      }
    } catch (error) {
      message.error('登录失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  // 注册处理
  const onRegister = async (values: { username: string; email: string; password: string }) => {
    setLoading(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (res.ok) {
        message.success('注册成功，请登录！');
        setTab('login');
      } else {
        message.error(data.error || '注册失败！');
      }
    } catch (error) {
      message.error('注册失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card title="用户登录/注册" style={{ width: 400 }}>
        <Tabs activeKey={tab} onChange={setTab} centered>
          <Tabs.TabPane tab="登录" key="login">
            <Form name="shop_login" onFinish={onLogin} autoComplete="off" layout="vertical">
              <Form.Item name="username" rules={[{ required: true, message: '请输入用户名！' }]}> 
                <Input prefix={<UserOutlined />} placeholder="用户名" size="large" />
              </Form.Item>
              <Form.Item name="password" rules={[{ required: true, message: '请输入密码！' }]}> 
                <Input.Password prefix={<LockOutlined />} placeholder="密码" size="large" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" size="large" block loading={loading}>
                  登录
                </Button>
              </Form.Item>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab="注册" key="register">
            <Form name="shop_register" onFinish={onRegister} autoComplete="off" layout="vertical">
              <Form.Item name="username" rules={[{ required: true, message: '请输入用户名！' }]}> 
                <Input prefix={<UserOutlined />} placeholder="用户名" size="large" />
              </Form.Item>
              <Form.Item name="email" rules={[{ required: true, message: '请输入邮箱！' }, { type: 'email', message: '请输入有效的邮箱地址' }]}> 
                <Input prefix={<UserOutlined />} placeholder="邮箱" size="large" />
              </Form.Item>
              <Form.Item name="password" rules={[{ required: true, message: '请输入密码！' }]}> 
                <Input.Password prefix={<LockOutlined />} placeholder="密码" size="large" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" size="large" block loading={loading}>
                  注册
                </Button>
              </Form.Item>
            </Form>
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  );
}
