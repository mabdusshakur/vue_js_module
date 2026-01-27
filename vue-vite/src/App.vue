<script setup>
import ProductCard from './components/ProductCard.vue'

const products = [
  {
    id: 1,
    title: 'MacBook Pro 14"',
    price: 1999.99,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300',
    rating: 5,
    inStock: true,
    tags: ['Apple', 'Laptop', 'M3'],
    seller: { name: 'Apple Store', verified: true }
  },
  {
    id: 2,
    title: 'Mechanical Keyboard',
    price: 149.99,
    rating: 1,
    inStock: false,
    tags: ['Gaming', 'RGB'],
    seller: { name: 'TechGear', verified: true }
  },
  {
    id: 3,
    title: 'Wireless Mouse',
    price: 79.99,
    rating: 4,
    inStock: true,
    tags: ['Ergonomic'],
    seller: { name: 'RandomSeller', verified: false }
  }
]
</script>

<template>
  <div class="container">
    <h1>Products</h1>
    <div class="product-grid">
      <ProductCard v-for="product in products" :key="product.id"
        :title="product.title"
        :price="product.price"
        :image="product.image"
        :rating="product.rating"
        :inStock="product.inStock"
        :tags="product.tags"
        :seller="product.seller"
      />
    </div>
  </div>
</template>

<style>
.container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}
</style>