"use client";
import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, InputNumber, message, Space } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

interface RawMaterial {
  id: string;
  name: string;
  price: number;
  stock: number;
  unit: string;
  description?: string;
}

export default function RawMaterialsPage() {
  const [materials, setMaterials] = useState<RawMaterial[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/raw-materials")
      .then(async (res) => {
        try {
          const data = await res.json();
          setMaterials(data);
        } catch {
          setMaterials([]);
        }
      });
  }, []);

  const columns = [
    { title: "原材料编号", dataIndex: "id", key: "id" },
    { title: "名称", dataIndex: "name", key: "name" },
    { title: "单价", dataIndex: "price", key: "price", render: (v:number) => `¥${v.toFixed(2)}` },
    { title: "库存", dataIndex: "stock", key: "stock" },
    { title: "单位", dataIndex: "unit", key: "unit" },
    { title: "描述", dataIndex: "description", key: "description" },
    {
      title: "操作",
      key: "action",
      render: (_: any, record: RawMaterial) => (
        <Space>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>
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

  const handleEdit = (record: RawMaterial) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/raw-materials/${id}`, { method: "DELETE" });
    message.success("删除成功");
    const res = await fetch("/api/raw-materials");
    setMaterials(await res.json());
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingId) {
        await fetch(`/api/raw-materials/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        message.success("更新成功");
      } else {
        await fetch("/api/raw-materials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        message.success("添加成功");
      }
      const res = await fetch("/api/raw-materials");
      setMaterials(await res.json());
      setIsModalOpen(false);
    } catch (e) {
      message.error("提交失败");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">原材料管理</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          添加原材料
        </Button>
      </div>
      <Table columns={columns} dataSource={materials} rowKey="id" pagination={{ pageSize: 10 }} />
      <Modal
        title={editingId ? "编辑原材料" : "添加原材料"}
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={() => setIsModalOpen(false)}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="名称" rules={[{ required: true, message: "请输入原材料名称" }]}> <Input /> </Form.Item>
          <Form.Item name="price" label="单价" rules={[{ required: true, message: "请输入单价" }]}> <InputNumber style={{ width: "100%" }} min={0} precision={2} prefix="¥" /> </Form.Item>
          <Form.Item name="stock" label="库存" rules={[{ required: true, message: "请输入库存数量" }]}> <InputNumber style={{ width: "100%" }} min={0} /> </Form.Item>
          <Form.Item name="unit" label="单位" rules={[{ required: true, message: "请输入单位" }]}> <Input /> </Form.Item>
          <Form.Item name="description" label="描述"> <Input.TextArea rows={3} /> </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
