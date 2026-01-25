<script setup>
import { ref } from 'vue'

// Simple array
const fruits = ref(['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'])

// Array of objects (users)
const users = ref([
  { id: 1, name: 'Alice', age: 28, role: 'Developer' },
  { id: 2, name: 'Bob', age: 34, role: 'Designer' },
  { id: 3, name: 'Carol', age: 25, role: 'Manager' },
  { id: 4, name: 'David', age: 31, role: 'Developer' }
])

// Object iteration
const user = ref({
  name: 'John Doe',
  email: 'john@example.com',
  age: 30,
  location: 'New York',
  occupation: 'Developer'
})

// Nested data
const categories = ref([
  {
    name: 'Electronics',
    products: [
      { id: 1, name: 'Laptop', price: 999 },
      { id: 2, name: 'Phone', price: 699 },
      { id: 3, name: 'Tablet', price: 499 }
    ]
  },
  {
    name: 'Clothing',
    products: [
      { id: 4, name: 'T-Shirt', price: 29 },
      { id: 5, name: 'Jeans', price: 79 },
      { id: 6, name: 'Jacket', price: 149 }
    ]
  }
])

// Matrix (2D array)
const matrix = ref([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
])

// Adding/Removing fruits
const newFruit = ref('')
const addFruit = () => {
  if (newFruit.value.trim()) {
    fruits.value.push(newFruit.value.trim())
    newFruit.value = ''
  }
}
const removeFruit = (index) => {
  fruits.value.splice(index, 1)
}

// User operations
const newUser = ref({ name: '', age: '', role: 'Developer' })
const addUser = () => {
  if (newUser.value.name) {
    users.value.push({
      id: Date.now(),
      ...newUser.value,
      age: Number(newUser.value.age)
    })
    newUser.value = { name: '', age: '', role: 'Developer' }
  }
}
const removeUser = (id) => {
  users.value = users.value.filter(u => u.id !== id)
}
</script>

<template>
  <div class="container">
    <h1>v-for: Complete List Rendering Examples</h1>

    <!-- Simple Array -->
    <section class="section">
      <h2>1️⃣ Simple Array with Index</h2>
      
      <div class="add-form">
        <input v-model="newFruit" @keyup.enter="addFruit" placeholder="Add fruit...">
        <button @click="addFruit" class="btn">Add</button>
      </div>

      <ul class="fruit-list">
        <li v-for="(fruit, index) in fruits" :key="index" class="fruit-item">
          <span class="index">{{ index }}</span>
          <span class="name">{{ fruit }}</span>
          <button @click="removeFruit(index)" class="btn-remove">×</button>
        </li>
      </ul>

      <pre>
v-for="(fruit, index) in fruits" :key="index"
{{ index }} - {{ fruit }}
      </pre>
    </section>

    <!-- Array of Objects -->
    <section class="section">
      <h2>2️⃣ Array of Objects</h2>
      
      <div class="add-form user-form">
        <input v-model="newUser.name" placeholder="Name">
        <input v-model="newUser.age" type="number" placeholder="Age">
        <select v-model="newUser.role">
          <option>Developer</option>
          <option>Designer</option>
          <option>Manager</option>
        </select>
        <button @click="addUser" class="btn">Add User</button>
      </div>

      <div class="user-grid">
        <div v-for="user in users" :key="user.id" class="user-card">
          <button @click="removeUser(user.id)" class="btn-close">×</button>
          <div class="user-avatar">{{ user.name[0] }}</div>
          <h3>{{ user.name }}</h3>
          <p class="role">{{ user.role }}</p>
          <p class="age">Age: {{ user.age }}</p>
          <p class="id">ID: {{ user.id }}</p>
        </div>
      </div>

      <pre>
v-for="user in users" :key="user.id"
// Always use unique ID as key, not index!
      </pre>
    </section>

    <!-- Object Properties -->
    <section class="section">
      <h2>3️⃣ Looping Object Properties</h2>
      
      <table class="prop-table">
        <thead>
          <tr><th>Index</th><th>Key</th><th>Value</th></tr>
        </thead>
        <tbody>
          <tr v-for="(value, key, index) in user" :key="key">
            <td>{{ index }}</td>
            <td><strong>{{ key }}</strong></td>
            <td>{{ value }}</td>
          </tr>
        </tbody>
      </table>

      <pre>
v-for="(value, key, index) in user" :key="key"
// value = 'John Doe', key = 'name', index = 0
      </pre>
    </section>

    <!-- Nested v-for -->
    <section class="section">
      <h2>4️⃣ Nested v-for (Categories → Products)</h2>
      
      <div class="categories">
        <div v-for="category in categories" :key="category.name" class="category">
          <h3>{{ category.name }}</h3>
          <div class="products">
            <div v-for="product in category.products" :key="product.id" class="product">
              <span class="product-name">{{ product.name }}</span>
              <span class="product-price">${{ product.price }}</span>
            </div>
          </div>
        </div>
      </div>

      <pre>
v-for="category in categories"
  v-for="product in category.products"
      </pre>
    </section>

    <!-- Matrix/Grid -->
    <section class="section">
      <h2>5️⃣ 2D Array (Matrix)</h2>
      
      <div class="matrix">
        <div v-for="(row, rowIndex) in matrix" :key="rowIndex" class="matrix-row">
          <div 
            v-for="(cell, colIndex) in row" 
            :key="colIndex" 
            class="matrix-cell"
          >
            [{{ rowIndex }},{{ colIndex }}] = {{ cell }}
          </div>
        </div>
      </div>

      <pre>
v-for="(row, rowIndex) in matrix"
  v-for="(cell, colIndex) in row"
      </pre>
    </section>

    <!-- Range Examples -->
    <section class="section">
      <h2>6️⃣ Range Examples</h2>
      
      <h4>Rating Stars (1-5):</h4>
      <div class="rating">
        <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= 3 }">★</span>
      </div>

      <h4>Pagination Buttons:</h4>
      <div class="pagination">
        <button v-for="page in 10" :key="page" class="page-btn">{{ page }}</button>
      </div>

      <h4>Calendar Days:</h4>
      <div class="calendar-grid">
        <div v-for="day in 31" :key="day" class="calendar-day">{{ day }}</div>
      </div>

      <pre>
v-for="n in 5" :key="n"   // n = 1, 2, 3, 4, 5
v-for="n in 10" :key="n"  // Pagination example
      </pre>
    </section>
  </div>
</template>

<style scoped>
.container { max-width: 900px; margin: 0 auto; padding: 2rem; font-family: 'Segoe UI', sans-serif; }
.section { background: #f8f9fa; padding: 1.5rem; margin: 1.5rem 0; border-radius: 12px; }

/* Forms */
.add-form { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
.add-form input, .add-form select { padding: 0.5rem; border: 1px solid #ddd; border-radius: 6px; }
.btn { padding: 0.5rem 1rem; border: none; border-radius: 6px; background: #42b883; color: white; cursor: pointer; }
.btn:hover { background: #35a372; }

/* Fruit List */
.fruit-list { list-style: none; padding: 0; }
.fruit-item { display: flex; align-items: center; gap: 1rem; padding: 0.75rem; background: white; margin: 0.5rem 0; border-radius: 8px; }
.index { background: #42b883; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; }
.name { flex: 1; }
.btn-remove { background: #e74c3c; color: white; border: none; width: 30px; height: 30px; border-radius: 50%; cursor: pointer; font-size: 1.25rem; }
.btn-remove:hover { background: #c0392b; }

/* User Grid */
.user-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; }
.user-card { background: white; padding: 1.5rem; border-radius: 12px; text-align: center; position: relative; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.3s; }
.user-card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
.btn-close { position: absolute; top: 0.5rem; right: 0.5rem; background: #e74c3c; color: white; border: none; width: 24px; height: 24px; border-radius: 50%; cursor: pointer; }
.btn-close:hover { background: #c0392b; }
.user-avatar { width: 60px; height: 60px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: bold; margin: 0 auto 1rem; }
.user-card h3 { margin: 0; }
.role { color: #42b883; font-weight: 500; margin: 0.25rem 0; }
.age, .id { color: #666; font-size: 0.875rem; margin: 0.25rem 0; }

/* Table */
.prop-table { width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; }
.prop-table th, .prop-table td { padding: 0.75rem; border: 1px solid #ddd; }
.prop-table th { background: #42b883; color: white; }

/* Categories */
.categories { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; }
.category { background: white; border-radius: 8px; overflow: hidden; }
.category h3 { background: #42b883; color: white; margin: 0; padding: 1rem; }
.products { padding: 0.5rem; }
.product { display: flex; justify-content: space-between; padding: 0.75rem; border-bottom: 1px solid #eee; }
.product:last-child { border-bottom: none; }
.product-price { color: #42b883; font-weight: bold; }

/* Matrix */
.matrix { display: inline-block; background: white; padding: 1rem; border-radius: 8px; }
.matrix-row { display: flex; }
.matrix-cell { width: 100px; height: 50px; border: 1px solid #ddd; display: flex; align-items: center; justify-content: center; font-size: 0.875rem; }

/* Rating & Pagination */
.rating { font-size: 2rem; margin-bottom: 1rem; }
.star { color: #ddd; cursor: pointer; transition: transform 0.2s; }
.star:hover { transform: scale(1.2); }
.star.filled { color: #f1c40f; }
.pagination { display: flex; gap: 0.25rem; margin-bottom: 1rem; }
.page-btn { width: 36px; height: 36px; border: 1px solid #ddd; background: white; border-radius: 6px; cursor: pointer; transition: all 0.2s; }
.page-btn:hover { background: #42b883; color: white; border-color: #42b883; }

/* Calendar */
.calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 0.25rem; max-width: 350px; }
.calendar-day { background: white; padding: 0.5rem; text-align: center; border-radius: 4px; transition: all 0.2s; }
.calendar-day:hover { background: #42b883; color: white; }

pre { background: #263238; color: #80cbc4; padding: 1rem; border-radius: 6px; margin-top: 1rem; overflow-x: auto; }
</style>