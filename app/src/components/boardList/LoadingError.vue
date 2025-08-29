<template>
  <div
    class="place-self-center"
    data-cy="board-list-error-message"
  >
    <span class="block mb-4 text-8xl font-bold text-center text-gray-200">{{ loadingError.status }}</span>
    <p class="block mb-4 text-center text-gray-400">
      {{ loadingError.message || 'There was an error loading your boards' }}
    </p>
    <a
      href="/"
      class="block font-semibold text-center text-blue7"
    > Try again </a>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store/store';
import { storeToRefs } from 'pinia';
const { loadingError } = storeToRefs(useStore());
</script>
