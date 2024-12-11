'use client'

// import { useState, useEffect } from 'react'
import { ProductCard } from './ProductCard'
import { Product } from '@/types/types'
import { ProductCardSkeleton } from './ProductCardSkeleton'
import { useCartUI } from '@/components/cart/CartProvider'
import { Carousel,  CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

interface ProductGridProps {
  products: Product[] | null
}

/**
* This component ( ProductGrid ) manages its own loading state and renders I decided to render a shadcn skeleton loader
* while products are being fetched.
* I chose to make use of the Shadcn Carousel component for a
* responsive and interactive product display.
 */

export function ProductGrid({ products }: ProductGridProps) {
  // const [isLoading, setIsLoading] = useState(true)
  const { setIsCartOpen } = useCartUI()

  // useEffect(() => {
  //   if (products) {
  //     setIsLoading(false)
  //   }
  // }, [products])

  if (products === null) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (!products || products.length === 0) {
    return <p>No products found.</p>
  }

  return (
    <section className=' overflow-hidden md:overflow-visible '>
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent className=" ml-0 md:-ml-4 py-4 px-16 ">
        {products.map((product) => (
          <CarouselItem key={product.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
            <ProductCard product={product} onViewCart={() => setIsCartOpen(true)} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    </section>
  )
}

