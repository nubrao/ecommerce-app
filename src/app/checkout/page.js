'use client';

import React from 'react';
import { Form, Input, Button, Row, Col, Card, Typography, Divider, App } from 'antd';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';
import styles from './Checkout.module.css';

const { Title, Text } = Typography;

const CheckoutPage = () => {
    const router = useRouter();
    const { message } = App.useApp();
    const { cartItems = [], total = 0 } = useCart() || {};
    const { user } = useAuth();
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        // Check authentication
        if (!user) {
            message.info('Please sign in to access checkout');
            router.push('/login');
            return;
        }
        setLoading(false);
    }, [user, router, message]);

    const handleSubmit = async (values) => {
        try {
            // Handle checkout logic here
            console.log('Checkout values:', values);
            message.success('Order placed successfully!');
            router.push('/account');
        } catch (error) {
            message.error('Failed to place order');
        }
    };

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <div className={styles.checkoutPage}>
            <Title level={2}>Checkout</Title>

            <Row gutter={[24, 24]}>
                <Col xs={24} lg={16}>
                    <Card title="Billing Details">
                        <Form
                            layout="vertical"
                            onFinish={handleSubmit}
                            initialValues={{
                                name: user?.name?.firstname + ' ' + user?.name?.lastname,
                                email: user?.email,
                                phone: user?.phone,
                                address: user?.address?.street,
                                city: user?.address?.city,
                                zipcode: user?.address?.zipcode,
                            }}
                        >
                            <Row gutter={16}>
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name="name"
                                        label="Full Name"
                                        rules={[{ required: true, message: 'Please enter your name' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name="email"
                                        label="Email"
                                        rules={[
                                            { required: true, message: 'Please enter your email' },
                                            { type: 'email', message: 'Please enter a valid email' }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name="phone"
                                        label="Phone"
                                        rules={[{ required: true, message: 'Please enter your phone number' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name="address"
                                        label="Address"
                                        rules={[{ required: true, message: 'Please enter your address' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name="city"
                                        label="City"
                                        rules={[{ required: true, message: 'Please enter your city' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name="zipcode"
                                        label="ZIP Code"
                                        rules={[{ required: true, message: 'Please enter your ZIP code' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </Col>

                <Col xs={24} lg={8}>
                    <Card title="Order Summary">
                        <div className={styles.orderSummary}>
                            <div className={styles.orderItems}>
                                {cartItems.map((item) => (
                                    <div key={item.id} className={styles.orderItem}>
                                        <Text ellipsis>{item.title}</Text>
                                        <Text>
                                            {item.quantity} x ${item.price.toFixed(2)}
                                        </Text>
                                    </div>
                                ))}
                            </div>

                            <Divider />

                            <div className={styles.orderTotal}>
                                <Text strong>Total:</Text>
                                <Text strong>${total.toFixed(2)}</Text>
                            </div>

                            <Button
                                type="primary"
                                size="large"
                                block
                                onClick={() => handleSubmit()}
                                className={styles.checkoutButton}
                            >
                                Place Order
                            </Button>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default CheckoutPage;