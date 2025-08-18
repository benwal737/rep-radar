"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, Play, Plus } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  weight?: string;
}

interface Workout {
  id: string;
  name: string;
  description: string;
  exercises: Exercise[];
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: string;
}

const mockWorkouts: Workout[] = [
  {
    id: "1",
    name: "Push Day",
    description:
      "Upper body pushing movements focusing on chest, shoulders, and triceps",
    exercises: [
      {
        id: "1",
        name: "Bench Press",
        sets: 4,
        reps: "8-10",
        weight: "185 lbs",
      },
      {
        id: "2",
        name: "Overhead Press",
        sets: 3,
        reps: "10-12",
        weight: "95 lbs",
      },
      { id: "3", name: "Dips", sets: 3, reps: "12-15" },
      {
        id: "4",
        name: "Lateral Raises",
        sets: 3,
        reps: "15-20",
        weight: "20 lbs",
      },
    ],
    duration: "45 min",
    difficulty: "Intermediate",
    category: "Strength",
  },
  {
    id: "2",
    name: "Pull Day",
    description: "Upper body pulling movements targeting back and biceps",
    exercises: [
      { id: "5", name: "Pull-ups", sets: 4, reps: "6-8" },
      {
        id: "6",
        name: "Barbell Rows",
        sets: 4,
        reps: "8-10",
        weight: "155 lbs",
      },
      { id: "7", name: "Face Pulls", sets: 3, reps: "15-20", weight: "40 lbs" },
      {
        id: "8",
        name: "Bicep Curls",
        sets: 3,
        reps: "12-15",
        weight: "35 lbs",
      },
    ],
    duration: "40 min",
    difficulty: "Intermediate",
    category: "Strength",
  },
  {
    id: "3",
    name: "HIIT Cardio",
    description: "High-intensity interval training for cardiovascular fitness",
    exercises: [
      { id: "9", name: "Burpees", sets: 4, reps: "30 sec" },
      { id: "10", name: "Mountain Climbers", sets: 4, reps: "30 sec" },
      { id: "11", name: "Jump Squats", sets: 4, reps: "30 sec" },
      { id: "12", name: "High Knees", sets: 4, reps: "30 sec" },
    ],
    duration: "20 min",
    difficulty: "Advanced",
    category: "Cardio",
  },
];

export default function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>(mockWorkouts);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null);
  const [newWorkout, setNewWorkout] = useState<Partial<Workout>>({
    name: "",
    description: "",
    exercises: [],
    duration: "",
    difficulty: "Beginner",
    category: "",
  });

  const handleAddWorkout = () => {
    if (newWorkout.name && newWorkout.description) {
      const workout: Workout = {
        id: Date.now().toString(),
        name: newWorkout.name,
        description: newWorkout.description,
        exercises: newWorkout.exercises || [],
        duration: newWorkout.duration || "30 min",
        difficulty: newWorkout.difficulty || "Beginner",
        category: newWorkout.category || "General",
      };
      setWorkouts([...workouts, workout]);
      setNewWorkout({
        name: "",
        description: "",
        exercises: [],
        duration: "",
        difficulty: "Beginner",
        category: "",
      });
      setIsAddDialogOpen(false);
    }
  };

  const handleEditWorkout = () => {
    if (editingWorkout) {
      setWorkouts(
        workouts.map((w) => (w.id === editingWorkout.id ? editingWorkout : w))
      );
      setEditingWorkout(null);
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteWorkout = (id: string) => {
    setWorkouts(workouts.filter((w) => w.id !== id));
  };

  const handleStartWorkout = (workout: Workout) => {
    // In a real app, this would navigate to a workout session page
    alert(`Starting workout: ${workout.name}`);
  };

  const openEditDialog = (workout: Workout) => {
    setEditingWorkout({ ...workout });
    setIsEditDialogOpen(true);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                My Workouts
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage and track your workout routines
              </p>
            </div>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Workout
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-border">
                <DialogHeader>
                  <DialogTitle className="text-card-foreground">
                    Create New Workout
                  </DialogTitle>
                  <DialogDescription className="text-muted-foreground">
                    Add a new workout routine to your collection
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-card-foreground">
                      Workout Name
                    </Label>
                    <Input
                      id="name"
                      value={newWorkout.name || ""}
                      onChange={(e) =>
                        setNewWorkout({ ...newWorkout, name: e.target.value })
                      }
                      className="bg-input border-border text-foreground"
                      placeholder="e.g., Upper Body Strength"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="description"
                      className="text-card-foreground"
                    >
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={newWorkout.description || ""}
                      onChange={(e) =>
                        setNewWorkout({
                          ...newWorkout,
                          description: e.target.value,
                        })
                      }
                      className="bg-input border-border text-foreground"
                      placeholder="Describe your workout routine..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="duration"
                        className="text-card-foreground"
                      >
                        Duration
                      </Label>
                      <Input
                        id="duration"
                        value={newWorkout.duration || ""}
                        onChange={(e) =>
                          setNewWorkout({
                            ...newWorkout,
                            duration: e.target.value,
                          })
                        }
                        className="bg-input border-border text-foreground"
                        placeholder="e.g., 45 min"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="category"
                        className="text-card-foreground"
                      >
                        Category
                      </Label>
                      <Input
                        id="category"
                        value={newWorkout.category || ""}
                        onChange={(e) =>
                          setNewWorkout({
                            ...newWorkout,
                            category: e.target.value,
                          })
                        }
                        className="bg-input border-border text-foreground"
                        placeholder="e.g., Strength"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsAddDialogOpen(false)}
                      className="border-border text-foreground"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddWorkout}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Create Workout
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Workouts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map((workout) => (
              <Card
                key={workout.id}
                className="bg-card border-border hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-card-foreground">
                        {workout.name}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground mt-1">
                        {workout.description}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(workout)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteWorkout(workout.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Workout Info */}
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <Badge
                          variant="secondary"
                          className="bg-secondary text-secondary-foreground"
                        >
                          {workout.difficulty}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="border-border text-foreground"
                        >
                          {workout.category}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {workout.duration}
                      </span>
                    </div>

                    {/* Exercises Preview */}
                    <div>
                      <h4 className="text-sm font-medium text-card-foreground mb-2">
                        Exercises ({workout.exercises.length})
                      </h4>
                      <div className="space-y-1">
                        {workout.exercises.slice(0, 3).map((exercise) => (
                          <div
                            key={exercise.id}
                            className="text-sm text-muted-foreground"
                          >
                            {exercise.name} - {exercise.sets} sets ×{" "}
                            {exercise.reps}
                            {exercise.weight && ` @ ${exercise.weight}`}
                          </div>
                        ))}
                        {workout.exercises.length > 3 && (
                          <div className="text-sm text-muted-foreground">
                            +{workout.exercises.length - 3} more exercises
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Start Workout Button */}
                    <Button
                      onClick={() => handleStartWorkout(workout)}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Workout
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Edit Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle className="text-card-foreground">
                  Edit Workout
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Modify your workout routine
                </DialogDescription>
              </DialogHeader>
              {editingWorkout && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="edit-name" className="text-card-foreground">
                      Workout Name
                    </Label>
                    <Input
                      id="edit-name"
                      value={editingWorkout.name}
                      onChange={(e) =>
                        setEditingWorkout({
                          ...editingWorkout,
                          name: e.target.value,
                        })
                      }
                      className="bg-input border-border text-foreground"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="edit-description"
                      className="text-card-foreground"
                    >
                      Description
                    </Label>
                    <Textarea
                      id="edit-description"
                      value={editingWorkout.description}
                      onChange={(e) =>
                        setEditingWorkout({
                          ...editingWorkout,
                          description: e.target.value,
                        })
                      }
                      className="bg-input border-border text-foreground"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="edit-duration"
                        className="text-card-foreground"
                      >
                        Duration
                      </Label>
                      <Input
                        id="edit-duration"
                        value={editingWorkout.duration}
                        onChange={(e) =>
                          setEditingWorkout({
                            ...editingWorkout,
                            duration: e.target.value,
                          })
                        }
                        className="bg-input border-border text-foreground"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="edit-category"
                        className="text-card-foreground"
                      >
                        Category
                      </Label>
                      <Input
                        id="edit-category"
                        value={editingWorkout.category}
                        onChange={(e) =>
                          setEditingWorkout({
                            ...editingWorkout,
                            category: e.target.value,
                          })
                        }
                        className="bg-input border-border text-foreground"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsEditDialogOpen(false)}
                      className="border-border text-foreground"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleEditWorkout}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Save Changes
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </SidebarProvider>
  );
}
