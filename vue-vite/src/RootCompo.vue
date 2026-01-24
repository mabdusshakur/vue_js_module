<script setup>
import { ref, computed } from 'vue'

// Shopping cart example
const items = ref([
  { id: 1, name: 'Laptop', price: 999, qty: 1 },
  { id: 2, name: 'Mouse', price: 29, qty: 2 },
  { id: 3, name: 'Keyboard', price: 79, qty: 1 }
])

const taxRate = ref(0.1)
const discount = ref(0)

// Computed properties - auto-update when dependencies change
const subtotal = computed(() => {
  return items.value.reduce((sum, item) => sum + (item.price * item.qty), 0)
})

const taxAmount = computed(() => subtotal.value * taxRate.value)

const discountAmount = computed(() => subtotal.value * (discount.value / 100))

const total = computed(() => subtotal.value + taxAmount.value - discountAmount.value)

const itemCount = computed(() => items.value.reduce((sum, item) => sum + item.qty, 0))

// Writable computed (getter + setter)
const fullName = ref({ first: 'John', last: 'Doe' })

const displayName = computed({
  get() {
    return `${fullName.value.first} ${fullName.value.last}`
  },
  set(newValue) {
    const parts = newValue.split(' ')
    fullName.value.first = parts[0] || ''
    fullName.value.last = parts[1] || ''
  }
})

// Update quantity
const updateQty = (id, delta) => {
  const item = items.value.find(i => i.id === id)
  if (item) item.qty = Math.max(0, item.qty + delta)
}
</script>

<template>
  <div class="container">
    <h1>Computed Properties - Smart Calculations</h1>

    <!-- Shopping Cart -->
    <section class="section">
      <h2>🛒 Shopping Cart Example</h2>
      
      <table>
        <thead>
          <tr><th>Item</th><th>Price</th><th>Qty</th><th>Subtotal</th></tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.name }}</td>
            <td>${{ item.price }}</td>
            <td>
              <button @click="updateQty(item.id, -1)">−</button>
              {{ item.qty }}
              <button @click="updateQty(item.id, 1)">+</button>
            </td>
            <td>${{ item.price * item.qty }}</td>
          </tr>
        </tbody>
      </table>

      <div class="summary">
        <p>Items in cart: <strong>{{ itemCount }}</strong></p>
        <p>Subtotal: <strong>${{ subtotal.toFixed(2) }}</strong></p>
        <p>
          Tax ({{ (taxRate * 100).toFixed(0) }}%): 
          <strong>${{ taxAmount.toFixed(2) }}</strong>
        </p>
        <p>
          Discount: 
          <input type="number" v-model.number="discount" min="0" max="50" style="width:50px">%
          = <strong>-${{ discountAmount.toFixed(2) }}</strong>
        </p>
        <p class="total">Total: <strong>${{ total.toFixed(2) }}</strong></p>
      </div>

      <pre>
// These auto-update when items/qty change!
const subtotal = computed(() => items.reduce(...))
const total = computed(() => subtotal + tax - discount)
      </pre>
    </section>

    <!-- Writable Computed -->
    <section class="section">
      <h2>✏️ Writable Computed (Getter + Setter)</h2>
      
      <div class="name-demo">
        <p>First: <input v-model="fullName.first"></p>
        <p>Last: <input v-model="fullName.last"></p>
        <p>Full Name (computed): <input v-model="displayName"></p>
      </div>

      <pre>
const displayName = computed({
  get() { return first + ' ' + last },
  set(newValue) { /* split and update first/last */ }
})
      </pre>
    </section>
  </div>
</template>

<style scoped>
.container { max-width: 800px; margin: 0 auto; padding: 2rem; font-family: 'Segoe UI', sans-serif; }
.section { background: #f8f9fa; padding: 1.5rem; margin: 1.5rem 0; border-radius: 12px; }
table { width: 100%; border-collapse: collapse; margin-bottom: 1rem; }
th, td { padding: 0.75rem; border: 1px solid #ddd; text-align: left; }
th { background: #42b883; color: white; }
.summary { background: white; padding: 1rem; border-radius: 8px; }
.total { font-size: 1.5rem; color: #42b883; border-top: 2px solid #42b883; padding-top: 0.5rem; }
button { padding: 0.25rem 0.5rem; margin: 0 0.25rem; border: none; border-radius: 4px; background: #42b883; color: white; cursor: pointer; }
pre { background: #263238; color: #80cbc4; padding: 1rem; border-radius: 6px; margin-top: 1rem; overflow-x: auto; }
.name-demo input { padding: 0.5rem; margin: 0.25rem; border: 1px solid #ddd; border-radius: 4px; }
</style>