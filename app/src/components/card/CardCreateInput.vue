<template>
  <div
    v-click-away="onClickAway"
    class="grid w-full cursor-pointer"
  >
    <textarea
      ref="cardCreate"
      v-model="cardTitle"
      class="py-1 px-2 w-full h-16 text-sm rounded border-b border-gray7 outline-none resize-none"
      data-cy="new-card-input"
      placeholder="Enter a title for this card..."
      @keydown.enter.prevent="addCard"
      @keyup.esc.prevent="
        emit('toggleInput', false);
        cardTitle = '';
      "
    />
    <div>
      <SaveButton
        buttontext="Add card"
        @click="addCard"
      />
      <Cross
        data-cy="cancel"
        class="inline-block order-last p-1 mx-0.5 w-8 h-8 text-gray-600 fill-current"
        @click.stop="
          emit('toggleInput', false);
          cardTitle = '';
        "
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, onMounted } from 'vue';
import { useStore } from '@/store/store';
import Cross from '@/assets/icons/cross.svg';
import List from '@/typings/list';
import SaveButton from '@/components/SaveButton.vue';
import { storeToRefs } from 'pinia';

const props = defineProps({
  list: {
    default: null,
    type: Object as PropType<List>,
  },
});

const emit = defineEmits(['toggleInput']);

const { board } = storeToRefs(useStore());
const cardCreate = ref();
const { createCard } = useStore();
let cardTitle = ref('');

const addCard = () => {
  if (!cardTitle.value) {
    return;
  }
  createCard({
    boardId: board.value.id,
    listId: props.list.id,
    name: cardTitle.value,
  });
  cardTitle.value = '';
};

const onClickAway = () => {
  emit('toggleInput', false);
  cardTitle.value = '';
};

onMounted(() => {
  cardCreate.value.focus();
});
</script>
