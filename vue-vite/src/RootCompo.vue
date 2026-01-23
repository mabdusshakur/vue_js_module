<script setup>
import { ref } from 'vue';
// one way data binding
// class, style, src
// v-bind, :

const imgUrl = ref('https://vuejs.org/images/logo.png');
const link = 'https://vuejs.org';
const imgClass = "example";
const message = ref("Data Binding Complete Guide");
const isDisabled = ref(false);
const isEdit = ref(false);

const selection = ref('option2');

// two way data binding
// v-model
// input - sync
</script>

<template>
  <div class="container">
    <h1>{{ message }}</h1>

    <img :src="imgUrl" alt="Vue Logo" width="120" :class="imgClass" class="info" />
    <!-- <a :href="link">Visit : {{ link }}</a> -->
    <!-- <input type="text" v-model="imgUrl" /> -->
     <!-- <button :disabled="isDisabled" @click="isDisabled = true">Disabled</button> -->
      <!-- Create Button -->
      <!-- Update Button -->
       <!-- <button :disabled="isDisabled" @click="isEdit = !isEdit">{{ isEdit ? 'Update' : 'Create' }}</button> -->

       <select v-model="selection">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
       </select>
       <p>Selected : {{ selection }}</p>
  </div>
</template>

<style scoped>
.container { max-width: 900px; margin: 0 auto; padding: 2rem; font-family: 'Segoe UI', sans-serif; }
.section { padding: 1.5rem; margin: 1.5rem 0; border-radius: 12px; background: #f8f9fa; }
.example { background: white; padding: 1rem; margin: 1rem 0; border-radius: 8px; border-left: 4px solid #42b883; }
.info { background: #e3f2fd; padding: 0.5rem 1rem; border-radius: 4px; margin-bottom: 1rem; }
input, textarea, select { padding: 0.5rem; margin: 0.5rem 0; border: 1px solid #ddd; border-radius: 4px; }
button { background: #42b883; color: white; border: none; padding: 0.5rem 1rem; margin: 0.25rem; border-radius: 4px; cursor: pointer; }
button:disabled { background: #ccc; cursor: not-allowed; }
label { display: block; margin: 0.25rem 0; }
pre { background: #f5f5f5; padding: 0.5rem; border-radius: 4px; }
</style>
