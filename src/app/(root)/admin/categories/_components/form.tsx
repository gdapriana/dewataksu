"use client";
import { Button } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CategoryRequests } from "@/utils/request/category.request";
import { ImageRequests } from "@/utils/request/image.request";
import { CategoryRelation } from "@/utils/types";
import { CategoryValidations } from "@/utils/validation/category.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function CategoryForm({
  mode,
  currentCategory,
}: {
  mode: "post" | "patch";
  currentCategory?: CategoryRelation;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [coverPreview, setCoverPreview] = useState<string | null>();
  const [selectedFile, setSelectedFile] = useState<File>();
  const router = useRouter();

  const formSchema =
    mode === "post" ? CategoryValidations.POST : CategoryValidations.PATCH;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      coverId: undefined,
    },
  });

  useEffect(() => {
    if (currentCategory) {
      form.reset({
        name: currentCategory.name,
        description: currentCategory.description || undefined,
        coverId: currentCategory.coverId || undefined,
      });
      setCoverPreview(currentCategory.cover?.url);
    }
  }, [currentCategory, form]);

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
    console.log({ values });
    if (mode === "post") {
      toast.promise(
        (async () => {
          if (selectedFile) {
            const cover = await ImageRequests.POST(selectedFile);
            const res = await CategoryRequests.POST({
              ...values,
              coverId: cover.result.id,
            });
            if (res.errors)
              throw new Error(res.errors || "invalid credentials");
            return res;
          } else {
            const res = await CategoryRequests.POST({
              ...values,
              coverId: undefined,
            });
            if (res.errors)
              throw new Error(res.errors || "invalid credentials");
            return res;
          }
        })(),
        {
          loading: "Posting...",
          success: () => {
            router.push("/admin/categories");
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
            const res = await CategoryRequests.PATCH(currentCategory, {
              ...values,
              coverId: cover.result.id,
            });
            if (res.errors)
              throw new Error(res.errors || "invalid credentials");
            return res;
          } else {
            const res = await CategoryRequests.PATCH(currentCategory, {
              ...values,
              coverId: coverPreview === null ? null : undefined,
            });

            if (res.errors)
              throw new Error(res.errors || "invalid credentials");
            return res;
          }
        })(),
        {
          loading: "Updating..",
          success: () => {
            router.push("/admin/categories");
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
        className="flex my-8 max-w-xl mx-auto flex-col justify-start items-center w-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col w-full justify-start items-stretch md:justify-center md:items-start md:flex-row gap-8">
          <div className="flex flex-col gap-8 justify-start w-full items-stretch">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Insert category name"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is the public title of the category
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
                      placeholder="Category's description"
                      {...field}
                    ></Textarea>
                  </FormControl>
                  <FormDescription>
                    This is the public description of category
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
          </div>
        </div>

        <div className="flex my-8 justify-end w-full gap-2 items-center">
          <Button asChild disabled={loading} variant="secondary">
            <Link href="/admin/categories">Cancel</Link>
          </Button>
          <Button disabled={loading} type="submit">
            {mode === "post" ? "Create" : "Update"}
            {loading && (
              <Loader2 className="animate-spin inline w-5 h-5 text-gray-400" />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
