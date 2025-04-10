'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, Card, Typography, Button, Descriptions, Empty, Table, Tag, Row, Col, App } from 'antd';
import {
    UserOutlined,
    ShoppingOutlined,
    HeartOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import { useAuth } from '@/contexts/AuthContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import Orders from '@/components/Orders/Orders';
import ProductGrid from '@/components/ProductGrid/ProductGrid';
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';
import styles from './Account.module.css';
import { validateAuth } from '@/utils/auth';

const { Title, Text } = Typography;

const AccountPage = () => {
    const router = useRouter();
    const { message } = App.useApp();
    const { user, logout } = useAuth();
    const { wishlistItems } = useWishlist();
    const { cartItems } = useCart();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            const auth = validateAuth();

            if (!auth.isValid && !user) {
                message.error('Please login to access your account');
                router.replace('/login');
                return;
            }

            setIsLoading(false);
        };

        checkAuth();
    }, [router, message]);

    if (isLoading) {
        return <LoadingScreen />;
    }

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    const orderColumns = [
        {
            title: 'Order ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={
                    status === 'completed' ? 'green' :
                        status === 'pending' ? 'gold' :
                            'red'
                }>
                    {status.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            render: (total) => `$${total.toFixed(2)}`,
        },
    ];

    const items = [
        {
            key: 'profile',
            label: (
                <span>
                    <UserOutlined /> Profile
                </span>
            ),
            children: (
                <div className={styles.profileSection}>
                    <Descriptions
                        title="Personal Information"
                        bordered
                        column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
                    >
                        <Descriptions.Item label="Username">{user?.username}</Descriptions.Item>
                        <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
                        <Descriptions.Item label="Full Name">{user?.name?.firstname} {user?.name?.lastname}</Descriptions.Item>
                        <Descriptions.Item label="Phone">{user?.phone}</Descriptions.Item>
                        <Descriptions.Item label="Address" span={2}>
                            {user?.address?.street}, {user?.address?.city}, {user?.address?.zipcode}
                        </Descriptions.Item>
                    </Descriptions>
                </div>
            ),
        },
        {
            key: 'orders',
            label: (
                <span>
                    <ShoppingOutlined /> Orders
                </span>
            ),
            children: <Orders userId={user?.id} />
        },
        {
            key: 'wishlist',
            label: (
                <span>
                    <HeartOutlined /> Wishlist ({wishlistItems.length})
                </span>
            ),
            children: (
                <div className={styles.wishlistSection}>
                    {wishlistItems.length > 0 ? (
                        <>
                            <Title level={3} className={styles.sectionTitle}>
                                My Wishlist ({wishlistItems.length} items)
                            </Title>
                            <ProductGrid
                                products={wishlistItems}
                                aria-label="Wishlist products"
                            />
                        </>
                    ) : (
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description={
                                <div className={styles.emptyStateContent}>
                                    <Text>Your wishlist is empty</Text>
                                    <Button
                                        type="primary"
                                        onClick={() => router.push('/products')}
                                        icon={<ShoppingOutlined />}
                                    >
                                        Continue Shopping
                                    </Button>
                                </div>
                            }
                        />
                    )}
                </div>
            ),
        },
    ];

    return (
        <div className={styles.accountPage}>
            <div className={styles.accountHeader}>
                <Title level={2}>My Account</Title>
                <Button
                    type="primary"
                    danger
                    icon={<LogoutOutlined />}
                    onClick={handleLogout}
                    aria-label="Sign out"
                >
                    Sign Out
                </Button>
            </div>

            <Card>
                <Tabs
                    items={items}
                    defaultActiveKey="profile"
                    className={styles.accountTabs}
                />
            </Card>
        </div>
    );
};

export default AccountPage;