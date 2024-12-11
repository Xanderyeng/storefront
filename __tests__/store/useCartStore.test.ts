import { renderHook, act } from '@testing-library/react'
import { useCartStore } from '@/store/useCartStore'

describe('useCartStore', () => {
  it('should add an item to the cart', () => {
    const { result } = renderHook(() => useCartStore())
    const product = { id: 1, title: 'Test Product', price: 10, description: 'Test Description', category: 'Test Category', image: 'Test Image', rating: { rate: 1, count: 1 } }

    act(() => result.current.addToCart(product, 1))

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0]).toEqual({ ...product, quantity: 1 })
  })

  it('should remove an item from the cart', () => {
    const { result } = renderHook(() => useCartStore())
    const product = { id: 1, title: 'Test Product', price: 10, quantity: 1, description: 'Test Description', category: 'Test Category', image: 'Test Image', rating: { rate: 1, count: 1 } }

    act(() => {
      result.current.addToCart(product, 1)
      result.current.removeFromCart(1)
    })

    expect(result.current.items).toHaveLength(0)
  })

  it('should update the quantity of an item in the cart', () => {
    const { result } = renderHook(() => useCartStore())
    const product = { id: 1, title: 'Test Product', price: 10, quantity: 1, description: 'Test Description', category: 'Test Category', image: 'Test Image', rating: { rate: 1, count: 1 } }

    act(() => {
      result.current.addToCart(product, 1)
      result.current.updateQuantity(1, 3)
    })

    expect(result.current.items[0].quantity).toBe(3)
  })

  it('should clear the cart', () => {
    const { result } = renderHook(() => useCartStore())
    const product1 = { id: 1, title: 'Test Product 1', price: 10, description: 'Test Description', category: 'Test Category', image: 'Test Image 1', rating: { rate: 1, count: 1 } }
    const product2 = { id: 2, title: 'Test Product 2', price: 20, description: 'Test Description', category: 'Test Category', image: 'Test Image 2', rating: { rate: 1, count: 1 } }

    act(() => {
      result.current.addToCart(product1, 1)
      result.current.addToCart(product2, 2)
      result.current.clearCart()
    })

    expect(result.current.items).toHaveLength(0)
  })

  it('should calculate the total correctly', () => {
    const { result } = renderHook(() => useCartStore())
    const product1 = { id: 1, title: 'Test Product 1', price: 10, description: 'Test Description', category: 'Test Category', image: 'Test Image 1', rating: { rate: 1, count: 1 } }
    const product2 = { id: 2, title: 'Test Product 2', price: 20, description: 'Test Description', category: 'Test Category', image: 'Test Image 2', rating: { rate: 1, count: 1 } }

    act(() => {
      result.current.addToCart(product1, 2)
      result.current.addToCart(product2, 1)
    })

    expect(result.current.total).toBe(40) // (10 * 2) + (20 * 1)
  })
})

