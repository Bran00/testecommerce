/* 
// Navbar.tsx
import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { useProductContext } from "../../contexts/ProductContext";

interface NavbarProps {
  onSearch: (term: string) => Product[];
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    const searchResults = onSearch(searchTerm);
    console.log("Search results:", searchResults);
    // Implemente a lógica para lidar com os resultados da pesquisa
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>Soja Nova</div>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Pesquisar produtos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>
      <div className={styles.cartIcon}>
        <img src="/cart-icon.png" alt="Carrinho de Compras" />
      </div>
    </div>
  );
};

export default Navbar;

*/