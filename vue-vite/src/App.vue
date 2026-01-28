<template>
  <div class="app-shell">
    <header class="app-header">
      <div>
        <p class="eyebrow">Vue Router Practice</p>
        <h1>Simple Blog Demo</h1>
      </div>
      <nav class="app-nav">
        <RouterLink class="nav-link" :to="{ name: 'home' }">Home</RouterLink>
      </nav>
    </header>

    <main class="app-main">
      <router-view />
    </main>
  </div>
</template>
