<script setup>
const props = defineProps({
  // Simple string
  title: String,

  // Required prop
  price: {
    type: Number,
    required: true
  },

  // With default
  image: {
    type: String,
    default: 'https://placehold.co/600x400'
  },

  // Number with validation
  rating: {
    type: Number,
    default: 0,
    validator : (value) => value >= 0 && value <= 5
  },

  // Boolean
  inStock: {
    type: Boolean,
    default: true
  },

  // Array
  tags: {
    type: Array,
    default: () => []
  },

  // Object
  seller: {
    type: Object,
    default: () => ({ name: 'Unknown', verified: false })
  }
})

const formattedPrice = `$${props.price.toFixed(2)}`;

</script>

<template>
  <div class="product-card" :class="{ 'out-of-stock': !inStock }">
    <div class="image-container">
      <img :src="image" :alt="title">
      <span v-if="!inStock" class="stock-badge">Out of Stock</span>
    </div>

    <div class="content">
      <h3 class="title">{{ title }}</h3>

      <div class="rating">
        <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= rating }">★</span>
        <span class="rating-value">({{ rating }})</span>
      </div>

      <div class="tags">
        <span v-for="tag in tags" :key="tag" class="tag">{{ tag }}</span>
      </div>

      <div class="seller-info">
        <span>Sold by: {{ seller.name }}</span>
        <span v-if="seller.verified" class="verified">✓ Verified</span>
      </div>

      <div class="footer">
        <span class="price">{{ formattedPrice }}</span>
        <button class="btn" :disabled="!inStock">
          {{ inStock ? 'Add to Cart' : 'Notify Me' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.product-card:hover {
  transform: translateY(-4px);
}

.product-card.out-of-stock {
  opacity: 0.7;
}

.image-container {
  position: relative;
  height: 200px;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.stock-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #e74c3c;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
}

.content {
  padding: 1rem;
}

.title {
  margin: 0 0 0.5rem 0;
}

.rating {
  margin-bottom: 0.5rem;
}

.star {
  color: #ddd;
}

.star.filled {
  color: #f1c40f;
}

.rating-value {
  color: #666;
  font-size: 0.875rem;
}

.tags {
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
}

.tag {
  background: #e3f2fd;
  color: #1565c0;
  padding: 0.125rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
}

.seller-info {
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.verified {
  color: #27ae60;
  font-weight: bold;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}

.price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #42b883;
}

.btn {
  background: #42b883;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}

.btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>