import React from 'react';
import { Row, Col, List, Typography } from 'antd';
import {
    MailOutlined,
    PhoneOutlined,
    EnvironmentOutlined,
    FacebookOutlined,
    TwitterOutlined,
    InstagramOutlined,
    CreditCardOutlined,
    PayCircleOutlined
} from '@ant-design/icons';
import styles from './Footer.module.css';

const { Title, Text, Link } = Typography;

const Footer = () => {
    const aboutLinks = [
        { text: 'Sobre Nós', href: '#' },
        { text: 'Encontre uma loja', href: '#' },
        { text: 'Categorias', href: '#' },
        { text: 'Blog', href: '#' }
    ];

    const informationLinks = [
        { text: 'Política de Privacidade', href: '#' },
        { text: 'Termos & Condições', href: '#' },
        { text: 'Política de Retorno', href: '#' },
        { text: 'FAQ', href: '#' }
    ];

    const customerServiceLinks = [
        { text: 'Minha Conta', href: '#' },
        { text: 'Ver Carrinho', href: '#' },
        { text: 'Lista de Desejos', href: '#' },
        { text: 'Acompanhar Pedido', href: '#' }
    ];

    const contactInfo = [
        { icon: <EnvironmentOutlined />, text: 'Rua Fake, 1234 - Centro' },
        { icon: <PhoneOutlined />, text: '+55 47 99209-0669' },
        { icon: <MailOutlined />, text: 'brunomcamara@outlook.com' }
    ];

    const paymentMethods = [
        { icon: <CreditCardOutlined />, name: 'Visa' },
        { icon: <CreditCardOutlined />, name: 'Mastercard' },
        { icon: <PayCircleOutlined />, name: 'PayPal' },
        { icon: <CreditCardOutlined />, name: 'American Express' }
    ];

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.footerContent}>
                    <Row gutter={[32, 32]}>
                        <Col xs={24} sm={12} md={6}>
                            <div className={styles.footerColumn}>
                                <Title level={4}>Sobre Nós</Title>
                                <ul className={styles.footerLinks}>
                                    {aboutLinks.map((link, index) => (
                                        <li key={index}>
                                            <Link href={link.href}>{link.text}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Col>

                        <Col xs={24} sm={12} md={6}>
                            <div className={styles.footerColumn}>
                                <Title level={4}>Informações</Title>
                                <ul className={styles.footerLinks}>
                                    {informationLinks.map((link, index) => (
                                        <li key={index}>
                                            <Link href={link.href}>{link.text}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Col>

                        <Col xs={24} sm={12} md={6}>
                            <div className={styles.footerColumn}>
                                <Title level={4}>Serviços</Title>
                                <ul className={styles.footerLinks}>
                                    {customerServiceLinks.map((link, index) => (
                                        <li key={index}>
                                            <Link href={link.href}>{link.text}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Col>

                        <Col xs={24} sm={12} md={6}>
                            <div className={styles.footerColumn}>
                                <Title level={4}>Contato</Title>
                                <ul className={styles.footerLinks}>
                                    {contactInfo.map((item, index) => (
                                        <li key={index} className={styles.contactItem}>
                                            {item.icon}
                                            <Text>{item.text}</Text>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>

            <div className={styles.bottomFooter}>
                <div className={styles.container}>
                    <Row justify="space-between" align="middle">
                        <Col xs={24} md={12}>
                            <div className={styles.copyright}>
                                <Text>
                                    Copyright &copy; {new Date().getFullYear()} All rights reserved | Bruno M. Camara
                                </Text>
                            </div>
                        </Col>
                        <Col xs={24} md={12}>
                            <List
                                className={styles.paymentMethods}
                                grid={{ gutter: 16, xs: 2, sm: 4 }}
                                dataSource={paymentMethods}
                                renderItem={item => (
                                    <List.Item>
                                        <div className={styles.paymentIcon}>
                                            {item.icon}
                                            <Text>{item.name}</Text>
                                        </div>
                                    </List.Item>
                                )}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
