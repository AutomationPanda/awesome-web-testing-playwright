<template>
  <button
    data-cy="list-options"
    class="inline-grid self-center ml-2 w-8 h-8 text-white bg-white bg-opacity-20 hover:bg-opacity-30 rounded-sm cursor-pointer"
    @click="showDropdown()"
  >
    <Dots
      class="inline-block flex-grow-0 place-self-end p-1.5 w-8 h-8 text-gray10 bg-transparent hover:bg-gray4 active:bg-gray7 rounded-sm border-2 border-transparent cursor-pointer"
    />
  </button>
  <Dropdown
    v-if="dropdown"
    v-click-away="onClickAway"
    data-cy="list-dropdown"
    :header="'List actions'"
    @close="hideDropdown()"
  >
    <DropdownItem
      item-text="Add another card"
      data-cy="card-add"
      @click="
        emit('toggle-input', true);
        hideDropdown();
      "
    />
    <DropdownItem
      item-text="Delete list"
      :warning="true"
      data-cy="delete-list"
      @click="
        deleteList(list.id);
        hideDropdown();
      "
    />
  </Dropdown>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import List from '@/typings/list';
import Dots from '@/assets/icons/dots.svg';
import Dropdown from '@/components/common/Dropdown.vue';
import DropdownItem from '@/components/common/DropdownItem.vue';
import { useStore } from '@/store/store';
const { deleteList } = useStore();

defineProps({
  list: {
    default: null,
    type: Object as PropType<List>,
  },
});

const emit = defineEmits(['toggle-input']);
const dropdown = ref(false);
const onClickAway = () => {
  dropdown.value = false;
};
const showDropdown = () => {
  dropdown.value = true;
};
const hideDropdown = () => {
  dropdown.value = false;
};
</script>
