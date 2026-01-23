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

// ========== EVENT LISTENERS AVAILABLE IN VUE ==========

// MOUSE EVENTS
// @click - Mouse button clicked
// @dblclick - Mouse button double-clicked
// @mousedown - Mouse button pressed down
// @mouseup - Mouse button released
// @mousemove - Mouse moved
// @mouseenter - Mouse enters element
// @mouseleave - Mouse leaves element
// @mouseover - Mouse over element (bubbles)
// @mouseout - Mouse out of element (bubbles)
// @contextmenu - Right-click context menu

// KEYBOARD EVENTS
// @keydown - Key pressed down
// @keyup - Key released
// @keypress - Key pressed (deprecated but still works)

// FORM EVENTS
// @submit - Form submitted
// @reset - Form reset
// @change - Input value changed
// @input - Input value changing (real-time)
// @focus - Element focused
// @blur - Element lost focus
// @select - Text selected in input

// SCROLL EVENTS
// @scroll - Element scrolled

// DRAG EVENTS
// @drag - Element being dragged
// @dragstart - Drag started
// @dragend - Drag ended
// @dragover - Dragged element over target
// @drop - Dragged element dropped
// @dragenter - Dragged element enters
// @dragleave - Dragged element leaves

// TOUCH EVENTS (Mobile)
// @touchstart - Touch started
// @touchend - Touch ended
// @touchmove - Touch moving
// @touchcancel - Touch cancelled

// FOCUS EVENTS
// @focusin - Element gaining focus
// @focusout - Element losing focus

// WHEEL EVENT
// @wheel - Mouse wheel scrolled

// MEDIA EVENTS
// @play - Media playing
// @pause - Media paused
// @ended - Media ended
// @timeupdate - Media time changed
// @loadedmetadata - Media metadata loaded
// @loadstart - Media loading started
// @progress - Media loading progress

// TRANSITION EVENTS
// @transitionstart - CSS transition started
// @transitionend - CSS transition ended

// ANIMATION EVENTS
// @animationstart - CSS animation started
// @animationend - CSS animation ended
// @animationiteration - CSS animation repeating

// CLIPBOARD EVENTS
// @copy - Content copied to clipboard
// @cut - Content cut to clipboard
// @paste - Content pasted from clipboard

// ========== EVENT MODIFIERS (use with @) ==========
// .stop - Stop event propagation
// .prevent - Prevent default behavior
// .self - Only trigger if event target is element itself
// .once - Only trigger once
// .passive - Mark listener as passive (performance)
// .capture - Use event capture mode

// ========== KEY MODIFIERS ==========
// .enter - Enter key
// .tab - Tab key
// .escape - Escape key
// .space - Space key
// .delete - Delete/Backspace key
// .up, .down, .left, .right - Arrow keys

// ========== MOUSE BUTTON MODIFIERS ==========
// .left - Left mouse button
// .right - Right mouse button
// .middle - Middle mouse button

const handleMouseLeft = (event) => {
  console.log("Mouse left");
}

const handleMouseRight = (event) => {
  console.log("Mouse right button clicked");
}

const handleMouseMiddle = (event) => {
  console.log("Mouse Middle button clicked");
}

const handleEnter = (event) => {
  console.log("Enter key pressed");
}
const handleKeyUp = (event) => {
  console.log("Enter key released");
}

const handleSubmit = () => {
  alert("Form submitted!");
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
    </div>

    <div @click.left="handleMouseLeft" @click.right="handleMouseRight" @click.middle="handleMouseMiddle">
      Click to Test Mouse Left, Right, and Middle
    </div>

    <input @keydown="handleEnter" >

    </input>

    <input @keyup.space="handleKeyUp" >

    </input>

    <form @submit.prevent="handleSubmit">
      <input type="text" placeholder="Type something..." />
      <button type="submit">Submit</button>
    </form>

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