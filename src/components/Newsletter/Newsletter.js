import React from 'react';
import { Input, Button, List, Typography } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, PinterestOutlined, MailOutlined } from '@ant-design/icons';
import styles from './Newsletter.module.css';

const { Paragraph } = Typography;

const Newsletter = () => {
    return (
        <div className={styles.newsletterSection}>
            <div className={styles.container}>
                <div className={styles.newsletter}>
                    <Paragraph className={styles.paragraph}>
                        Inscreva-se para receber a <strong>NEWSLETTER</strong>
                    </Paragraph>
                    <form className={styles.form}>
                        <Input
                            className={styles.input}
                            type="email"
                            placeholder="Digite seu email"
                            aria-label="Digite seu endereço de email"
                        />
                        <Button
                            className={styles.newsletterBtn}
                            icon={<MailOutlined />}
                            type="primary"
                        >
                            Inscrever-se
                        </Button>
                    </form>
                    <List
                        className={styles.newsletterFollow}
                        grid={{ gutter: 16, column: 4 }}
                        dataSource={[
                            { icon: <FacebookOutlined />, link: "#", label: "Facebook" },
                            { icon: <TwitterOutlined />, link: "#", label: "Twitter" },
                            { icon: <InstagramOutlined />, link: "#", label: "Instagram" },
                            { icon: <PinterestOutlined />, link: "#", label: "Pinterest" }
                        ]}
                        renderItem={item => (
                            <List.Item>
                                <Button
                                    href={item.link}
                                    icon={item.icon}
                                    className={styles.socialButton}
                                    shape="circle"
                                    aria-label={`Siga-nos no ${item.label}`}
                                />
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

export default Newsletter;
