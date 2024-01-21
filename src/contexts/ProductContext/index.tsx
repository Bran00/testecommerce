'use client'
import React, { createContext, useState, useEffect, useContext, ReactNode } from "react"

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface ProductContextProps {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product) => void;
  calculateTotal: () => number;
  clearCart: () => void;
}

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const storedProducts = localStorage.getItem('products');

    if (storedProducts) {
      return JSON.parse(storedProducts);
    }

    return [
      { id: 1, name: "Produto A", price: 20 },
      { id: 2, name: "Produto B", price: 30 },
      { id: 3, name: "Produto C", price: 25 },
      { id: 4, name: "Produto D", price: 40 },
    ];
  });

  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.product.id === product.id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  return (
    <ProductContext.Provider
      value={{ products, cart, addToCart, calculateTotal, clearCart }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
}
