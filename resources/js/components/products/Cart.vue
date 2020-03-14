<template>

    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card card-default">
                    <div class="card-header">
                        Products
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <table class="table">
                                <thead>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Actions</th>
                                </thead>
                                <tbody>
                                    <template v-if="!cart.length">
                                        <tr>
                                            <td colspan="4" class="text-center">No Products</td>
                                        </tr>
                                    </template>
                                    <template v-else="v-else">
                                        <tr v-for="product in cart" :key="product.id">
                                            <td>{{ product.name }}</td>
                                            <td>${{ product.price }}</td>
                                            <td>{{ product.quantity }}</td>
                                            <td>
                                                <button href="#" v-on:click="deleteItem(`${product.id}`)" class="btn btn-primary btn-sm form-control">Delete</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td>Subtotal</td>
                                            <td>$
                                                {{ subtotal }}</td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td>Shipping</td>
                                            <td>$
                                                {{shipping = Math.round(Math.random() * (100 - 20) + 20) }}</td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td>Total</td>
                                            <td>${{ subtotal+shipping }}</td>
                                        </tr>
                                    </template>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <template v-if="cart.length">

            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="card card-default">
                        <div class="card-header">
                            Payment
                        </div>
                        <div class="card-body">
                            <table class="table">
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="text" class="form-control" placeholder="First Name">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" placeholder="Last Name">
                                    </td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <th>Phone numbre</th>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="email" class="form-control" placeholder="Email">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" placeholder="Phone number">
                                    </td>
                                </tr>

                            </table>
                            <table class="table">

                                <tr>
                                    <th colspan="2">Street Address</th>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <input type="text" class="form-control" placeholder="Street Address">
                                    </td>
                                </tr>
                                <tr>
                                    <th>Country</th>
                                    <th>State</th>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="text" class="form-control" placeholder="Country">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" placeholder="State">
                                    </td>

                                </tr>
                                <tr>
                                    <th>City</th>
                                    <th>Zip Code</th>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="text" class="form-control" placeholder="City">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" placeholder="Zip Code">
                                    </td>

                                </tr>
                            </table>

                            <table class="table">
                              <tr>
                                <th colspan="2">Credit Card Number</th>
                              </tr>
                              <tr>
                                <td colspan="2">
                                  <input type="text" class="form-control" placeholder="Credit Card Number">
                                </td>
                              </tr>
                                <tr>
                                    <th>Expire Month</th>
                                    <th>Expire Year</th>
                                </tr>
                                <tr>

                                    <td>

                                        <select name='expireMM' id='expireMM' class="form-control">
                                            <option value=''>Month</option>
                                            <option value='01'>January</option>
                                            <option value='02'>February</option>
                                            <option value='03'>March</option>
                                            <option value='04'>April</option>
                                            <option value='05'>May</option>
                                            <option value='06'>June</option>
                                            <option value='07'>July</option>
                                            <option value='08'>August</option>
                                            <option value='09'>September</option>
                                            <option value='10'>October</option>
                                            <option value='11'>November</option>
                                            <option value='12'>December</option>
                                        </select>
                                    </td>
                                    <td>

                                        <select name='expireYY' id='expireYY' class="form-control">
                                            <option value=''>Year</option>
                                            <option value='20'>2010</option>
                                            <option value='21'>2021</option>
                                            <option value='22'>2022</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                  <th colspan="2">CVC</th>
                                </tr>
                                <tr>
                                  <td colspan="2">
                                      <input type="text" class="form-control" placeholder="CVC">
                                  </td>
                                </tr>
                            </table>

                            <tr>
                                <td class="text-right">
                                    <input type="submit" value="Pay" class="btn btn-primary">
                                </td>
                            </tr>
                        </div>
                    </div>
                </div>
            </div>
        </template>

    </div>
</template>

<script>
    export default {
        name: 'cart',
        data() {
            return {cart: [], subtotal: 0, shipping: 0, errors: null}
        },
        mounted() {
            this.cart = this.$store.getters.cart;
            this.subtotal = this.$store.getters.subtotal;
        },
        methods: {
            deleteItem(id) {
                axios.get(`/api/products/${id}`).then((response) => {
                    this.product = response.data.product;
                    this.$store.commit("deleteItem", this.product);
                    this.subtotal = this.$store.getters.subtotal;
                });
            }
        }
    }
</script>

<style scoped="scoped">
    .btn-wrapper {
        text-align: right;
        margin-bottom: 20px;
    }
</style>
