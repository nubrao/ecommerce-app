import React from 'react';
import { Row, Col, List, Typography } from 'antd';
import { VisaOutlined, CreditCardOutlined, PaypalOutlined, MastercardOutlined, DiscoverOutlined, AlipayCircleOutlined } from '@ant-design/icons';
import styles from './Footer.module.css';

const { Text } = Typography;

const Footer = () => {
    const paymentMethods = [
    ];

    return (
        <footer id="footer" className={styles.footer}>
            <div className={styles.bottomFooter}>
                <div className="container">
                    <Row justify="center" align="middle">
                        <Col span={24} style={{ textAlign: 'center' }}>
                            <List
                                className={styles.footerPayments}
                                grid={{ gutter: 16, column: 6 }}
                                dataSource={paymentMethods}
                                renderItem={item => (
                                    <List.Item>
                                        <a href={item.link} className={styles.paymentIcon}>
                                            {item.icon}
                                        </a>
                                    </List.Item>
                                )}
                            />
                            <div className={styles.copyright}>
                                <Text>
                                    Copyright &copy; {new Date().getFullYear()} All rights reserved | Bruno M. Camara
                                </Text>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
