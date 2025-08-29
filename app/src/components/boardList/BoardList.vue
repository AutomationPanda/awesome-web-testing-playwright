<template>
  <div
    class="grid h-screen bg-white background board-list"
    data-cy="board-list"
  >
    <!-- LOADING -->
    <Loading />
    <!-- BOARDS NOT LOADED -->
    <LoadingError v-if="state.loadingError.show" />
    <!-- BOARDS LOADED -->
    <div
      v-if="!state.loading && !state.loadingError.show"
      class="container mx-auto"
    >
      <!-- STARRED BOARDS -->
      <div v-if="state.starred.length">
        <h1
          class="inline-block py-5 mx-4 text-3xl font-semibold"
          data-cy="starred-boards"
        >
          Starred
        </h1>
        <div class="flex flex-wrap flex-grow gap-8 content-start mx-4 flex-cols-3">
          <BoardItem
            v-for="board in state.starred"
            :key="board.id"
            :board="board"
          />
          <BoardCreate v-if="!state.allBoards.length" />
        </div>
      </div>

      <!-- ALL BOARDS -->
      <div v-if="state.allBoards.length">
        <h1 class="inline-block py-5 mx-4 text-3xl font-semibold">
          My Boards
        </h1>
        <div class="flex flex-wrap flex-grow gap-8 content-start mx-4 flex-cols-3">
          <BoardItem
            v-for="board in state.allBoards"
            :key="board.id"
            :board="board"
          />
          <BoardCreate />
        </div>
      </div>
    </div>
    <Emptylist v-if="!state.loading && !state.boardList.all.length && !state.loadingError.show" />
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store/store';
import BoardCreate from '@/components/board/BoardCreate.vue';
import BoardItem from '@/components/board/BoardItem.vue';
import Emptylist from '@/components/boardList/Emptylist.vue';
import LoadingError from '@/components/boardList/LoadingError.vue';
import Loading from '@/components/Loading.vue';

const state = useStore();
state.getBoardList();
</script>
<style lang="postcss" scoped>
.board-list {
  height: calc(100vh - 40px);
}
</style>
