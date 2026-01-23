<script setup>
import { ref } from 'vue';

const count = ref(0);

function increment() {
  count.value++;
}

const decrement = () => {
  count.value--;
};

const addAmount = (amount) => {
  count.value += amount;
}

const acceptEvent = (arg, event) => {
  console.log('Argument accepted:', arg);
  console.log('Event accepted:', event);
}

const handleMouseEnter = (event) => {
  console.log("Mouse entered");
}

const handleMouseLeave = (event) => {
  console.log("Mouse left");
}

const isActive = ref(true);
</script>

<template>
  <div class="app-container">
    <button v-on:click="increment">+</button>
    <h1 v-if="isActive">Counter: {{ count }}</h1>
    <button @click="decrement">-</button>

    <button @click="count = 0">Reset</button>
    <button @click="count = 100">Count to 100</button>
    <button @click="isActive = !isActive">
      {{ isActive ? 'Deactivate' : 'Activate' }}
    </button>
    <button @click="addAmount(10)">Add 10</button>
    <button @click="addAmount(100)">Add 100</button>
    <button @click="addAmount(1000)">Add 1000</button>

    <!-- Event passing -->
    <button @click="acceptEvent('Button clicked', $event)">Accept Event</button>

    <div v-on:mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave"
      style="margin-top: 20px; padding: 10px; border: 1px solid #ccc;">
      Hover over me
    </div>-
  </div>
</template>

<style scoped>
.app-container {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>