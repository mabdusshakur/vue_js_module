<script setup>
const title = 'Card One'
</script>

<template>
    <div class="card">
        <h2>{{ title }}</h2>
        <p>This card has a GREEN title</p>
    </div>
</template>

<style scoped>

p {
    color: lightgreen;
}


/* This .title ONLY affects THIS component */
.title {
    color: #42b883;
    font-size: 1.5rem;
}

.card {
    border: 2px solid #42b883;
    padding: 1rem;
    border-radius: 8px;
    margin: 1rem;
}
</style>