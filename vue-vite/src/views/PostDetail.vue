<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const post = ref(null);
const loading = ref(true);
const error = ref('');


const route = useRoute();
const router = useRouter();

const loadPost = async (id) => {
  try {
    loading.value = true;
    error.value = '';
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!response.ok) {
      throw new Error('Failed to load posts');
    }
    post.value = await response.json();
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Something went wrong';
  } finally {
    loading.value = false;
  }
};


const goBack = () => {
    if (window.history.length > 2) {
        router.back();
    } else {
        router.push({ name: 'home' });
    }
};

onMounted(() => loadPost(route.params.id));

</script>

<template>
    <section class="page-card">
        <header class="page-header">
            <div>
                <h2>Post Details</h2>
                <p>Route param: <span class="mono">id = {{ route.params.id }}</span></p>
            </div>
            <button class="button ghost" type="button" @click="goBack">← Back</button>
        </header>

        <div v-if="loading" class="state">Loading post…</div>
        <div v-else-if="error" class="state error">{{ error }}</div>

        <article v-else class="post-detail">
            <span class="tag">Post #{{ post.id }}</span>
            <h3>{{ post.title }}</h3>
            <p>{{ post.body }}</p>
            <button class="button" type="button">
                Go to Home
            </button>
        </article>
    </section>
</template>
