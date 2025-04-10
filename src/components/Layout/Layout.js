'use client';

import React from 'react';
import { Layout as AntLayout, BackTop } from 'antd';
import { UpOutlined } from '@ant-design/icons';
import TopHeader from '../TopHeader/TopHeader';
import MainHeader from '../MainHeader/MainHeader';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import styles from './Layout.module.css';

const { Content } = AntLayout;

const Layout = ({ children, hideNavigation = false }) => {
    return (
        <AntLayout className={styles.layout}>
            <header role="banner">
                <TopHeader />
                <MainHeader />
                {!hideNavigation && <Navigation />}
            </header>

            <Content
                role="main"
                className={styles.mainContent}
                aria-label="Main content"
            >
                {children}
            </Content>

            <Footer />

            <BackTop>
                <div
                    className={styles.backToTop}
                    role="button"
                    aria-label="Back to top"
                >
                    <UpOutlined />
                </div>
            </BackTop>
        </AntLayout>
    );
};

export default Layout;