<script setup>
import { computed, ref } from 'vue';

const person = ref({
  name: 'John Doe',
  role: 'Full Stack Developer',
  id: 'EMP-2026-001',
  department: 'Engineering',
  avatarUrl: 'https://i.pravatar.cc/150?img=3',
  cardColor: '#1a1a2e',
  textColor: '#ffffff',
  accentColor: '#42b883',
})


const accentStyle = computed(() => ({
  backgroundColor: person.value.accentColor,
  color: person.value.textColor,
}));

const cardStyle = computed(() => ({ backgroundColor: person.value.cardColor, color: person.value.textColor, borderColor: person.value.accentColor }));


const randomAvatar = () => {
  const randomId = Math.floor(Math.random() * 70) + 1; //
  person.value.avatarUrl = `https://i.pravatar.cc/150?img=${randomId}`;
};


const resetCard = () => {
  person.value = {
    name: 'John Doe',
    role: 'Full Stack Developer',
    id: 'EMP-2026-001',
    department: 'Engineering',
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
    cardColor: '#1a1a2e',
    textColor: '#ffffff',
    accentColor: '#42b883',
  };
};
</script>

<template>
  <div class="app-container">
    <h1>🎫 Dynamic ID Card Generator</h1>

    <div class="layout">
      <!-- CONTROLS PANEL -->
      <div class="controls">
        <h2>✏️ Edit Card Details</h2>

        <div class="form-group">
          <label>Full Name</label>
          <input placeholder="Enter name" v-model="person.name">
        </div>

        <div class="form-group">
          <label>Role / Position</label>
          <input placeholder="Enter role" v-model="person.role">
        </div>

        <div class="form-group">
          <label>Employee ID</label>
          <input placeholder="Enter ID" v-model="person.id">
        </div>

        <div class="form-group">
          <label>Department</label>
          <select v-model="person.department">
            <option>Engineering</option>
            <option>Design</option>
            <option>Marketing</option>
            <option>Sales</option>
            <option>Human Resources</option>
          </select>
        </div>

        <div class="form-group">
          <label>Avatar URL</label>
          <input placeholder="Image URL" v-model="person.avatarUrl">
          <button class="btn-small" @click="randomAvatar">🎲 Random</button>
        </div>

        <h3>🎨 Colors</h3>
        <div class="color-group">
          <div class="form-group">
            <label>Card Background</label>
            <input type="color" v-model="person.cardColor">
          </div>
          <div class="form-group">
            <label>Text Color</label>
            <input type="color" v-model="person.textColor">
          </div>
          <div class="form-group">
            <label>Accent Color</label>
            <input type="color" v-model="person.accentColor">
          </div>
        </div>

        <button class="btn-reset" @click="resetCard">🔄 Reset to Default</button>
      </div>

      <!-- ID CARD PREVIEW -->
      <div class="preview-section">
        <h2>👁️ Live Preview</h2>

        <div class="id-card" :style="cardStyle">
          <div class="card-header" :style="accentStyle">
            <span class="company-name">ACME Corporation</span>
          </div>

          <div class="card-body">
            <div class="avatar-container">
              <img :src="person.avatarUrl" :alt="person.name" class="avatar">
            </div>

            <div class="info">
              <h2 class="name">{{ person.name }}</h2>
              <p class="role" :style="{ color: person.accentColor }">{{ person.role }}</p>

              <div class="details">
                <div class="detail-row">
                  <span class="label">ID:</span>
                  <span class="value">{{ person.id }}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Dept:</span>
                  <span class="value">{{ person.department }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="card-footer" :style="accentStyle">
            <span>Valid: 2026</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
}

.layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

/* Controls */
.controls {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: #555;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}

.form-group input[type="color"] {
  width: 60px;
  height: 40px;
  padding: 0;
  cursor: pointer;
}

.color-group {
  display: flex;
  gap: 1rem;
}

.btn-small {
  margin-top: 0.5rem;
  padding: 0.25rem 0.5rem;
  background: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-reset {
  width: 100%;
  padding: 0.75rem;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
}

/* ID Card */
.preview-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.id-card {
  width: 350px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  border: 3px solid;
}

.card-header,
.card-footer {
  padding: 0.75rem;
  text-align: center;
  font-weight: bold;
  font-size: 0.9rem;
}

.card-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.avatar-container {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid currentColor;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info {
  text-align: center;
}

.name {
  font-size: 1.5rem;
  margin: 0;
}

.role {
  font-size: 1rem;
  margin: 0.25rem 0;
}

.details {
  margin-top: 1rem;
}

.detail-row {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.label {
  opacity: 0.7;
}
</style>