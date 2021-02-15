<template>
  <v-app>
    <v-app-bar app flat>
      <span class="mr-8 title">boilerplate-vue</span>
      <router-link to="/" exact>Index</router-link>
      <router-link to="/home" exact class="ml-2">Home</router-link>
    </v-app-bar>
    <v-navigation-drawer app>
      <v-toolbar flat>
        <v-toolbar-title class="title">boilerplate-vue</v-toolbar-title>
      </v-toolbar>
    </v-navigation-drawer>
    <router-view />
    <v-footer app class="justify-center">
      <a
        class="mx-2"
        href="https://github.com/MillCloud/boilerplate-vue#readme"
        target="_blank"
        rel="noopener noreferrer"
      >
        Github
      </a>
      <a
        class="mx-2"
        href="https://gitee.com/MillCloud/boilerplate-vue#readme"
        target="_blank"
        rel="noopener noreferrer"
      >
        Gitee
      </a>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    isIndex() {
      return this.$route.name === 'Index';
    },
    isHome() {
      return this.$route.name === 'Home';
    },
  },
};
</script>
