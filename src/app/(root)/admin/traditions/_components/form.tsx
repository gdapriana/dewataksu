"use client";

import { DistrictRelation, TraditionRelation } from "@/utils/types";
import { TraditionValidations } from "@/utils/validation/tradition.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

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
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import TiptapEditor from "@/app/(root)/_components/tiptap/editor";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { ImageRequests } from "@/utils/request/image.request";
import { DistrictRequests } from "@/utils/request/district.request";
import { TraditionRequests } from "@/utils/request/tradition.request";

export default function TraditionForm({
  districts,
  mode,
  currentTradition,
}: {
  districts: DistrictRelation[];
  mode: "post" | "patch";
  currentTradition?: TraditionRelation;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [coverPreview, setCoverPreview] = useState<string | null>();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [selectedDistrictId, setSelectedDistrictId] = useState<string | null>();
  const router = useRouter();

  type PostFormValues = z.infer<typeof TraditionValidations.POST>;
  type PatchFormValues = z.infer<typeof TraditionValidations.PATCH>;

  const form = useForm<PostFormValues | PatchFormValues>({
    resolver: zodResolver(
      mode === "post" ? TraditionValidations.POST : TraditionValidations.PATCH
    ),
    defaultValues: {
      name: currentTradition?.name || "",
      description: currentTradition?.description || "",
      address: currentTradition?.address || undefined,
      content: currentTradition?.content || "",
      districtId: currentTradition?.districtId || "",
      coverId: currentTradition?.coverId || undefined,
      isPublished: currentTradition?.isPublished || false,
    },
  });

  useEffect(() => {
    if (currentTradition) {
      setSelectedDistrictId(currentTradition.districtId);
      setCoverPreview(currentTradition.cover?.url);
    }
  }, [currentTradition, form]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setSelectedFile(selectedFile);
    setCoverPreview(URL.createObjectURL(selectedFile));
  };

  const handleDeleteFile = () => {
    if (loading) return;
    setCoverPreview(null);
    setSelectedFile(undefined);
  };

  async function onSubmit(values: PostFormValues | PatchFormValues) {
    if (mode === "patch" && currentTradition?.name === values.name)
      values.name = undefined;
    setLoading(true);
    if (mode === "post") {
      toast.promise(
        (async () => {
          if (selectedFile) {
            const cover = await ImageRequests.POST(selectedFile);
            const res = await TraditionRequests.POST({
              ...values,
              coverId: cover.result.id,
            });
            if (res.errors)
              throw new Error(res.errors || "invalid credentials");
            return res;
          } else {
            const res = await TraditionRequests.POST({
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
            router.push("/admin/traditions");
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
            const res = await TraditionRequests.PATCH(
              {
                ...values,
                coverId: cover.result.id,
              },
              currentTradition?.id
            );
            if (res.errors)
              throw new Error(res.errors || "invalid credentials");
            return res;
          } else {
            const res = await TraditionRequests.PATCH(
              {
                ...values,
                coverId: coverPreview === null ? null : undefined,
              },
              currentTradition?.id
            );

            if (res.errors)
              throw new Error(res.errors || "invalid credentials");
            return res;
          }
        })(),
        {
          loading: "Updating..",
          success: () => {
            router.push("/admin/traditions");
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
        className="flex pb-12 flex-col gap-8 justify-start items-stretch"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex w-full flex-col justify-start items-stretch md:flex-row gap-4">
          <div className="flex md:w-2/5 flex-col gap-8 justify-start items-stretch">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Insert tradition name"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is the public title of the tradition
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="districtId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>District</FormLabel>
                  <Select
                    onValueChange={(value) =>
                      field.onChange(value === "none" ? undefined : value)
                    }
                    disabled={loading}
                    defaultValue={field.value || "none"}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select district (optional)" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Available</SelectLabel>
                        <SelectItem value="none">None</SelectItem>
                        {districts.map((district) => (
                          <SelectItem key={district.id} value={district.id}>
                            {district.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    You can leave this empty if the tradition isn’t tied to a
                    specific district.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Insert address"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormDescription>
                    This is the public address of the tradition
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
                      disabled={loading}
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
                  disabled={loading}
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

          <div className="md:w-3/5">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem
                  className={cn(
                    "h-full flex flex-col gap-2",
                    loading && "pointer-events-none opacity-50"
                  )}
                >
                  <FormLabel>Content</FormLabel>
                  <FormControl className="h-full">
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
          <Button
            asChild
            disabled={loading}
            variant="secondary"
            className={cn("", loading && "pointer-events-none")}
          >
            <Link href="/admin/traditions">Cancel</Link>
          </Button>
          <Button disabled={loading} type="submit">
            {mode === "patch" ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
