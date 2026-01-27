<script setup>
import { ref } from 'vue'
import CardOne from './components/CardOne.vue'

const count = ref(0)

const increment = () => {
  count.value++
}

const decrement = () => {
  count.value--
}

const handleAdd = (event) => {
  count.value += event
}
</script>

<template>
  <div>
    <!-- Counter -->
    <div class="counter">
      <button @click="decrement" class="btn">−</button>
      <span class="count">{{ count }}</span>
      <button @click="increment" class="btn">+</button>
    </div>

    <!-- Child component that emits events -->
    <CardOne @increment="increment" @decrement="decrement" @add="count += $event" />
  </div>
</template>

<style scoped>
.counter { display: flex; align-items: center; gap: 0.5rem; }
.count { font-size: 2rem; font-weight: bold; min-width: 60px; text-align: center; }
.btn { width: 40px; height: 40px; border: none; border-radius: 50%; background: #42b883; color: white; font-size: 1.25rem; cursor: pointer; }
.btn-reset { width: auto; border-radius: 8px; padding: 0 1rem; font-size: 0.875rem; }
</style>