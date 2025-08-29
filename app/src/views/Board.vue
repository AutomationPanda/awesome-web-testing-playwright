<template>
  <div class="bg-blue6">
    <CardDetail v-if="cardModule" />
    <BoardDetail />
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store/store';
import BoardDetail from '@/components/board/BoardDetail.vue';
import CardDetail from '@/components/card/CardDetail.vue';
import { storeToRefs } from 'pinia';

const { cardModule } = storeToRefs(useStore());
</script>
