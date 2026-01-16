<!-- pages/users/_id.vue -->
<template>
  <div class="p-8">
    <h2 class="text-2xl font-bold mb-4">Edit User</h2>
    <form @submit.prevent="updateUser">
      <div class="mb-4">
        <label for="name" class="block text-gray-700">Name</label>
        <input type="text" v-model="user.name" id="name" class="w-full border border-gray-300 p-2 rounded" />
      </div>
      <div class="mb-4">
        <label for="email" class="block text-gray-700">Email</label>
        <input type="email" v-model="user.email" id="email" class="w-full border border-gray-300 p-2 rounded" />
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Save Changes</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: '',
        email: '',
      },
    };
  },
  async fetch() {
    const { id } = this.$route.params;
    this.user = await this.$axios.$get(`/users/${id}`);
  },
  methods: {
    async updateUser() {
      await this.$axios.$put(`/users/${this.user.id}`, this.user);
      this.$router.push('/users');
    },
  },
};
</script>