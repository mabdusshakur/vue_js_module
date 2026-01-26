<script setup>
import { computed, onMounted, ref, watch } from 'vue';

const newTodo = ref('');
const todos = ref([]);
const filter = ref('all');

const filteredTodos = computed(() => {
  if(filter.value == 'active') return todos.value.filter(todo => !todo.done);
  if(filter.value == 'completed') return todos.value.filter(todo => todo.done);
  return todos.value;
});

const remainingCount = computed(() => {
  return todos.value.filter(todo => !todo.done).length;
});

const completedCount = computed(() => {
  return todos.value.filter(todo => todo.done).length;
});

const totalCount = computed(() => {
  return todos.value.length;
});

const addTodo = () => {
  const text = newTodo.value.trim();
  if(!text) return;

  todos.value.unshift({
    id: Date.now(),
    text,
    done: false
  });

  newTodo.value = '';
};

const removeTodo = (id) => {
  todos.value = todos.value.filter(todo => todo.id !== id);
};

const clearCompletedTodos = () => {
  todos.value = todos.value.filter(todo => !todo.done);
};

onMounted(() => {
  const savedTodos = localStorage.getItem('vue-todo-lab');
  if(savedTodos) {
    todos.value = JSON.parse(savedTodos);
  }
});


watch(todos, (newTodos) => {
  localStorage.setItem('vue-todo-lab', JSON.stringify(newTodos));
}, { deep: true });
</script>


<template>
  <div class="page">
    <div class="todo-app">
      <header class="app-header">
        <div>
          <h1>Vue Todo Lab</h1>
          <p class="subtitle">Simple, clean UI to learn core Vue concepts.</p>
        </div>
        <div class="stats">
          <div class="stat">
            <span class="stat-value">{{ remainingCount }}</span>
            <span class="stat-label">Active</span>
          </div>
          <div class="stat">
            <span class="stat-value">{{ completedCount }}</span>
            <span class="stat-label">Done</span>
          </div>
          <div class="stat">
            <span class="stat-value">{{ totalCount }}</span>
            <span class="stat-label">Total</span>
          </div>
        </div>
      </header>

      <section class="add-todo">
        <input class="todo-input" type="text" placeholder="Add a new task and press Enter" v-model="newTodo"  @keyup.enter="addTodo"/>
        <button class="btn primary" @click="addTodo">
          Add
        </button>
      </section>

      <section class="filters">
        <button class="chip" v-on:click="filter = 'all'" :class="{active : filter == 'all'}">
          All
        </button>
        <button class="chip" v-on:click="filter = 'active'" :class="{active : filter == 'active'}">
          Active
        </button>
        <button class="chip" v-on:click="filter = 'completed'" :class="{active : filter == 'completed'}">
          Completed
        </button>
      </section>

      <section class="todo-list">

        <div v-for="todo in filteredTodos" :key="todo.id" :class="{done : todo.done}" class="todo-item">
          <label class="checkbox">
            <input type="checkbox" v-model="todo.done" />
            <span class="checkmark"></span>
          </label>

          <span class="todo-text">{{ todo.text }}</span>
          <button class="btn ghost" @click="removeTodo(todo.id)">Remove</button>
        </div>

      </section>

      <footer class="app-footer">
        <p class="footer-text">Tip: your list is saved automatically with watch + localStorage.</p>
        <button class="btn danger" @click="clearCompletedTodos">
          Clear Completed
        </button>
      </footer>
    </div>

    <aside class="learning-card">
      <h2>What this teaches</h2>
      <ul>
        <li><strong>v-model</strong> for two-way input binding</li>
        <li><strong>v-for</strong> + <strong>:key</strong> for lists</li>
        <li><strong>computed</strong> for filtered lists and counts</li>
        <li><strong>watch</strong> to save data to localStorage</li>
        <li><strong>event handling</strong> with @click and @keyup.enter</li>
      </ul>
    </aside>
  </div>
</template>