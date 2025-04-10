'use client';

import React from 'react';
import { Typography } from 'antd';
import styles from './ProductSectionHeader.module.css';

const { Title, Text } = Typography;

const ProductSectionHeader = ({ 
    title, 
    description,
    className,
    ...props 
}) => {
    return (
        <header 
            className={`${styles.sectionHeader} ${className || ''}`}
            role="presentation"
            {...props}
        >
            <Title 
                level={2} 
                className={styles.title}
            >
                {title}
            </Title>
            {description && (
                <Text 
                    className={styles.description}
                    type="secondary"
                >
                    {description}
                </Text>
            )}
        </header>
    );
};

export default ProductSectionHeader;