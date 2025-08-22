import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Edit, Play } from "lucide-react";
import React from "react";
import { Template } from "./types";
import { Badge } from "@/components/ui/badge";

const TemplateList = ({
  templates,
  handleDeleteWorkout,
  openEditDialog,
  handleStartWorkout,
}: {
  templates: Template[];
  handleDeleteWorkout: (id: string) => void;
  openEditDialog: (template: Template) => void;
  handleStartWorkout: (template: Template) => void;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <Card
          key={template.id}
          className="bg-card border-border hover:shadow-lg transition-shadow"
        >
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-card-foreground">
                  {template.name}
                </CardTitle>
              </div>
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  onClick={() => openEditDialog(template)}
                  className="size-5 text-muted-foreground hover:text-card-foreground"
                >
                  <Edit className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handleDeleteWorkout(template.id)}
                  className="text-muted-foreground hover:text-destructive size-5"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Template Info */}
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
                  Exercises ({template.exerciseBlocks.length})
                </h4>
              </div>

              {/* Start Workout Button */}
              <Button
                onClick={() => handleStartWorkout(template)}
                className="w-full bg-primary text-primary-foreground"
              >
                <Play className="w-4 h-4" />
                Start Workout
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TemplateList;
