import React, { useState } from "react"
import Image from "next/image"
import { useProductContext } from "../../contexts/ProductContext"
import styles from "./ProductCard.module.css"

interface ProductCardProps {
  id: number
  name: string
  price: number
  date?: Date
  img?: any
}

const formatDate = (date?: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  return new Intl.DateTimeFormat("pt-BR", options).format(date)
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, date, img }) => {
  const { addToCart } = useProductContext()
  const [quantity, setQuantity] = useState(1)

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10)
    setQuantity(newQuantity)
  }

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(id, quantity)
      setQuantity(1)
      alert(`Adicionado ${quantity} no seu carrinho`)
    } else {
      alert("Selecione uma quantidade válida para adicionar ao carrinho.")
    }
  }

  return (
    <div className={styles.productCard}>
      <Image src={img} width={200} height={200} alt={name} />
      <div className={styles.details}>
        <h3>{name}</h3>
        <p className={styles.price}>
          Preço: <span> R${price}</span>
        </p>
        <p>Incluído em: {formatDate(date)}</p>
        <label>
          Quantidade:
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
          />
        </label>
        <button onClick={handleAddToCart}>Adicionar ao Carrinho</button>
      </div>
    </div>
  )
}

export default ProductCard
