<script setup>
import { computed, onMounted, ref } from 'vue';

const posts = ref([]);
const loading = ref(true);
const error = ref('');

const loadPosts = async () => {
  try {
    loading.value = true;
    error.value = '';
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      throw new Error('Failed to load posts');
    }
    posts.value = await response.json();
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Something went wrong';
  } finally {
    loading.value = false;
  }
};

onMounted(loadPosts);
</script>

<template>
  <section class="page-card">
    <header class="page-header">
      <div>
        <h2>Latest Blog Posts</h2>
        <p>Click any card to open the detail page and learn route params.</p>
      </div>
      <span class="pill">JSONPlaceholder</span>
    </header>

    <div v-if="loading" class="state">Loading posts…</div>
    <div v-else-if="error" class="state error">{{ error }}</div>

    <div v-else class="posts-grid">
      <article v-for="post in posts" :key="post.id" class="post-card">
        <div class="post-meta">
          <span class="tag">Post #{{ post.id }}</span>
        </div>
        <h3>{{ post.title }}</h3>
        <p>{{ post.body.slice(0, 120) }}…</p>
        <!-- <router-link :to="`/posts/${post.id}`" class="link">
          Read post →
        </router-link> -->

        <RouterLink :to="{ name: 'posts', params: { id: post.id } }" class="link">
          Read post →
        </RouterLink>
      </article>
    </div>
  </section>
</template>