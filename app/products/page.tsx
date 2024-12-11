import { Suspense } from 'react'
import { ProductGrid } from '@/components/product/ProductGrid'
import { getProducts } from '@/lib/api/storefront'
import { Pagination } from '@/components/ui/pagination'
import { Loading } from '@/components/layout/Loading';


interface PaginationProps {
  currentpage: number;
  totalpages: number;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const currentpage = Number(searchParams.page) || 1
  const pagesize = 12
  const { products, total } = await getProducts({ page: currentpage, limit: pagesize })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>
      <Suspense fallback={<Loading />}>
        <ProductGrid products={products} />
      </Suspense>
      {/* <div className="mt-8">
        <Pagination
          currentpage={currentpage}
          totalpages={Math.ceil(total / pagesize)}
        />
      </div> */}
    </div>
  )
}

