<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <h1>Store</h1>
            </div>
        </div>
        <template v-if="!products.length">
            <tr>
                <td colspan="4" class="text-center">No Products Available</td>
            </tr>
        </template>
        <template v-else="v-else">
            <paginate name="products" :list="products" :per="6">
                <div class="row">
                    <div class="col-lg-6" v-for="product in paginated('products')" :key="product.id">
                        <div class="row">
                            <div class="col-lg-6 col-md-6 mb-4">
                                <div class="card h-100">
                                    <a href="#"><img class="card-img-top" src="img/700x400.png" alt=""></a>
                                    <div class="card-body">
                                        <h4 class="card-title">
                                            <router-link :to="`/admin/products/${product.slug}/details`">{{ product.name }}</router-link>
                                        </h4>
                                        <h5>${{ product.price }}</h5>
                                        <p class="card-text">{{ product.description.substring(0, 50) }}...</p>
                                    </div>
                                    <div class="card-footer">
                                        <button href="#" v-on:click="addItem(`${product.id}`)" class="btn btn-primary btn-sm">Add product</button>
                                        <router-link :to="`/admin/products/${product.slug}/details`" class="btn btn-success btn-sm">Product Details</router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </paginate>
                <div class="row">
                  <div class="col-md-4 offset-md-4">
                  <paginate-links for="products" :classes="{'ul': 'pagination', 'li': 'page-item', 'a': 'page-link'}"></paginate-links>
                  </div>
                </div>
        </template>
    </div>

</template>

<script>
    export default {
        name: 'list',
        data() {
            return {
                product: {
                    name: '',
                    description: '',
                    price: '',
                    quantity: ''
                },
                paginate: ['products'],
                errors: null
            }
        },
        mounted() {
            this.$store.dispatch('getProducts');
        },
        computed: {
            products() {
                return this.$store.getters.products;
            },
            cart() {
                return this.$store.getters.cart;
            },
            subtotal() {
                return this.$store.getters.subtotal;
            }
        },
        methods: {
            addItem(id) {
                axios.get(`/api/products/${id}`).then((response) => {
                    this.product = response.data.product;
                    this.product.quantity = 1;
                    this.$store.commit("addItem", this.product);
                    this.$notify({group: 'foo', title: 'Notification', type: 'success', text: 'Product added'});
                });
            }
        }
    }
</script>
