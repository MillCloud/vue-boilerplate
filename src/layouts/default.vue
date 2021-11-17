<template>
  <el-container class="relative min-h-screen bg-gray-4">
    <el-aside
      class="fixed z-20 flex flex-col w-64 h-screen transition border-0 border-r border-solid border-gray-5"
      :style="{
        width: !isAsideCollapsed ? '256px' : '64px',
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
        router
        :collapse="isAsideCollapsed"
        :default-active="defaultActive"
      >
        <template v-for="item of menuItems">
          <template
            v-if="
              item.meta && !item.meta.isChildrenHidden && item.children && item.children.length > 0
            "
          >
            <el-submenu :key="item.path" :index="item.path">
              <template slot="title">
                <i
                  v-if="item.meta && item.meta.icon && item.meta.icon.startsWith('el-icon-')"
                  :class="item.meta.icon"
                />
                <Icon
                  v-if="item.meta && item.meta.icon && !item.meta.icon.startsWith('el-icon-')"
                  :icon="item.meta.icon"
                  class="el-icon-"
                />
                <span>
                  {{ item.meta && item.meta.name ? item.meta.name : '' }}
                </span>
              </template>
              <el-menu-item v-for="child of item.children" :key="child.path" :index="child.path">
                <span slot="title">
                  {{ child.meta && child.meta.name ? child.meta.name : '' }}
                </span>
              </el-menu-item>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :key="item.path" :index="item.path">
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
                {{ item.meta && item.meta.name ? item.meta.name : '' }}
              </span>
            </el-menu-item>
          </template>
        </template>
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
    <el-container class="relative flex-col min-h-screen" :class="{ 'is-wider': isAsideCollapsed }">
      <el-header class="fixed z-10 flex-none w-full transition bg-white">
        <el-row class="flex items-center justify-between w-full h-full">
          <el-col class="flex-auto w-auto">
            <el-breadcrumb>
              <el-breadcrumb-item v-for="item of breadcrumbs" :key="item.path" :to="item.path">
                {{ item.meta.name }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
        </el-row>
      </el-header>
      <el-main class="transition">
        <keep-alive>
          <router-view v-if="$route.meta && $route.meta.keepAlive" />
        </keep-alive>
        <router-view v-if="!($route.meta && $route.meta.keepAlive)" />
      </el-main>
    </el-container>
    <el-backtop />
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api';
import { useStore } from 'vue2-helpers/vuex';
import { useRouter } from 'vue2-helpers/vue-router';
import { Icon } from '@iconify/vue2';
import pkg from '@/../package.json';
import { getIsAsideCollapsed, setIsAsideCollapsed } from '@/utils';

export default defineComponent({
  components: {
    Icon,
  },
  setup(props, { root }) {
    const store = useStore();
    const user = computed(() => store.state.user);

    const router = useRouter();
    // 不考虑多层路由，多层路由往往意味着路由设计有问题，应该重新设计路由
    const menuItems = computed(() =>
      (router.options.routes?.[0]?.children ?? [])
        // isHidden 或 isChildrenHidden 隐藏
        .filter((item) => (item?.meta?.isHidden ?? false) !== true)
        .map((parent) => ({
          ...parent,
          children: parent?.meta?.isChildrenHidden ?? false ? [] : parent?.children ?? [],
        }))
        .map((parent) => ({
          ...parent,
          children: [...(parent.children ?? [])].filter((child) => child?.meta?.isHidden !== true),
        }))
        // 限定角色
        .filter((item) => (item?.meta?.roles ?? [0, 3, 5]).includes(user.value.role))
        .map((parent) => ({
          ...parent,
          children: [...(parent.children ?? [])].filter((child) =>
            (child?.meta?.roles ?? [0, 3, 5]).includes(user.value.role),
          ),
        }))
        // 排序，sort 越小，显示越靠前，默认 0，相同的 sort 按照字典顺序排序
        .sort((itemA, itemB) => (itemA?.meta?.sort ?? 0) - (itemB?.meta?.sort ?? 0))
        .map((parent) => ({
          ...parent,
          children: [...(parent.children ?? [])].sort(
            (childA, childB) => (childA?.meta?.sort ?? 0) - (childB?.meta?.sort ?? 0),
          ),
        }))
        // 补全路径
        .map((item) => ({
          ...item,
          path: `/${item.path}`,
        }))
        .map((parent) => ({
          ...parent,
          children: [...(parent.children ?? [])].map((child) => ({
            ...child,
            path: child.path === '' ? parent.path : `${parent.path}/${child.path}`,
          })),
        })),
    );

    const defaultActive = computed(() => {
      const menuItem = menuItems.value.find(
        (item) => item.path.includes(root.$route.path) || root.$route.path.includes(item.path),
      );
      if (!menuItem) {
        return '';
      }
      if (menuItem.meta?.isChildrenHidden) {
        return menuItem.path;
      }
      const menuItemChild = menuItem.children.find((child) => child.path === root.$route.path);
      return menuItemChild ? menuItemChild.path : menuItem.path;
    });

    const breadcrumbs = computed(() =>
      root.$route.matched
        .slice(1)
        .filter((item) => (item?.meta?.isHidden ?? false) !== true)
        .filter((item) => item?.meta?.name),
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
      breadcrumbs,
      isAsideCollapsed,
      handleToggleIsAsideCollapsed,
      user,
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

  &.is-wider {
    > .el-header,
    > .el-main,
    > .el-footer {
      padding-left: 84px;
    }
  }
}
</style>
