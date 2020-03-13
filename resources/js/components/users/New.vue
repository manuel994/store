<template>
  <div class="user-new">
    <form @submit.prevent="add">
      <table class="table">
        <tr>
          <th>Name</th>
          <td>
            <input type="text" class="form-control" v-model="user.name" placeholder="User Name">
          </td>
        </tr>
          <tr>
            <th>Email</th>
            <td>
              <input type="email" class="form-control" v-model="user.email" placeholder="User Email" autocomplete="off">
            </td>
          </tr>
            <tr>
              <th>Password</th>
              <td>
                <input type="password" class="form-control" v-model="user.password" placeholder="User Password" autocomplete="off" >
              </td>
            </tr>
            <tr>
              <td>
                <router-link to="/admin/users" class="btn">Cancel</router-link>
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
        user:{
          name: '',
          email: '',
          password: ''
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
        const errors = validate(this.$data.user,constrains);
        if(errors){
          this.errors = errors;
          return;
        }
        //Send de customer data to the BE API
        axios.post('/api/users/new', this.$data.user)
        .then((response)=>{
          this.$store.dispatch('getUsers');
          this.$router.push('/admin/users');
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
              password: {
                presence: true,
                length: {
                  minium: 8,
                  message: 'Must be a least 8 characters long'
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
