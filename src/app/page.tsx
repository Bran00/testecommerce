'use client'
import React from 'react';
import styles from './page.module.css';
import ProductCard from '../components/ProductCard';
import { useProductContext } from '../contexts/ProductContext';

export default function Home() {
  const { products } = useProductContext();

  return (
    <main className={styles.main}>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </main>
  );
}
