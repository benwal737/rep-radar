import { NewTemplate, Template } from "./types";
import prisma from "@/lib/prisma";

export const createTemplate = async (data: NewTemplate) => {
  const template = await prisma.template.create({
    data: {
      ...data,
      exerciseBlocks: {
        create: data.exerciseBlocks.map((exerciseBlock) => ({
          ...exerciseBlock,
          sets: {
            create: exerciseBlock.sets.map((set) => ({
              ...set,
            })),
          },
        })),
      },
    },
  });
  return template as Template;
};
