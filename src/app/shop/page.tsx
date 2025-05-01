'use client';

import { Card, Row, Col, Button, Carousel } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const carouselItems = [
    {
      title: '新品上市',
      description: '探索我们的最新产品',
      image: 'https://via.placeholder.com/1200x400',
    },
    {
      title: '限时特惠',
      description: '享受独家优惠',
      image: 'https://via.placeholder.com/1200x400',
    },
  ];

  const featuredProducts = [
    {
      id: '1',
      name: '产品1',
      price: 199,
      image: 'https://via.placeholder.com/300',
      description: '产品描述...',
    },
    {
      id: '2',
      name: '产品2',
      price: 299,
      image: 'https://via.placeholder.com/300',
      description: '产品描述...',
    },
    {
      id: '3',
      name: '产品3',
      price: 399,
      image: 'https://via.placeholder.com/300',
      description: '产品描述...',
    },
  ];

  return (
    <div>
      <Carousel autoplay>
        {carouselItems.map((item, index) => (
          <div key={index}>
            <div
              style={{
                height: '400px',
                color: '#fff',
                lineHeight: '400px',
                textAlign: 'center',
                background: '#364d79',
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <h2 className="text-4xl font-bold">{item.title}</h2>
              <p className="text-xl">{item.description}</p>
            </div>
          </div>
        ))}
      </Carousel>

      <div className="py-12">
        <h2 className="text-2xl font-bold mb-8 text-center">热门产品</h2>
        <Row gutter={[16, 16]}>
          {featuredProducts.map((product) => (
            <Col key={product.id} xs={24} sm={12} md={8}>
              <Card
                hoverable
                cover={<img alt={product.name} src={product.image} />}
                actions={[
                  <Button
                    key="buy"
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    onClick={() => router.push(`/products/${product.id}`)}
                  >
                    立即购买
                  </Button>,
                ]}
              >
                <Card.Meta
                  title={product.name}
                  description={
                    <div>
                      <p className="text-red-500 text-lg">¥{product.price}</p>
                      <p>{product.description}</p>
                    </div>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
} 