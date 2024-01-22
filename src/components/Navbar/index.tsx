"use client"
import React, { useState } from "react"
import styles from "./Navbar.module.css"
import { useProductContext } from "@/contexts/ProductContext"
import Link from "next/link"

const Navbar: React.FC = () => {
  const { cart, calculateTotal, clearCart, removeFromCart } =
    useProductContext()
  const [isCartVisible, setIsCartVisible] = useState(false)

  const handleToggleCart = () => {
    setIsCartVisible((prev) => !prev)
  }

  const handleRemoveFromCart = (productId: number) => {
    removeFromCart(productId)
  }

  const handleCheckout = () => {

    console.log("Checkout clicado")
  }

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>Soja Nova</div>
      <div className={styles.cartIcon} onClick={handleToggleCart}>
        <img src="/cart-icon.png" alt="Carrinho de Compras" />
        {cart.length > 0 && (
          <span className={styles.cartCount}>{cart.length}</span>
        )}
      </div>
      {isCartVisible && (
        <div className={styles.cartOverlay}>
          <div className={styles.cart}>
            <h2>Carrinho de Compras</h2>
            {cart.length === 0 ? (
              <p>O carrinho está vazio.</p>
            ) : (
              <>
                <ul>
                  {cart.map((item) => (
                    <li key={item.product.id}>
                      <span>{item.product.name}</span>
                      <span>Quantidade: {item.quantity}</span>
                      <span>Preço: ${item.product.price}</span>
                      <button
                        onClick={() => handleRemoveFromCart(item.product.id)}
                      >
                        Remover
                      </button>
                    </li>
                  ))}
                </ul>
                <p>Total: ${calculateTotal()}</p>
                <Link  href="/checkout" className={cart.length === 0 ? styles.hidden : styles.checkout}>
                  Checkout
                </Link>
                <button onClick={clearCart}>Limpar Carrinho</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
