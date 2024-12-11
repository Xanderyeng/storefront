'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Category } from '@/types/types'
interface CategoryShowcaseSectionProps {
  categories: Category[]
}

export function CategoryShowcaseSection({ categories }: CategoryShowcaseSectionProps) {
  const getCategoryImage = (categoryId: string) => {
    switch (categoryId) {
      case `men's clothing`:
        return `/mens clothing.webp`;
      case 'electronics':
        return '/electronics.webp';
      case `women's clothing`:
        return `/womens clothing.webp`;
      case 'jewelery':
        return '/jewelery.webp';
      default:
        // Fallback image
        return '/outdoors.webp';
    }
  };
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              className='h-full'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/category/${category.id}`} className="block group h-full">
                <div className="relative overflow-hidden rounded-lg shadow-lg h-full">
                  <Image
                    src={getCategoryImage(category.id)}
                    alt={category.name}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white text-2xl font-bold capitalize">{category.name}</h3>
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

