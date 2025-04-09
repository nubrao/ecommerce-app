'use client';

import React from 'react';
import { Row, Col, Typography, Space } from 'antd';
import { PhoneOutlined, MailOutlined, EnvironmentOutlined, DollarOutlined, UserOutlined } from '@ant-design/icons';
import styles from './TopHeader.module.css';

const { Text } = Typography;

const TopHeader = () => {
    return (
        <div id="top-header" className={styles.topHeader}>
            <div className="container">
                <Row justify="space-between" align="middle">
                    <Col>
                        <Space size="large">
                            <a href="#" className={styles.headerLink}>
                                <PhoneOutlined />
                                <Text className={styles.headerText}>+55 47 99209-0669</Text>
                            </a>
                            <a href="#" className={styles.headerLink}>
                                <MailOutlined />
                                <Text className={styles.headerText}>brunomcamara@outlook.com</Text>
                            </a>
                            <a href="#" className={styles.headerLink}>
                                <EnvironmentOutlined />
                                <Text className={styles.headerText}>Rua Fake, 1234</Text>
                            </a>
                        </Space>
                    </Col>

                    <Col>
                        <Space size="large">
                            <a href="#" className={styles.headerLink}>
                                <DollarOutlined />
                                <Text className={styles.headerText}>USD</Text>
                            </a>
                            <a href="#" className={styles.headerLink}>
                                <UserOutlined />
                                <Text className={styles.headerText}>Minha Conta</Text>
                            </a>
                        </Space>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default TopHeader;
