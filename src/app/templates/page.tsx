import Templates from "./Templates";
import { auth } from "@clerk/nextjs/server";
import { ensureDefaultData } from "@/lib/ensureDefaultData";
import prisma from "@/lib/prisma";
import { Template } from "./types";

const page = async () => {
  const { userId } = await auth();
  // await ensureDefaultData(userId!);
  const templates = await prisma.template.findMany({
    where: {
      user: userId!,
    },
    include: { exerciseBlocks: { include: { sets: true } } },
  });
  const userTemplates = templates as Template[];
  return <Templates userTemplates={userTemplates} />;
};

export default page;
