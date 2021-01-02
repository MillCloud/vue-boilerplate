<template>
  <v-main>
    <v-container fluid>
      <v-row justify="center" align="center" class="my-0">
        <h6 class="text-h6">这里是首页</h6>
      </v-row>
      <v-row justify="center" align="center" class="my-0">
        <v-btn
          v-if="isElectron"
          class="mt-2"
          @click="handleCloseElectronWindow"
        >
          Electron 环境 - 关闭应用
        </v-btn>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      isElectron: (state) => state.isElectron,
    }),
  },
  methods: {
    handleCloseElectronWindow() {
      window.ipcRenderer.send('window-closed');
    },
  },
};
</script>
