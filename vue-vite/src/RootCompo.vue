<script setup>
import { computed, ref } from 'vue';

const containerClass = 'app-container';
const p1 = 'pClassColor';
const p2 = 'pClassSize';

const h1Color = ref('#ff5733');
const h1FontSize = ref('24');

const containerStyle = computed(() => ({
  maxWidth: '1100px',
  margin: '0 auto',
  padding: '2rem',
  fontFamily: "'Segoe UI', sans-serif",
  color: h1Color.value,
}));
</script>

<template>
  <div :style="containerStyle">
    <h1 :style="{ color: h1Color, fontSize: h1FontSize + 'px' }">Class & Style Binding</h1>
    <!-- <p :class="[p1, p2]">Hello, how are you today?</p> -->
    <input type="color" v-model="h1Color" />
    <input type="number" v-model="h1FontSize" /> px
  </div>
</template>

<style scoped>

.pClassColor {
  color: blue;
}
.pClassSize {
  font-size: 40px;
}
</style>