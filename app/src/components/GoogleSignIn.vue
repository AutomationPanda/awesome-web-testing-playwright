<template>
  <span
    class="cursor-pointer"
    @click="signIn"
  >
    <slot />
  </span>
</template>
<script setup lang="ts">
import { installGoogleAuth } from '../GoogleAuth';
import { onMounted } from 'vue';
const googleClientId = process.env.VUE_APP_GOOGLE_CLIENT_ID;

defineProps({
  // eslint-disable-next-line vue/require-default-prop
  clientId: String,
});

const emit = defineEmits(['on-submit']);

let gAuth: any = null;

function signIn() {
  if (!gAuth) return;
  gAuth
    .signIn()
    .then((googleUser: any) => {
      const user = {
        id: googleUser?.getBasicProfile()?.getId(),
        email: googleUser?.getBasicProfile()?.getEmail(),
        name: googleUser?.getBasicProfile()?.getName(),
        picture: googleUser?.getBasicProfile()?.getImageUrl(),
        googleUser: googleUser,
      };
      emit('on-submit', user);
    })
    .catch((e: any) => {
      console.log('error', e);
      emit('on-submit', e);
    });
}

const options = {
  clientId: googleClientId,
  scope: 'profile email',
  prompt: 'select_account',
};
onMounted(async () => {
  gAuth = await installGoogleAuth(options);
});
</script>
