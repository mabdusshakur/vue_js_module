<script setup>
import { ref } from 'vue'

// ============================================
// UNDERSTANDING v-if vs v-show
// ============================================
// v-if: Conditionally RENDERS the element in DOM (truly adds/removes from DOM)
//       - Element doesn't exist in DOM when false
//       - Higher toggle cost (destroys and recreates element)
//       - Lazy rendering: won't render until condition becomes true
//       - Use when: condition rarely changes, or initial render should be optimized
//
// v-show: Conditionally DISPLAYS the element (always in DOM, just hidden with CSS)
//       - Element always exists in DOM (uses display: none)
//       - Lower toggle cost (just changes CSS)
//       - Always rendered, regardless of initial condition
//       - Use when: toggling frequently, or element is simple
// ============================================

// Example 1: Basic Toggle Demo
const isLoggedIn = ref(true)
const user = ref({ name: 'John Doe', role: 'admin' })

// Example 2: Frequent Toggle (v-show is better here)
const showNotification = ref(true)

// Example 3: Conditional Rendering with v-else
const userType = ref('guest') // 'guest', 'user', 'admin'

// Example 4: Performance Demo - Expensive Component
const showExpensiveComponent = ref(false)
const renderCount = ref(0)

// Example 5: Rating System with v-if, v-else-if, v-else
const rating = ref(3)

</script>

<template>
  <div class="container">
    <h1>🎓 v-show vs v-if - Complete Guide for Beginners</h1>
    
    <!-- ============================================ -->
    <!-- EXAMPLE 1: Basic Comparison -->
    <!-- ============================================ -->
    <div class="section">
      <h2>📌 Example 1: Basic Comparison</h2>
      <p class="explanation">
        👉 <strong>v-if</strong> removes/adds the element from/to the DOM<br>
        👉 <strong>v-show</strong> keeps the element in DOM but toggles CSS display property
      </p>
      
      <div class="demo-box">
        <!-- v-if: Element is completely removed from DOM when false -->
        <p v-if="isLoggedIn" class="logged-in">
          ✅ <strong>v-if:</strong> Welcome {{ user.name }}! (Check DOM - this element is REMOVED when hidden)
        </p>
        
        <!-- v-show: Element stays in DOM with display:none when false -->
        <p v-show="isLoggedIn" class="logged-out" style="margin-top: 1rem;">
          👁️ <strong>v-show:</strong> Welcome {{ user.name }}! (Check DOM - this element is ALWAYS present)
        </p>

        <button class="btn btn-primary" @click="isLoggedIn = !isLoggedIn">
          {{ isLoggedIn ? 'Logout' : 'Login' }} (Toggle and inspect DOM in DevTools!)
        </button>
        
        <div class="info-box">
          💡 <strong>Try this:</strong> Open browser DevTools, toggle the button, and watch the DOM!<br>
          - With v-if: Element appears/disappears from DOM tree<br>
          - With v-show: Element stays in DOM but gets "display: none" style
        </div>
      </div>
    </div>

    <!-- ============================================ -->
    <!-- EXAMPLE 2: Frequent Toggling (v-show wins!) -->
    <!-- ============================================ -->
    <div class="section">
      <h2>📌 Example 2: Frequent Toggling - Use v-show!</h2>
      <p class="explanation">
        When toggling frequently (like notifications, tooltips, dropdowns), use <strong>v-show</strong><br>
        It's more performant because it only changes CSS, not the DOM structure.
      </p>
      
      <div class="demo-box">
        <!-- v-show is perfect for frequently toggled elements -->
        <div v-show="showNotification" class="notification">
          🔔 You have new messages! (Toggled with v-show for better performance)
        </div>
        
        <button class="btn btn-warning" @click="showNotification = !showNotification">
          {{ showNotification ? 'Hide' : 'Show' }} Notification (Click rapidly!)
        </button>
        
        <div class="info-box">
          ⚡ <strong>Performance tip:</strong> v-show is faster for frequent toggles because:<br>
          - No component lifecycle hooks triggered<br>
          - No DOM manipulation (add/remove)<br>
          - Just a simple CSS property change
        </div>
      </div>
    </div>

    <!-- ============================================ -->
    <!-- EXAMPLE 3: v-if with v-else-if and v-else -->
    <!-- ============================================ -->
    <div class="section">
      <h2>📌 Example 3: Conditional Rendering with v-if, v-else-if, v-else</h2>
      <p class="explanation">
        <strong>v-if</strong> can be paired with v-else-if and v-else for multiple conditions.<br>
        <strong>v-show</strong> does NOT support v-else/v-else-if!
      </p>
      
      <div class="demo-box">
        <div class="status-selector">
          <label>Select User Type: </label>
          <button class="btn" @click="userType = 'guest'">Guest</button>
          <button class="btn" @click="userType = 'user'">User</button>
          <button class="btn" @click="userType = 'admin'">Admin</button>
        </div>

        <!-- Only ONE of these will be in the DOM at a time -->
        <div v-if="userType === 'admin'" class="admin-panel">
          🔐 <strong>Admin Panel:</strong> You have full access to all features!
        </div>
        <div v-else-if="userType === 'user'" class="user-panel">
          👤 <strong>User Dashboard:</strong> Welcome! You have standard access.
        </div>
        <div v-else class="guest-panel">
          👋 <strong>Guest Mode:</strong> Please login to access more features.
        </div>

        <div class="info-box">
          🎯 <strong>Use v-if when:</strong><br>
          - You need v-else or v-else-if chains<br>
          - Condition rarely changes<br>
          - You want lazy rendering (don't render until needed)
        </div>
      </div>
    </div>

    <!-- ============================================ -->
    <!-- EXAMPLE 4: Performance - Expensive Components -->
    <!-- ============================================ -->
    <div class="section">
      <h2>📌 Example 4: Expensive Components - When v-if is Better</h2>
      <p class="explanation">
        For components with heavy initialization or rarely shown content, use <strong>v-if</strong><br>
        This avoids rendering cost until actually needed (lazy rendering).
      </p>
      
      <div class="demo-box">
        <button class="btn btn-primary" @click="showExpensiveComponent = !showExpensiveComponent; if(showExpensiveComponent) renderCount++">
          {{ showExpensiveComponent ? 'Hide' : 'Show' }} Heavy Component
        </button>

        <!-- v-if: Component only created when needed -->
        <div v-if="showExpensiveComponent" class="expensive-component">
          💰 <strong>Expensive Component Loaded!</strong><br>
          (Imagine this has complex data, API calls, charts, etc.)<br>
          Render count: {{ renderCount }} (increases each time v-if becomes true)
        </div>

        <div class="info-box">
          💾 <strong>Memory tip:</strong> With v-if, when hidden:<br>
          - Component is destroyed (frees memory)<br>
          - Event listeners removed<br>
          - Child components unmounted<br><br>
          With v-show, everything stays in memory even when hidden!
        </div>
      </div>
    </div>

    <!-- ============================================ -->
    <!-- EXAMPLE 5: Multiple Conditions with v-if chains -->
    <!-- ============================================ -->
    <div class="section">
      <h2>📌 Example 5: Rating System (v-if Chain Demo)</h2>
      <p class="explanation">
        Complex conditional logic is perfect for v-if chains.
      </p>
      
      <div class="demo-box">
        <div class="rating-demo">
          <label>Rating: {{ rating }}/5</label>
          <input type="range" min="1" max="5" v-model.number="rating" style="width: 200px;">
        </div>

        <!-- Only the matching condition will be rendered in DOM -->
        <div class="rating-message">
          <p v-if="rating === 5" class="excellent">⭐⭐⭐⭐⭐ Excellent!</p>
          <p v-else-if="rating === 4" class="good">⭐⭐⭐⭐ Very Good!</p>
          <p v-else-if="rating === 3" class="average">⭐⭐⭐ Average</p>
          <p v-else-if="rating === 2" class="poor">⭐⭐ Poor</p>
          <p v-else class="terrible">⭐ Terrible!</p>
        </div>
      </div>
    </div>

    <!-- ============================================ -->
    <!-- QUICK REFERENCE GUIDE -->
    <!-- ============================================ -->
    <div class="section reference-guide">
      <h2>📚 Quick Reference Guide</h2>
      
      <div class="reference-grid">
        <div class="ref-card">
          <h3>✅ Use v-if when:</h3>
          <ul>
            <li>Condition rarely changes</li>
            <li>You need v-else/v-else-if</li>
            <li>Initial render should skip the element</li>
            <li>Component is expensive to render</li>
            <li>You want to free memory when hidden</li>
          </ul>
        </div>
        
        <div class="ref-card">
          <h3>✅ Use v-show when:</h3>
          <ul>
            <li>Toggling very frequently</li>
            <li>Element is simple/lightweight</li>
            <li>Initial state doesn't matter</li>
            <li>You need fast toggle performance</li>
            <li>Element will likely be shown soon</li>
          </ul>
        </div>
      </div>

      <div class="comparison-table">
        <h3>⚖️ Side-by-Side Comparison</h3>
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>v-if</th>
              <th>v-show</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>DOM Rendering</td>
              <td>Adds/removes from DOM</td>
              <td>Always in DOM</td>
            </tr>
            <tr>
              <td>Toggle Cost</td>
              <td>Higher (re-render)</td>
              <td>Lower (CSS only)</td>
            </tr>
            <tr>
              <td>Initial Cost</td>
              <td>Lower (lazy)</td>
              <td>Higher (always renders)</td>
            </tr>
            <tr>
              <td>v-else support</td>
              <td>✅ Yes</td>
              <td>❌ No</td>
            </tr>
            <tr>
              <td>Component lifecycle</td>
              <td>Full mount/unmount</td>
              <td>No lifecycle hooks</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Main Container */
.container { 
  max-width: 1000px; 
  margin: 0 auto; 
  padding: 2rem; 
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

h1 { 
  color: white; 
  text-align: center; 
  margin-bottom: 2rem;
  font-size: 2.5rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
}

/* Section Styling */
.section { 
  background: white; 
  padding: 1.5rem; 
  margin: 1.5rem 0; 
  border-radius: 12px; 
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.section h2 {
  color: #2c3e50;
  border-bottom: 3px solid #42b883;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

.explanation {
  background: #e8f4f8;
  padding: 1rem;
  border-left: 4px solid #3498db;
  margin: 1rem 0;
  line-height: 1.6;
}

/* Demo Box */
.demo-box { 
  background: #f8f9fa; 
  padding: 1.5rem; 
  border-radius: 8px; 
  margin-top: 1rem; 
  border: 2px solid #e9ecef;
}

/* Buttons */
.btn { 
  padding: 0.75rem 1.5rem; 
  border: none; 
  border-radius: 6px; 
  cursor: pointer; 
  margin: 0.25rem; 
  background: #42b883; 
  color: white;
  font-weight: bold;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.btn:hover { 
  transform: translateY(-2px); 
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.btn-primary { background: #3498db; }
.btn-primary:hover { background: #2980b9; }
.btn-warning { background: #f39c12; color: #333; }
.btn-warning:hover { background: #e67e22; }

/* Status Panels */
.logged-in { 
  background: #d4edda; 
  padding: 1.5rem; 
  border-radius: 8px;
  border-left: 4px solid #28a745;
  font-size: 1.1rem;
}

.logged-out { 
  background: #fff3cd; 
  padding: 1.5rem; 
  border-radius: 8px;
  border-left: 4px solid #ffc107;
  font-size: 1.1rem;
}

.notification {
  background: #fff3cd;
  border: 2px solid #ffc107;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Info Box */
.info-box {
  background: #e7f3ff;
  border-left: 4px solid #2196F3;
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 4px;
  line-height: 1.6;
}

/* User Type Panels */
.admin-panel, .user-panel, .guest-panel { 
  padding: 1.5rem; 
  margin-top: 1rem; 
  border-radius: 8px;
  font-size: 1.1rem;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.admin-panel { 
  background: #ffe6e6; 
  border: 3px solid #e74c3c;
}

.user-panel { 
  background: #e6f3ff; 
  border: 3px solid #3498db;
}

.guest-panel {
  background: #f0f0f0;
  border: 3px solid #95a5a6;
}

/* Status Selector */
.status-selector { 
  margin-bottom: 1rem;
}

.status-selector label {
  font-weight: bold;
  margin-right: 1rem;
}

/* Expensive Component */
.expensive-component {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 8px;
  margin-top: 1rem;
  font-size: 1.1rem;
  animation: slideIn 0.3s ease;
}

/* Rating Demo */
.rating-demo { 
  display: flex; 
  align-items: center; 
  gap: 1rem; 
  margin-bottom: 1rem;
  background: white;
  padding: 1rem;
  border-radius: 8px;
}

.rating-demo label {
  font-weight: bold;
  font-size: 1.1rem;
}

.rating-message p { 
  padding: 1.5rem; 
  border-radius: 8px; 
  font-size: 1.5rem; 
  margin: 0;
  text-align: center;
  font-weight: bold;
  animation: fadeIn 0.3s ease;
}

.excellent { background: #27ae60; color: white; }
.good { background: #2ecc71; color: white; }
.average { background: #f39c12; color: white; }
.poor { background: #e67e22; color: white; }
.terrible { background: #e74c3c; color: white; }

/* Reference Guide */
.reference-guide {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.reference-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-top: 1rem;
}

.ref-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.ref-card h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.ref-card ul {
  list-style: none;
  padding: 0;
}

.ref-card li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
  line-height: 1.6;
}

.ref-card li:before {
  content: "✓ ";
  color: #42b883;
  font-weight: bold;
  margin-right: 0.5rem;
}

/* Comparison Table */
.comparison-table {
  margin-top: 2rem;
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
}

.comparison-table h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th, td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background: #42b883;
  color: white;
  font-weight: bold;
}

tr:hover {
  background: #f8f9fa;
}

td:first-child {
  font-weight: bold;
  color: #2c3e50;
}

/* Responsive Design */
@media (max-width: 768px) {
  .reference-grid {
    grid-template-columns: 1fr;
  }
  
  h1 {
    font-size: 1.8rem;
  }
  
  .container {
    padding: 1rem;
  }
}
</style>