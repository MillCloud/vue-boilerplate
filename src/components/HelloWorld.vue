<template>
  <v-row>
    <v-col cols="12">
      <h3 class="text-h3 text-center">{{ msg }}</h3>
    </v-col>
    <v-col cols="12">
      <p class="text-center">
        For a guide and recipes on how to configure / customize this project,
        check out the
        <a
          href="https://cli.vuejs.org"
          target="_blank"
          rel="noopener noreferrer"
          >vue-cli documentation</a
        >
      </p>
    </v-col>
    <v-col cols="12">
      <h6 class="text-h6 text-center">Installed CLI Plugins</h6>
    </v-col>
    <v-col cols="12" class="text-center">
      <a
        class="mx-2"
        href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel"
        target="_blank"
        rel="noopener noreferrer"
        >babel</a
      >
      <a
        class="mx-2"
        href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-router"
        target="_blank"
        rel="noopener noreferrer"
        >router</a
      >
      <a
        class="mx-2"
        href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-vuex"
        target="_blank"
        rel="noopener noreferrer"
        >vuex</a
      >
      <a
        class="mx-2"
        href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint"
        target="_blank"
        rel="noopener noreferrer"
        >eslint</a
      >
      <a
        class="mx-2"
        href="https://github.com/vuetifyjs/vue-cli-plugins/tree/master/packages/vue-cli-plugin-vuetify#readme"
        target="_blank"
        rel="noopener noreferrer"
        >i18n</a
      >
      <a
        v-if="isElectron"
        class="mx-2"
        href="https://github.com/vuetifyjs/vue-cli-plugins/tree/master/packages/vue-cli-plugin-vuetify#readme"
        target="_blank"
        rel="noopener noreferrer"
        >electron-builder</a
      >
      <a
        class="mx-2"
        href="https://github.com/vuetifyjs/vue-cli-plugins/tree/master/packages/vue-cli-plugin-vuetify#readme"
        target="_blank"
        rel="noopener noreferrer"
        >vuetify</a
      >
    </v-col>
    <v-col cols="12">
      <h6 class="text-h6 text-center">Ecosystem</h6>
    </v-col>
    <v-col cols="12" class="text-center">
      <a
        class="mx-2"
        href="https://cn.vuejs.org"
        target="_blank"
        rel="noopener noreferrer"
        >vue</a
      >
      <a
        class="mx-2"
        href="https://router.vuejs.org/zh/"
        target="_blank"
        rel="noopener noreferrer"
        >vue-router</a
      >
      <a
        class="mx-2"
        href="https://vuex.vuejs.org/zh/"
        target="_blank"
        rel="noopener noreferrer"
        >vuex</a
      >
      <a
        class="mx-2"
        href="https://vueuse.js.org/"
        target="_blank"
        rel="noopener noreferrer"
        >vue-use</a
      >
      <a
        class="mx-2"
        href="https://github.com/vuejs/vue-devtools#vue-devtools"
        target="_blank"
        rel="noopener noreferrer"
        >vue-devtools</a
      >
      <a
        class="mx-2"
        href="https://vue-loader.vuejs.org/zh/"
        target="_blank"
        rel="noopener noreferrer"
        >vue-loader</a
      >
      <a
        class="mx-2"
        href="https://vuetifyjs.com"
        target="_blank"
        rel="noopener noreferrer"
        >vuetify</a
      >
      <a
        class="mx-2"
        href="https://github.com/vuejs/awesome-vue#readme"
        target="_blank"
        rel="noopener noreferrer"
        >awesome-vue</a
      >
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      default: () => '',
    },
  },
  computed: {
    ...mapState({
      isElectron: (state) => state.isElectron,
    }),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/* stylelint-disable declaration-no-important */
ul {
  padding: 0 !important;
  list-style-type: none;
}

li {
  display: inline-block;
  margin: 0 10px;
}
</style>
