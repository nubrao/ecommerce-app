'use client';

import React from 'react';
import { Breadcrumb as AntBreadcrumb } from 'antd';
import Link from 'next/link';
import styles from './Breadcrumb.module.css';

const Breadcrumb = ({ items }) => {
    return (
        <div className={styles.breadcrumbSection}>
            <div className={styles.container}>
                <AntBreadcrumb
                    className={styles.breadcrumb}
                    items={items.map((item, index) => ({
                        title: index === items.length - 1 ? (
                            <span>{item.title}</span>
                        ) : (
                            <Link href={item.href}>{item.title}</Link>
                        ),
                    }))}
                />
            </div>
        </div>
    );
};

export default Breadcrumb;