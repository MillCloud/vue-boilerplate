import { getCurrentInstance } from '@vue/composition-api';
import type { Store } from 'vuex';
import type { RootState } from '@/store';

export function useStore() {
  const vm = getCurrentInstance();
  if (!vm) throw new Error('Vue composition-api must be called in setup.');
  return vm.proxy.$store as Store<RootState>;
}
