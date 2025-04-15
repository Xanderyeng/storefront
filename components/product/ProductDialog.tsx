'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Product } from '@/types/types'
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useCartStore } from '@/store/useCartStore'
import { useToast } from '@/hooks/use-toast'
import { motion } from 'framer-motion'
import { ToastAction } from '../ui/toast'
import { Loader2, Plus, Minus, ShoppingCart } from 'lucide-react'

interface ProductDialogProps {
  product: Product;
  onViewCart: () => void;
  // onClose: () => void;
}

export function ProductDialog({ product, onViewCart }: ProductDialogProps) {
  const { title, price, image, description } = product;
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);
  const toast = useToast();
  
  const handleAddToCart = async () => {
    setIsAdding(true);
    // Felt this would add a nice UI touch for when adding an Item to the cart -> Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500)); 
    addToCart(product, quantity);
    setIsAdding(false);
    // toast({
    //   title: "Item added to cart",
    //   description: "Friday, February 10, 2023 at 5:57 PM",
    //   action: (
    //     <ToastAction altText="Item added to cart">{`Added ${quantity} ${quantity > 1 ? 'items' : 'item'} to cart`}</ToastAction>
    //   ),
    // })
  }
  // onOpenChange={onClose}

  return (
    <Dialog >
      <DialogTrigger asChild  >
        <Button variant="outline" className="hover:cursor-pointer">Buy</Button>
      </DialogTrigger>
      <DialogContent className="w-[90vw] sm:max-w-[800px] rounded-lg p-0 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="relative w-full md:w-1/2 h-[300px] md:h-auto bg-white">
            <Image
              src={image}
              alt={title}
              fill
              style={{ objectFit: 'contain' }}
              className=' py-6 '
            />
          </div>
          <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
            <div>
              <DialogHeader>
                <DialogTitle className=" ~text-xl/3xl font-bold mb-2">{title}</DialogTitle>
              </DialogHeader>
              {/* ----- price and quantity division group ----- */}
              <div className=" flex flex-row gap-8 py-4 justified-between outline-0 outline-orange-500 ">
              <p className="text-3xl font-semibold text-primary outline-0 outline-lime-400 ">${price.toFixed(2)}</p>
              <div className="flex items-center justify-center space-x-4 outline-0 outline-lime-400 ">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-2xl font-semibold">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              </div>
              <DialogDescription>
                <h3 className="text-md font-semibold">Product Details</h3>
              </DialogDescription>
              <p className="text-sm text-muted-foreground mb-6">{description}</p>
            </div>
            <div className="space-y-4">
              <div className="flex space-x-2 ">
                <Button onClick={handleAddToCart} disabled={isAdding} className="ww-2/3">
                  {isAdding ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </>
                  )}
                </Button>
                <Button onClick={() => { onViewCart(), console.log("Clicked") }} className="w-1/3">View Cart</Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

