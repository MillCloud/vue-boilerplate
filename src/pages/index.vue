<template>
  <el-main>
    <el-row flex="~" m="y-0" class="justify-center items-center">
      <h6 class="prose-lg">这里是首页</h6>
    </el-row>
    <el-row v-if="isElectron" m="y-0" class="justify-center items-center">
      <el-button m="t-2" @click="handleCloseElectronWindow">
        Electron 环境 - 关闭应用
      </el-button>
    </el-row>
  </el-main>
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
