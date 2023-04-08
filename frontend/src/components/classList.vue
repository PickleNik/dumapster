<template>
  <div
    class="border border-neutral-600 rounded-xl m-2 bg-neutral-900 p-4"
    v-for="course in $classes"
  >
    {{ course.name }}
  </div>
</template>

<script setup>
import { classes } from "../classStore";
import { useStore } from "@nanostores/vue";

// read the store value with the `useStore` hook
const $classes = useStore(classes);
</script>
