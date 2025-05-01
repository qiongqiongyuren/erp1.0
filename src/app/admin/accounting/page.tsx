'use client';

import { useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Select, DatePicker, Space, message, Card, Row, Col, Statistic } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';

interface Transaction {
  id: string;
  date: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
}

interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
}

export default function AccountingPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: '销售收入', type: 'income' },
    { id: '2', name: '其他收入', type: 'income' },
    { id: '3', name: '采购支出', type: 'expense' },
    { id: '4', name: '人工支出', type: 'expense' },
    { id: '5', name: '其他支出', type: 'expense' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [categoryForm] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // 计算统计数据
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const statistics = [
    {
      title: '总收入',
      value: totalIncome,
      prefix: '¥',
      icon: <ArrowUpOutlined />,
      color: '#52c41a',
    },
    {
      title: '总支出',
      value: totalExpense,
      prefix: '¥',
      icon: <ArrowDownOutlined />,
      color: '#f5222d',
    },
    {
      title: '结余',
      value: balance,
      prefix: '¥',
      icon: <ArrowUpOutlined />,
      color: balance >= 0 ? '#1890ff' : '#f5222d',
    },
  ];

  const columns = [
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: 'income' | 'expense') => (
        <span style={{ color: type === 'income' ? '#52c41a' : '#f5222d' }}>
          {type === 'income' ? '收入' : '支出'}
        </span>
      ),
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number, record: Transaction) => (
        <span style={{ color: record.type === 'income' ? '#52c41a' : '#f5222d' }}>
          {record.type === 'income' ? '+' : '-'}¥{amount.toFixed(2)}
        </span>
      ),
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Transaction) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record: Transaction) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
    message.success('删除成功');
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      const transaction = {
        ...values,
        date: values.date.format('YYYY-MM-DD'),
      };

      if (editingId) {
        setTransactions(transactions.map(t =>
          t.id === editingId ? { ...transaction, id: editingId } : t
        ));
        message.success('更新成功');
      } else {
        const newTransaction = {
          ...transaction,
          id: `TRX${Date.now()}`,
        };
        setTransactions([...transactions, newTransaction]);
        message.success('添加成功');
      }
      setIsModalOpen(false);
    });
  };

  const handleAddCategory = () => {
    categoryForm.resetFields();
    setIsCategoryModalOpen(true);
  };

  const handleCategoryModalOk = () => {
    categoryForm.validateFields().then(values => {
      const newCategory = {
        ...values,
        id: `CAT${Date.now()}`,
      };
      setCategories([...categories, newCategory]);
      setIsCategoryModalOpen(false);
      message.success('添加分类成功');
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">账本管理</h1>
        <Space>
          <Button onClick={handleAddCategory}>添加分类</Button>
          <Button type="primary" onClick={handleAdd}>添加记录</Button>
        </Space>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} className="mb-6">
        {statistics.map((stat, index) => (
          <Col xs={24} sm={8} key={index}>
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

      {/* 交易记录表格 */}
      <Table
        columns={columns}
        dataSource={transactions}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      {/* 添加/编辑交易记录弹窗 */}
      <Modal
        title={editingId ? '编辑记录' : '添加记录'}
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={() => setIsModalOpen(false)}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="date"
            label="日期"
            rules={[{ required: true, message: '请选择日期' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="type"
            label="类型"
            rules={[{ required: true, message: '请选择类型' }]}
          >
            <Select>
              <Select.Option value="income">收入</Select.Option>
              <Select.Option value="expense">支出</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="category"
            label="分类"
            rules={[{ required: true, message: '请选择分类' }]}
          >
            <Select>
              {categories.map(cat => (
                <Select.Option key={cat.id} value={cat.name}>
                  {cat.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="amount"
            label="金额"
            rules={[{ required: true, message: '请输入金额' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              precision={2}
              prefix="¥"
            />
          </Form.Item>
          <Form.Item
            name="description"
            label="描述"
            rules={[{ required: true, message: '请输入描述' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>

      {/* 添加分类弹窗 */}
      <Modal
        title="添加分类"
        open={isCategoryModalOpen}
        onOk={handleCategoryModalOk}
        onCancel={() => setIsCategoryModalOpen(false)}
        width={400}
      >
        <Form
          form={categoryForm}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="分类名称"
            rules={[{ required: true, message: '请输入分类名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="类型"
            rules={[{ required: true, message: '请选择类型' }]}
          >
            <Select>
              <Select.Option value="income">收入</Select.Option>
              <Select.Option value="expense">支出</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
} 