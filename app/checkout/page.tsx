'use client'

import { useState } from 'react'
import { useCartStore } from '@/store/useCartStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Order submitted:', { ...formData, items, total })
    clearCart()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <p>Your cart is empty. Please add some items before checking out.</p>
        <Link href="/products" >
        <Button className=" mt-4 " ><ShoppingCart />Go shoppping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" className="w-full">Place Order</Button>
        </form>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          {items.map((item) => (
            <div key={item.id} className=" flex gap-4 justify-between mb-2">
                <Image src={item.image} alt={item.title} width={50} height={50} className="rounded-md" />
                <>
              <span>{item.title} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
                </>
            </div>
          ))}
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

