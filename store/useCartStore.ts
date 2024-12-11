/**
 * -------------------------------------------------------------------------------------
 * DVT - Store front Cart Store
 * -------------------------------------------------------------------------------------
 * This file defines the global state management for the shopping cart using Zustand.
 * It provides actions for adding, removing, and updating items in the cart,
 * as well as calculating the total price.
 */

import { create } from 'zustand'
import { Product } from '@/types/types'

export interface CartItem extends Product {
  quantity: number
}

/**
 * -------------------------------------------------------------------------------------
 * CartStore Interface
 * -------------------------------------------------------------------------------------
 * The below Defines the structure and actions available in the cart store.
 * - items: Array of CartItem objects representing products in the cart
 * - addToCart: Function to add a product to the cart
 * - removeFromCart: Function to remove a product from the cart
 * - updateQuantity: Function to update the quantity of a product in the cart
 * - clearCart: Function to remove all items from the cart
 * - total: A computed property that calculates the total price of all items in the cart
 */

interface CartStore {
  items: CartItem[]
  addToCart: (product: Product, quantity: number) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  total: number
  
}

/**
 * ---------------------------------------------------------------------
 * useCartStore
 * ---------------------------------------------------------------------
 * Creates a Zustand store for managing the shopping cart state.
 * This store can be imported and used throughout the application
 * to access and modify the cart state.
 */

const calculateTotal = (items: CartItem[]) => 
  items.reduce((sum, item) => sum + item.price * item.quantity, 0)

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  total: 0,
  addToCart: (product, quantity) => {
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id)
      const newItems = existingItem
        ? state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        : [...state.items, { ...product, quantity }]
      return { 
        items: newItems,
        total: calculateTotal(newItems)
      }
    })
  },
  removeFromCart: (productId) => {
    set((state) => {
      const newItems = state.items.filter((item) => item.id !== productId)
      return {
        items: newItems,
        total: calculateTotal(newItems)
      }
    })
  },
  updateQuantity: (productId, quantity) => {
    set((state) => {
      const newItems = state.items
        .map((item) => item.id === productId ? { ...item, quantity } : item)
        .filter((item) => item.quantity > 0)
      return {
        items: newItems,
        total: calculateTotal(newItems)
      }
    })
  },
  clearCart: () => {
    set({ items: [], total: 0 })
  },
}))

