<template>
  <div
    class="grid fixed z-50 place-content-center w-screen h-screen"
    style="background-color: rgba(30, 41, 59, 0.5)"
  >
    <div class="shadow-lg">
      <div class="mb-1 text-xs text-gray-200">
        Search cards
      </div>
      <input
        ref="search"
        v-model="searchQuery"
        v-click-away="onClickAway"
        type="text"
        class="px-3 w-96 h-14 text-2xl bg-white border-b-2 border-slate-300 outline-none"
        data-cy="search-input"
        @keyup="triggerSearch"
      >
      <div
        v-for="result in searchResults"
        :key="result.id"
        data-cy="result-item"
        class="flex w-96 h-12 text-xl bg-white border-slate-600 border-b-1"
      >
        <a
          :href="`/board/${result.boardId}?card=${result.id}`"
          class="place-self-center py-3 px-3 w-full h-full"
        >
          {{ result.name }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useStore } from '@/store/store';
import { storeToRefs } from 'pinia';

const { searchCard, toggleSearch } = useStore();
const { searchResults } = storeToRefs(useStore());
const triggerSearch = () => {
  if (searchQuery.value?.length) {
    searchCard(searchQuery.value);
  }
 else {
    searchResults.value = [];
  }
};

const search = ref();
const searchQuery = ref();
const onClickAway = () => {
  toggleSearch(false);
};
onMounted(() => {
  search.value.focus();
});
</script>
