/**
 * Fake store API Functions
 * 
 * I placed all the functions for fetching product data from the Fake Store API in one central location.
 * It includes methods for getting all products, individual products, categories,
 * and products by category.
 */

import { Product, Category } from '@/types/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getProducts({ page = 1, limit = 10 }: { page?: number; limit?: number } = {}) {
  const response = await fetch(`${API_URL}/products?limit=${limit}&skip=${(page - 1) * limit}`)
  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }
  const products: Product[] = await response.json()
  // Fake Store API doesn't provide total count, so I utilized a placeholder
  const total = 100 

  return { products, total }
}

export async function getProduct(id: string): Promise<Product | null> {
  const response = await fetch(`${API_URL}/products/${id}`)
  if (!response.ok) return null
  return response.json()
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${API_URL}/products/categories`)
  if (!response.ok) {
    throw new Error('Failed to fetch categories')
  }
  const categories: string[] = await response.json()
  return categories.map(category => ({ id: category, name: category }))
}

export async function getProductsByCategory(
  categoryId: string,
  { page = 1, limit = 12 }: { page?: number; limit?: number } = {}
): Promise<{ products: Product[], total: number, categoryName: string }> {
  const response = await fetch(`${API_URL}/products/category/${categoryId}?limit=${limit}&skip=${(page - 1) * limit}`)
  if (!response.ok) {
    throw new Error('Failed to fetch products by category')
  }
  const products: Product[] = await response.json()
  
  // Fetch category name
  const categoryResponse = await fetch(`${API_URL}/products/categories`)
  const categories: string[] = await categoryResponse.json()
  const categoryName = categories.find(cat => cat.toLowerCase() === categoryId.toLowerCase()) || 'Unknown Category'
  // Fake Store API doesn't provide total count, so I utilized a placeholder as in a previous function ( getProducts )
  const total = 100 

  return { products, total, categoryName }
}