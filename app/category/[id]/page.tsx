import { Suspense } from 'react'
import { ProductGrid } from '@/components/product/ProductGrid'
import { getProductsByCategory } from '@/lib/api/storefront'
import { Pagination } from '@/components/ui/pagination'
import { notFound } from 'next/navigation'
import { Loading } from '@/app/Loading'

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { page?: string }
}) {
  const pageSize = 12
  const currentPage = Number(searchParams.page) || 1
  const decodedCategoryId = decodeURIComponent(params.id)
  const { products, total, categoryName } = await getProductsByCategory(decodedCategoryId, { page: currentPage, limit: pageSize })

  if (!products || products.length === 0) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 capitalize">{categoryName || decodedCategoryId.replace('-', ' ')} </h1>
      <Suspense fallback={<Loading />}>
        <ProductGrid products={products} />
      </Suspense>
      {/* <div className="mt-8">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(total / pageSize)}
          pageSize={pageSize}
        />
      </div> */}
    </div>
  )
}

