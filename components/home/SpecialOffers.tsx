'use client'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const offers = [
  { id: 1, title: "Xmas Sale", description: "Up to 50% off on selected items" },
  { id: 2, title: "Free Shipping", description: "On orders over $100 this festive" },
  { id: 3, title: "Season Arrivals", description: "Check out our latest products" },
]

export function SpecialOffers() {
  return (
    <section className="py-12 bg-background/10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Special Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{offer.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{offer.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

