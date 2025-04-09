'use client';

import React from 'react';
import { Checkbox, Slider, Typography } from 'antd';
import styles from './Filters.module.css';

const { Title } = Typography;

const Filters = ({ 
    categories,
    selectedCategories,
    priceRange,
    onCategoryChange,
    onPriceChange 
}) => {
    return (
        <aside className={styles.filters}>
            <div className={styles.filterSection}>
                <Title level={4}>Categories</Title>
                <Checkbox.Group 
                    value={selectedCategories}
                    onChange={onCategoryChange}
                >
                    {categories.map(category => (
                        <div key={category.id} className={styles.categoryItem}>
                            <Checkbox value={category.id}>
                                {category.name}
                                <small>({category.count})</small>
                            </Checkbox>
                        </div>
                    ))}
                </Checkbox.Group>
            </div>

            <div className={styles.filterSection}>
                <Title level={4}>Price Range</Title>
                <Slider
                    range
                    min={0}
                    max={1000}
                    value={priceRange}
                    onChange={onPriceChange}
                    tipFormatter={value => `$${value}`}
                />
                <div className={styles.priceInputs}>
                    <span>${priceRange[0]}</span>
                    <span>-</span>
                    <span>${priceRange[1]}</span>
                </div>
            </div>
        </aside>
    );
};

export default Filters;