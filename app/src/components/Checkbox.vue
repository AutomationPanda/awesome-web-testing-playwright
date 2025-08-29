<template>
  <label class="inline-flex items-center">
    <input
      type="checkbox"
      data-cy="card-checkbox"
      :checked="card.completed"
      @click.stop="patchCard(card, { completed: !card.completed })"
    >
  </label>
</template>

<script setup lang="ts">
import { useStore } from '@/store/store';
import Card from '@/typings/card';
import { PropType } from 'vue';
defineProps({
  card: {
    default: null,
    type: Object as PropType<Card>,
  },
});
const { patchCard } = useStore();
</script>

<style lang="postcss" scoped>
input {
  @apply text-blue5 w-4 h-4 outline-none;
}
label {
  @apply inline-flex items-center;
}
</style>
