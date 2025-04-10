'use client';

import React from 'react';
import { Checkbox, Slider, Typography, Divider } from 'antd';
import styles from './Filters.module.css';

const { Title } = Typography;

const Filters = ({
    categories = [],
    selectedCategories = [],
    priceRange = [0, 1000],
    onCategoryChange,
    onPriceChange
}) => {
    return (
        <aside className={styles.filters} aria-label="Product filters">
            <div className={styles.filterSection}>
                <Title level={4} aria-label="Filter by categories">
                    Categories
                </Title>
                <Divider />
                <Checkbox.Group
                    value={selectedCategories}
                    onChange={onCategoryChange}
                    aria-label="Category selection"
                >
                    {categories.map(category => (
                        <div
                            key={category.id}
                            className={styles.categoryItem}
                        >
                            <Checkbox
                                value={category.id}
                                aria-label={`${category.name} (${category.count} items)`}
                            >
                                {category.name}
                                <small className={styles.count}>
                                    ({category.count})
                                </small>
                            </Checkbox>
                        </div>
                    ))}
                </Checkbox.Group>
            </div>

            <div className={styles.filterSection}>
                <Title level={4} aria-label="Filter by price range">
                    Price Range
                </Title>
                <Divider />
                <Slider
                    range
                    min={0}
                    max={1000}
                    value={priceRange}
                    onChange={onPriceChange}
                    tipFormatter={value => `$${value}`}
                    aria-label="Price range selector"
                />
                <div
                    className={styles.priceInputs}
                    aria-label={`Price range from $${priceRange[0]} to $${priceRange[1]}`}
                >
                    <span>${priceRange[0]}</span>
                    <span className={styles.separator}>to</span>
                    <span>${priceRange[1]}</span>
                </div>
            </div>
        </aside>
    );
};

export default Filters;