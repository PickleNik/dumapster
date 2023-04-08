<template>
  <div class="flex flex-col">
    <div
      class="flex w-full rounded-3xl overflow-hidden gap-2 flex-wrap max-w-96"
    >
      <div
        v-for="d in [' ', 'M', 'T', 'W', 'R', 'F']"
        class="flex flex-col w-36 gap-2 dark:text-neutral-700 font-bold text-center"
      >
        {{ d }}
      </div>
    </div>
    <div class="flex rounded-3xl overflow-hidden gap-2 flex-wrap max-w-96">
      <div class="w-36 text-neutral-600 font-bold flex flex-col gap-2">
        <div
          class="h-24 flex items-center justify-end"
          v-for="t in ['8', '9', '10', '11', '12', '1', '2', '3', '4']"
        >
          {{ t }}
        </div>
      </div>
      <div v-for="d in ['m', 't', 'w', 'r', 'f']" class="flex flex-col gap-2">
        <div
          v-for="t in ['8', '9', '10', '11', '12', '1', '2', '3', '4']"
          class="hover:bg-neutral-700 duration-300 cursor-pointer w-36 h-24 rounded-xl bg-gray-200 dark:bg-neutral-800"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup></script>
