'use client';

import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './LoadingScreen.module.css';

const LoadingScreen = () => {
    return (
        <div 
            className={styles.loadingContainer}
            role="progressbar"
            aria-busy="true"
            aria-label="Loading content"
        >
            <div className={styles.loadingWrapper}>
                <Spin
                    spinning={true}
                    indicator={
                        <LoadingOutlined
                            style={{
                                fontSize: 48,
                                color: '#D10024'
                            }}
                            spin
                        />
                    }
                >
                </Spin>
            </div>
        </div>
    );
};

export default LoadingScreen;