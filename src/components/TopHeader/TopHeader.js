'use client';

import React from 'react';
import { Row, Col, Typography, Space } from 'antd';
import { PhoneOutlined, MailOutlined, EnvironmentOutlined, DollarOutlined, UserOutlined } from '@ant-design/icons';
import styles from './TopHeader.module.css';

const { Text } = Typography;

const TopHeader = () => {
    return (
        <header role="banner" className={styles.topHeader}>
            <div className={styles.container}>
                <Row justify="space-between" align="middle">
                    <Col>
                        <nav aria-label="Informações de contato" className={styles.spaceWrapper}>
                            <ul className={styles.contactList}>
                                <Space size={20} component="li">
                                    <a href="tel:+5547992090669"
                                        className={styles.headerLink}
                                        aria-label="Telefone para contato">
                                        <PhoneOutlined className={styles.headerIcon} aria-hidden="true" />
                                        <Text className={styles.headerText}>+55 47 99209-0669</Text>
                                    </a>
                                    <a href="mailto:brunomcamara@outlook.com"
                                        className={styles.headerLink}
                                        aria-label="Email para contato">
                                        <MailOutlined className={styles.headerIcon} aria-hidden="true" />
                                        <Text className={styles.headerText}>brunomcamara@outlook.com</Text>
                                    </a>
                                    <a href="#"
                                        className={styles.headerLink}
                                        aria-label="Endereço físico">
                                        <EnvironmentOutlined className={styles.headerIcon} aria-hidden="true" />
                                        <Text className={styles.headerText}>Rua Fake, 1234</Text>
                                    </a>
                                </Space>
                            </ul>
                        </nav>
                    </Col>

                    <Col>
                        <nav aria-label="Opções do usuário" className={styles.spaceWrapper}>
                            <ul className={styles.userOptions}>
                                <Space size={20} component="li">
                                    <a href="#"
                                        className={styles.headerLink}
                                        aria-label="Selecionar moeda">
                                        <DollarOutlined className={styles.headerIcon} aria-hidden="true" />
                                        <Text className={styles.headerText}>USD</Text>
                                    </a>
                                    <a href="#"
                                        className={styles.headerLink}
                                        aria-label="Acessar minha conta">
                                        <UserOutlined className={styles.headerIcon} aria-hidden="true" />
                                        <Text className={styles.headerText}>Minha Conta</Text>
                                    </a>
                                </Space>
                            </ul>
                        </nav>
                    </Col>
                </Row>
            </div>
        </header>
    );
};

export default TopHeader;
