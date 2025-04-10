'use client';

import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './LoadingScreen.module.css';

const LoadingScreen = ({ tip = 'Loading content...' }) => (
    <div
        className={styles.loadingScreen}
        role="progressbar"
        aria-busy="true"
        aria-label="Loading content"
    >
        <div className={styles.loadingWrapper}>
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
                tip={tip}
                size="large"
            />
        </div>
    </div>
);

export default LoadingScreen;