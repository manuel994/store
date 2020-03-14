<template>
    <div>
        <div class="btn-wrapper">
            <router-link to="/admin/products/new" class="btn btn-primary btn-sm">New</router-link>
        </div>
        <table class="table">
            <thead>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Actions</th>
            </thead>
            <tbody>
                <template v-if="!products.length">
                    <tr>
                        <td colspan="4" class="text-center">No Products Available</td>
                    </tr>
                </template>
                <template v-else>
                    <tr v-for="product in products" :key="product.id">
                        <td>{{ product.name }}</td>
                        <td>{{ product.description }}</td>
                        <td>{{ product.price }}</td>
                        <td>
                            <a href="#" v-on:click="delete_product(`${product.id}`)">Delete</a> <br>
                            <router-link :to="`/admin/products/${product.id}`">Edit</router-link>
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


        this.$store.dispatch('getProducts');
    },
    computed: {
        products() {
            return this.$store.getters.products;
        }
    },
    methods: {
        delete_product(product) {
        axios.delete(`/api/products/${product}/delete`)
        .then((response)=>{
          this.$store.dispatch('getProducts');
          this.$router.push('/admin/products');
          this.$notify({
              group: 'foo',
              title: 'Notification',
              type: 'success',
              text: 'Product removed'
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
