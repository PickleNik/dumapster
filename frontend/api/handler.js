export const config = {
  runtime: "edge",
};

import { PrismaClient } from "@prisma/client";

export default async (request) => {
  const prisma = new PrismaClient();
  // use `prisma` in your application to read and write data in your DB
  const users = await prisma.curr_classes2.findMany();
  return new Response(`Hello, from ${request.url} I'm now an Edge Function!`);
};
