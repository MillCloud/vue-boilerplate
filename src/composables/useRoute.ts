import { getCurrentInstance, computed } from '@vue/composition-api';

export function useRoute() {
  const vm = getCurrentInstance();
  if (!vm) {
    throw new Error('useRoute() must be called in setup.');
  }
  return computed(() => vm.proxy.$route);
}
