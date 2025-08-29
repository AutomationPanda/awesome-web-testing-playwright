<template>
  <div
    v-click-away="onClickAway"
    data-cy="create-board"
    class="create-board"
    :class="{ 'hover:bg-gray7': !newBoardInputActive }"
    @click.prevent="focusNewBoardInput"
  >
    <h1 v-show="!newBoardInputActive">
      Create new board
    </h1>
    <input
      v-show="newBoardInputActive"
      ref="boardCreateInput"
      v-model="newBoardTitle"
      class="new-board-input"
      data-cy="new-board-input"
      placeholder="Add board title"
      @keyup.enter.prevent="redirectToNewBoard()"
    >
    <div
      v-show="newBoardInputActive"
      class="active"
    >
      <Cross
        class="icon"
        @click.stop="inputVisible(false)"
      />
      <SaveButton
        data-cy="new-board-create"
        buttontext="Create board"
        @click.stop="redirectToNewBoard()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue';
import { useStore } from '@/store/store';
import { useRouter } from 'vue-router';
import Cross from '@/assets/icons/cross.svg';
import SaveButton from '@/components/SaveButton.vue';

let newBoardTitle = ref();
let newBoardInputActive = ref(false);
const boardCreateInput = ref();
const router = useRouter();
const { createBoard } = useStore();
const inputVisible = (flag: boolean) => {
  newBoardInputActive.value = flag;
};
const onClickAway = () => {
  inputVisible(false);
  newBoardTitle.value = '';
};
const focusNewBoardInput = () => {
  inputVisible(true);
  nextTick(() => {
    boardCreateInput.value.focus();
  });
};

const redirectToNewBoard = async () => {
  const board = await createBoard(newBoardTitle.value);
  board?.id && router.push(`/board/${board.id}`);
};
</script>
<style lang="postcss" scoped>
h1 {
  @apply text-white;
}

.active {
  @apply flex
    flex-row-reverse
    items-end
    justify-items-end;
}

.new-board-input {
  @apply border-2 border-transparent
    focus:border-blue6
    h-9
    outline-none
    px-2
    rounded-sm
    w-full;
}

.create-board {
  @apply bg-gray6
    cursor-pointer 
    grid 
    h-36 
    px-4 
    py-3 
    rounded-sm
    w-72;
}

.icon {
  @apply fill-current
    h-9
    mx-1
    order-last
    px-2
    text-gray-600
    w-9;
}
</style>
