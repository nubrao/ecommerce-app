'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { Form, Input, Button, Row, Col, Card, Typography, Divider } from 'antd';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';
import styles from './Checkout.module.css';

const { Title } = Typography;

const CheckoutPage = () => {
    const { data: session } = useSession();
    const { cartItems, cartTotal } = useCart();
    const router = useRouter();

    const onFinish = (values) => {
        console.log('Form values:', values);
    };

    return (
        <div className={styles.checkoutContainer}>
            <Row gutter={[32, 32]}>
                <Col xs={24} lg={16}>
                    <Card>
                        <Title level={2}>Order Details</Title>
                        <Form
                            layout="vertical"
                            onFinish={onFinish}
                            initialValues={session?.user ? {
                                email: session.user.email,
                                name: session.user.name
                            } : {}}
                        >
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        name="name"
                                        label="Full Name"
                                        rules={[{ required: true }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="email"
                                        label="Email"
                                        rules={[{ required: true, type: 'email' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col span={24}>
                                    <Form.Item
                                        name="address"
                                        label="Address"
                                        rules={[{ required: true }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>


                            <Divider />

                            <Button type="primary" htmlType="submit" block>
                                Go to payment
                            </Button>
                        </Form>
                    </Card>
                </Col>

                <Col xs={24} lg={8}>
                    <Card>
                        <Title level={2}>Order Summary</Title>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default CheckoutPage;