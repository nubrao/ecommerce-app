'use client';

import { Layout } from 'antd';
import styles from './Login.module.css';

const { Content } = Layout;

export default function LoginLayout({ children }) {
    return (
        <Content className={styles.loginLayout}>
            {children}
        </Content>
    );
}