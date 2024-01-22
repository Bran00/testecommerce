'use client'
import React, { useEffect, useState } from "react"
import styles from "./page.module.css"
import ProductCard from "../components/ProductCard"
import { products } from "../constants"
import { useProductContext } from "@/contexts/ProductContext"

interface Product {
  id: number
  name: string
  price: number
  date?: Date
}

export default function Home() {
  const [isClient, setIsClient] = useState(false)
  const [sortedProducts, setSortedProducts] = useState<Product[]>([...products])
  const [sortBy, setSortBy] = useState<"price" | "date">("price")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterBy, setFilterBy] = useState<string>("")

  const { onSearch } = useProductContext()

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value as "price" | "date")
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterBy(event.target.value)
  }

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      alert("Digite um termo de pesquisa válido")
      return
    }

    const searchResults = onSearch(searchTerm)

    if (searchResults.length === 0) {
      console.log("Nenhum resultado encontrado para o termo:", searchTerm)
    } else {
      console.log("Resultados da pesquisa:", searchResults)
      setSortedProducts(searchResults)
    }
  }

  useEffect(() => {
    const filteredProducts = products.filter((product) => {
      const nameMatches = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      const priceMatches = filterByPrice(product.price)
      const dateMatches = filterByDate(product.date)

      return nameMatches && priceMatches && dateMatches
    })

    const sorted = filteredProducts.sort((a, b) => {
      if (sortBy === "price") {
        return a.price - b.price
      } else if (sortBy === "date") {
        return new Date(a.date || 0).getTime() - new Date(b.date || 0).getTime()
      }
      return 0
    })

    setSortedProducts(sorted)
  }, [searchTerm, sortBy, filterBy])

  const filterByPrice = (price: number): boolean => {
    switch (filterBy) {
      case "price-10-40":
        return price >= 10 && price <= 40
      case "price-50-70":
        return price >= 50 && price <= 70
      case "price-80-100":
        return price >= 80 && price <= 100
      default:
        return true
    }
  }

  const filterByDate = (date?: Date): boolean => {
    if (!date) return true

    switch (filterBy) {
      case "date-2023":
        return new Date(date).getFullYear() === 2023
      case "date-2022":
        return new Date(date).getFullYear() === 2022
      default:
        return true
    }
  }

  return isClient ? (
    <main className={styles.main}>
      <section>
        <div>
          <label htmlFor="sort">Ordenar por:</label>
          <select id="sort" value={sortBy} onChange={handleSortChange}>
            <option value="price">Preço</option>
            <option value="date">Data de Inclusão</option>
          </select>
        </div>
        <div>
          <label htmlFor="filter">Filtrar por:</label>
          <select id="filter" value={filterBy} onChange={handleFilterChange}>
            <option value="">Sem filtro</option>
            <option value="price-10-40">Preço (entre $10 e $40)</option>
            <option value="price-50-70">Preço (entre $50 e $70)</option>
            <option value="price-80-100">Preço (entre $80 e $100)</option>
            <option value="date-2023">Data de 2023</option>
            <option value="date-2022">Data de 2022</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            placeholder="Pesquisar produtos..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button onClick={handleSearch}>Pesquisar</button>
        </div>
      </section>
      {sortedProducts.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </main>
  ) : (
    <p>Carregando</p>
  )
}
