<template>
  <div class="grid z-10 grid-cols-2 gap-x-8 items-stretch px-20 h-screen">
    <div class="grid content-center">
      <h1 class="mb-8 text-3xl font-bold">
        Get started!
      </h1>
      <p>Go ahead and create your first board!</p>
      <input
        v-model="newBoardTitle"
        type="text"
        data-cy="first-board"
        class="px-2 mt-4 w-full h-8 bg-white rounded-sm border-2"
        placeholder="Name of your first board"
        name="newBoard"
        @keyup.enter.prevent="redirectToNewBoard()"
      >
    </div>
    <img
      class="gap-x-5 self-center place-self-center"
      src="@/assets/start.png"
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '@/store/store';
import { useRouter } from 'vue-router';
const router = useRouter();

const newBoardTitle = ref('');
const { createBoard } = useStore();
const redirectToNewBoard = async () => {
  const { id } = await createBoard(newBoardTitle.value);
  router.push(`/board/${id}`);
};
</script>
