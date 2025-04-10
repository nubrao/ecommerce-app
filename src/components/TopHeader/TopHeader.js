'use client';

import React from 'react';
import { Typography, Space, Select } from 'antd';
import { 
    PhoneOutlined, 
    MailOutlined, 
    EnvironmentOutlined, 
    UserOutlined,
    GlobalOutlined 
} from '@ant-design/icons';
import { useLocalization } from '@/contexts/LocalizationContext';
import styles from './TopHeader.module.css';

const { Text } = Typography;
const { Option } = Select;

const TopHeader = () => {
    return (
        <header role="banner" className={styles.topHeader}>
            <div className={styles.container}>
                <div className={styles.headerWrapper}>
                    <nav 
                        aria-label="Contact information" 
                        className={styles.contactNav}
                    >
                        
                    </nav>

                    <nav 
                        aria-label="User options" 
                        className={styles.userNav}
                    >
                        <ul className={styles.userOptions}>
                            <li>
                                <a 
                                    href="/account"
                                    className={styles.headerLink}
                                    aria-label="Access my account"
                                >
                                    <UserOutlined className={styles.headerIcon} />
                                    <Text className={styles.headerText}>
                                        My Account
                                    </Text>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default TopHeader;
