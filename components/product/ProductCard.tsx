'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Product } from '@/types/types'
import { ProductDialog } from './ProductDialog'
import { Card, CardContent } from '@/components/ui/card'
import { useCartStore } from '@/store/useCartStore'
import { useCartUI } from '@/components/cart/CartProvider'

interface ProductCardProps {
  product: Product
  onViewCart: () => void
}

export function ProductCard({ product }: ProductCardProps) {
  const { items } = useCartStore()
  const { setIsCartOpen } = useCartUI()
  const cartItem = items.find(item => item.id === product.id)
  const quantity = cartItem ? cartItem.quantity : 0

  return (
    <Card className="overflow-hidden shadow-lg relative">
      <CardContent className="flex-grow p-4 cursor-pointer">
        <div className="aspect-square bg-white overflow-hidden rounded-lg mb-4">
          <Image
            src={product.image}
            alt={product.title}
            width={250}
            height={250}
            className="h-full w-full object-contain object-center transition-opacity duration-300 group-hover:opacity-75"
          />
        </div>
        <h3 className="mt-4 text-sm font-medium text-foreground truncate">{product.title}</h3>
        <div className=" flex flex-row pt-4 ">
        <p className="mt-1 w-1/2 text-lg outline-0 outline-orange-500 font-medium text-foreground">${product.price.toFixed(2)}</p>
        <ProductDialog product={product} onViewCart={() => setIsCartOpen(true)} />
        </div>
      </CardContent>
      {quantity > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold"
        >
          {quantity}
        </motion.div>
      )}
    </Card>
  )
}

