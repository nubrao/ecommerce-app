import React, { useEffect, useState } from 'react';
import { ProductService } from '../../services/api';
import styles from './CarouselSection.module.css';

const CarouselSection = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        ProductService.getAll().then((data) => {
            const imageUrls = data.map((product) => product.image);
            setImages(imageUrls);
        });
    }, []);

    const duplicatedImages = [...images, ...images];

    return (
        <div className={styles.heroSection}>
            <div className={styles.heroImageWrapper}>
                {duplicatedImages.map((image, index) => (
                    <div
                        key={index}
                        className={styles.heroImage}
                        style={{ backgroundImage: `url(${image})` }}
                    ></div>
                ))}
            </div>

            <div className={styles.heroText}>
                <h1>Explore os Melhores Produtos</h1>
                <p>Tudo o que você precisa!</p>
            </div>
        </div>
    );
};

export default CarouselSection;
