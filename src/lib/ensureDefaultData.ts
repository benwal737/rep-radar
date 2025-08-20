import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type SeedExercise = {
  name: string;
  categories: string[];
  sets: Array<{ reps: number; weight: number }>;
};

const PUSH: SeedExercise[] = [
  {
    name: "Bench Press",
    categories: ["Chest", "Triceps"],
    sets: [
      { reps: 10, weight: 95 },
      { reps: 8, weight: 115 },
      { reps: 6, weight: 135 },
    ],
  },
  {
    name: "Incline Dumbbell Press",
    categories: ["Chest", "Shoulders"],
    sets: [
      { reps: 12, weight: 35 },
      { reps: 10, weight: 40 },
      { reps: 8, weight: 45 },
    ],
  },
  {
    name: "Pec Deck",
    categories: ["Chest"],
    sets: [
      { reps: 15, weight: 70 },
      { reps: 12, weight: 85 },
    ],
  },
  {
    name: "Tricep Pushdown",
    categories: ["Triceps"],
    sets: [
      { reps: 12, weight: 50 },
      { reps: 12, weight: 55 },
    ],
  },
  {
    name: "Lateral Raises (Cable)",
    categories: ["Side Delts"],
    sets: [
      { reps: 15, weight: 15 },
      { reps: 15, weight: 15 },
    ],
  },
];

const PULL: SeedExercise[] = [
  {
    name: "Lat Pulldown",
    categories: ["Back", "Lats"],
    sets: [
      { reps: 10, weight: 90 },
      { reps: 10, weight: 100 },
      { reps: 8, weight: 110 },
    ],
  },
  {
    name: "Seated Row",
    categories: ["Back", "Upper Back"],
    sets: [
      { reps: 12, weight: 80 },
      { reps: 10, weight: 90 },
      { reps: 8, weight: 100 },
    ],
  },
  {
    name: "Rear Delt Cable Pull",
    categories: ["Rear Delts"],
    sets: [
      { reps: 15, weight: 15 },
      { reps: 15, weight: 15 },
    ],
  },
  {
    name: "Incline Dumbbell Curl",
    categories: ["Biceps"],
    sets: [
      { reps: 12, weight: 20 },
      { reps: 10, weight: 25 },
    ],
  },
  {
    name: "Cable Curl",
    categories: ["Biceps"],
    sets: [
      { reps: 15, weight: 30 },
      { reps: 12, weight: 35 },
    ],
  },
];

const LEGS: SeedExercise[] = [
  {
    name: "Seated Leg Press",
    categories: ["Quads", "Hamstrings", "Glutes"],
    sets: [
      { reps: 12, weight: 180 },
      { reps: 10, weight: 200 },
      { reps: 8, weight: 220 },
    ],
  },
  {
    name: "Leg Extension",
    categories: ["Quads"],
    sets: [
      { reps: 15, weight: 90 },
      { reps: 12, weight: 100 },
    ],
  },
  {
    name: "Hamstring Curl",
    categories: ["Hamstrings"],
    sets: [
      { reps: 12, weight: 70 },
      { reps: 10, weight: 80 },
    ],
  },
  {
    name: "Calf Raises",
    categories: ["Calves"],
    sets: [
      { reps: 15, weight: 0 },
      { reps: 15, weight: 0 },
    ],
  },
  {
    name: "Thigh Abductor",
    categories: ["Inner Thigh"],
    sets: [
      { reps: 15, weight: 60 },
      { reps: 12, weight: 70 },
    ],
  },
];

const TEMPLATES: Record<"Push" | "Pull" | "Legs", SeedExercise[]> = {
  Push: PUSH,
  Pull: PULL,
  Legs: LEGS,
};

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export async function ensureDefaultData(userId: string) {
  if (!userId) throw new Error("userId required");

  const templateRows = [
    {
      id: `tpl_${userId}_push`,
      user: userId,
      name: "Push",
      categories: ["Upper Body", "Strength"],
    },
    {
      id: `tpl_${userId}_pull`,
      user: userId,
      name: "Pull",
      categories: ["Upper Body", "Strength"],
    },
    {
      id: `tpl_${userId}_legs`,
      user: userId,
      name: "Legs",
      categories: ["Lower Body", "Strength"],
    },
  ];
  await prisma.template.createMany({
    data: templateRows,
    skipDuplicates: true,
  });

  const templates = await prisma.template.findMany({
    where: { user: userId, name: { in: ["Push", "Pull", "Legs"] } },
    select: { id: true, name: true },
  });
  const idByName = new Map(
    templates.map((t) => [t.name as "Push" | "Pull" | "Legs", t.id])
  );

  const allExerciseNames = [
    ...new Set(
      Object.values(TEMPLATES).flatMap((arr) => arr.map((e) => e.name))
    ),
  ];

  const exerciseRows = allExerciseNames.map((name) => ({
    id: `ex_${userId}_${slug(name)}`,
    user: userId,
    name,
  }));

  await prisma.exercise.createMany({
    data: exerciseRows,
    skipDuplicates: true,
  });

  await Promise.all(
    Object.values(TEMPLATES)
      .flatMap((arr) => arr)
      .map(({ name, categories }) =>
        prisma.exercise.update({
          where: { id: `ex_${userId}_${slug(name)}` },
          data: { categories },
          select: { id: true },
        })
      )
  );

  async function seedTemplateIfEmpty(tplName: "Push" | "Pull" | "Legs") {
    const tplId = idByName.get(tplName)!;

    const existingBlocks = await prisma.exerciseBlock.count({
      where: { templateId: tplId },
    });
    if (existingBlocks > 0) return;

    const exercises = TEMPLATES[tplName];

    const blocks = exercises.map((ex) => ({
      id: `blk_${tplId}_${slug(ex.name)}`,
      templateId: tplId,
    }));
    await prisma.exerciseBlock.createMany({
      data: blocks,
      skipDuplicates: true,
    });

    const sets = exercises.flatMap((ex) => {
      const blockId = `blk_${tplId}_${slug(ex.name)}`;
      const exerciseId = `ex_${userId}_${slug(ex.name)}`;
      return ex.sets.map((s, setIndex) => ({
        id: `set_${blockId}_${setIndex}`,
        exerciseId,
        exerciseBlockId: blockId,
        reps: s.reps,
        weight: s.weight,
        completed: false,
      }));
    });
    await prisma.set.createMany({ data: sets, skipDuplicates: true });
  }

  await Promise.all([
    seedTemplateIfEmpty("Push"),
    seedTemplateIfEmpty("Pull"),
    seedTemplateIfEmpty("Legs"),
  ]);

  return {
    pushId: idByName.get("Push")!,
    pullId: idByName.get("Pull")!,
    legsId: idByName.get("Legs")!,
  };
}
