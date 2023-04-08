<template>
  <div class="relative">
    <input
      type="text"
      placeholder="Search"
      class="px-3 py-2 dark:bg-neutral-800 dark:text-white text-lg rounded-2xl m-4 focus:outline-0 focus:ring-1 ring-neutral-400"
      v-model="query"
    />
    <div
      v-if="query"
      class="flex absolute right-4 top-18 max-h-[80vh] overflow-y-auto flex-col bg-neutral-700 rounded-xl gap-[1px] overflow-hidden border border-neutral-700"
    >
      <button
        v-for="course in courses.filter((c) => c.type == 'course')"
        class="bg-neutral-800 text-neutral-300 rounded-lg p-3 cursor-pointer hover:bg-neutral-900 active:bg-neutral-500"
        @click="addClass(course)"
      >
        {{ course.name }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { classes } from "../classStore";
import { useStore } from "@nanostores/vue";

// read the store value with the `useStore` hook
const $classes = useStore(classes);

import { ref, watch } from "vue";
let query = ref("");
let courses = ref([]);

function addClass(course) {
  let dup = false;
  for (let i in $classes.value)
    if ({ ...$classes.value[i] }.name === course.name) dup = true;

  if (!dup) classes.set([...$classes.value, course]);
}

// call api on query change
watch(query, async () => {
  const response = await fetch(
    `https://planetterp.com/api/v1/search?limit=100&query=${query.value.replace(
      /\s/g,
      ""
    )}`
  );
  courses = await response.json();
});
</script>
