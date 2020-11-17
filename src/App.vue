<template>
  <div id="app" class="text-center">
    <div class="nav">
      <router-link to="/" class="mr-2"> Home </router-link>
      |
      <router-link to="/about" class="ml-2"> About </router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.nav {
  padding: 30px;

  a {
    font-weight: 700;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
