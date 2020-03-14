<template>
  <div class="product-view">
    <form @submit.prevent="edit">
      <table class="table">
        <tr>
          <th>Name</th>
          <td>
            <input type="text" class="form-control" v-model="product.name" placeholder="Product Name">
          </td>
        </tr>
          <tr>
            <th>Description</th>
            <td>
              <input type="text" class="form-control" v-model="product.description" placeholder="Product description">
            </td>
          </tr>
            <tr>
              <th>Price</th>
              <td>
                <input type="number" step=".01" class="form-control" v-model="product.price" placeholder="Product price">
              </td>
            </tr>
            <tr>
              <td>
                <router-link to="/admin/products" class="btn">Cancel</router-link>
              </td>
              <td class="text-right">
                <input type="submit"  value="Edit" class="btn btn-primary">
              </td>
            </tr>
      </table>
    </form>
    <div class="errors" v-if="errors">
      <ul>
        <li v-for="(fieldsError,fieldName) in errors" :key="fieldName">
          <strong>{{ fieldName }}</strong> {{ fieldsError.join('\n') }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import validate from 'validate.js'
  export default{
    name:'view',
    mounted(){
        axios.get(`/api/products/${this.$route.params.id}`)
        .then((response) =>{
          this.product = response.data.product;
        });

    },
    data(){
      return{
        product:{
          name: '',
          description: '',
          price: ''
        },
        errors: null
      }
    },
    computed:{
      currentUser(){
        return this.$store.getters.currentUser;
      },
      products(){
        return this.$store.getters.products;
      }
    },
    methods: {
        edit(){
          this.errors = null;
          const constrains = this.getConstrains();
          const errors = validate(this.$data.product,constrains);
          if(errors){
            this.errors = errors;
            return;
          }
          //Send de customer data to the BE API
          axios.post('/api/products/edit', this.$data.product)
          .then((response)=>{
            this.$store.dispatch('getProducts');
            this.$router.push('/admin/products');
            this.$notify({
                group: 'foo',
                title: 'Notification',
                type: 'success',
                text: 'Updated product'
            });
          });

        },
        getConstrains(){
          return {
            name: {
              presence: true,
              length: {
                minium: 3,
                message: 'Must be a least 3 characters long'
              }
            },
              description: {
                presence: true,
                length: {
                  minium: 15,
                  message: 'Must be a least 15 characters long'
                }
              },
                price: {
                  presence: true
                }
          };
        }
    }
  }
</script>
<style scoped>
.product-view{
  display:flex;
  aling-items: center;
}
.prduct-info{
  flex: 3;
  overflow-x: scroll;
}
</style>
