<template>
  <div class="flex flex-col dark:text-white">
    <div
      class="flex w-full rounded-3xl overflow-hidden gap-2 flex-wrap max-w-96"
    >
      <div
        v-for="d in ['M', 'T', 'W', 'R', 'F']"
        class="pl-14 flex flex-col w-36 gap-2 dark:text-neutral-700 font-bold text-center"
      >
        {{ d }}
      </div>
    </div>
    <div class="flex rounded-3xl overflow-hidden gap-2 flex-wrap max-w-96">
      <div class="text-neutral-600 font-bold flex flex-col gap-2">
        <div
          class="h-16 flex items-center justify-end"
          v-for="t in ['8', '9', '10', '11', '12', '1', '2', '3', '4']"
        >
          {{ t }}
        </div>
      </div>
      <div v-for="d in ['m', 't', 'w', 'r', 'f']" class="flex flex-col gap-2">
        <div
          :ref="t"
          v-for="t in ['8', '9', '10', '11', '12', '1', '2', '3', '4']"
          class="dark:hover:bg-neutral-700 hover:bg-neutral-300 cursor-pointer w-36 h-16 rounded-xl bg-neutral-200 dark:bg-neutral-800"
          :class="`hover:${allowing ? 'bg-green-300' : 'bg-red-300'}`"
          @click="
            blocking
              ? $event.target.classList.toggle('blocked')
              : $event.target.classList.toggle('allowed')
          "
        ></div>
      </div>
    </div>
    <div class="flex pl-8 pt-4">
      <div class="flex mr-4 items-center">
        <button
          class="rounded-lg h-8 w-8 bg-red-500 mr-2 text-white flex justify-center items-center"
          @click="(allowing = false), (blocking = true)"
        >
          <svg
            v-if="blocking"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M9 16.17L5.53 12.7a.996.996 0 1 0-1.41 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71a.996.996 0 1 0-1.41-1.41L9 16.17z"
            />
          </svg>
        </button>
        Blocked
      </div>
      <div class="flex items-center">
        <button
          class="rounded-lg h-8 w-8 bg-emerald-500 mr-2 text-white flex justify-center items-center"
          @click="(blocking = false), (allowing = true)"
        >
          <svg
            v-if="allowing"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M9 16.17L5.53 12.7a.996.996 0 1 0-1.41 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71a.996.996 0 1 0-1.41-1.41L9 16.17z"
            />
          </svg>
        </button>
        Allowed
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const blocking = ref(false);
const allowing = ref(true);
</script>

<style>
.blocked {
  @apply bg-red-400 hover:bg-red-300 dark:bg-red-500 dark:hover:bg-red-600;
}
.allowed {
  @apply bg-green-400 hover:bg-green-300 dark:bg-green-500 dark:hover:bg-green-600;
}
</style>
