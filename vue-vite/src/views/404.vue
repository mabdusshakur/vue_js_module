<template>
  <section class="page-card center">
    <h2>404 - Page not found</h2>
    <p>Let’s get you back to the blog list.</p>
    <RouterLink class="button" :to="{ name: 'home' }">Go Home</RouterLink>
  </section>
</template>