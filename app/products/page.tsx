import { Suspense } from 'react'
import { ProductGrid } from '@/components/product/ProductGrid'
import { getProducts } from '@/lib/api/storefront'
import { Loading } from '@/components/layout/Loading'

export default async function ProductsPage() {
  const { data: products } = await getProducts()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>
      <Suspense fallback={<Loading />}>
        <ProductGrid products={products} />
      </Suspense>
    </div>
  )
}

