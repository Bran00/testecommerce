"use client"
import React, { useState } from "react"
import { useProductContext } from "@/contexts/ProductContext"
import Link from "next/link"

import { FaShoppingCart } from "react-icons/fa"
import styles from "./Navbar.module.css"

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

  return (
    <div className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        Soja Nova
      </Link>
      <div className={styles.cartIcon} onClick={handleToggleCart}>
        <FaShoppingCart />
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
                      <span>
                        Preço: <strong>R${item.product.price}</strong>
                      </span>
                      <button
                        onClick={() => handleRemoveFromCart(item.product.id)}
                      >
                        Remover
                      </button>
                    </li>
                  ))}
                </ul>
                <p>
                  Total: <span>R${calculateTotal()}</span>
                </p>
                <Link href="/checkout" className={styles.checkout}>
                  Finalizar Compra
                </Link>
                <button  className={styles.clearCart}
                onClick={clearCart}>Limpar Carrinho</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
