import React from 'react';
import { Input, Button, List, Typography } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, PinterestOutlined, MailOutlined } from '@ant-design/icons';
import styles from './Newsletter.module.css';

const { Paragraph } = Typography;

const Newsletter = () => {
    return (
        <div id="newsletter" className={`section ${styles.newsletterSection}`}>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className={styles.newsletter}>
                            <Paragraph className={styles.paragraph}>
                                Sign Up for the <strong>NEWSLETTER</strong>
                            </Paragraph>
                            <form className={styles.form}>
                                <Input
                                    className={styles.input}
                                    type="email"
                                    placeholder="Enter Your Email"
                                />
                                <Button
                                    className={styles.newsletterBtn}
                                    icon={<MailOutlined />}
                                    type="primary"
                                    shape="round"
                                >
                                    Subscribe
                                </Button>
                            </form>
                            <List
                                className={styles.newsletterFollow}
                                grid={{ gutter: 16, column: 4 }}
                                dataSource={[
                                    { icon: <FacebookOutlined />, link: "#" },
                                    { icon: <TwitterOutlined />, link: "#" },
                                    { icon: <InstagramOutlined />, link: "#" },
                                    { icon: <PinterestOutlined />, link: "#" }
                                ]}
                                renderItem={item => (
                                    <List.Item>
                                        <Button
                                            href={item.link}
                                            icon={item.icon}
                                            className={styles.socialButton}
                                            shape="circle"
                                        />
                                    </List.Item>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;
