export const config = {
  runtime: "edge",
};

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// use `prisma` in your application to read and write data in your DB
const users = await prisma.curr_classes2.findMany();

export default (request) => {
  return new Response(`Hello, from ${request.url} I'm now an Edge Function!`);
};
