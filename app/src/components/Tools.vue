<template>
  <div
    class="fixed right-0 bottom-0 p-5 m-3 rounded-sm"
    style="background: rgb(0 0 0 / 0.1)"
    data-cy="api-tools"
  >
    Reset application:
    <button
      class="px-1 m-1 bg-white border border-black"
      @click="
        reset();
        router.push('/');
      "
    >
      All
    </button>
    <button
      class="px-1 m-1 bg-white border border-black"
      @click="
        resetBoards();
        router.push('/');
      "
    >
      Boards
    </button>
    <button
      class="px-1 m-1 bg-white border border-black"
      @click="resetLists()"
    >
      Lists
    </button>
    <button
      class="px-1 m-1 bg-white border border-black"
      @click="resetCards()"
    >
      Cards
    </button>
    <button
      class="px-1 m-1 bg-white border border-black"
      @click="resetUsers()"
    >
      Users
    </button>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store/store';
import { useRouter } from 'vue-router';

const { reset, resetBoards, resetLists, resetCards, resetUsers } = useStore();

const router = useRouter();
</script>
