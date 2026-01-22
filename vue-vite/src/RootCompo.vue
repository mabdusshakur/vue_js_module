<script setup>
// Import the `ref` function from Vue to create reactive references
import { ref } from 'vue';

// `greeting` is a reactive string. Use `.value` to read/write in script.
const greeting = ref("Hello, Vue 3 with Vite!");

// Example of HTML stored in a string (used to demonstrate `v-html` later).
const htmlGreeting = "<strong>Hello, Vue 3 with Vite!</strong>";

// This string contains malicious HTML for demonstration (do NOT render this in production).
const dangerousHtml = "<img src=\"x\" onerror=\"alert('XSS Attack!')\" />";

// `counter` is a reactive number that we will increment from the template.
const counter = ref(0);

// Plain numbers used for demonstrating expression interpolation in the template.
const num1 = 5;
const num2 = 10;

// `updateAll` is a function that updates reactive values when called from the template.
const updateAll = () => {
  // Update the greeting text (reactive update will re-render where used).
  greeting.value = "Hello, Vue 3 with Vite! (Updated)";
  // Increment the numerical counter by one.
  counter.value += 1;
};

</script>

<template>
  <div class="demo-container">
    <h1>Interpolation Methods Demo</h1>

    <!-- METHOD 1: Text interpolation using mustache syntax -->
    <section class="demo-section">
      <h2>1. Text Interpolation</h2>
      <!-- `{{ greeting }}` inserts the value of the `greeting` ref into the DOM as text. -->
      <p>{{ greeting }}</p>
      <!-- `{{ counter }}` shows the reactive `counter` value. -->
      <p>{{ counter }}</p>
      <!-- You can use JS expressions inside moustaches: this adds two numbers. -->
      <p>{{ num1 + num2 }}</p>
    </section>

    <!-- METHOD 2: `v-text` directive sets element textContent (similar to moustaches). -->
    <section class="demo-section">
      <h2>2. v-text directive</h2>
      <!-- This will set the <p> text to the `greeting` value. -->
      <p v-text="greeting"></p>
    </section>

    <!-- METHOD 3: `v-html` directive — injects raw HTML into the element. -->
    <section class="demo-section">
      <h2>3. v-html directive</h2>
      <!--
        `v-html` will render HTML strings (e.g. `htmlGreeting`).
        WARNING: rendering untrusted HTML (like `dangerousHtml`) can cause XSS attacks.
        The example below is commented out to avoid executing the malicious string.
      -->
      <!-- <p v-html="dangerousHtml"></p> -->
    </section>

    <!-- Additional info: `v-once` renders the node only once (no reactive updates). -->
    <section class="demo-section">
      <!-- `v-once` prevents future updates to this binding after initial render. -->
      <p v-once>{{ greeting }}</p>
      <!-- `@click` is shorthand for `v-on:click` — calls `updateAll` when clicked. -->
      <button @click="updateAll">Update</button>
    </section>
  </div>
</template>

<style>
.demo-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
}

.demo-section {
  background: #f8f9fa;
  padding: 1.5rem;
  margin: 1rem 0;
  border-radius: 8px;
  border-left: 4px solid #42b883;
}

.demo-section p {
  color: #2c3e50;
}

h2 {
  color: #2c3e50;
  margin-top: 0;
}

button {
  background: #42b883;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #3aa876;
}

.warning {
  color: #e74c3c;
  font-weight: bold;
}

.note {
  color: #7f8c8d;
  font-style: italic;
}
</style>