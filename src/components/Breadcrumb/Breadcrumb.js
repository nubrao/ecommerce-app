'use client';

import React from 'react';
import { Breadcrumb as AntBreadcrumb, Typography } from 'antd';
import Link from 'next/link';
import { HomeOutlined } from '@ant-design/icons';
import styles from './Breadcrumb.module.css';

const { Text } = Typography;

const Breadcrumb = ({ items = [] }) => {
    const truncateText = (text, maxLength = 20) => {
        return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
    };

    return (
        <nav className={styles.breadcrumbSection} aria-label="Breadcrumb navigation">
            <div className={styles.container}>
                <AntBreadcrumb
                    className={styles.breadcrumb}
                    separator=">"
                    items={[
                        {
                            title: (
                                <Link href="/" className={styles.homeLink} aria-label="Home page">
                                    <HomeOutlined className={styles.homeIcon} />
                                    <Text className={styles.breadcrumbText}>Home</Text>
                                </Link>
                            ),
                        },
                        ...items.map((item, index) => ({
                            title: item.href ? (
                                <Link
                                    href={item.href}
                                    className={styles.breadcrumbLink}
                                    aria-label={item.title}
                                >
                                    <Text className={styles.breadcrumbText}>
                                        {truncateText(item.title)}
                                    </Text>
                                </Link>
                            ) : (
                                <Text className={styles.currentPage}>
                                    {truncateText(item.title)}
                                </Text>
                            ),
                            className: index === items.length - 1 ? styles.lastItem : ''
                        })),
                    ]}
                />
            </div>
        </nav>
    );
};

export default Breadcrumb;