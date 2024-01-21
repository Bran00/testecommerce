'use client'
import React from "react"
import { useProductContext } from "../../contexts/ProductContext"

interface ProductCardProps {
  id: number
  name: string
  price: number
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price }) => {
  const { addToCart } = useProductContext()

  const handleAddToCart = () => {
    addToCart({ id, name, price })
  }

  return (
    <div>
      <img
        src={`https://via.placeholder.com/150/CCCCCC/FFFFFF?text=${encodeURIComponent(
          name
        )}`}
        alt={name}
      />
      <h3>{name}</h3>
      <p>Preço: ${price}</p>
      <button onClick={handleAddToCart}>Adicionar ao Carrinho</button>
    </div>
  )
}

export default ProductCard
