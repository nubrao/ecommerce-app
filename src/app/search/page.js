'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Typography, Empty } from 'antd';
import ProductGrid from '@/components/ProductGrid/ProductGrid';
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';
import { ProductService } from '@/services/api';
import styles from './Search.module.css';

const { Title, Text } = Typography;

const SearchResults = () => {
    const searchParams = useSearchParams();
    const [loading, setLoading] = React.useState(true);
    const [products, setProducts] = React.useState([]);
    const query = searchParams.get('q');
    const category = searchParams.get('category');

    React.useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const results = await ProductService.search({
                    query,
                    category,
                    limit: 20
                });
                setProducts(results);
            } catch (error) {
                console.error('Error fetching search results:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [query, category]);

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <div className={styles.searchPage}>
            <div className={styles.searchHeader}>
                <Title level={2}>Search Results</Title>
                <Text type="secondary">
                    {products.length} results found
                    {query && ` for "${query}"`}
                    {category && ` in ${category}`}
                </Text>
            </div>

            {products.length > 0 ? (
                <ProductGrid products={products} />
            ) : (
                <Empty
                    description={
                        <span>
                            No products found
                            {query && ` for "${query}"`}
                            {category && ` in ${category}`}
                        </span>
                    }
                />
            )}
        </div>
    );
};

const SearchPage = () => {
    return (
        <Suspense fallback={<LoadingScreen />}>
            <SearchResults />
        </Suspense>
    );
};

export default SearchPage;