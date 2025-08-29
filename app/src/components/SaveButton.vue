<template>
  <button
    class="inline-block py-1 px-3 mt-1 h-8 text-sm font-normal text-center text-white bg-green7 hover:bg-green6 rounded-sm focus:outline-none"
    style="width: fit-content"
  >
    {{ buttontext }}
  </button>
</template>

<script setup lang="ts">
defineProps({
  buttontext: {
    default: 'Save',
    type: String,
  },
});
</script>
