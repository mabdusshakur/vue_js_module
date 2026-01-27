<script setup>
import { ref } from 'vue';

const isMenuOpen = ref(false)
const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
]
</script>

<template>
    <nav class="navbar">
        <div class="navbar-brand">
            <span class="logo">🚀 MyApp</span>
        </div>

        <button class="menu-toggle" @click="isMenuOpen = !isMenuOpen">
            {{ isMenuOpen ? '✕' : '☰' }}
        </button>

        <ul class="nav-links" :class="{ open: isMenuOpen }">
            <li v-for="item in navItems" :key="item.name">
                <a :href="item.path" class="nav-link">{{ item.name }}</a>
            </li>
        </ul>
    </nav>
</template>

<style>
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.navbar-brand .logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
}

.nav-links {
    display: flex;
    list-style: none;
    gap: 1.5rem;
    margin: 0;
    padding: 0;
}

.nav-link {
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: opacity 0.2s;
}

.nav-link:hover {
    opacity: 0.8;
}

.menu-toggle {
    display: none;
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
}

@media (max-width: 768px) {
    .menu-toggle {
        display: block;
    }

    .nav-links {
        display: none;
        position: absolute;
        top: 60px;
        left: 0;
        right: 0;
        flex-direction: column;
        background: #764ba2;
        padding: 1rem;
    }

    .nav-links.open {
        display: flex;
    }
}
</style>