'use client'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { CartItem } from '@/store/useCartStore'
import { useCartStore } from '@/store/useCartStore'
import { useCartUI } from './CartProvider'
import Link from 'next/link'

interface CartProps {
  items: CartItem[]
  addToCart: (product: CartItem, quantity: number) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  total: number
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function Cart() {
  const { isCartOpen, setIsCartOpen } = useCartUI()
  const { items, removeFromCart, updateQuantity, clearCart } = useCartStore()
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0)
  const cartTotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
 
  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
    <SheetContent className="w-full sm:max-w-lg">
      <SheetHeader>
        <SheetTitle>Your Cart ({itemCount} items)</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-4">
            <Image src={item.image} alt={item.title} width={50} height={50} className="rounded-md" />
            <div className="flex-1">
              <h3 className="text-sm font-medium">{item.title}</h3>
              <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span>{item.quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => removeFromCart(item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      {itemCount > 0 ? (
        <div className="mt-8">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total:</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <Button className="w-full mt-4" onClick={clearCart}>Clear Cart</Button>
          <Link href="/checkout" onClick={() => setIsCartOpen(false)}>
            <Button className="w-full mt-4">Proceed to Checkout</Button>
          </Link>
        </div>
      ) : (
        <p className="text-center mt-8 text-muted-foreground">Your cart is empty</p>
      )}
    </SheetContent>
  </Sheet>
  )
}

