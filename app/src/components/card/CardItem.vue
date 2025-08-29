<template>
  <div
    data-cy="card"
    class="grid relative p-2 my-1.5 w-full bg-white hover:bg-gray1 rounded border border-gray1 border-solid drop-shadow-sm cursor-pointer card"
    @click="showCardModule(card.id, true)"
  >
    <div class="flex px-1.5 pl-0.5">
      <Checkbox :card="card" />
      <div
        class="flex-grow pl-2 text-sm text-gray-800 select-none"
        style="white-space: break-spaces"
        data-cy="card-text"
      >
        {{ card.name }}
      </div>
      <Pen class="hidden absolute top-2 right-2 p-1 w-5 h-5 text-gray-700 bg-gray1 bg-opacity-60 pen" />
    </div>
    <div
      class="py-1 px-1.5 mt-1 w-[fit-content] text-xs rounded-sm"
      data-cy="due-date"
      :class="card.completed ? 'completed' : overdue(card) ? 'overdue' : 'text-gray9'"
    >
      <Clock class="inline-block w-4 h-4 fill-current" />
      <span class="ml-2">{{ new Date(card.deadline).toDateString().substring(4) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { useStore } from '@/store/store';
import Card from '@/typings/card';
import Checkbox from '@/components/Checkbox.vue';
import Clock from '@/assets/icons/clock.svg';
import Pen from '@/assets/icons/pen.svg';
import moment from 'moment';

defineProps({
  card: {
    default: null,
    type: Object as PropType<Card>,
  },
});

const { showCardModule } = useStore();

const overdue = (card: Card) => {
  return card.deadline && moment(card.deadline).diff(moment().startOf('day'), 'days') < 1;
};
</script>

<style lang="postcss" scoped>
.card:hover .pen {
  display: inline-block;
}

.overdue {
  @apply bg-red-500 text-white;
}

.completed {
  @apply bg-green5 text-white;
}
</style>
