<template>
  <div
    v-if="notification.show"
    class="absolute bottom-5 left-5 z-50 min-w-min h-14 text-base bg-white rounded-sm shadow-xl"
    data-cy="notification-message"
  >
    <Error
      v-if="notification.error"
      class="inline-block ml-4 w-6 h-6 text-red-500 fill-current"
      data-cy="error-icon"
    />
    <Info
      v-else
      class="inline-block ml-4 w-4 h-4 text-blue-500 fill-current"
      data-cy="info-icon"
    />
    <div class="inline-block m-4 text-black">
      {{ notification.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store/store';
import Error from '@/assets/icons/error.svg';
import Info from '@/assets/icons/info.svg';
import { storeToRefs } from 'pinia';
const { notification } = storeToRefs(useStore());
</script>
