<template>
  <div class="customer-new">
    <form @submit.prevent="add">
      <table class="table">
        <tr>
          <th>Name</th>
          <td>
            <input type="text" class="form-control" v-model="customer.name" placeholder="Customer Name">
          </td>
        </tr>
          <tr>
            <th>Email</th>
            <td>
              <input type="email" class="form-control" v-model="customer.email" placeholder="Customer Email">
            </td>
          </tr>
            <tr>
              <th>Phone</th>
              <td>
                <input type="text" class="form-control" v-model="customer.phone" placeholder="Customer Phone">
              </td>
            </tr>
            <tr>
              <td>
                <router-link to="/customers" class="btn">Cancel</router-link>
              </td>
              <td class="text-right">
                <input type="submit"  value="Create" class="btn btn-primary">
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
    name: 'new',
    data(){
      return {
        customer:{
          name: '',
          email: '',
          phone: ''
        },
        errors: null
      };
    },
    computed:{
      currentUser(){
        return this.$store.getters.currentUser;
      }
    },
    methods:{
      add(){
        this.errors = null;
        const constrains = this.getConstrains();
        const errors = validate(this.$data.customer,constrains);
        if(errors){
          this.errors = errors;
          return;
        }
        //Send de customer data to the BE API
        axios.post('/api/customers/new', this.$data.customer)
        .then((response)=>{
          this.$store.dispatch('getCustomers');
          this.$router.push('/customers');
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
            email: {
              presence: true,
              email: true
            },
              phone: {
                presence: true,
                numericality: true,
                length: {
                  minium: 10,
                  message: 'Must be a least 10 digits long'
                }
              }
        };
      }
    }
  }
</script>

<style >
  .errors{
    background: lightcoral;
    border-radius: 5px;
    padding: 21px 0 2px 0;
  }
</style>
