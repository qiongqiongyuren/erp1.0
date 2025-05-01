'use client';

import { Card, Row, Col, Statistic } from 'antd';
import {
  ShoppingCartOutlined,
  UserOutlined,
  DollarOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import MainLayout from '@/components/Layout';

export default function Dashboard() {
  return (
    <MainLayout>
      <div className="dashboard">
        <h1 className="text-2xl font-bold mb-6">仪表盘</h1>
        
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic
                title="总销售额"
                value={112893}
                precision={2}
                prefix={<DollarOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="订单数量"
                value={93}
                prefix={<ShoppingCartOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="客户数量"
                value={45}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="库存商品"
                value={159}
                prefix={<ShopOutlined />}
              />
            </Card>
          </Col>
        </Row>

        <div className="mt-8">
          <Row gutter={16}>
            <Col span={12}>
              <Card title="最近订单">
                {/* 这里将添加订单列表组件 */}
                <p className="text-gray-500">暂无数据</p>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="库存预警">
                {/* 这里将添加库存预警列表组件 */}
                <p className="text-gray-500">暂无数据</p>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </MainLayout>
  );
} 