"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingCart, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart, removeFromCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.log("Order submitted:", { ...formData, items, total });
    router.push("/order-success");
    clearCart();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    setLoading(true);
    const stripe = useStripe();
    const elements = useElements();

    const response = await fetch("/api/stripe/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: total * 100 }), // Convert to cents
    });

    const { clientSecret } = await response.json();

    const result = await stripe?.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements?.getElement(CardElement)!, // Use CardElement here
      },
    });

    if (result?.error) {
      console.error(result.error.message);
    } else if (result?.paymentIntent?.status === "succeeded") {
      console.log("Payment successful!");
    }

    setLoading(false);
  };

  if (items.length === 0 && !isSubmitting) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-6'>Checkout</h1>
        <p>Your cart is empty. Please add some items before checking out.</p>
        <Link href='/products'>
          <Button className=' mt-4 '>
            <ShoppingCart />
            Go shoppping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-6'>Checkout</h1>
        <div className='grid md:grid-cols-2 gap-8'>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <Label htmlFor='name'>Name</Label>
              <Input
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                name='email'
                type='email'
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor='address'>Address</Label>
              <Input
                id='address'
                name='address'
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className='mb-4'>
              <Label htmlFor='card'>Card Details</Label>
              <div className='p-2 border rounded'>
                <CardElement id='card' className=' dark:text-white' />
              </div>
            </div>
            <Button type='submit' className='w-full' disabled={isSubmitting}>
              {isSubmitting ? "Placing Order..." : "Place Order"}
            </Button>
          </form>
          <div>
            <h2 className='text-2xl font-semibold mb-4'>Order Summary</h2>
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className='flex gap-4 justify-between items-center mb-2'
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={50}
                    height={50}
                    className='rounded-md'
                  />
                  <span>
                    {item.title} x {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => removeFromCart(item.id)}
                    className='text-red-500 hover:text-red-700'
                  >
                    <X className='h-4 w-4' />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
            <div className='border-t pt-2 mt-2'>
              <div className='flex justify-between font-semibold'>
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <Button
              onClick={handlePayment}
              disabled={loading}
              className='mt-4 w-full'
            >
              {loading ? "Processing..." : "Pay Now"}
            </Button>
          </div>
        </div>
      </div>
    </Elements>
  );
}
