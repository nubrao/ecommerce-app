'use client';

import React, { useState, useEffect } from 'react';
import { Table, Tag, Typography, Empty, App } from 'antd';
import { cartService } from '@/services/cartService';
import { ProductService } from '@/services/api';
import { formatDate } from '@/utils/dateFormatter';
import styles from './Orders.module.css';

const { Title, Text } = Typography;

const Orders = ({ userId }) => {
    const { message } = App.useApp();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userId) {
            fetchOrders();
        }
    }, [userId]);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const userCarts = await cartService.getUserCarts(userId);
            const allProducts = await ProductService.getAll();

            const productsMap = allProducts.reduce((acc, product) => {
                acc[product.id] = product;
                return acc;
            }, {});

            const processedOrders = userCarts.map(cart => ({
                key: cart.id,
                id: cart.id,
                date: formatDate(cart.date),
                products: cart.products.map(item => ({
                    ...item,
                    details: productsMap[item.productId],
                })),
                total: calculateTotal(cart.products, productsMap),
                status: getOrderStatus(cart.date),
            }));

            setOrders(processedOrders);
        } catch (error) {
            message.error('Failed to load orders');
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const calculateTotal = (products, productsMap) => {
        return products.reduce((total, item) => {
            const product = productsMap[item.productId];
            return total + (product?.price || 0) * item.quantity;
        }, 0);
    };

    const getOrderStatus = (date) => {
        const orderDate = new Date(date);
        const now = new Date();
        const diffDays = Math.floor((now - orderDate) / (1000 * 60 * 60 * 24));

        if (diffDays > 7) return 'completed';
        if (diffDays > 2) return 'shipped';
        return 'processing';
    };

    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'id',
            key: 'id',
            ellipsis: true,
            width: 80,
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            ellipsis: true,
            responsive: ['md'],
        },
        {
            title: 'Products',
            key: 'products',
            render: (_, record) => (
                <div className={styles.productsList}>
                    {record.products.map((item, index) => (
                        <div key={index} className={styles.productItem}>
                            <Text ellipsis className={styles.productTitle}>
                                {item.details?.title}
                            </Text>
                            <Text className={styles.quantity}>x{item.quantity}</Text>
                        </div>
                    ))}
                </div>
            ),
            responsive: ['sm'],
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={
                    status === 'completed' ? 'green' :
                        status === 'shipped' ? 'blue' :
                            'gold'
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
            align: 'right',
        },
    ];

    const expandedRowRender = (record) => (
        <div className={styles.expandedContent}>
            <div className={styles.expandedSection}>
                <Text type="secondary">Date:</Text>
                <Text>{record.date}</Text>
            </div>
            <div className={styles.expandedSection}>
                <Text type="secondary">Products:</Text>
                <div className={styles.expandedProducts}>
                    {record.products.map((item, index) => (
                        <div key={index} className={styles.expandedProductItem}>
                            <Text>{item.details?.title}</Text>
                            <Text type="secondary" className={styles.quantity}>x{item.quantity}</Text>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    if (!userId) {
        return (
            <Empty
                description="Please log in to view your orders"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
        );
    }

    return (
        <div className={styles.ordersContainer}>
            <Table
                columns={columns}
                dataSource={orders}
                loading={loading}
                pagination={{
                    pageSize: 5,
                    showTotal: (total) => `Total ${total} orders`,
                    responsive: true,
                }}
                expandable={{
                    expandedRowRender,
                    showExpandColumn: true,
                }}
                scroll={{ x: true }}
                className={styles.ordersTable}
                locale={{
                    emptyText: (
                        <Empty
                            description="No orders found"
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                        />
                    )
                }}
            />
        </div>
    );
};

export default Orders;