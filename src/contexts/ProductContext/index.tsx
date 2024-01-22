import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react"
import { products as allProducts } from "../../constants"

interface Product {
  id: number
  name: string
  price: number
}

interface CartItem {
  product: Product
  quantity: number
}

interface ProductContextProps {
  products: Product[]
  cart: CartItem[]
  addToCart: (productId: number, quantity: number) => void
  calculateTotal: () => number
  clearCart: () => void
  onSearch: (term: string) => Product[]
  removeFromCart: (productId: number) => void
}

const ProductContext = createContext<ProductContextProps | undefined>(undefined)

export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [products] = useState<Product[]>(allProducts)

  const addToCart = (productId: number, quantity: number) => {
    const productToAdd = products.find((product) => product.id === productId)

    if (productToAdd) {
      const existingItem = cart.find((item) => item.product.id === productId)

      if (existingItem) {
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.product.id === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        )
      } else {
        const newCartItem: CartItem = {
          product: productToAdd,
          quantity: quantity,
        }

        setCart((prevCart) => [...prevCart, newCartItem])
      }
    }
  }

  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const onSearch = (term: string): Product[] => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    )
  }

  const removeFromCart = (productId: number) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.id !== productId)
    )
  }

  useEffect(() => {
    try {
      // Verifica se localStorage está disponível
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(cart))
      }
    } catch (error) {
      console.error("Erro ao salvar carrinho no localStorage:", error)
    }
  }, [cart])

  return (
    <ProductContext.Provider
      value={{
        products,
        cart,
        addToCart,
        calculateTotal,
        clearCart,
        onSearch,
        removeFromCart,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export const useProductContext = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider")
  }
  return context
}
