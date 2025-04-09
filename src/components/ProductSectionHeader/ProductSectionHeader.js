import React from 'react';
import { Typography } from 'antd';
import styles from './ProductSectionHeader.module.css';

const { Title, Paragraph } = Typography;

const ProductSectionHeader = ({
    title,
    description
}) => {
    return (
        <div className={styles.sectionHeader}>
            <Title level={2} className={styles.sectionTitle}>
                {title}
            </Title>
            <Paragraph className={styles.sectionDescription}>
                {description}
            </Paragraph>
        </div>
    );
};

export default ProductSectionHeader;