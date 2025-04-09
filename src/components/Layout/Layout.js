'use client';

import React from 'react';
import { Layout as AntLayout } from 'antd';
import TopHeader from '../TopHeader/TopHeader';
import MainHeader from '../MainHeader/MainHeader';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import styles from './Layout.module.css';

const { Content } = AntLayout;

const Layout = ({ children }) => {
    return (
        <AntLayout className={styles.layout}>
            <TopHeader />
            <MainHeader />
            <Navigation />
            <Content className={styles.content}>
                {children}
            </Content>
            <Footer />
        </AntLayout>
    );
};

export default Layout;