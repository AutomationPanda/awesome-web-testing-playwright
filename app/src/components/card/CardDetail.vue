<template>
  <div
    class="flex fixed top-0 left-0 z-40 justify-center items-center w-full h-full bg-backdrop"
    data-cy="card-detail-backdrop"
    @click.self="
      showCardModule(activeCard.id, false);
      router.push(router.currentRoute.value.path);
    "
  >
    <div
      class="grid overflow-scroll grid-cols-8 gap-x-2 p-8 w-cardDetail h-5/6 bg-gray2"
      data-cy="card-detail"
    >
      <div class="col-span-6 text-gray-800">
        <div class="mb-4 ml-9">
          <div class="inline-block">
            <Board class="-mb-1 -ml-8 w-5 h-5 text-gray-800 fill-current stroke-current" />
          </div>
          <input
            v-model="activeCard.name"
            v-click-away="clickAwayCardName"
            class="py-1 focus:px-1.5 w-full font-bold bg-gray2 focus:bg-white rounded-sm cursor-pointer"
            data-cy="card-detail-title"
            @focus="
              selectInput($event);
              cardNameInputActive = true;
            "
            @change="patchCard(activeCard, { name: activeCard.name })"
            @keyup.enter="
              blurInput($event);
              cardNameInputActive = false;
            "
            @keyup.esc="
              blurInput($event);
              cardNameInputActive = false;
            "
          >
          <h2 class="text-sm text-gray10">
            in list <span
              class="underline"
              data-cy="card-list-name"
            >{{ cardListName }}</span>
          </h2>
        </div>
        <div class="mb-4 ml-9">
          <h2 class="block text-sm text-gray10 cursor-default">
            DUE DATE
          </h2>
          <div class="inline-block mt-2">
            <Checkbox :card="activeCard" />
            <h2 class="inline-block py-1 px-4 font-light text-gray-800 bg-gray3 hover:bg-gray5 rounded-sm cursor-default">
              {{ new Date(activeCard.deadline).toDateString() }}
              <div
                v-show="activeCard.completed"
                class="inline-block px-2 mx-1 text-sm text-white bg-green5 rounded-sm"
              >
                COMPLETED
              </div>
              <div
                v-show="overdue(activeCard) && !activeCard.completed"
                class="inline-block px-2 mx-1 text-sm text-white bg-red-500 rounded-sm"
              >
                OVERDUE
              </div>
              <button
                data-cy="calendar-dropdown"
                @click="showDate = true"
              >
                <Downarrow class="inline-block py-2 pl-2 w-5 text-gray-800 cursor-pointer fill-current stroke-current" />
              </button>
            </h2>
            <div
              v-if="showDate"
              class="absolute"
            >
              <Datepicker
                v-model="date"
                v-click-away="clickAwayDate"
                inline
                auto-apply
                :enable-time-picker="false"
                data-cy="card-detail-deadline"
                @update:model-value="updateDate"
              >
                <template #day="{ day }">
                  <div data-cy="day">
                    {{ day }}
                  </div>
                </template>
                <template #month="{ text }">
                  <div data-cy="header-month">
                    {{ text }}
                  </div>
                </template>
                <template #month-overlay="{ text }">
                  <div data-cy="month">
                    {{ text }}
                  </div>
                </template>
                <template #year="{ year }">
                  <div data-cy="header-year">
                    {{ year }}
                  </div>
                </template>
                <template #year-overlay="{ text }">
                  <div data-cy="year">
                    {{ text }}
                  </div>
                </template>
              </Datepicker>
            </div>
          </div>
        </div>
        <div class="mb-4 ml-9">
          <div class="inline-block">
            <Description class="-mb-1 -ml-8 w-5 h-5 text-gray-800 fill-current stroke-current" />
          </div>
          <h1 class="inline-block mb-4 text-lg font-semibold text-black">
            Description
          </h1>
          <textarea
            v-model="activeCard.description"
            class="p-3 w-full h-36 resize-none"
            data-cy="card-description"
            @focus="
              selectInput($event);
              descriptionInputActive = true;
            "
            @change="patchCard(activeCard, { description: activeCard.description })"
            @keydown.enter="
              blurInput($event);
              descriptionInputActive = false;
            "
            @keyup.esc="
              blurInput($event);
              descriptionInputActive = false;
            "
          />
        </div>
        <div class="mb-4 ml-9">
          <div class="inline-block">
            <Attachment class="-mb-1 -ml-8 w-5 h-5 text-gray-800 fill-current stroke-current" />
          </div>
          <h1 class="inline-block mb-4 text-lg font-semibold text-black">
            Image
          </h1>
          <div
            v-if="activeCard.image"
            class="grid grid-cols-6 gap-x-4"
            data-cy="image-attachment"
          >
            <div class="col-span-2 row-span-2">
              <img :src="'/backend' + activeCard.image">
            </div>
            <div class="col-span-4 font-bold">
              {{ activeCard.image.replace(`/data/uploaded/${activeCard.id}_`, '') }}
              <a
                class="block font-normal underline cursor-pointer"
                data-cy="image-delete"
                :href="'/backend' + activeCard.image"
                download
              >
                <Download class="inline-block mb-1 w-4" />Download
              </a>
              <div
                class="block font-normal underline cursor-pointer"
                data-cy="image-delete"
                @click="patchCard(activeCard, { image: null })"
              >
                <Cross class="inline-block mb-1 w-4" />Delete
              </div>
            </div>
          </div>
          <Dropzone
            v-else
            :card="activeCard"
          />
        </div>
      </div>
      <div class="grid col-span-2 gap-y-2 content-start">
        <div class="grid self-end place-content-center place-self-end w-8 h-8 hover:bg-gray5 cursor-pointer">
          <Cross
            class="w-6 h-6 text-gray-600 fill-current"
            @click="
              showCardModule(activeCard.id, false);
              router.push(router.currentRoute.value.path);
            "
          />
        </div>
        <div
          class="py-0.5 px-2 text-sm text-gray-600 bg-gray3 hover:bg-gray5 rounded-sm cursor-pointer"
          data-cy="calendar-button"
          @click="showDate = true"
        >
          <Clock class="inline-block mr-2 mb-0.5 w-4" />Due date
        </div>
        <div
          class="py-0.5 px-2 text-sm text-gray-600 bg-gray3 hover:bg-gray5 rounded-sm cursor-pointer"
          data-cy="copy-properties"
          @click="copyProperties(activeCard)"
        >
          <Copy class="inline-block mr-2 mb-0.5 w-4" />Copy attributes
        </div>
        <div
          class="py-0.5 px-2 text-sm text-gray-600 bg-gray3 hover:bg-gray5 rounded-sm cursor-pointer"
          data-cy="card-detail-delete"
          @click="
            deleteCard(activeCard);
            router.push(router.currentRoute.value.path);
          "
        >
          <Trash class="inline-block mr-2 mb-0.5 w-4" />Delete card
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { blurInput } from '@/utils/blurInput';
import { ref, onMounted } from 'vue';
import { selectInput } from '@/utils/selectInput';
import { useStore } from '@/store/store';
import Attachment from '@/assets/icons/attachment.svg';
import Board from '@/assets/icons/board.svg';
import Card from '@/typings/card';
import Checkbox from '@/components/Checkbox.vue';
import Clock from '@/assets/icons/clock.svg';
import Copy from '@/assets/icons/copy.svg';
import Cross from '@/assets/icons/cross.svg';
import Download from '@/assets/icons/download.svg';
import Description from '@/assets/icons/description.svg';
import Downarrow from '@/assets/icons/downarrow.svg';
import Dropzone from '../Dropzone.vue';
import List from '@/typings/list';
import Trash from '@/assets/icons/trash.svg';
import moment from 'moment';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const router = useRouter();
const { showNotification, showCardModule, patchCard, deleteCard } = useStore();
const { lists, activeCard } = storeToRefs(useStore());
const cardListName = lists.value.find((l: List) => l.id === activeCard.value.listId)!['name'];

const showDate = ref(false);
const cardNameInputActive = ref(false);
const descriptionInputActive = ref(false);
const date = ref(new Date());

const clickAwayCardName = () => {
  cardNameInputActive.value = false;
};
const clickAwayDate = () => {
  showDate.value = false;
};

const updateDate = (data: string) => {
  const formattedDate = moment(data).format('YYYY-MM-DD');
  patchCard(activeCard.value, { deadline: formattedDate });
  showDate.value = false;
};

const copyProperties = (content: Card) => {
  const clipBoardValue = JSON.stringify(content, null, 2);
  const clipboard = window.navigator.clipboard;
  showNotification('Card info copied to clipboard', false);
  return clipboard.writeText(clipBoardValue);
};

const overdue = (card: Card) => {
  return card.deadline && moment(card.deadline).diff(moment().startOf('day'), 'days') < 1;
};

onMounted(() => {
  router.push(`${router.currentRoute.value.path}?card=${activeCard.value.id}`);
});
</script>
