import React from 'react';
import { Button, Tooltip } from 'antd';
import { HeartOutlined, ExchangeOutlined, EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import Link from 'next/link';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
    return (
        <div className={`${styles.product} ${styles.slickSlide}`}>
            <div className={styles.productImg}>
                <img src={product.image} alt={product.title} />
                {product.discount && (
                    <div className={styles.productLabel}>
                        <span className={styles.sale}>-{product.discount}%</span>
                    </div>
                )}
            </div>
            <div className={styles.productBody}>
                <p className={styles.productCategory}>{product.category}</p>
                <h3 className={styles.productName}>
                    <Link href={`/product/${product.id}`}>
                        <a>{product.title}</a>
                    </Link>
                </h3>
                <h4 className={styles.productPrice}>
                    ${product.price} <del className={styles.productOldPrice}>${product.oldPrice}</del>
                </h4>
                <div className={styles.productRating}>
                </div>
                <div className={styles.productBtns}>
                    <Tooltip title="Add to wishlist">
                        <Button
                            icon={<HeartOutlined />}
                            className={styles.addToWishlist}
                            shape="circle"
                            size="large"
                        />
                    </Tooltip>
                    <Tooltip title="Add to compare">
                        <Button
                            icon={<ExchangeOutlined />}
                            className={styles.addToCompare}
                            shape="circle"
                            size="large"
                        />
                    </Tooltip>
                    <Tooltip title="Quick view">
                        <Button
                            icon={<EyeOutlined />}
                            className={styles.quickView}
                            shape="circle"
                            size="large"
                        />
                    </Tooltip>
                </div>
            </div>
            <div className={styles.addToCart}>
                <Button type="primary" icon={<ShoppingCartOutlined />} size="large">
                    Add to cart
                </Button>
            </div>
        </div>
    );
};

export default ProductCard;
