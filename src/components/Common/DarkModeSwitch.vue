<script setup lang="ts" name="DarkModeSwitch">
  import { computed } from 'vue';

  interface Props {
    /** 暗黑模式 */
    dark?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    dark: false,
  });

  const emit = defineEmits<Emits>();

  interface Emits {
    (e: 'update:dark', darkMode: boolean): void;
  }

  const darkMode = computed({
    get() {
      return props.dark;
    },
    set(newValue: boolean) {
      emit('update:dark', newValue);
    },
  });

  function handleSwitch() {
    darkMode.value = !darkMode.value;
  }
</script>

<template>
  <div class="flex-center text-18px cursor-pointer" @click="handleSwitch">
    <i v-if="darkMode" class="i-line-md:moon" />
    <i v-else class="i-line-md:sunny-outline" />
  </div>
</template>

<style scoped></style>
