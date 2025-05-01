'use client';

import { useState } from 'react';
import { Card, Row, Col, Statistic, Table, Alert, Space } from 'antd';
import { 
  UserOutlined, 
  ShoppingCartOutlined, 
  InboxOutlined,
  DollarOutlined,
  ExclamationCircleOutlined 
} from '@ant-design/icons';

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
}

interface Order {
  id: string;
  customerName: string;
  orderDate: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  totalAmount: number;
  products: string[];
}

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  description: string;
  imageUrl?: string;
}

export default function DashboardPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  // 统计数据
  const statistics = [
    {
      title: '客户总数',
      value: customers.length,
      icon: <UserOutlined />,
      color: '#1890ff',
    },
    {
      title: '订单总数',
      value: orders.length,
      icon: <ShoppingCartOutlined />,
      color: '#52c41a',
    },
    {
      title: '商品总数',
      value: products.length,
      icon: <InboxOutlined />,
      color: '#722ed1',
    },
    {
      title: '订单总金额',
      value: orders.reduce((sum, order) => sum + order.totalAmount, 0),
      prefix: '¥',
      icon: <DollarOutlined />,
      color: '#fa8c16',
    },
  ];

  // 最近订单列表
  const recentOrderColumns = [
    {
      title: '订单编号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '客户名称',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: '订单日期',
      dataIndex: 'orderDate',
      key: 'orderDate',
    },
    {
      title: '金额',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount: number) => `¥${amount.toFixed(2)}`,
    },
  ];

  // 库存预警商品列表
  const lowStockColumns = [
    {
      title: '商品编号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '当前库存',
      dataIndex: 'stock',
      key: 'stock',
    },
  ];

  // 获取库存预警商品（库存小于等于5的商品）
  const lowStockProducts = products.filter(product => product.stock <= 5);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">控制台</h1>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} className="mb-6">
        {statistics.map((stat, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <Card>
              <Statistic
                title={
                  <Space>
                    {stat.icon}
                    <span>{stat.title}</span>
                  </Space>
                }
                value={stat.value}
                prefix={stat.prefix}
                valueStyle={{ color: stat.color }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* 最近订单 */}
      <Card
        title={
          <Space>
            <ShoppingCartOutlined />
            <span>最近订单</span>
          </Space>
        }
        className="mb-6"
      >
        {orders.length > 0 ? (
          <Table
            columns={recentOrderColumns}
            dataSource={orders.slice(-5).reverse()}
            rowKey="id"
            pagination={false}
          />
        ) : (
          <Alert message="暂无订单数据" type="info" showIcon />
        )}
      </Card>

      {/* 库存预警 */}
      <Card
        title={
          <Space>
            <ExclamationCircleOutlined />
            <span>库存预警</span>
          </Space>
        }
      >
        {lowStockProducts.length > 0 ? (
          <Table
            columns={lowStockColumns}
            dataSource={lowStockProducts}
            rowKey="id"
            pagination={false}
          />
        ) : (
          <Alert message="暂无库存预警" type="success" showIcon />
        )}
      </Card>
    </div>
  );
} 