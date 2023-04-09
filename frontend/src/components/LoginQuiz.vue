<script setup>
import { ref } from "vue";

let dropDown = ref(false);

const majors = await fetch("https://api.umd.io/v0/majors");
const majorsJson = await majors.json();
console.log(majorsJson);

const majorsList = majorsJson.map((major) => {
  return major.major_name;
});

const isCommuter = false;
</script>

<template>
  <div class="bg-gray-800 m-8 rounded-3xl p-24 justify-items-center">
    <div class="flex flex-col items-center">
      <h2 class="text-3xl font-black text-white text-center">
        What is your major?
      </h2>
      <div class="relative">
        <input @click="dropDown = !dropDown" />
        <div v-if="dropDown" class="absolute top-8 bg-white w-full">test</div>
      </div>
    </div>
    <div class="flex flex-col items-center">
      <h2 class="text-3xl font-black text-white text-center">
        Are you a commuter?
      </h2>
      <div class="flex justify-center space-x-3">
        <button
          class="px-4 group relative flex justify-center rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Yes
        </button>
        <button
          class="px-5 group relative flex justify-center rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          No
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
