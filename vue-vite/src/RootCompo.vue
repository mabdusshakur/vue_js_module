<script setup>
import { ref, reactive, toRefs } from 'vue'

// ========== REF ==========
// Use ref for: primitives (string, number, boolean)
const count = ref(0)
const message = ref('Hello')
const isActive = ref(true)

// ref can also hold objects (access via .value)
const userRef = ref({
  name: 'John',
  age: 25
})

// ========== REACTIVE ==========
// Use reactive for: objects and arrays ONLY
const userReactive = reactive({
  name: 'Jane',
  age: 30,
  hobbies: ['reading', 'coding']
})

const shoppingCart = reactive([
  { id: 1, name: 'Apple', qty: 3 },
  { id: 2, name: 'Banana', qty: 5 }
])

// ========== METHODS ==========
// Updating ref values (need .value in script)
const incrementCount = () => {
  count.value++
}

const updateRefUser = () => {
  userRef.value.name = 'John Updated'
  userRef.value.age++
}

// Updating reactive values (NO .value needed)
const updateReactiveUser = () => {
  userReactive.name = 'Jane Updated'
  userReactive.age++
}

const addHobby = () => {
  userReactive.hobbies.push('gaming')
}

const addToCart = () => {
  shoppingCart.push({
    id: shoppingCart.length + 1,
    name: 'Orange',
    qty: 2
  })
}

// ========== TOREFS (extracting refs from reactive) ==========
const state = reactive({
  firstName: 'Alice',
  lastName: 'Smith'
})
// Convert to refs to maintain reactivity when destructuring
const { firstName, lastName } = toRefs(state)
</script>

<template>
  <div class="container">
    <h1>ref() vs reactive() Demo</h1>

    <!-- REF EXAMPLES -->
    <section class="section ref-section">
      <h2>🔵 ref() - Primitives</h2>
      
      <div class="example">
        <p><strong>Count:</strong> {{ count }}</p>
        <button @click="incrementCount">Increment</button>
      </div>

      <div class="example">
        <p><strong>Message:</strong> {{ message }}</p>
        <input v-model="message" placeholder="Type here...">
      </div>

      <div class="example">
        <p><strong>isActive:</strong> {{ isActive }}</p>
        <button @click="isActive = !isActive">Toggle</button>
      </div>

      <div class="example">
        <h3>ref() with Object:</h3>
        <p>Name: {{ userRef.name }}</p>
        <p>Age: {{ userRef.age }}</p>
        <button @click="updateRefUser">Update User</button>
      </div>
    </section>

    <!-- REACTIVE EXAMPLES -->
    <section class="section reactive-section">
      <h2>🟢 reactive() - Objects & Arrays</h2>
      
      <div class="example">
        <h3>User Object:</h3>
        <p>Name: {{ userReactive.name }}</p>
        <p>Age: {{ userReactive.age }}</p>
        <p>Hobbies: {{ userReactive.hobbies.join(', ') }}</p>
        <button @click="updateReactiveUser">Update User</button>
        <button @click="addHobby">Add Hobby</button>
      </div>

      <div class="example">
        <h3>Shopping Cart Array:</h3>
        <ul>
          <li v-for="item in shoppingCart" :key="item.id">
            {{ item.name }} x {{ item.qty }}
          </li>
        </ul>
        <button @click="addToCart">Add Orange</button>
      </div>
    </section>

    <!-- TOREFS EXAMPLE -->
    <section class="section torefs-section">
      <h2>🟡 toRefs() - Safe Destructuring</h2>
      <p>First Name: {{ firstName }}</p>
      <p>Last Name: {{ lastName }}</p>
      <input v-model="firstName" placeholder="First Name">
      <input v-model="lastName" placeholder="Last Name">
    </section>

    <!-- COMPARISON TABLE -->
    <section class="section">
      <h2>📊 Quick Comparison</h2>
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>ref()</th>
            <th>reactive()</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Data Types</td>
            <td>Any (primitives, objects)</td>
            <td>Objects & Arrays only</td>
          </tr>
          <tr>
            <td>Access in Script</td>
            <td>.value required</td>
            <td>Direct access</td>
          </tr>
          <tr>
            <td>Access in Template</td>
            <td>Auto-unwrapped</td>
            <td>Direct access</td>
          </tr>
          <tr>
            <td>Reassignment</td>
            <td>✅ Can reassign .value</td>
            <td>❌ Cannot reassign whole object</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<style scoped>
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
  color: #232324;
}
.section {
  padding: 1.5rem;
  margin: 1.5rem 0;
  border-radius: 12px;
}
.ref-section { background: #e3f2fd; border-left: 5px solid #2196f3; }
.reactive-section { background: #e8f5e9; border-left: 5px solid #4caf50; }
.torefs-section { background: #fff8e1; border-left: 5px solid #ffc107; }
.example {
  background: white;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 8px;
}
button {
  background: #42b883;
  color: rgb(255, 255, 255);
  border: none;
  padding: 0.5rem 1rem;
  margin: 0.25rem;
  border-radius: 4px;
  cursor: pointer;
}
input {
  padding: 0.5rem;
  margin: 0.25rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}
table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}
th, td {
  padding: 0.75rem;
  border: 1px solid #ddd;
  text-align: left;
}
th { background: #f5f5f5; }
</style>