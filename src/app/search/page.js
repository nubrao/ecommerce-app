'use client';

import React, { useState, useEffect } from 'react';
import { Row, Col, Pagination } from 'antd';
import { useSearchParams } from 'next/navigation';
import { ProductService } from '@/services/api';
import Layout from '../../components/Layout/Layout';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Filters from '@/components/Filters/Filters';
import ProductGrid from '@/components/ProductGrid/ProductGrid';
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';
import styles from './Search.module.css';

const SearchResults = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get('q');
    const category = searchParams.get('category');

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 1000]);

    const itemsPerPage = 10;

    const breadcrumbItems = [
        { title: 'Home', href: '/' },
        { title: category || 'All Categories', href: '/category/' + (category || 'all') },
        { title: `Search results for "${query}"` }
    ];

    useEffect(() => {
        fetchSearchResults();
    }, [query, category, currentPage, selectedCategories, priceRange]);

    const fetchSearchResults = async () => {
        try {
            setLoading(true);
            const response = await ProductService.search({
                query,
                category,
                page: currentPage,
                limit: itemsPerPage,
                categories: selectedCategories,
                minPrice: priceRange[0],
                maxPrice: priceRange[1]
            });

            setProducts(response.data);
            setTotalItems(response.total);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    if (loading) return <LoadingScreen />;

    return (
        <Layout>
            <Breadcrumb items={breadcrumbItems} />
            
            <div className={styles.searchResults}>
                <div className={styles.container}>
                    <Row gutter={[32, 32]}>
                        <Col xs={24} sm={24} md={6}>
                            <Filters
                                categories={categories}
                                selectedCategories={selectedCategories}
                                priceRange={priceRange}
                                onCategoryChange={setSelectedCategories}
                                onPriceChange={setPriceRange}
                            />
                        </Col>
                        
                        <Col xs={24} sm={24} md={18}>
                            <ProductGrid 
                                products={products}
                                loading={loading}
                            />
                            
                            <div className={styles.pagination}>
                                <Pagination
                                    current={currentPage}
                                    total={totalItems}
                                    pageSize={itemsPerPage}
                                    onChange={handlePageChange}
                                    showSizeChanger={false}
                                />
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </Layout>
    );
};

export default SearchResults;