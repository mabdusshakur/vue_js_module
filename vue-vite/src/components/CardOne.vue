<script setup>
import { ref } from 'vue'
const title = 'Card One - Emit Example'

const amount = ref(200);

const emit = defineEmits(['increment', 'decrement', 'add'])

const handleEmitIncrement = () => {
  emit('increment')
}

const handleEmitDecrement = () => {
  emit('decrement')
}

const addValue = () => {
  emit('add', amount.value)
}

</script>

<template>
    <div class="card">
        <h2>{{ title }}</h2>
        <p>This card emits events to parent component</p>
        <div class="card-buttons">
          <button @click="handleEmitIncrement" class="emit-btn">Emit Increment</button>
          <button @click="handleEmitDecrement" class="emit-btn">Emit Decrement</button>
          <input type="number"  v-model="amount" />
          <button @click="addValue" class="emit-btn">Emit Add</button>
        </div>
    </div>
</template>

<style scoped>

p {
    color: rgb(27, 61, 27);
}

/* This .title ONLY affects THIS component */
.title {
    color: #0d3523;
    font-size: 1.5rem;
}

.card {
    border: 2px solid #42b883;
    padding: 1rem;
    border-radius: 8px;
    margin: 1rem;
}

.card-buttons {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
}

.emit-btn {
    padding: 0.5rem 1rem;
    background: #42b883;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;
}

.emit-btn:hover {
    background: #3aa876;
}
</style>