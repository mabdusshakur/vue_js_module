<script setup>
import CardOne from './components/CardOne.vue'
</script>

<template>
  <div class="container">

    <h2>Scoped Styles Demo</h2>
    <p>Both cards use .title class but have different colors!</p>

    <CardOne />

  </div>
</template>

<style>
/* this affects its children */
h2 {
    color : rgb(255, 0, 0);
}

p {
    color : yellow;
}
</style>