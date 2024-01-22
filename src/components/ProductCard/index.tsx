import React, { useState } from "react"
import { useProductContext } from "../../contexts/ProductContext"

interface ProductCardProps {
  id: number
  name: string
  price: number
  date?: Date
}

const formatDate = (date?: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  return new Intl.DateTimeFormat("pt-BR", options).format(date)
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, date }) => {
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
    <div>
      <img
        src={`https://via.placeholder.com/150/CCCCCC/FFFFFF?text=${encodeURIComponent(
          name
        )}`}
        alt={name}
      />
      <h3>{name}</h3>
      <p>Preço: ${price}</p>
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
  )
}

export default ProductCard
