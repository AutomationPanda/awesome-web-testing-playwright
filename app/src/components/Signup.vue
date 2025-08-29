<template>
  <div class="grid grid-cols-2 gap-x-8 items-stretch px-28 -mt-10 h-screen">
    <div class="grid content-center">
      <h1 class="mb-8 text-3xl font-bold">
        Create a new account
      </h1>
      <label for="email">Email</label>
      <input
        v-model="signupForm.email"
        class="px-2 mb-3 w-full h-10 bg-gray3 focus:bg-white rounded-sm"
        placeholder="Email"
        name="email"
        data-cy="signup-email"
      >
      <label for="password">Password</label>
      <input
        v-model="signupForm.password"
        type="password"
        class="px-2 mb-3 w-full h-10 bg-gray3 focus:bg-white rounded-sm"
        data-cy="signup-password"
        placeholder="Password"
        name="password"
        @keyup.enter="
          signup(signupForm.email, signupForm.password, signupForm.welcomeEmail).then(() => {
            router.push('/');
          })
        "
      >
      <div class="mb-4">
        <input
          v-model="signupForm.welcomeEmail"
          type="checkbox"
          name="welcomeEmail"
          class="mr-2"
        >
        <label
          class="text-sm"
          for="welcomeEmail"
        >Send me a welcome email</label>
      </div>
      <button
        class="py-2 w-full text-white bg-green7 hover:bg-green6"
        data-cy="signup-submit"
        @click="
          signup(signupForm.email, signupForm.password, signupForm.welcomeEmail).then(() => {
            router.push('/');
          })
        "
      >
        Create account
      </button>
      <GoogleSignIn
        v-if="googleEnabled === 'true'"
        @on-submit="handleResponse"
      >
        <GoogleButton :log-sign="'Sign up'" />
      </GoogleSignIn>
      <router-link
        class="mt-4 text-sm text-center underline"
        to="/login"
      >
        Already have an account? Log in here
      </router-link>
    </div>
    <img
      class="gap-x-5 self-center place-self-center"
      src="@/assets/signup.png"
    >
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store/store';
import { storeToRefs } from 'pinia';
import GoogleSignIn from './GoogleSignIn.vue';
import GoogleButton from './GoogleButton.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const googleEnabled = process.env.VUE_APP_GOOGLE_ENABLED;
const { oauthSignup, signup } = useStore();
const { signupForm } = storeToRefs(useStore());
function handleResponse(value: any): void {
  oauthSignup(value.googleUser.wc.id_token);
}
</script>
