<script setup>
import { ref } from 'vue';

  const name = ref('Nobita');
</script>

<template>
  <div>
    <div>
      <RouterLink :to="{name : 'home'}">Home</RouterLink>
    </div>

    <div>
      <RouterLink :to="{name : 'about', params: { name: name }}">About</RouterLink>
    </div>

    <div>
      <input type="text" v-model="name">
    </div>

    <router-view />
  </div>
</template>

<style scoped>
.counter {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.count {
  font-size: 2rem;
  font-weight: bold;
  min-width: 60px;
  text-align: center;
}

.btn {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: #42b883;
  color: white;
  font-size: 1.25rem;
  cursor: pointer;
}

.btn-reset {
  width: auto;
  border-radius: 8px;
  padding: 0 1rem;
  font-size: 0.875rem;
}
</style>