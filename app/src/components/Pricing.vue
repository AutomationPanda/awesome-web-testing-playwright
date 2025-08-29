<template>
  <div class="bg-white">
    <div class="container py-8 px-6 mx-auto">
      <h1 class="mt-4 text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl">
        Pricing Plan
      </h1>
      <div
        v-if="pricing.discountEligible"
        data-cy="discount"
        class="grid mx-auto mt-4 max-w-2xl bg-yellow-100 rounded-sm border border-yellow-300"
      >
        <p class="pb-1 text-center">
          Your country is <span class="text-2xl">{{ emoji.emojify(`:flag-${pricing.location}:`) }}</span>,
          {{ pricing.discountEligible ? `you are eligible for a discount of ${pricing.discountAmount}%` : 'you are unfortunately not eligible for discount' }}
        </p>
      </div>
      <div
        v-for="plan in plans"
        :key="plan.id"
      >
        <div class="mt-6 space-y-8 xl:mt-12">
          <div
            class="flex justify-between items-center py-4 px-8 mx-auto max-w-2xl rounded-sm border cursor-pointer"
            data-cy="plan-item"
            :class="plan.id === pricing.activePlan && 'border-blue6 text-blue6'"
            @click="pricing.activePlan = plan.id"
          >
            <div class="flex items-center">
              <RoundCheckbox
                class="w-5 h-5 text-gray-400 sm:w-9 sm:h-9"
                :class="plan.id === pricing.activePlan && 'text-blue6'"
              />

              <div class="flex flex-col items-center mx-5 space-y-1">
                <h2
                  class="text-lg font-medium text-gray-700 sm:text-2xl"
                  :class="plan.id === pricing.activePlan && 'text-blue6'"
                >
                  {{ plan.name }}
                </h2>
              </div>
            </div>
            <h2
              class="text-2xl font-semibold sm:text-4xl"
              :class="plan.id === pricing.activePlan ? 'text-blue6' : 'text-gray-500'"
              data-cy="plan-price"
            >
              {{ pricing.currency === 'EUR' ? '€' : pricing.currency === 'GBP' ? '£' : '$' }} {{ plan.price[pricing.currency] }}
              <span class="text-base font-medium">/ Month</span>
            </h2>
          </div>
        </div>
      </div>
      <div class="flex justify-center mt-6">
        <button
          class="py-2 px-8 tracking-wide text-white capitalize bg-green7 hover:bg-green6 rounded-sm focus:outline-none"
          data-cy="find-location"
          @click="geolocation"
        >
          Find my location
        </button>
      </div>
      <div
        id="map"
        ref="map"
        class="mx-auto mt-4 max-w-2xl h-64"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useStore } from '@/store/store';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import emoji from 'node-emoji';
import * as L from 'leaflet';
import RoundCheckbox from '@/assets/icons/roundCheckbox.svg';
const { pricing } = storeToRefs(useStore());
const { getLocation } = useStore();
getLocation();

const geolocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(drawMap);
  }
 else {
    console.log('not working!!');
  }
};

const drawMap = (position: GeolocationPosition) => {
  let map = L.map(ref('map').value);
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);
  let target = L.latLng(position.coords.latitude, position.coords.longitude);
  map.setView(target, 14);
};

const plans: { [key: string]: any } = [
  {
    id: 1,
    name: 'Basic',
    price: {
      GBP: '39',
      USD: '49',
      EUR: '59',
    },
  },
  {
    id: 2,
    name: 'Pro',
    price: {
      GBP: '79',
      USD: '99',
      EUR: '129',
    },
  },
  {
    id: 3,
    name: 'Enterprise',
    price: {
      GBP: '119',
      USD: '149',
      EUR: '179',
    },
  },
];
</script>
