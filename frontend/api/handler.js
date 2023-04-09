// import { PrismaClient } from "@prisma/client";
// import prisma from "../lib/prisma";
// const prisma = new PrismaClient();

// async function main() {
//   // ... you will write your Prisma Client queries here
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

export const config = {
  runtime: "edge",
};

export default async (request) => {
  // const prisma = new PrismaClient();
  // use `prisma` in your application to read and write data in your DB
  // const users = await prisma.curr_classes2.findMany();
  return new Response(`Hello, from ${request.url} I'm now an Edge Function"}`);
};
