'use client';

import { Table, Button } from 'antd';

export default function ProductsPage() {
  const columns = [
    {
      title: '产品名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '库存',
      dataIndex: 'stock',
      key: 'stock',
    },
  ];

  const data = [
    {
      key: '1',
      name: '示例产品1',
      price: '¥100',
      stock: 10,
    },
    {
      key: '2',
      name: '示例产品2',
      price: '¥200',
      stock: 20,
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">产品管理</h1>
        <Button type="primary">添加产品</Button>
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
} 