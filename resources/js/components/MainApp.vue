<template>
  <div id="main">
    <Header/>
      <div class="content">
        <router-view></router-view>
      </div>
      <div class="content">
      </div>
  </div>
</template>

<script>
import Header from './Header.vue'
import Home from './Home.vue'
import Login from './auth/Login.vue'
  export default{
  name: 'main-app',
  components: {Header,Home,Login}
  }
</script>
