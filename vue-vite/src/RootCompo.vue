<script setup>
import { reactive, toRefs, toRef } from 'vue'

// ❌ PROBLEM: Destructuring loses reactivity
const state = reactive({
  firstName: 'John',
  lastName: 'Doe',
  age: 25
})

// This BREAKS reactivity:
// const { firstName, lastName } = state  // ❌ NOT REACTIVE!

// ✅ SOLUTION 1: Use toRefs() for multiple properties
const { firstName, lastName, age } = toRefs(state)

// ✅ SOLUTION 2: Use toRef() for single property
const singleAge = toRef(state, 'age')

// Functions to update
const updateFirstName = () => {
  firstName.value = 'Jane'  // Now reactive!
}

const incrementAge = () => {
  age.value++  // This works!
  // singleAge.value++ // This also works!
}
</script>

<template>
  <div class="container">
    <h1>toRefs() - Fix Reactivity Loss</h1>

    <section class="section problem">
      <h2>❌ The Problem</h2>
      <pre>
const state = reactive({ firstName: 'John', lastName: 'Doe' })
const { firstName, lastName } = state  // Loses reactivity!
      </pre>
    </section>

    <section class="section solution">
      <h2>✅ The Solution</h2>
      <pre>
const { firstName, lastName } = toRefs(state)  // Keeps reactivity!
firstName.value = 'Jane'  // Works!
      </pre>
    </section>

    <section class="section demo">
      <h2>Live Demo</h2>
      <p>First Name: {{ firstName }}</p>
      <p>Last Name: {{ lastName }}</p>
      <p>Age: {{ age }}</p>
      
      <button @click="updateFirstName">Change to Jane</button>
      <button @click="incrementAge">Increment Age</button>
    </section>
  </div>
</template>

<style scoped>
.container { max-width: 800px; margin: 0 auto; padding: 2rem; font-family: 'Segoe UI', sans-serif; }
.section { padding: 1.5rem; margin: 1rem 0; border-radius: 12px; }
.problem { background: #ffebee; border-left: 5px solid #e74c3c; }
.solution { background: #e8f5e9; border-left: 5px solid #4caf50; }
.demo { background: #e3f2fd; border-left: 5px solid #2196f3; }
pre { background: #263238; color: #80cbc4; padding: 1rem; border-radius: 6px; overflow-x: auto; }
button { padding: 0.5rem 1rem; margin: 0.25rem; border: none; border-radius: 6px; background: #42b883; color: white; cursor: pointer; }
</style>