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
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Trash } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ImageRequests } from "@/utils/request/image.request";
import { StoryRequests } from "@/utils/request/story.request";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function StoryForm({
  mode,
  currentStory,
}: {
  mode: "post" | "patch";
  currentStory?: StoryRelation;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [coverPreview, setCoverPreview] = useState<string | null>();
  const [selectedFile, setSelectedFile] = useState<File>();
  const router = useRouter();

  const formSchema =
    mode === "post" ? StoryValidations.POST : StoryValidations.PATCH;

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
      setCoverPreview(currentStory.cover?.url);
    }
  }, [currentStory, form]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setSelectedFile(selectedFile);
    setCoverPreview(URL.createObjectURL(selectedFile));
  };

  const handleDeleteFile = () => {
    setCoverPreview(null);
    setSelectedFile(undefined);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    if (mode === "post") {
      toast.promise(
        (async () => {
          if (selectedFile) {
            const cover = await ImageRequests.POST(selectedFile);
            const res = await StoryRequests.POST({
              ...values,
              coverId: cover.result.id,
            });
            if (res.errors)
              throw new Error(res.error.message || "invalid credentials");
            return res;
          } else {
            const res = await StoryRequests.POST({
              ...values,
              coverId: undefined,
            });

            if (res.errors)
              throw new Error(res.error.message || "invalid credentials");

            return res;
          }
        })(),
        {
          loading: "Posting...",
          success: () => {
            router.push("/profile");
            return "Success!";
          },
          error: (err) => err.message,
          finally: () => {
            setLoading(false);
          },
        }
      );
    } else {
      toast.promise(
        (async () => {
          if (selectedFile) {
            const cover = await ImageRequests.POST(selectedFile);
            const res = await StoryRequests.PATCH(currentStory?.id, {
              ...values,
              coverId: cover.result.id,
            });
            if (res.errors)
              throw new Error(res.error.message || "invalid credentials");
            return res;
          } else {
            const res = await StoryRequests.PATCH(currentStory?.id, {
              ...values,
              coverId: coverPreview === null ? null : undefined,
            });

            if (res.errors)
              throw new Error(res.error.message || "invalid credentials");

            return res;
          }
        })(),
        {
          loading: "Updating..",
          success: () => {
            router.push("/profile");
            return "Success!";
          },
          error: (err) => err.message,
          finally: () => {
            setLoading(false);
          },
        }
      );
    }
  }

  return (
    <Form {...form}>
      <form
        className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_1.4fr]"
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

          {coverPreview && (
            <div className="relative flex justify-center items-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={handleDeleteFile}
                    variant="destructive"
                    className="absolute right-4 bottom-4 cursor-pointer"
                  >
                    <Trash />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Delete cover</TooltipContent>
              </Tooltip>
              <Image
                src={coverPreview}
                alt="cover"
                width={800}
                height={400}
                priority
                className="w-full aspect-video object-cover rounded-2xl max-w-3xl"
              />
            </div>
          )}

          {!coverPreview && (
            <div className="grid w-full items-center gap-3">
              <Label htmlFor="picture">Picture</Label>
              <Input
                accept="image/*"
                id="picture"
                type="file"
                onChange={handleFileChange}
              />
            </div>
          )}
        </div>

        <div className="md:row-span-2 order-last md:order-none">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl className="pointer-events-none opacity-75 cursor-none">
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

        <Button
          disabled={loading}
          type="submit"
          className="md:col-span-2 order-last"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
