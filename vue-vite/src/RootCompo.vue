<script setup>
import { ref, onMounted, onUpdated, onUnmounted, onBeforeMount, onBeforeUpdate, onBeforeUnmount } from 'vue'

const count = ref(0)
const data = ref(null)
const isLoading = ref(true)
const lifecycleLogs = ref([])
const showChild = ref(true)

const log = (hook, message) => {
  const timestamp = new Date().toLocaleTimeString()
  lifecycleLogs.value.push({ hook, message, timestamp })
}

// Before Mount
onBeforeMount(() => {
  log('onBeforeMount', 'Component is about to mount. DOM not yet available.')
})

// Mounted - DOM is ready
onMounted(async () => {
  log('onMounted', 'Component mounted! DOM is now available.')
  
  // Perfect place for:
  // 1. API calls
  isLoading.value = true
  await new Promise(r => setTimeout(r, 1000))
  data.value = { users: 42, posts: 156, comments: 892 }
  isLoading.value = false
  log('onMounted', 'Data fetched from API!')
  
  // 2. DOM manipulation
  const element = document.getElementById('focus-me')
  if (element) element.focus()
  
  // 3. Set up timers/subscriptions
  // (We'll clean these up in onUnmounted)
})

// Before Update
onBeforeUpdate(() => {
  log('onBeforeUpdate', `About to update. Count is still: ${count.value}`)
})

// Updated
onUpdated(() => {
  log('onUpdated', `DOM updated! Count is now: ${count.value}`)
})

// Before Unmount
onBeforeUnmount(() => {
  log('onBeforeUnmount', 'Component is about to be destroyed.')
})

// Unmounted - Cleanup!
onUnmounted(() => {
  log('onUnmounted', 'Component destroyed. Cleaning up resources.')
})

// Timer example for cleanup demonstration
const timerValue = ref(0)
let timerInterval = null

const startTimer = () => {
  if (timerInterval) return
  timerInterval = setInterval(() => {
    timerValue.value++
  }, 1000)
}

const stopTimer = () => {
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
}

// Clean up timer when component unmounts
onUnmounted(() => {
  stopTimer()
  console.log('Timer cleaned up!')
})
</script>

<template>
  <div class="container">
    <h1>Vue Lifecycle Hooks</h1>

    <!-- Lifecycle Diagram -->
    <section class="section diagram">
      <h2>📊 Lifecycle Flow</h2>
      <div class="lifecycle-flow">
        <div class="flow-item setup">setup()</div>
        <div class="flow-arrow">↓</div>
        <div class="flow-item before-mount">onBeforeMount</div>
        <div class="flow-arrow">↓</div>
        <div class="flow-item mounted">onMounted ⭐</div>
        <div class="flow-arrow">↓</div>
        <div class="flow-box update-cycle">
          <span>Update Cycle (when data changes)</span>
          <div class="flow-item before-update">onBeforeUpdate</div>
          <div class="flow-arrow">↓</div>
          <div class="flow-item updated">onUpdated</div>
        </div>
        <div class="flow-arrow">↓</div>
        <div class="flow-item before-unmount">onBeforeUnmount</div>
        <div class="flow-arrow">↓</div>
        <div class="flow-item unmounted">onUnmounted ⭐</div>
      </div>
    </section>

    <!-- onMounted Demo -->
    <section class="section">
      <h2>1️⃣ onMounted - Fetch Data & DOM Access</h2>
      
      <div class="demo-box">
        <div v-if="isLoading" class="loading">
          ⏳ Loading data...
        </div>
        <div v-else class="stats-grid">
          <div class="stat-card">
            <span class="stat-value">{{ data.users }}</span>
            <span class="stat-label">Users</span>
          </div>
          <div class="stat-card">
            <span class="stat-value">{{ data.posts }}</span>
            <span class="stat-label">Posts</span>
          </div>
          <div class="stat-card">
            <span class="stat-value">{{ data.comments }}</span>
            <span class="stat-label">Comments</span>
          </div>
        </div>

        <div class="focus-demo">
          <label>This input gets focused onMounted:</label>
          <input id="focus-me" placeholder="I was auto-focused!">
        </div>
      </div>

      <pre>
onMounted(async () => {
  // API call
  const response = await fetch('/api/data')
  data.value = await response.json()
  
  // DOM access
  document.getElementById('my-input').focus()
})
      </pre>
    </section>

    <!-- onUpdated Demo -->
    <section class="section">
      <h2>2️⃣ onUpdated - React to DOM Changes</h2>
      
      <div class="demo-box">
        <div class="counter-demo">
          <button @click="count--" class="btn">−</button>
          <span class="count">{{ count }}</span>
          <button @click="count++" class="btn">+</button>
        </div>
        <p class="note">Watch the lifecycle log when clicking!</p>
      </div>

      <pre>
onBeforeUpdate(() => {
  console.log('About to update...')
})

onUpdated(() => {
  console.log('DOM has been updated!')
})
      </pre>
    </section>

    <!-- onUnmounted Demo -->
    <section class="section">
      <h2>3️⃣ onUnmounted - Cleanup Resources</h2>
      
      <div class="demo-box">
        <div class="timer-demo">
          <p class="timer-display">Timer: {{ timerValue }}s</p>
          <button @click="startTimer" class="btn btn-success">Start Timer</button>
          <button @click="stopTimer" class="btn btn-danger">Stop Timer</button>
        </div>

        <div class="cleanup-warning">
          ⚠️ Without cleanup in onUnmounted, this timer would keep running forever!
        </div>
      </div>

      <pre>
let interval = null

onMounted(() => {
  interval = setInterval(() => { ... }, 1000)
})

onUnmounted(() => {
  // CRITICAL: Clean up!
  clearInterval(interval)
  // Also clean up: WebSocket, event listeners, subscriptions
})
      </pre>
    </section>

    <!-- Lifecycle Log -->
    <section class="section">
      <h2>📋 Lifecycle Log</h2>
      
      <div class="log-container">
        <div 
          v-for="(log, i) in lifecycleLogs" 
          :key="i" 
          class="log-item"
          :class="log.hook.toLowerCase().replace('on', '')"
        >
          <span class="log-time">{{ log.timestamp }}</span>
          <span class="log-hook">{{ log.hook }}</span>
          <span class="log-message">{{ log.message }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.container { max-width: 900px; margin: 0 auto; padding: 2rem; font-family: 'Segoe UI', sans-serif; }
.section { background: #f8f9fa; padding: 1.5rem; margin: 1.5rem 0; border-radius: 12px; }
.demo-box { background: white; padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem; }

/* Lifecycle Flow */
.lifecycle-flow { display: flex; flex-direction: column; align-items: center; gap: 0.25rem; }
.flow-item { padding: 0.75rem 1.5rem; border-radius: 8px; font-weight: 600; min-width: 180px; text-align: center; }
.flow-arrow { color: #999; font-size: 1.5rem; }
.setup { background: #e3f2fd; color: #1565c0; }
.before-mount, .before-update, .before-unmount { background: #fff3e0; color: #e65100; }
.mounted { background: #e8f5e9; color: #2e7d32; border: 2px solid #4caf50; }
.updated { background: #e8f5e9; color: #2e7d32; }
.unmounted { background: #ffebee; color: #c62828; border: 2px solid #f44336; }
.flow-box { border: 2px dashed #ddd; padding: 1rem; border-radius: 12px; margin: 0.5rem 0; }
.flow-box span { font-size: 0.875rem; color: #666; }

/* Stats */
.loading { text-align: center; padding: 2rem; color: #f39c12; }
.stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1rem; }
.stat-card { background: #42b883; color: white; padding: 1rem; border-radius: 8px; text-align: center; }
.stat-value { display: block; font-size: 2rem; font-weight: bold; }
.stat-label { font-size: 0.875rem; opacity: 0.9; }

/* Focus Demo */
.focus-demo { margin-top: 1rem; }
.focus-demo label { display: block; margin-bottom: 0.5rem; }
.focus-demo input { padding: 0.75rem; width: 100%; border: 2px solid #42b883; border-radius: 6px; }

/* Counter */
.counter-demo { display: flex; align-items: center; justify-content: center; gap: 1rem; }
.count { font-size: 2.5rem; font-weight: bold; min-width: 80px; text-align: center; }
.btn { padding: 0.5rem 1rem; border: none; border-radius: 6px; cursor: pointer; font-size: 1.25rem; background: #42b883; color: white; }
.btn-success { background: #27ae60; }
.btn-danger { background: #e74c3c; }

/* Timer */
.timer-demo { text-align: center; }
.timer-display { font-size: 2rem; font-weight: bold; color: #42b883; }
.cleanup-warning { background: #fff3cd; padding: 1rem; border-radius: 8px; margin-top: 1rem; }

/* Log */
.log-container { max-height: 300px; overflow-y: auto; background: #1a1a2e; border-radius: 8px; padding: 1rem; }
.log-item { display: flex; gap: 1rem; padding: 0.5rem; border-bottom: 1px solid #333; font-family: monospace; font-size: 0.875rem; }
.log-time { color: #888; min-width: 80px; }
.log-hook { min-width: 140px; padding: 0.125rem 0.5rem; border-radius: 4px; font-weight: bold; }
.log-item.beforemount .log-hook { background: #fff3e0; color: #e65100; }
.log-item.mounted .log-hook { background: #e8f5e9; color: #2e7d32; }
.log-item.beforeupdate .log-hook { background: #fff3e0; color: #e65100; }
.log-item.updated .log-hook { background: #e8f5e9; color: #2e7d32; }
.log-message { color: #eee; flex: 1; }

pre { background: #263238; color: #80cbc4; padding: 1rem; border-radius: 6px; margin-top: 1rem; overflow-x: auto; font-size: 0.875rem; }
.note { color: #666; font-style: italic; margin-top: 0.5rem; }
</style>