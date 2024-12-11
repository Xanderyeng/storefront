import { getCategories } from "@/lib/api/storefront";
import { CategoryShowcaseSection } from "@/components/home/CategoryShowcaseSection";
import { Suspense } from "react";
import { Loading } from "../Loading";

export default async function page() {
  const categories = await getCategories();
  return (
    <section>
      <Suspense fallback={<Loading />}>
        <CategoryShowcaseSection categories={categories} />
      </Suspense>
    </section>
  );
}
