<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <BlogSpace msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import BlogSpace from '@/components/BlogSpace.vue'

export default {
  name: 'Home',
  components: {
    BlogSpace
  }
}
</script>
