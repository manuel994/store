<template >
    <div class="item-container">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
                </div>
            </div>
            <div class="row">
              <br>
              <div class="col-md-6 offset-md-3">
                  <div class="product-title"><strong>{{ product.name }}</strong></div>
                  <div class="product-desc">{{ product.description }}</div>
                  <hr>

                  <div class="product-price"><label>Price</label>  $ {{ product.price }}</div>
                  <hr>
                  <div class="form-group">
                    <label for="" class="form-control label text-center">Quantity</label>
                    <input type="number" v-model="quantity" class="form-control">
                  </div>
                  <div class="btn-toolbar" role="toolbar">
                   <div class="btn-group mr-2 " role="group">
                    <button href="#" v-on:click="addItem(`${product.id}`)" class="btn btn-primary btn-sm form-control">Add product</button>
                  </div>
                     <div class="btn-group mr-2" role="group">
                    <router-link to="/cart" class="btn btn-success   btn-sm form-control">Check out</router-link>
                  </div>
                  </div>
              </div>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
import validate from 'validate.js'
  export default{
    name:'view',
    mounted(){
        axios.get(`/api/products/${this.$route.params.id}/details`)
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
        errors: null,
        quantity: 1
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
        addItem(id) {
            axios.get(`/api/products/${id}`)
                .then((response) => {
                    this.product = response.data.product;
                    this.product.quantity = this.quantity;
                    this.$store.commit("addItem", this.product);
                    this.$notify({
                      group: 'foo',
                      title: 'Notification',
                      type: 'success',
                      text: 'Product added'});
                });
        }
    }
  }

</script>

<style scoped>
.item-container{
  display:flex;
  aling-items: center;
}
</style>
