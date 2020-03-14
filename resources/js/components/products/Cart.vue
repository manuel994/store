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
          <form @submit.prevent="pay" >
              <div class="row justify-content-center">
                  <div class="col-md-8">
                      <div class="card card-default">
                          <div class="card-header">
                              Payment
                          </div>
                          <div class="card-body">
                              <table class="table">
                                  <tr>
                                      <th colspan="2" >Name</th>
                                  </tr>
                                  <tr>
                                      <td  colspan="2">
                                          <input type="text" class="form-control" placeholder="Name" v-model="user.name" >
                                      </td>
                                  </tr>
                                  <tr>
                                      <th>Email</th>
                                      <th>Phone number</th>
                                  </tr>
                                  <tr>
                                      <td>
                                          <input type="email" class="form-control" placeholder="Email" v-model="user.email" >
                                      </td>
                                      <td>
                                          <input type="text" class="form-control" placeholder="Phone number" v-model="user.phone" >
                                      </td>
                                  </tr>

                              </table>
                              <table class="table">

                                  <tr>
                                      <th colspan="2">Street Address</th>
                                  </tr>
                                  <tr>
                                      <td colspan="2">
                                          <input type="text" class="form-control" placeholder="Street Address" v-model="address.street" >
                                      </td>
                                  </tr>
                                  <tr>
                                      <th>Country</th>
                                      <th>State</th>
                                  </tr>
                                  <tr>
                                      <td>
                                          <input type="text" class="form-control" placeholder="Country" v-model="address.country" >
                                      </td>
                                      <td>
                                          <input type="text" class="form-control" placeholder="State" v-model="address.state" >
                                      </td>

                                  </tr>
                                  <tr>
                                      <th>City</th>
                                      <th>Zip Code</th>
                                  </tr>
                                  <tr>
                                      <td>
                                          <input type="text" class="form-control" placeholder="City" v-model="address.city" >
                                      </td>
                                      <td>
                                          <input type="text" class="form-control" placeholder="Zip Code" v-model="address.zipcode" >
                                      </td>

                                  </tr>
                              </table>

                              <table class="table">
                                <tr>
                                  <th colspan="2">Credit Card Number</th>
                                </tr>
                                <tr>
                                  <td colspan="2">
                                    <input type="text" class="form-control" placeholder="Credit Card Number" v-model="creditcart.number">
                                  </td>
                                </tr>
                                  <tr>
                                      <th>Expire Month</th>
                                      <th>Expire Year</th>
                                  </tr>
                                  <tr>

                                      <td>

                                          <select name='expireMM' id='expireMM' class="form-control" v-model="creditcart.month">
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

                                          <select name='expireYY' id='expireYY' class="form-control" v-model="creditcart.year">
                                              <option value=''>Year</option>
                                              <option value='20'>2020</option>
                                              <option value='21'>2021</option>
                                              <option value='22'>2022</option>
                                              <option value='23'>2023</option>
                                              <option value='24'>2024</option>
                                              <option value='25'>2025</option>
                                          </select>
                                      </td>
                                  </tr>
                                  <tr>
                                    <th colspan="2">CVC</th>
                                  </tr>
                                  <tr>
                                    <td colspan="2">
                                        <input type="text" class="form-control" placeholder="CVC" v-model="creditcart.cvc">
                                    </td>
                                  </tr>
                              </table>

                              <tr>
                                  <td class="text-right">
                                      <input type="submit" value="Pay" class="btn btn-primary">
                                  </td>
                              </tr>

                              <div class="errors" v-if="errors">
                                <ul>
                                  <li v-for="(fieldsError,fieldName) in errors" :key="fieldName">
                                    <strong>{{ fieldName }}</strong> {{ fieldsError.join('\n') }}
                                  </li>
                                </ul>
                              </div>

                              <div class="errors" v-if="errorsAddress">
                                <ul>
                                  <li v-for="(fieldsError,fieldName) in errorsAddress" :key="fieldName">
                                    <strong>{{ fieldName }}</strong> {{ fieldsError.join('\n') }}
                                  </li>
                                </ul>
                              </div>

                              <div class="errors" v-if="errorsCart">
                                <ul>
                                  <li v-for="(fieldsError,fieldName) in errorsCart" :key="fieldName">
                                    <strong>{{ fieldName }}</strong> {{ fieldsError.join('\n') }}
                                  </li>
                                </ul>
                              </div>

                          </div>
                      </div>
                  </div>
              </div>
          </form>
        </template>

    </div>
</template>

<script>
import validate from 'validate.js'
export default {
    name: 'cart',
    data() {
        return {
            cart: [],
            subtotal: 0,
            shipping: 0,
            user: {
                name: '',
                email: '',
                phone: '',
                password: ''
            },
            address: {
                street: '',
                country: '',
                state: '',
                city: '',
                zipcode: ''
            },
            creditcart: {
                number: '',
                month: '',
                year: '',
                cvc: ''
            },
            errors: null,
            errorsAddress: null
        }
    },
    mounted() {
        this.cart = this.$store.getters.cart;
        this.subtotal = this.$store.getters.subtotal;
        if (this.$store.getters.currentUser !== null)
            this.user = this.$store.getters.currentUser;

    },
    methods: {
        deleteItem(id) {
            axios.get(`/api/products/${id}`).then((response) => {
                this.product = response.data.product;
                this.$store.commit("deleteItem", this.product);
                this.subtotal = this.$store.getters.subtotal;
                this.$notify({
                    group: 'foo',
                    title: 'Notification',
                    type: 'success',
                    text: 'Product removed'
                });
            });
        },
        pay() {
            this.errors = null;
            this.errorsAddress = null;
            this.errorsCart = null;
            const constrains = this.getConstrains();
            const errors = validate(this.$data.user, constrains);
            const constrainsAddress = this.getConstrainsAddress();
            const errorsAddress = validate(this.$data.address, constrainsAddress);
            const constrainsCart = this.getConstrainsCart();
            const errorsCart = validate(this.$data.creditcart, constrainsCart);

            if (errors || errorsAddress || errorsCart) {
                this.errors = errors;
                this.errorsAddress = errorsAddress;
                this.errorsCart = errorsCart;
                return;
            }

            this.$notify({
                group: 'foo',
                title: 'Notification',
                type: 'success',
                text: 'Order placed'
            });
            this.$router.push('/');
            this.$store.commit("deleteCart", this.errors);
        },
        getConstrainsAddress() {
            return {
                street: {
                    presence: true,
                    length: {
                        minimum: 6,
                        message: "must be at least 6 characters"
                    }
                },
                country: {
                    presence: true,
                    length: {
                        minimum: 6,
                        message: "must be at least 6 characters"
                    }
                },
                state: {
                    presence: true,
                    length: {
                        minimum: 6,
                        message: "must be at least 6 characters"
                    }
                },
                city: {
                    presence: true,
                    length: {
                        minimum: 6,
                        message: "must be at least 6 characters"
                    }
                },
                zipcode: {
                    presence: true,
                    numericality: true,
                    length: {
                        minimum: 6,
                        message: "must be at least 6 digits"
                    }
                }
            };
        },
        getConstrains() {
            return {
                name: {
                    presence: true,
                    length: {
                        minimum: 6,
                        message: "must be at least 6 characters"
                    }
                },
                email: {
                    presence: true,
                    email: true
                },
                phone: {
                    presence: true,
                    numericality: true,
                    length: {
                        minimum: 10,
                        message: "must be at least 10 digits"
                    }
                }
            };
        },
        getConstrainsCart() {
            return {
                number: {
                    presence: true,
                    numericality: true,
                    length: {
                        minimum: 16,
                        message: "must be at least 16 digits"
                    }
                },
                month: {
                    presence: true,
                    numericality: true,
                    length: {
                        minimum: 2,
                        message: "must be at least 2 digits"
                    }
                },
                year: {
                    presence: true,
                    numericality: true,
                    length: {
                        minimum: 2,
                        message: "must be at least 2 digits"
                    }
                },
                cvc: {
                    presence: true,
                    numericality: true,
                    length: {
                        minimum: 3,
                        message: "must be at least 3 digits"
                    }
                }
            };
        }

    }
}
</script>

<style scoped="scoped">
    .btn-wrapper {
        text-align: right;
        margin-bottom: 20px;
    }

      .errors{
        background: lightcoral;
        border-radius: 5px;
        padding: 21px 0 2px 0;
      }
</style>
