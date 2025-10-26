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
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

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
      description: "",
      content: "",
      isPublished: false,
      coverId: undefined,
    },
  });

  useEffect(() => {
    if (currentStory) {
      form.reset({
        name: currentStory.name,
        description: currentStory.description,
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
        className="flex flex-col gap-8 justify-start items-stretch"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex w-full flex-col justify-start items-stretch md:flex-row gap-4">
          <div className="flex md:w-1/3 flex-col gap-8 justify-start items-stretch">
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder="Your short description"
                      {...field}
                    ></Textarea>
                  </FormControl>
                  <FormDescription>
                    This is the public description of your story
                  </FormDescription>
                  <FormMessage />
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

          <div className="md:w-2/3">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="h-full flex flex-col gap-2">
                  <FormLabel>Content</FormLabel>
                  <FormControl className="pointer-events-none h-full opacity-75 cursor-none">
                    <TiptapEditor
                      content={field.value}
                      onChange={field.onChange}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 items-center">
          <Button asChild disabled={loading} variant="secondary">
            <Link href="/profile">Cancel</Link>
          </Button>
          <Button disabled={loading} type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
