<template>
  <div
    v-click-away="onClickAway"
    class="absolute top-11 left-2 z-10 py-2 w-dropdown bg-white rounded-sm shadow-xl"
  >
    <div class="mt-0.5 h-7 text-sm text-center text-gray-600">
      {{ header }}
    </div>
    <Cross
      class="absolute top-1 right-1 px-2 w-8 h-8 text-gray-600 cursor-pointer"
      @click="emit('close')"
    />
    <hr>
    <slot />
  </div>
</template>
<script setup lang="ts">
import Cross from '@/assets/icons/cross.svg';

defineProps({
  header: {
    default: null,
    type: String,
  },
});

const emit = defineEmits(['close']);

const onClickAway = () => {
  emit('close');
};
</script>
