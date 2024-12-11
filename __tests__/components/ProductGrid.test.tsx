import React from 'react'
import { render, screen } from '@testing-library/react'
import { ProductGrid } from '@/components/product/ProductGrid'
import { Product } from '@/types/types'

// Mock the useCartUI hook
jest.mock('@/components/cart/CartProvider', () => ({
  useCartUI: () => ({
    setIsCartOpen: jest.fn(),
  }),
}))

const mockSetIsCartOpen = jest.fn()
jest.mock('@/components/cart/CartProvider', () => ({
  useCartUI: () => ({
    // setIsCartOpen: jest.fn(),
    setIsCartOpen: mockSetIsCartOpen,
  }),
}))

describe('ProductGrid', () => {
  const mockProducts: Product[] = [
    {
      id: 1,
      title: 'Product 1',
      price: 19.99,
      description: 'Description 1',
      category: 'category1',
      image: 'image1.jpg',
      rating: { rate: 4.5, count: 10 },
    },
    {
      id: 2,
      title: 'Product 2',
      price: 29.99,
      description: 'Description 2',
      category: 'category2',
      image: 'image2.jpg',
      rating: { rate: 4.0, count: 15 },
    },
  ]

  it('renders loading state initially', () => {
    render(<ProductGrid products={null} />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders products when data is available', () => {
    render(<ProductGrid products={mockProducts} />)
    expect(screen.getByText('Product 1')).toBeInTheDocument()
    expect(screen.getByText('Product 2')).toBeInTheDocument()
  })

  it('renders no products message when array is empty', () => {
    render(<ProductGrid products={[]} />)
    expect(screen.getByText('No products found.')).toBeInTheDocument()
  })
})

