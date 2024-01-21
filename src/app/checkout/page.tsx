'use client'
import React from "react"
import styles from "./Checkout.module.css"
import { useProductContext } from "../../contexts/ProductContext"

export default function Checkout() {
  const { cart, clearCart, calculateTotal } = useProductContext()

  const handleCheckout = () => {
    const storedCartDetails = localStorage.getItem("purchaseDetails")
    if (!storedCartDetails) {
      alert("Erro: Carrinho vazio. Não é possível finalizar a compra.")
      return
    }

    const purchaseDetails = JSON.parse(storedCartDetails)

    console.log("Detalhes da compra:", purchaseDetails)

    clearCart()

    alert(
      "Compra finalizada com sucesso! Detalhes da compra exibidos no console."
    )
  }

  return (
    <div className={styles.checkout}>
      <h1>Checkout</h1>
      <div className={styles.cartItems}>
        <h2>Itens no Carrinho</h2>
        {cart.map((item) => (
          <div className={styles.cartItem} key={item.product.id}>
            <p>
              {item.product.name} - ${item.product.price} x {item.quantity}
            </p>
          </div>
        ))}
      </div>
      <div className={styles.total}>
        <h2>Total: ${calculateTotal()}</h2>
      </div>
      <button onClick={handleCheckout}>Finalizar Compra</button>
    </div>
  )
}
