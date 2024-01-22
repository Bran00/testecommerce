"use client"
import React, { useEffect, useState } from "react"
import styles from "./page.module.css"
import ProductCard from "../components/ProductCard"
import { products } from "../constants"

export default function Home() {
  const [isClient, setIsClient] = useState(false)
  const [sortedProducts, setSortedProducts] = useState([...products])
  const [sortBy, setSortBy] = useState<"price" | "date">("price")

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value as "price" | "date")
  }

  useEffect(() => {
    const sorted = [...products].sort((a, b) => {
      if (sortBy === "price") {
        return a.price - b.price
      } else {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      }
    })
    setSortedProducts(sorted)
  }, [sortBy])

  return isClient ? (
    <main className={styles.main}>
      <div>
        <label htmlFor="sort">Ordenar por:</label>
        <select id="sort" value={sortBy} onChange={handleSortChange}>
          <option value="price">Preço</option>
          <option value="date">Data de Inclusão</option>
        </select>
      </div>
      {sortedProducts.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </main>
  ) : (
    <p>Carregando</p>
  )
}
