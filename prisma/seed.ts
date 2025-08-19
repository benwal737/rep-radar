import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type SeedExercise = {
  name: string;
  categories: string[];
  sets: Array<{
    reps: number;
    weight: number;
  }>;
};

const pushExercises: SeedExercise[] = [
  {
    name: "Bench Press",
    categories: ["Chest", "Triceps"],
    sets: [
      { reps: 8, weight: 100 },
      { reps: 8, weight: 100 },
      { reps: 6, weight: 100 },
    ],
  },
  {
    name: "Incline Dumbbell Bench",
    categories: ["Upper Chest", "Shoulders"],
    sets: [
      { reps: 10, weight: 100 },
      { reps: 10, weight: 100 },
      { reps: 8, weight: 100 },
    ],
  },
  {
    name: "Pec Deck",
    categories: ["Chest"],
    sets: [
      { reps: 12, weight: 100 },
      { reps: 12, weight: 100 },
    ],
  },
  {
    name: "Overhead Triceps Extension",
    categories: ["Triceps"],
    sets: [
      { reps: 10, weight: 100 },
      { reps: 10, weight: 100 },
    ],
  },
  {
    name: "Cable Lateral Raise",
    categories: ["Shoulders"],
    sets: [
      { reps: 12, weight: 100 },
      { reps: 12, weight: 100 },
    ],
  },
];

const pullExercises: SeedExercise[] = [
  {
    name: "Lat Pulldown",
    categories: ["Back", "Lats"],
    sets: [
      { reps: 8, weight: 100 },
      { reps: 8, weight: 100 },
      { reps: 8, weight: 100 },
    ],
  },
  {
    name: "Seated Row",
    categories: ["Back", "Upper Back"],
    sets: [
      { reps: 10, weight: 100 },
      { reps: 10, weight: 100 },
      { reps: 8, weight: 100 },
    ],
  },
  {
    name: "Rear Delt Cable Pull",
    categories: ["Shoulders", "Rear Delts"],
    sets: [
      { reps: 12, weight: 100 },
      { reps: 12, weight: 100 },
    ],
  },
  {
    name: "Incline Dumbbell Curl",
    categories: ["Biceps"],
    sets: [
      { reps: 10, weight: 100 },
      { reps: 10, weight: 100 },
    ],
  },
  {
    name: "Cable Curl",
    categories: ["Biceps"],
    sets: [
      { reps: 12, weight: 100 },
      { reps: 12, weight: 100 },
    ],
  },
];

const legExercises: SeedExercise[] = [
  {
    name: "Leg Press",
    categories: ["Quads", "Hamstrings", "Glutes"],
    sets: [
      { reps: 8, weight: 100 },
      { reps: 8, weight: 100 },
      { reps: 6, weight: 100 },
    ],
  },
  {
    name: "Leg Extension",
    categories: ["Quads"],
    sets: [
      { reps: 8, weight: 100 },
      { reps: 8, weight: 100 },
      { reps: 6, weight: 100 },
    ],
  },
  {
    name: "Hamstring Curl",
    categories: ["Hamstrings", "Glutes"],
    sets: [
      { reps: 8, weight: 100 },
      { reps: 8, weight: 100 },
      { reps: 6, weight: 100 },
    ],
  },
  {
    name: "Calf Raise",
    categories: ["Calves"],
    sets: [
      { reps: 12, weight: 100 },
      { reps: 12, weight: 100 },
    ],
  },
  {
    name: "Thigh Abduction Machine",
    categories: ["Quads", "Hamstrings", "Glutes"],
    sets: [
      { reps: 8, weight: 100 },
      { reps: 8, weight: 100 },
      { reps: 6, weight: 100 },
    ],
  },
];

async function ensureExercise(name: string, categories: string[]) {
  const existing = await prisma.exercise.findFirst({
    where: { name },
    select: { id: true },
  });
  if (existing) return existing.id;

  const created = await prisma.exercise.create({
    data: { name, categories },
    select: { id: true },
  });
  return created.id;
}

async function createTemplateWithBlocks(
  userId: string,
  name: string,
  exercises: SeedExercise[]
) {
  // Create the template first
  const template = await prisma.template.create({
    data: { name, user: userId, categories: ["Upper Body", "Strength"] },
    select: { id: true },
  });

  // For each exercise: create one block and many sets pointing to the same exercise
  for (const ex of exercises) {
    const exerciseId = await ensureExercise(ex.name, ex.categories);

    await prisma.exerciseBlock.create({
      data: {
        templateId: template.id,
        sets: {
          create: ex.sets.map((s) => ({
            exercise: { connect: { id: exerciseId } },
            reps: s.reps,
            weight: s.weight,
          })),
        },
      },
    });
  }
}

async function main() {
  // Optional: clear existing data safely in FK order
  await prisma.set.deleteMany();
  await prisma.session.deleteMany();
  await prisma.exerciseBlock.deleteMany();
  await prisma.template.deleteMany();
  await prisma.exercise.deleteMany();

  const USER = "user_31OWXw942AZpADAqcy8gryMwa8w";

  await createTemplateWithBlocks(USER, "Push", pushExercises);
  await createTemplateWithBlocks(USER, "Pull", pullExercises);
  await createTemplateWithBlocks(USER, "Legs", legExercises);

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
