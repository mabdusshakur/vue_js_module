<script setup>
/**
 * Vue 3 Watch() Demonstration Component
 * 
 * This component demonstrates how to use Vue's watch() function
 * to monitor changes in reactive data.
 */

// Import necessary Vue functions
import { ref, watch } from 'vue';

// ========================================
// REACTIVE STATE VARIABLES
// ========================================
// ref() creates reactive variables that Vue tracks for changes

// Counter starting at 5 - will decrease when button is clicked
const count = ref(5);

// Boolean flag to track authentication status - starts as true
const isAuth = ref(true);

// Text message that will be displayed and watched for changes
const message = ref('Hello Vue 3!');

// ========================================
// FUNCTIONS
// ========================================

/**
 * increment() - Updates all reactive variables when button is clicked
 * Note: Despite the name, it actually decrements the count
 */
const increment = () => {
  count.value--;                          // Decrease count by 1
  isAuth.value = !isAuth.value;           // Toggle authentication (true ↔ false)
  message.value = "Hello vue next 4!";    // Change the message text
};

// ========================================
// WATCHERS
// ========================================

/**
 * watch() - Monitors the 'message' variable for changes
 * Whenever 'message' changes, this function runs automatically
 * 
 * @param {string} newValue - The new value of message
 * @param {string} oldValue - The previous value of message
 */
watch(message, (newValue, oldValue) => {
  console.log(`Count changed from ${oldValue} to ${newValue}`);
});

</script>

<template>
  <!-- 
    TEMPLATE SECTION
    This defines what will be displayed on the page
  -->
  <div class="container">
    <!-- Main heading -->
    <h1>Watch()</h1>
    
    <!-- Display the current count value -->
    <p>Count: {{ count }}</p>
    
    <!-- Display whether user is authenticated (true/false) -->
    <p>Is Auth: {{ isAuth }}</p>
    
    <!-- Display the current message - this is being watched! -->
    <p>Message: {{ message }}</p>
    
    <!-- 
      Button that triggers the increment function when clicked
      @click is a Vue directive that listens for click events
    -->
    <button class="btn" @click="increment">Increment</button>
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