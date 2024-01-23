'use client'
import React from "react"
import styles from "./Checkout.module.css"
import { useProductContext } from "../../contexts/ProductContext"

export default function Checkout() {
  const { cart, clearCart, calculateTotal, removeFromCart } =
    useProductContext()

  const handleRemoveFromCart = (productId: number) => {
    removeFromCart(productId)
  }

  const handleCheckout = () => {
    const storedCartDetails = cart.length
    if (storedCartDetails <= 0 ) {
      alert("Erro: Carrinho vazio. Não é possível finalizar a compra.")
      return
    }

    clearCart()

    alert(
      "Compra finalizada com sucesso!"
    )
  }

  return (
    <div className={styles.checkout}>
      <h1>Carrinho</h1>
      <div className={styles.cartItems}>
        <h2>Itens no Carrinho</h2>
        {cart.map((item) => (
          <div className={styles.cartItem} key={item.product.id}>
            <p>
              {item.product.name} - R${item.product.price} x {item.quantity}
            </p>
              <button onClick={() => handleRemoveFromCart(item.product.id)}>
                Remover
              </button>
          </div>
        ))}
      </div>
      <div className={styles.total}>
        <h2>Total: R${calculateTotal()}</h2>
      </div>
      <button className={cart.length === 0 ? styles.hidden : styles.block} onClick={handleCheckout}>Finalizar Compra</button>
    </div>
  )
}
