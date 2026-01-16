<!-- pages/users/new.vue -->
<template>
  <div class="p-8">
    <h2 class="text-2xl font-bold mb-4">Add New User</h2>
    <form @submit.prevent="addUser">
      <div class="mb-4">
        <label for="name" class="block text-gray-700">Name</label>
        <input type="text" v-model="name" id="name" class="w-full border border-gray-300 p-2 rounded" />
      </div>
      <div class="mb-4">
        <label for="email" class="block text-gray-700">Email</label>
        <input type="email" v-model="email" id="email" class="w-full border border-gray-300 p-2 rounded" />
      </div>
      <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Add User</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
    };
  },
  methods: {
    async addUser() {
      await this.$axios.$post('/users', { name: this.name, email: this.email });
      this.$router.push('/users');
    },
  },
};
</script>