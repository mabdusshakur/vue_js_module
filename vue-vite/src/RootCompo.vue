<script setup>
import { ref } from 'vue'

// Authentication state
const isLoggedIn = ref(false)
const user = ref({ name: 'John Doe', role: 'user' })

// Rating example
const rating = ref(3)

// Status example
const orderStatus = ref('processing')
const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']

// Toggle login
const toggleLogin = () => {
  isLoggedIn.value = !isLoggedIn.value
}

// Change role
const toggleRole = () => {
  user.value.role = user.value.role === 'admin' ? 'user' : 'admin'
}
</script>

<template>
  <div class="container">
    <h1>Conditional Rendering: v-if, v-else-if, v-else</h1>

    <!-- Basic v-if / v-else -->
    <section class="section">
      <h2>1️⃣ Basic v-if / v-else</h2>
      
      <div class="demo-box">
        <!-- Conditional rendering based on login state -->
        <div v-if="isLoggedIn" class="logged-in">
          <p>👋 Welcome back, {{ user.name }}!</p>
          <button @click="toggleLogin" class="btn btn-danger">Logout</button>
        </div>
        
        <div v-else class="logged-out">
          <p>🔒 Please log in to continue</p>
          <button @click="toggleLogin" class="btn btn-primary">Login</button>
        </div>

        <pre>
&lt;div v-if="isLoggedIn"&gt;Welcome!&lt;/div&gt;
&lt;div v-else&gt;Please login&lt;/div&gt;
        </pre>
      </div>
    </section>

    <!-- v-else-if chain -->
    <section class="section">
      <h2>2️⃣ v-else-if Chain</h2>
      
      <div class="demo-box">
        <div class="rating-demo">
          <input type="range" v-model.number="rating" min="1" max="5" />
          <span class="rating-value">Rating: {{ rating }}</span>
        </div>

        <div class="rating-message">
          <p v-if="rating === 5" class="excellent">⭐ Excellent! Perfect score!</p>
          <p v-else-if="rating === 4" class="good">👍 Good! Almost perfect!</p>
          <p v-else-if="rating === 3" class="average">😐 Average. Room for improvement.</p>
          <p v-else-if="rating === 2" class="poor">😕 Poor. Needs work.</p>
          <p v-else class="terrible">😞 Terrible. Major issues.</p>
        </div>

        <pre>
&lt;p v-if="rating === 5"&gt;Excellent!&lt;/p&gt;
&lt;p v-else-if="rating === 4"&gt;Good!&lt;/p&gt;
&lt;p v-else-if="rating === 3"&gt;Average&lt;/p&gt;
&lt;p v-else&gt;Poor&lt;/p&gt;
        </pre>
      </div>
    </section>

    <!-- Order Status Example -->
    <section class="section">
      <h2>3️⃣ Order Status Example</h2>
      
      <div class="demo-box">
        <div class="status-selector">
          <label>Order Status:</label>
          <select v-model="orderStatus">
            <option v-for="status in statuses" :key="status" :value="status">
              {{ status }}
            </option>
          </select>
        </div>

        <div class="status-display">
          <div v-if="orderStatus === 'pending'" class="status pending">
            ⏳ Order Pending - Waiting for confirmation
          </div>
          <div v-else-if="orderStatus === 'processing'" class="status processing">
            ⚙️ Processing - Preparing your order
          </div>
          <div v-else-if="orderStatus === 'shipped'" class="status shipped">
            🚚 Shipped - On the way!
          </div>
          <div v-else-if="orderStatus === 'delivered'" class="status delivered">
            ✅ Delivered - Enjoy your purchase!
          </div>
          <div v-else-if="orderStatus === 'cancelled'" class="status cancelled">
            ❌ Cancelled - Order was cancelled
          </div>
        </div>
      </div>
    </section>

    <!-- Role-based content -->
    <section class="section">
      <h2>4️⃣ Role-Based Content</h2>
      
      <div class="demo-box">
        <p>Current Role: <strong>{{ user.role }}</strong></p>
        <button @click="toggleRole" class="btn">Toggle Role</button>

        <div class="role-content">
          <template v-if="user.role === 'admin'">
            <div class="admin-panel">
              <h3>🔧 Admin Panel</h3>
              <button class="btn btn-danger">Delete All Users</button>
              <button class="btn btn-warning">Reset Database</button>
              <button class="btn">View Analytics</button>
            </div>
          </template>
          
          <template v-else>
            <div class="user-panel">
              <h3>👤 User Dashboard</h3>
              <p>You have limited access.</p>
              <button class="btn">View Profile</button>
            </div>
          </template>
        </div>

        <pre>
&lt;template v-if="user.role === 'admin'"&gt;
  &lt;!-- Multiple elements without wrapper div --&gt;
&lt;/template&gt;
        </pre>
      </div>
    </section>
  </div>
</template>

<style scoped>
.container { max-width: 900px; margin: 0 auto; padding: 2rem; font-family: 'Segoe UI', sans-serif; }
.section { background: #f8f9fa; padding: 1.5rem; margin: 1.5rem 0; border-radius: 12px; }
.demo-box { background: white; padding: 1.5rem; border-radius: 8px; margin-top: 1rem; }
.btn { padding: 0.5rem 1rem; border: none; border-radius: 6px; cursor: pointer; margin: 0.25rem; background: #42b883; color: white; }
.btn-primary { background: #3498db; }
.btn-danger { background: #e74c3c; }
.btn-warning { background: #f39c12; color: #333; }
.logged-in { background: #d4edda; padding: 1rem; border-radius: 8px; }
.logged-out { background: #f8d7da; padding: 1rem; border-radius: 8px; }
.rating-demo { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
.rating-value { font-size: 1.25rem; font-weight: bold; }
.rating-message p { padding: 1rem; border-radius: 8px; font-size: 1.25rem; margin: 0; }
.excellent { background: #27ae60; color: white; }
.good { background: #2ecc71; color: white; }
.average { background: #f39c12; color: white; }
.poor { background: #e67e22; color: white; }
.terrible { background: #e74c3c; color: white; }
.status-selector { margin-bottom: 1rem; }
.status-selector select { padding: 0.5rem; font-size: 1rem; }
.status { padding: 1rem; border-radius: 8px; font-weight: bold; }
.pending { background: #ffeaa7; }
.processing { background: #74b9ff; }
.shipped { background: #81ecec; }
.delivered { background: #55a3ff; color: white; }
.cancelled { background: #fab1a0; }
.admin-panel, .user-panel { padding: 1rem; margin-top: 1rem; border-radius: 8px; }
.admin-panel { background: #ffe6e6; border: 2px solid #e74c3c; }
.user-panel { background: #e6f3ff; border: 2px solid #3498db; }
pre { background: #263238; color: #80cbc4; padding: 1rem; border-radius: 6px; margin-top: 1rem; overflow-x: auto; font-size: 0.875rem; }
</style>