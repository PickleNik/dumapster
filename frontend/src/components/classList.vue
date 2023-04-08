<template>
  <div
    class="border border-neutral-600 rounded-2xl m-2 bg-neutral-900 p-2 flex items-center"
    v-for="course in classesDetailed"
  >
    <div
      class="p-1 mr-2 rounded-xl dark:text-black text-white font-bold"
      :class="
        course.average_gpa > 3.5
          ? 'bg-emerald-400'
          : course.average_gpa > 3
          ? 'bg-lime-400'
          : course.average_gpa > 2.5
          ? 'bg-yellow-400'
          : course.average_gpa > 2
          ? 'bg-orange-400'
          : 'bg-red-400'
      "
    >
      {{ course.average_gpa.toFixed(2) }}
    </div>
    {{ course.name }}
    <button class="text-red-300 ml-auto">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
        />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { classes } from "../classStore";
import { useStore } from "@nanostores/vue";
import { ref, watch } from "vue";

// read the store value with the `useStore` hook
const $classes = useStore(classes);
let classesDetailed = ref([]);

watch($classes, async () => {
  classesDetailed.value = [];
  for (let i in $classes.value) {
    const response = await fetch(
      `https://planetterp.com/api/v1/course?name=${$classes.value[i].name}`
    );
    classesDetailed.value = [...classesDetailed.value, await response.json()];
  }
});
</script>
