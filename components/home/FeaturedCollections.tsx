'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import clothing from '@/public/mens clothing.webp'
import electronics from '@/public/electronics.webp'
import outdoor from '@/public/outdoors.webp'

const collections = [
  { id: 1, name: "Summer Essentials", image: clothing },
  { id: 2, name: "Work from Home", image: electronics },
  { id: 3, name: "Outdoor Adventure", image: outdoor },
]

// I can later refactor this component to use a shared wrapper with CategoryShowcaseSection

export function FeaturedCollections() {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/collection/${collection.id}`} className="block group">
                <div className="relative overflow-hidden rounded-lg shadow-lg aspect-[3/2]">
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    style={{objectFit: "cover"}}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                  {/* Absolute position for collection name */}
                  <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-50 flex items-center justify-center">
                    <h3 className="text-white text-2xl font-bold text-center">{collection.name}</h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

