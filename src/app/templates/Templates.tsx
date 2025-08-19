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
import { useUser } from "@clerk/nextjs";
import { Template } from "./types";

export default function Templates({
  allWorkouts,
}: {
  allWorkouts: Template[];
}) {
  const [templates, setTemplates] = useState<Template[]>(allWorkouts);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { user } = useUser();
  const [editingWorkout, setEditingWorkout] = useState<Template | null>(null);
  const [newWorkout, setNewWorkout] = useState<Partial<Template>>({
    name: "",
    exerciseBlocks: [],
  });

  const handleEditWorkout = () => {
    if (editingWorkout) {
      setTemplates(
        templates.map((w) => (w.id === editingWorkout.id ? editingWorkout : w))
      );
      setEditingWorkout(null);
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteWorkout = (id: string) => {
    setTemplates(templates.filter((w) => w.id !== id));
  };

  const handleStartWorkout = (workout: Template) => {
    // In a real app, this would navigate to a workout session page
    alert(`Starting workout: ${workout.name}`);
  };

  const openEditDialog = (workout: Template) => {
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
                {user?.firstName}'s Workouts
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
                  <div></div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsAddDialogOpen(false)}
                      className="border-border text-foreground"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {}}
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
            {templates.map((template) => (
              <Card
                key={template.id}
                className="bg-card border-border hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-card-foreground">
                        {template.name}
                      </CardTitle>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(template)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteWorkout(template.id)}
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
                        {template.categories.map((category) => (
                          <Badge
                            key={category}
                            variant="secondary"
                            className="bg-secondary text-secondary-foreground"
                          >
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Exercises Preview */}
                    <div>
                      <h4 className="text-sm font-medium text-card-foreground mb-2">
                        Exercises ({template.exerciseBlocks?.length})
                      </h4>
                    </div>

                    {/* Start Workout Button */}
                    <Button
                      onClick={() => handleStartWorkout(template)}
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
              {/* {editingWorkout && (
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
                </div>
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
                    </div>}
                    {<div>
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
                    </div>}
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
              )} */}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </SidebarProvider>
  );
}
