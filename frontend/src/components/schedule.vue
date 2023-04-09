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
          v-for="t in ['8', '9', '10', '11', '12', '1', '2', '3', '4', '5']"
        >
          {{ t }}
        </div>
      </div>
      <div
        v-for="(d, i) in [monday, tuesday, wednesday, thursday, friday]"
        class="flex flex-col gap-2"
      >
        <div
          v-for="t in d"
          class="dark:hover:bg-neutral-700 hover:bg-neutral-300 cursor-pointer w-36 h-16 rounded-xl bg-neutral-200 dark:bg-neutral-800 flex flex-wrap"
          :class="`hover:${allowing ? 'bg-green-300' : 'bg-red-300'} ${
            t.blocked ? 'blocked' : ''
          } ${t.allowed ? 'allowed' : ''}`"
          @click="
            blocking
              ? ((t.blocked = !t.blocked), (t.allowed = false))
              : ((t.allowed = !t.allowed), (t.blocked = false))
          "
        >
          <div
            class="bg-amber-600 p-1 text-black m-[1px] rounded-lg text-xs"
            v-for="section in t.sections"
          >
            {{ section.substring(section.length - 4, section.length) }}
          </div>
        </div>
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
  <aside class="dark:text-white">
    <span class="font-mono text-neutral-400 pl-4">preferred classes: </span>
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
  </aside>
</template>

<script setup>
import { classes } from "../classStore";
import { useStore } from "@nanostores/vue";
import { ref, watch } from "vue";
// import prisma from "../../lib/prisma";
// console.log(await prisma.curr_classes2.findFirst());

// read the store value with the `useStore` hook
const $classes = useStore(classes);
let classesDetailed = ref([]);

watch($classes, async () => {
  classesDetailed.value = [];
  for (let i in $classes.value) {
    const response = await fetch(
      `https://planetterp.com/api/v1/course?name=${$classes.value[i].name}`
    );
    let url = `https://api.umd.io/v0/courses/${$classes.value[i].name}/sections`;
    const response3 = await fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .catch((e) => console.log(e));
    // const courses3 = await response3.json();
    // console.log(response3);
    console.log(response3);
    let blocked_sections = [];
    response3.forEach((response) => {
      response.meetings.forEach((meeting) => {
        console.log(meeting);
        if (meeting.days.includes("M")) {
          let time = meeting.start_time;
          monday.value.forEach((hour) => {
            if (hour.blocked) {
              blocked_sections = [...blocked_sections, response.section_id];
              console.log(response.section_id);
            }
            console.log(blocked_sections.includes(response.section_id));
            if (
              hour.time.match(/\d+/)[0] == time.match(/\d+/)[0] &&
              !blocked_sections.includes(response.section_id)
            ) {
              hour.sections = [...hour.sections, response.section_id];
            }
          });
        }
        if (meeting.days.includes("Tu")) {
          let time = meeting.start_time;
          tuesday.value.forEach((hour) => {
            if (hour.blocked) {
              blocked_sections = [...blocked_sections, response.section_id];
              console.log(response.section_id);
            }
            console.log(blocked_sections.includes(response.section));
            if (
              hour.time.match(/\d+/)[0] == time.match(/\d+/)[0] &&
              !blocked_sections.includes(response.section_id)
            ) {
              hour.sections = [...hour.sections, response.section_id];
            }
          });
        }
        if (meeting.days.includes("W")) {
          let time = meeting.start_time;
          wednesday.value.forEach((hour) => {
            if (hour.blocked) {
              blocked_sections = [...blocked_sections, response.section_id];
              console.log(response.section_id);
            }
            console.log(blocked_sections.includes(response.section));
            if (
              hour.time.match(/\d+/)[0] == time.match(/\d+/)[0] &&
              !blocked_sections.includes(response.section_id)
            ) {
              hour.sections = [...hour.sections, response.section_id];
            }
          });
        }
        if (meeting.days.includes("Th")) {
          let time = meeting.start_time;
          thursday.value.forEach((hour) => {
            if (hour.blocked) {
              blocked_sections = [...blocked_sections, response.section_id];
              console.log(response.section_id);
            }
            console.log(blocked_sections.includes(response.section));
            if (
              hour.time.match(/\d+/)[0] == time.match(/\d+/)[0] &&
              !blocked_sections.includes(response.section_id)
            ) {
              // hour.courses[$classes.value[i].name] = true;
              hour.sections = [...hour.sections, response.section_id];
            }
          });
          if (meeting.days.includes("F")) {
            let time = meeting.start_time;
            friday.value.forEach((hour) => {
              if (hour.blocked) {
                blocked_sections = [...blocked_sections, response.section_id];
                console.log(response.section_id);
              }
              console.log(blocked_sections.includes(response.section));
              if (
                hour.time.match(/\d+/)[0] == time.match(/\d+/)[0] &&
                !blocked_sections.includes(response.section_id)
              ) {
                hour.sections = [...hour.sections, response.section_id];
              }
            });
          }
        }
      });
    });
    // console.log(await response2.json());
    classesDetailed.value = [...classesDetailed.value, await response.json()];
  }
});

const blocking = ref(false);
const allowing = ref(true);

let monday = ref([
  {
    time: "8am",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
  {
    time: "9am",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
  {
    time: "10am",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
  {
    time: "11am",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
  {
    time: "12pm",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
  {
    time: "1pm",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
  {
    time: "2pm",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
  {
    time: "3pm",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
  {
    time: "4pm",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
  {
    time: "5pm",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
]);
let tuesday = ref([
  {
    time: "8am",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
  {
    time: "9am",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
  {
    time: "10am",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
  {
    time: "11am",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
  {
    time: "12pm",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
  {
    time: "1pm",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
  {
    time: "2pm",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
  {
    time: "3pm",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
  {
    time: "4pm",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
  {
    time: "5pm",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
]);
let wednesday = ref([
  {
    time: "8am",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
  {
    time: "9am",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
  {
    time: "10am",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
  {
    time: "11am",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
  {
    time: "12pm",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
  {
    time: "1pm",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
  {
    time: "2pm",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
  {
    time: "3pm",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
  {
    time: "4pm",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
  {
    time: "5pm",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
]);
let thursday = ref([
  {
    time: "8am",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
  {
    time: "9am",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
  {
    time: "10am",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
  {
    time: "11am",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
  {
    time: "12pm",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
  {
    time: "1pm",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
  {
    time: "2pm",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
  {
    time: "3pm",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
  {
    time: "4pm",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
  {
    time: "5pm",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
]);
let friday = ref([
  {
    time: "8am",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
  {
    time: "9am",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
  {
    time: "10am",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
  {
    time: "11am",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
  {
    time: "12pm",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
  {
    time: "1pm",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
  {
    time: "2pm",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
  {
    time: "3pm",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
  {
    time: "4pm",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
  {
    time: "5pm",
    course: null,
    sections: [],
    blocked: false,
    allowed: false,
  },
]);

// setTimeout(() => {
//   console.log([
//     monday.value,
//     tuesday.value,
//     wednesday.value,
//     thursday.value,
//     friday.value,
//   ]);
// }, 5000);
</script>

<style>
.blocked {
  @apply bg-red-400 hover:bg-red-300 dark:bg-red-500 dark:hover:bg-red-600;
}
.allowed {
  @apply bg-green-400 hover:bg-green-300 dark:bg-green-500 dark:hover:bg-green-600;
}
</style>
