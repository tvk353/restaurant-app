import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
  } from "react";
  import { MenuItem } from "@/types/item";
  
  type CartItem = MenuItem & { quantity: number };
  
  type CartContextType = {
    cart: CartItem[];
    addToCart: (item: MenuItem) => void;
    removeFromCart: (id: string) => void;
  };
  
  const CartContext = createContext<CartContextType | undefined>(undefined);
  export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
  };
  
  const CART_STORAGE_KEY = "restaurant-cart";
  
  export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
  
    // Load from localStorage on mount
    useEffect(() => {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        setCart(JSON.parse(stored));
      }
    }, []);
  
    // Save to localStorage whenever cart changes
    useEffect(() => {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }, [cart]);
  
    // Sync cart across tabs
    useEffect(() => {
      const syncCart = (e: StorageEvent) => {
        if (e.key === CART_STORAGE_KEY && e.newValue) {
          setCart(JSON.parse(e.newValue));
        }
      };
      window.addEventListener("storage", syncCart);
      return () => window.removeEventListener("storage", syncCart);
    }, []);
  
    const addToCart = (item: MenuItem) => {
      setCart((prev) => {
        const existing = prev.find((i) => i.id === item.id);
        if (existing) {
          return prev.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          );
        }
        return [...prev, { ...item, quantity: 1 }];
      });
    };
  
    const removeFromCart = (id: string) => {
      setCart((prev) =>
        prev
          .map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0)
      );
    };
  
    return (
      <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
        {children}
      </CartContext.Provider>
    );
  }
  