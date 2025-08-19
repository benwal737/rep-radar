"use server";

import prisma from "@/lib/prisma";
import { Template } from "./types";

export const getWorkouts = async () => {
  const workouts = await prisma.template.findMany({
    include: { exerciseBlocks: { include: { sets: true } } },
  });
  return workouts as Template[];
};
