<template>
    <div>
        <div class="btn-wrapper">
            <router-link to="/admin/users/new" class="btn btn-primary btn-sm">New</router-link>
        </div>
        <table class="table">
            <thead>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
            </thead>
            <tbody>
                <template v-if="!users.length">
                    <tr>
                        <td colspan="4" class="text-center">No Users Available</td>
                    </tr>
                </template>
                <template v-else>
                    <tr v-for="user in users" :key="user.id">
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                        <td>
                            <a href="#" v-on:click="delete_user(`${user.id}`)">Delete</a> <br>
                            <router-link :to="`/admin/users/${user.id}`">Edit</router-link>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'list',
    mounted() {

      /*  if (this.users.length) {
            return;
        }*/

        this.$store.dispatch('getUsers');
    },
    computed: {
        users() {
            return this.$store.getters.users;
        }
    },
    methods: {
        delete_user(user) {
        axios.delete(`/api/users/${user}/delete`)
        .then((response)=>{
          this.$store.dispatch('getUsers');
          this.$router.push('/admin/users');
          this.$notify({
              group: 'foo',
              title: 'Notification',
              type: 'success',
              text: 'User removed'
          });
        });
        }
    }
}
</script>

<style scoped>
.btn-wrapper {
    text-align: right;
    margin-bottom: 20px;
}
</style>
