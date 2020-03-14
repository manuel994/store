<template>
  <div id="main">
    <Header/>
      <div class="content">
        <router-view></router-view>
      </div>
      <div class="content">
      </div>
      <div class="content">
        <notifications group="foo" />
      </div>
  </div>
</template>

<script>
import Header from './Header.vue'
import Home from './Home.vue'
  export default{
  name: 'main-app',
  components: {Header,Home}
  }
</script>
