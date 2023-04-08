<template>
  <div class="relative">
    <input
      type="text"
      placeholder="Search"
      class="px-3 py-2 dark:bg-neutral-800 dark:text-white text-lg rounded-2xl m-4 focus:outline-0 focus:ring-1 ring-neutral-400"
      v-model="query"
    />
    <div
      class="flex absolute right-4 top-18 max-h-[80vh] overflow-y-auto flex-col bg-neutral-900 rounded-xl gap-2 overflow-hidden border border-neutral-400"
    >
      <div
        v-for="course in courses"
        class="bg-neutral-800 text-neutral-300 rounded-lg p-3"
      >
        {{ course.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
let query = ref("");
let courses = ref([]);

// call api on query change
watch(query, async () => {
  console.log(query.value);
  const response = await fetch(
    `https://planetterp.com/api/v1/search?limit=100&query=${query.value}`
  );
  courses = await response.json();
  console.log(courses);
});
</script>
