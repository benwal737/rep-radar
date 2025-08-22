"use client";
import { useState, SetStateAction } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tag, TagInput } from "emblor";

const formSchema = z.object({
  name: z.string().min(1).max(50),
  categories: z
    .array(
      z.object({
        id: z.string(),
        text: z.string(),
      })
    )
    .max(2, {
      message: "You can only add up to 2 categories.",
    }),
  exerciseBlocks: z.array(z.string()).min(1, {
    message: "You must add at least one exercise block.",
  }),
});

export default function CreateTemplateForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      categories: [],
      exerciseBlocks: [],
    },
  });

  const { setValue, watch } = form;
  const [blocks, setBlocks] = useState([]);
  const categories = watch("categories");

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Template Name</FormLabel>
              <FormControl>
                <Input placeholder="My Workout" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categories</FormLabel>
                  <FormControl className="w-full">
                    <TagInput
                      placeholder={
                        categories.length >= 2
                          ? "Max 2 categories"
                          : "Enter a category"
                      }
                      tags={field.value || []}
                      className="sm:min-w-[450px]"
                      setTags={(newTags: SetStateAction<Tag[]>) => {
                        const updatedTags =
                          typeof newTags === "function"
                            ? newTags(field.value || [])
                            : newTags;
                        if (updatedTags.length <= 2) {
                          field.onChange(updatedTags);
                        }
                      }}
                      activeTagIndex={-1}
                      setActiveTagIndex={() => {}}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="exerciseBlocks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exercise Blocks</FormLabel>
                  <FormControl className="w-full">
                    <Input placeholder="Enter an exercise block" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
