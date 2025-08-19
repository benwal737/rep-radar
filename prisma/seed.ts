import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type SeedExercise = {
  name: string;
  categories: string[];
  unit: string; // "weight" | "duration" | etc (you use string)
  sets: Array<{
    reps?: string;
    weight?: string;
    duration?: string;
    distance?: string;
  }>;
};

const PUSH_EXERCISES: SeedExercise[] = [
  {
    name: "Bench Press",
    categories: ["Chest", "Triceps"],
    unit: "weight",
    sets: [{ reps: "8-10" }, { reps: "8-10" }, { reps: "6-8" }],
  },
  {
    name: "Incline Dumbbell Bench",
    categories: ["Upper Chest", "Shoulders"],
    unit: "weight",
    sets: [{ reps: "10-12" }, { reps: "10-12" }, { reps: "8-10" }],
  },
  {
    name: "Pec Deck",
    categories: ["Chest"],
    unit: "weight",
    sets: [{ reps: "12-15" }, { reps: "12-15" }],
  },
  {
    name: "Overhead Triceps Extension",
    categories: ["Triceps"],
    unit: "weight",
    sets: [{ reps: "10-12" }, { reps: "10-12" }],
  },
  {
    name: "Cable Lateral Raise",
    categories: ["Shoulders"],
    unit: "weight",
    sets: [{ reps: "12-15" }, { reps: "12-15" }],
  },
];

const PULL_EXERCISES: SeedExercise[] = [
  {
    name: "Lat Pulldown",
    categories: ["Back", "Lats"],
    unit: "weight",
    sets: [{ reps: "8-12" }, { reps: "8-12" }, { reps: "8-12" }],
  },
  {
    name: "Seated Row",
    categories: ["Back", "Upper Back"],
    unit: "weight",
    sets: [{ reps: "10-12" }, { reps: "10-12" }, { reps: "8-10" }],
  },
  {
    name: "Rear Delt Cable Pull",
    categories: ["Shoulders", "Rear Delts"],
    unit: "weight",
    sets: [{ reps: "12-15" }, { reps: "12-15" }],
  },
  {
    name: "Incline Dumbbell Curl",
    categories: ["Biceps"],
    unit: "weight",
    sets: [{ reps: "10-12" }, { reps: "10-12" }],
  },
  {
    name: "Cable Curl",
    categories: ["Biceps"],
    unit: "weight",
    sets: [{ reps: "12-15" }, { reps: "12-15" }],
  },
];

async function ensureExercise(
  name: string,
  categories: string[],
  unit: string
) {
  const existing = await prisma.exercise.findFirst({
    where: { name, unit },
    select: { id: true },
  });
  if (existing) return existing.id;

  const created = await prisma.exercise.create({
    data: { name, categories, unit },
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
    const exerciseId = await ensureExercise(ex.name, ex.categories, ex.unit);

    await prisma.exerciseBlock.create({
      data: {
        templateId: template.id,
        sets: {
          create: ex.sets.map((s) => ({
            exercise: { connect: { id: exerciseId } },
            reps: s.reps,
            weight: s.weight,
            duration: s.duration,
            distance: s.distance,
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

  await createTemplateWithBlocks(USER, "Push", PUSH_EXERCISES);
  await createTemplateWithBlocks(USER, "Pull", PULL_EXERCISES);

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
