<template>
  <div
    class="w-full h-40 border-4 border-gray-400 border-dashed"
    data-cy="upload-image"
    :class="isDragActive && 'border-gray-800'"
    accept="image/png, image/gif, image/jpeg"
    @dragenter.prevent="dragActive"
    @dragleave.prevent="dragInactive"
    @dragover.prevent
    @drop.prevent="drop"
  >
    <div class="grid justify-center items-center w-full h-32 min-h-full">
      <Dropicon
        class="place-self-end w-48 text-gray-400 fill-current"
        :class="isDragActive && 'fill-current text-gray-800'"
      />
      <div
        class="min-w-min text-center text-gray-400"
        :class="isDragActive && 'text-gray-800'"
      >
        {{ isDragActive ? 'Release to upload...' : 'Drag and drop here or' }}
      </div>
      <label
        for="dropzoneFile"
        class="self-start place-self-center py-1.5 px-3 mt-2 text-gray1 bg-gray-400 cursor-pointer"
        :class="isDragActive && 'bg-gray-800'"
      >select image</label>
    </div>
    <input
      id="dropzoneFile"
      type="file"
      class="hidden"
      accept="image/png, image/jpeg"
      @input="upload"
    >
  </div>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import { useStore } from '@/store/store';
import Card from '@/typings/card';
import Dropicon from '@/assets/icons/dropicon.svg';
defineProps({
  card: {
    default: null,
    type: Object as PropType<Card>,
  },
});
const { uploadFile } = useStore();
const activeCard = useStore().activeCard;
const isDragActive = ref(false);

const dragActive = () => {
  isDragActive.value = true;
};

const dragInactive = () => {
  isDragActive.value = false;
};
const drop = (e: any) => {
  const acceptedFile = e.dataTransfer.files[0];
  uploadFile(activeCard, acceptedFile);
  dragInactive();
};

const upload = (e: any) => {
  const acceptedFile = e.target.files[0];
  uploadFile(activeCard, acceptedFile);
};
</script>
