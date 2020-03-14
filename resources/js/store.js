import {
    getLocalUser
} from "./helpers/auth";

const user = getLocalUser();
export default {
    state: {
        currentUser: user,
        isLoggedIn: !!user,
        loading: false,
        auth_error: null,
        customers: [],
        users: [],
        products: [],
        cart: [],
        subtotal: 0

    },
    getters: {
        isLoading(state) {
            return state.loading;
        },
        isLoggedIn(state) {
            return state.isLoggedIn;
        },
        currentUser(state) {
            return state.currentUser;
        },
        authError(state) {
            return state.auth_error;
        },
        customers(state) {
            return state.customers;
        },
        users(state) {
            return state.users;
        },
        products(state) {
            return state.products;
        },
        cart(state) {
            return state.cart;
        },
        subtotal(state) {
            return state.subtotal;
        }


    },
    mutations: {
      login(state){
        state.loading = true;
        state.auth_error = null;
      },
      loginSucess(state, payload){
        state.auth_error = null;
        state.isLoggedIn = true;
        state.loading = false;
        state.currentUser = Object.assign({}, payload.user, {token: payload.access_token});
        localStorage.setItem("user", JSON.stringify(state.currentUser));
      },
      loginFailed(state, payload){
      state.loading = false;
      state.auth_error = payload.error;
    },
    logout(state){
      localStorage.removeItem("user");
      state.isLoggedIn = false;
      state.currentUser = null;

    },
    updateCustomers(state, payload){
      state.customers= payload;
    },
    updateUsers(state, payload){
      state.users= payload;
    },
    updateProducts(state, payload){
      state.products= payload;
    },
    addItem(state, payload){
      var foundIndex = null;
      foundIndex = state.cart.findIndex((product)=> product.id == payload.id );
      if (foundIndex !== -1) {
      state.cart[foundIndex].quantity = payload.quantity + state.cart[foundIndex].quantity;
    }else{
      state.cart.push(payload);
    }
    state.subtotal = 0;
    state.cart.forEach(function(product){
      state.subtotal = state.subtotal+ (product.price*product.quantity);
    });
    },
    deleteItem(state, payload){
      var foundIndex = null;
      foundIndex = state.cart.findIndex((product)=> product.id == payload.id );
      if (foundIndex !== -1) {
      state.cart[foundIndex].quantity = payload.quantity + state.cart[foundIndex].quantity;
      state.cart.splice(foundIndex, 1);
    }
    state.subtotal = 0;
    state.cart.forEach(function(product){
      state.subtotal = state.subtotal+ (product.price*product.quantity);
    });

  },
    deleteCart(state, payload){
      state.cart = [];
    }

    },
    actions: {
      login(context){
        context.commit("login");
      },
      getCustomers(context){
        axios.get('/api/customers')
        .then((response)=>{
          context.commit('updateCustomers', response.data.customers);
        })
      },
      getUsers(context){
        axios.get('/api/users')
        .then((response)=>{
          context.commit('updateUsers', response.data.users);
        })
      },
      getProducts(context){
        axios.get('/api/products')
        .then((response)=>{
          context.commit('updateProducts', response.data.products);
        })
      }
    }
};
