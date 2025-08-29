<template>
  <div
    v-if="createListInput"
    v-click-away="onClickAway"
    class="grid py-1 px-1.5 ml-3 w-list bg-gray2 rounded-sm shadow-md cursor-pointer"
  >
    <input
      ref="listCreate"
      v-model="listTitle"
      class="py-2 px-2 w-full h-9 text-sm rounded-sm border-2 border-transparent focus:border-blue6 outline-none"
      data-cy="add-list-input"
      placeholder="Enter list title..."
      @keyup.enter.prevent="addList()"
      @keyup.esc.prevent="
        createListInput = false;
        listTitle = '';
      "
    >
    <div>
      <SaveButton
        buttontext="Add list"
        @click="addList()"
      />
      <Cross
        class="inline-block order-last p-1 mx-0.5 w-8 h-8 text-gray-600 fill-current"
        data-cy="cancel"
        @click.stop="
          createListInput = false;
          listTitle = '';
        "
      />
    </div>
  </div>
  <div
    v-else
    class="p-2.5 ml-3 w-list text-sm text-gray-50 bg-white bg-opacity-20 hover:bg-opacity-30 rounded cursor-pointer flex-no-shrink"
    data-cy="create-list"
    @click="enableInput()"
  >
    <Plus class="inline-block w-3 h-3" /> {{ !lists.length ? 'Add a list' : 'Add another list' }}
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, nextTick } from 'vue';
import { useStore } from '@/store/store';
import Board from '@/typings/board';
import Cross from '@/assets/icons/cross.svg';
import Plus from '@/assets/icons/plus.svg';
import SaveButton from '@/components/SaveButton.vue';
import { storeToRefs } from 'pinia';

defineProps({
  board: {
    default: null,
    type: Number as PropType<Board['id']>,
  },
});

const { board, createListInput, lists } = storeToRefs(useStore());
const { createList } = useStore();
const listTitle = ref('');
const listCreate = ref();

const addList = () => {
  if (!listTitle.value) {
    return;
  }

  const boardId = board.value.id;
  const name = listTitle.value;

  createList(boardId, name);

  listTitle.value = '';
};

const enableInput = () => {
  createListInput.value = true;
  nextTick(() => {
    listCreate.value.focus();
  });
};
const onClickAway = () => {
  createListInput.value = false;
  listTitle.value = '';
};
</script>
