import React from 'react'
import { render, screen } from '@testing-library/react'
import { ProductCard } from '@/components/product/ProductCard'
import { Product } from '@/types/types'

// Mock the useCartStore hook
jest.mock('@/store/useCartStore', () => ({
  useCartStore: () => ({
    items: [],
  }),
}))

// Mock the useCartUI hook
const mockSetIsCartOpen = jest.fn()
jest.mock('@/components/cart/CartProvider', () => ({
  useCartUI: () => ({
    // setIsCartOpen: jest.fn(),
    setIsCartOpen: mockSetIsCartOpen,
  }),
}))

describe('ProductCard', () => {
  const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    price: 19.99,
    description: 'This is a test product',
    category: 'test',
    image: 'test-image.jpg',
    rating: { rate: 4.5, count: 10 },
  }

  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} onViewCart={() => mockSetIsCartOpen(true)} />)

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('$19.99')).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Test Product')
    expect(screen.getByRole('button', { name: /view details/i })).toBeInTheDocument()
  })
})

