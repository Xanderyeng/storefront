/**
 * Fake store API Functions
 * 
 * I placed all the functions for fetching product data from the Fake Store API in one central location.
 * It includes methods for getting all products, individual products, categories,
 * and products by category.
 */

import { Product, Category, PaginatedResponse } from '@/types/types'
import { createLocalBase64 } from '@/utils/createLocalBase64'

const API_URL = process.env.NEXT_PUBLIC_API_URL

async function fetchWithErrorHandling(url: string) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`)
  }
  return response.json()
}

export async function getProducts(): Promise<{ data: Product[] }> {
  const products: Product[] = await fetchWithErrorHandling(`${API_URL}/products`)
  const productsWithBlur = await Promise.all(products.map(async (product) => ({
    ...product,
    blurDataURL: await createLocalBase64(product.image)
  })))
  
  return { data: productsWithBlur }
}

export async function getProduct(id: string): Promise<Product | null> {
  try {
    const product: Product = await fetchWithErrorHandling(`${API_URL}/products/${id}`)
    const blurDataURL = await createLocalBase64(product.image)
    return { ...product, blurDataURL }
  } catch (error) {
    console.error(`Failed to fetch product with id ${id}:`, error)
    return null
  }
}

export async function getCategories(): Promise<Category[]> {
  const categories: string[] = await fetchWithErrorHandling(`${API_URL}/products/categories`)
  return Promise.all(categories.map(async category => {
    const image = `/${category.replace(/'/g, '').replace(/\s+/g, ' ').toLowerCase()}.webp`
    const blurDataURL = await createLocalBase64(image)
    console.log(`Category: ${category}, Image: ${image}, BlurDataURL: ${blurDataURL ? 'generated' : 'failed'}`);
    return { id: category, name: category, image, blurDataURL }
  }))
}

export async function getProductsByCategory(
  categoryId: string
): Promise<{ data: Product[], categoryName: string }> {
  const products: Product[] = await fetchWithErrorHandling(`${API_URL}/products/category/${categoryId}`)
  const productsWithBlur = await Promise.all(products.map(async (product) => ({
    ...product,
    blurDataURL: await createLocalBase64(product.image)
  })))
  
  const categories: string[] = await fetchWithErrorHandling(`${API_URL}/products/categories`)
  const categoryName = categories.find(cat => cat.toLowerCase() === categoryId.toLowerCase()) || 'Unknown Category'
  
  return { data: productsWithBlur, categoryName }
}
