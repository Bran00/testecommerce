import React from "react"
import styles from "./Navbar.module.css"

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Soja Nova</div>
      <div className={styles.searchBar}>
        <input type="text" placeholder="Pesquisar produtos..." />
      </div>
      <div className={styles.cartIcon}>
        <img src="/cart-icon.png" alt="Carrinho de Compras" />
      </div>
    </nav>
  )
}

export default Navbar
