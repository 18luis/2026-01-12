<!-- pages/users.vue -->
<template>
  <div class="p-8">
    <h2 class="text-2xl font-bold mb-4">Users</h2>
    <table class="min-w-full bg-white border border-gray-300">
      <thead>
        <tr class="w-full border-b border-gray-200">
          <th class="py-2 px-4 text-left">Name</th>
          <th class="py-2 px-4 text-left">Email</th>
          <th class="py-2 px-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" class="border-b border-gray-200">
          <td class="py-2 px-4">{{ user.name }}</td>
          <td class="py-2 px-4">{{ user.email }}</td>
          <td class="py-2 px-4 flex justify-center">
            <button @click="editUser(user.id)" class="text-blue-500 hover:text-blue-700">Edit</button>
            <button @click="deleteUser(user.id)" class="ml-4 text-red-500 hover:text-red-700">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <nuxt-link to="/users/new" class="mt-6 inline-block text-green-500 hover:text-green-700">Add New User</nuxt-link>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState(['users']),
  },
  methods: {
    ...mapActions(['fetchUsers', 'deleteUser']),
    editUser(id) {
      this.$router.push(`/users/${id}`);
    },
  },
  async created() {
    await this.fetchUsers();
  },
};
</script>