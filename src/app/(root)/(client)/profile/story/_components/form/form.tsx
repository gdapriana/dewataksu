"use client";

import { StoryRelation } from "@/utils/types";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { StoryValidations } from "@/utils/validation/story.validation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import TiptapEditor from "@/app/(root)/_components/tiptap/editor";
import { Button } from "@/components/ui/button";

const formSchema = StoryValidations.POST;

export default function StoryForm({
  mode,
  currentStory,
}: {
  mode: "post" | "patch";
  currentStory?: StoryRelation;
}) {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      content: "",
      isPublished: false,
      coverId: undefined,
    },
  });

  useEffect(() => {
    if (currentStory) {
      form.reset({
        name: currentStory.name,
        content: currentStory.content,
        isPublished: currentStory.isPublished,
        coverId: currentStory.coverId || undefined,
      });
    }
  }, [currentStory, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ values });
  }

  return (
    <Form {...form}>
      <form
        className="grid grid-cols-1 gap-8 md:grid-cols-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-8 justify-start items-stretch">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Insert your story title"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is the public title of your story
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isPublished"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="mb-2">Published</FormLabel>
                  <FormDescription>
                    Save it to edit letter before go public
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    disabled={loading}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-readonly
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="md:row-span-2 order-last md:order-none">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <TiptapEditor
                    content={field.value}
                    onChange={field.onChange}
                    disabled={loading}
                  />
                </FormControl>
                <FormDescription>Write your story content here</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="md:col-span-2 order-last">
          Submit
        </Button>
      </form>
    </Form>
  );
}
