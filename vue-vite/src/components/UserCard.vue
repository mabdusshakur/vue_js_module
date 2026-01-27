<script setup>
defineProps({
    name: String,
    email: String,
    avatar: {
        required: true,
        type: String
    },
    role: String
});
</script>


<template>
    <div class="user-card">
        <img :src="avatar" :alt="name" class="avatar">
        <div class="info">
            <h3>{{ name }}</h3>
            <p class="email">{{ email }}</p>
            <span class="role-badge">{{ role }}</span>
        </div>
        <slot name="actions"></slot>
    </div>
</template>
