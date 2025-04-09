'use client';

import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './LoadingScreen.module.css';

const LoadingScreen = () => (
    <div className={styles.loadingScreen}>
        <Spin 
            indicator={
                <LoadingOutlined 
                    style={{ 
                        fontSize: 48,
                        color: '#D10024'
                    }} 
                    spin 
                />
            } 
        />
    </div>
);

export default LoadingScreen;