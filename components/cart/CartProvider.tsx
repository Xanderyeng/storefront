"use client";

import { useState, createContext, useContext, ReactNode } from "react";
import { Cart } from "./Cart";
import { useCartStore } from "@/store/useCartStore";

interface CartContextType {
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCartUI() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCartUI must be used within a CartProvider");
  }
  return context;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  // const cartStore = useCartStore();
  // const { items, addToCart, removeFromCart, updateQuantity, clearCart, total } =
  //   useCartStore();

  return (
    <CartContext.Provider value={{ isCartOpen, setIsCartOpen }}>
      {children}
      {/* <Cart
        items={items}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        clearCart={clearCart}
        total={total}
        isOpen={isCartOpen}
        onOpenChange={setIsCartOpen}
      /> */}
        <Cart />
    </CartContext.Provider>
  );
}
