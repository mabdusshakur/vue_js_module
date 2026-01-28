<script setup>
import { ref, onMounted } from 'vue'

const posts = ref([]);

// method : 1
// import postsData from '../data/posts.json'

// method : 2
const loadDynamic = async () => {
    const module = await import('../data/posts.json');
    posts.value = module.default;
}
onMounted(() => {
    // posts.value = postsData; // method : 1

    loadDynamic(); // method : 2
});
</script>

<template>
    <div class="posts-container">
        <h2>Posts from JSONPlaceholder</h2>

        <div v-if="loading" class="loading">Loading posts...</div>
        <div v-else-if="error" class="error">Error: {{ error }}</div>
        <div v-else class="posts-list">
            <div v-for="post in posts" :key="post.id" class="post-card">
                <h3>{{ post.title }}</h3>
                <p>{{ post.body }}</p>
                <small>Post ID: {{ post.id }}</small>
            </div>
        </div>
    </div>
</template>

<style scoped>
.posts-container {
    max-width: 800px;
    margin: 2rem auto;
    padding: 1rem;
}

.posts-container h2 {
    color: #333;
    text-align: center;
    margin-bottom: 1.5rem;
}

.loading,
.error {
    text-align: center;
    padding: 2rem;
    font-size: 1.1rem;
}

.error {
    color: #e74c3c;
    background: #fadbd8;
    border-radius: 4px;
}

.loading {
    color: #42b883;
}

.posts-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.post-card {
    background: #f9f9f9;
    border-left: 4px solid #42b883;
    padding: 1rem;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.post-card h3 {
    margin: 0 0 0.5rem 0;
    color: #333;
    font-size: 1.1rem;
}

.post-card p {
    margin: 0.5rem 0;
    color: #666;
    line-height: 1.5;
}

.post-card small {
    color: #999;
    font-size: 0.85rem;
}
</style>
