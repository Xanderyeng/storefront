'use client'

import { Button } from "@/components/ui/button"
import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/store/useCartStore'
import { useCartUI } from './CartProvider'

export function CartButton() {
  const { setIsCartOpen } = useCartUI()
  const { items } = useCartStore()
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <Button variant="ghost" size="icon" aria-label="Shopping cart" onClick={() => setIsCartOpen(true)} className=" relative h-10 w-10 ">
      <ShoppingCart className="h-8 w-8" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Button>
  )
}

