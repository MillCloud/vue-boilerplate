<template>
  <v-app>
    <v-app-bar app>
      <router-link to="/" exact class="mr-2">Home</router-link>
      |
      <router-link to="/about" exact class="ml-2">About</router-link>
    </v-app-bar>
    <router-view />
  </v-app>
</template>

<script>
export default {};
</script>
