<script setup>
import Button from './components/Button.vue';
import NavBar from './components/NavBar.vue';
import UserCard from './components/UserCard.vue';

const users = [
  { id: 1, name: 'Alice Smith', email: 'alice@example.com', avatar: 'https://i.pravatar.cc/100?img=1', role: 'Admin' },
  { id: 2, name: 'Bob Johnson', email: 'bob@example.com', avatar: 'https://i.pravatar.cc/100?img=2', role: 'Developer' },
  { id: 3, name: 'Carol White', email: 'carol@example.com', avatar: 'https://i.pravatar.cc/100?img=3', role: 'Designer' }
]
</script>

<template>
  <div class="app">
    <!-- NavBar Component -->
    <NavBar />

    <main class="content">
      <h1>Component Demo</h1>

      <section class="demo-section">
        <h2>Button Component</h2>
        <div class="button-grid">

          <Button variant="primary" title="Primary" />

          <Button variant="secondary" title="Secondary" />
          <Button variant="success" title="Success" />
          <Button variant="danger" title="Danger" />
        </div>
      </section>

      <section class="demo-section">
        <h2>User Cards</h2>
        <div class="user-grid" v-for="user in users" :key="user.id">
          <UserCard :email="user.email" :avatar="user.avatar" :name="user.name" :role="user.role">

            <template #actions>
              <Button class="secondary" title="View"></Button>
              <Button class="danger" title="Edit"></Button>
            </template>
          </UserCard>
        </div>
      </section>
    </main>
  </div>
</template>

<style>
.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.demo-section {
  margin: 2rem 0;
}

.button-grid {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.user-grid {
  display: grid;
  gap: 1rem;
}




.user-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: white;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.info {
  flex: 1;
}

.info h3 {
  margin: 0;
}

.email {
  color: #666;
  margin: 0.25rem 0;
  font-size: 0.875rem;
}

.role-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background: #e3f2fd;
  color: #1565c0;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}
</style>