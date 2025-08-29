<template>
  <div
    class="flex justify-end mr-3 text-white"
    :class="[route.path === '/login' || route.path === '/signup' ? 'invisible' : 'visible']"
  >
    <!-- LOGGED OUT -->
    <div
      v-show="!activeUser.loggedIn"
      class="flex self-center h-8 text-sm bg-white bg-opacity-30 hover:bg-opacity-20 rounded-sm cursor-pointer"
      data-cy="login-menu"
      @click="router.push('/login')"
    >
      <User class="self-center ml-2 w-6 h-6" />
      <span class="self-center pr-2 pl-1">Log&nbsp;in</span>
    </div>
    <!-- LOGGED IN -->
    <div
      v-show="activeUser.loggedIn"
      class="flex self-center h-8 text-sm bg-white bg-opacity-30 hover:bg-opacity-20 rounded-sm cursor-pointer"
      data-cy="logged-user"
      @click="
        logout();
        getBoardList();
        router.push('/');
      "
    >
      <LogoutIcon class="self-center ml-2 w-5 h-5 text-white fill-current" />
      <div class="inline-block self-center pr-2 pl-1">
        {{ activeUser.email }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store/store';
import { useRoute, useRouter } from 'vue-router';
import LogoutIcon from '@/assets/icons/logoutIcon.svg';
import User from '@/assets/icons/user.svg';
import axios from 'axios';
import { storeToRefs } from 'pinia';

const router = useRouter();
const route = useRoute();
const { showNotification, getBoardList } = useStore();
const { activeUser } = storeToRefs(useStore());
const logout = function (this: any) {
  activeUser.value.loggedIn = false;
  axios.defaults.headers.common['Authorization'] = '';
  document.cookie = 'auth_token=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  showNotification('User was logged out', false);
};
</script>
