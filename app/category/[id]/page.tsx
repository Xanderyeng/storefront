import { Suspense } from 'react'
import { ProductGrid } from '@/components/product/ProductGrid'
import { getProductsByCategory } from '@/lib/api/storefront'
import { notFound } from 'next/navigation'
import { Loading } from '@/components/layout/Loading'

export default async function CategoryPage({
  params,
}: {
  params: { id: string }
}) {
  const decodedCategoryId = decodeURIComponent(params.id)
  const { data: products, categoryName } = await getProductsByCategory(decodedCategoryId)

  if (!products || products.length === 0) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 capitalize">{categoryName || decodedCategoryId.replace('-', ' ')}</h1>
      <Suspense fallback={<Loading />}>
        <ProductGrid products={products} />
      </Suspense>
    </div>
  )
}

