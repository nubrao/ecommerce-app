'use client';

import React, { useState, useEffect } from 'react';
import { Layout as AntLayout } from 'antd';
import TopHeader from '../TopHeader/TopHeader';
import MainHeader from '../MainHeader/MainHeader';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import Newsletter from '../Newsletter/Newsletter';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import styles from './Layout.module.css';

const { Content } = AntLayout;

const Layout = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    return (
        <AntLayout className={styles.layout}>
            {isLoading && <LoadingScreen />}
            <TopHeader />
            <MainHeader />
            <Navigation />
            <Content className={styles.content}>
                {children}
                <Newsletter />
            </Content>
            <Footer />
        </AntLayout>
    );
};

export default Layout;