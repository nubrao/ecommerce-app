import React from 'react';
import { Card, Col, Row, Button } from 'antd';
import Link from 'next/link';
import styles from './ProductList.module.css';

const ProductList = ({ products }) => {
    return (
        <div className={styles.productList}>
            <Row gutter={16}>
                {products.map((product) => (
                    <Col span={8} key={product.id}>
                        <Card
                            hoverable
                            cover={<img alt={product.title} src={product.image} />}
                            actions={[
                                <Link href={`/product/${product.id}`}>
                                    <Button type="primary">Ver Detalhes</Button>
                                </Link>,
                            ]}
                        >
                            <Card.Meta title={product.title} description={`$${product.price}`} />
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ProductList;
