<template>
  <el-container class="relative min-h-screen bg-gray-4">
    <el-aside
      class="fixed z-20 flex flex-col w-64 h-screen transition border-0 border-r border-solid border-gray-5"
      :style="{
        width: !isAsideCollapsed ? '16rem' : '4rem',
      }"
    >
      <el-header class="flex items-center flex-none w-full p-0 transition">
        <img src="@/assets/app.png" class="h-full" alt="logo" title="logo" />
        <span v-show="!isAsideCollapsed" class="text-xl font-bold transition">
          {{ pkg.name }}
        </span>
      </el-header>
      <el-menu
        class="flex-auto w-full py-5 transition border-0"
        :collapse="isAsideCollapsed"
        :default-active="defaultActive"
        router
      >
        <el-menu-item v-for="item of menuItems" :key="item.path" :index="item.path">
          <i
            v-if="item.meta && item.meta.icon && item.meta.icon.startsWith('el-icon-')"
            :class="item.meta.icon"
          />
          <Icon
            v-if="item.meta && item.meta.icon && !item.meta.icon.startsWith('el-icon-')"
            :icon="item.meta.icon"
            class="el-icon-"
          />
          <span slot="title">
            {{
              item.meta && item.meta.i18nKey
                ? $t(item.meta.i18nKey)
                : item.meta && item.meta.name
                ? item.meta.name
                : ''
            }}
          </span>
        </el-menu-item>
      </el-menu>
      <el-footer
        class="flex-none w-full transition bg-white cursor-pointer center"
        @click.native="handleToggleIsAsideCollapsed"
      >
        <transition name="mode-fade" mode="out-in">
          <i v-if="!isAsideCollapsed" key="left" class="el-icon-d-arrow-left" />
          <i v-else key="right" class="el-icon-d-arrow-right" />
        </transition>
      </el-footer>
    </el-aside>
    <el-container class="relative flex-col min-h-screen">
      <el-header
        class="fixed z-10 flex items-center justify-end flex-none w-full bg-white"
      ></el-header>
      <router-view />
    </el-container>
    <el-backtop />
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api';
import { useRouter, useRoute } from 'vue2-helpers/vue-router';
import { Icon } from '@iconify/vue2';
import { getIsAsideCollapsed, setIsAsideCollapsed } from '@/utils';
import pkg from '@/../package.json';

export default defineComponent({
  components: {
    Icon,
  },
  setup() {
    const router = useRouter();
    const menuItems = (router.options.routes?.[0]?.children ?? [])
      .filter((item) => item.path !== '404')
      .map((item) => ({
        ...item,
        path: `/${item.path}`,
      }))
      .map((parent) => ({
        ...parent,
        children: (parent.children ?? []).map((child) => ({
          ...child,
          path: `${parent.path}/${child.path}`,
        })),
      }));

    const route = useRoute();
    const defaultActive = computed(
      () => menuItems.find((item) => item.path.includes(route.path))?.path,
    );

    const isAsideCollapsed = ref(getIsAsideCollapsed());
    const handleToggleIsAsideCollapsed = () => {
      isAsideCollapsed.value = !isAsideCollapsed.value;
      setIsAsideCollapsed(isAsideCollapsed.value);
    };

    return {
      pkg,
      menuItems,
      defaultActive,
      isAsideCollapsed,
      handleToggleIsAsideCollapsed,
    };
  },
});
</script>

<style scoped lang="scss">
.el-container {
  > .el-header,
  > .el-main,
  > .el-footer {
    padding-left: 276px;
  }

  > .el-main {
    width: 100%;
    padding-top: 80px;
  }
}
</style>
