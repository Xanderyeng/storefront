import { Hero } from "@/components/home/Hero";
import { getCategories } from '@/lib/api/storefront'
import { getProducts } from "@/lib/api/storefront";
import { CartProvider } from "@/components/cart/CartProvider";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SpecialOffers } from "@/components/home/SpecialOffers";
import { FeaturedCollections } from '@/components/home/FeaturedCollections'
import { CategoryShowcaseSection } from "@/components/home/CategoryShowcaseSection";
import { getPlaiceholder } from 'plaiceholder'
import fs from 'fs/promises'
import path from 'path'

// const getCategoryImage = (categoryId: string) => {
//   switch (categoryId) {
//     case `men's clothing`:
//       return `/mens clothing.webp`;
//     case 'electronics':
//       return '/electronics.webp';
//     case `women's clothing`:
//       return `/womens clothing.webp`;
//     case 'jewelery':
//       return '/jewelery.webp';
//     default:
//       // Fallback image
//       return '/outdoors.webp';
//   }
// };


// async function createLocalBase64(imagePath: string) {
//   try {
//     const publicDirectory = path.join(process.cwd(), 'public');
//     const filePath = path.join(publicDirectory, imagePath);
    
//     const fileBuffer = await fs.readFile(filePath);
//     const { base64 } = await getPlaiceholder(fileBuffer);
    
//     return base64;
//   } catch (e) {
//     if (e instanceof Error) console.error(`Error processing ${imagePath}:`, e.stack);
//     return null;
//   }
// }

export default async function Home() {
  const [productsResponse, categories] = await Promise.all([
    getProducts({ limit: 8 }),  // Fetch 8 products for the featured section
    getCategories()
  ]);

  // console.table(categories)

  // const categoriesWithBlur = await Promise.all(
  //   categories.map(async (category) => {
  //     const imagePath = getCategoryImage(category.id);
  //     const base64 = await createLocalBase64(imagePath);
  //     return { ...category, imageSrc: imagePath, blurDataURL: base64 || undefined };
  //   })
  // );

  // console.log(categoriesWithBlur)
  return (
    <CartProvider>
    <section className="container min-h-full mx-auto px-4 py-8">
      <Hero />
      <h2 className="text-2xl font-bold my-8">Featured Products</h2>
      <ProductGrid products={productsResponse.data} />
      <CategoryShowcaseSection categories={categories} />
        <SpecialOffers />
      <FeaturedCollections />
    </section>
    </CartProvider>   
  );
}
