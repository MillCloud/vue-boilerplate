import { getCurrentInstance } from '@vue/composition-api';

export function useStore() {
  const vm = getCurrentInstance();
  if (!vm) throw new Error('Vue composition-api must be called in setup.');
  return vm.proxy.$store;
}
