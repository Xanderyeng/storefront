import Image from "next/image";
import { Suspense } from "react";
import { Hero } from "@/components/home/Hero";
import { getCategories } from '@/lib/api/storefront'
import { getProducts } from "@/lib/api/storefront";
import { CartProvider } from "@/components/cart/CartProvider";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SpecialOffers } from "@/components/home/SpecialOffers";
import { FeaturedCollections } from '@/components/home/FeaturedCollections'
import { CategoryShowcaseSection } from "@/components/home/CategoryShowcaseSection";

// import { getStaticProps } from 'next';

// export async function getStaticProps() {
//   const response = await fetch('https://fakestoreapi.com/products/categories');
//   const categories = await response.json();

//   return {
//     props: {
//       categories,
//     },
//   };
// }

export default async function Home() {
  const products = await getProducts();
  const categories = await getCategories()
  // console.log(categories)
  return (
    <CartProvider>
    <section className="container mx-auto px-4 py-8 outline-0 outline-orange-400">
      <Hero />
      <h2 className="text-2xl font-bold my-8">Featured Products</h2>
        <ProductGrid products={products.products} />
      {/* <Suspense fallback={<div>Loading...</div>}>
      </Suspense> */}
        <CategoryShowcaseSection categories={categories} />
      {/* <Suspense fallback={<div>Loading...</div>}>
      </Suspense> */}
        <SpecialOffers />
      {/* <Suspense fallback={<div>Loading...</div>}>
      </Suspense> */}
      <FeaturedCollections />
      {/* <Suspense fallback={<div>Loading...</div>}>
      </Suspense> */}
    </section>
    </CartProvider>   
  );
}
