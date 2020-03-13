<template>
  <div class="customer-view" v-if="customer">
    <div class="user-info">
      <table class="table">
        <tr>
          <th>ID</th>
          <td>{{ customer.id }}</td>
        </tr>
          <tr>
            <th>Name</th>
            <td>{{ customer.name }}</td>
          </tr>
            <tr>
              <th>Email</th>
              <td>{{ customer.email }}</td>
            </tr>
      </table>
      <router-link to="/customers">Back to all customers</router-link>
    </div>
  </div>
</template>

<script>
  export default{
    name:'view',
    created(){
      if(this.customers.lenght){
        this.customers = this.customers.find((customer)=> customer.id == this.$route.params.id );
      }else{
        axios.get(`/api/customers/${this.$route.params.id}`)
        .then((response) =>{
          this.customer = response.data.customer;
        });
      }
    },
    data(){
      return{
        customer: null
      }
    },
    computed:{
      currentUser(){
        return this.$store.getters.currentUser;
      },
      customers(){
        return this.$store.getters.customers;
      }
    }
  }
</script>
<style scoped>
.customer-view{
  display:flex;
  aling-items: center;
}
.user-info{
  flex: 3;
  overflow-x: scroll;
}
</style>
