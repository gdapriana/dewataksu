"use client";

import {
  CategoryRelation,
  DestinationRelation,
  DistrictRelation,
} from "@/utils/types";
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
import { TraditionRequests } from "@/utils/request/tradition.request";
import { DestinationValidations } from "@/utils/validation/destination.validation";
import EmptyImage from "@/app/(root)/(client)/_components/empty/image";
import { DestinationRequests } from "@/utils/request/destination.request";

export default function DestinationForm({
  districts,
  categories,
  mode,
  currentDestination,
}: {
  districts: DistrictRelation[];
  categories: CategoryRelation[];
  mode: "post" | "patch";
  currentDestination?: DestinationRelation;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [coverPreview, setCoverPreview] = useState<string | null>();
  const [selectedFile, setSelectedFile] = useState<File>();
  const router = useRouter();

  type PostFormValues = z.infer<typeof DestinationValidations.POST>;
  type PatchFormValues = z.infer<typeof DestinationValidations.PATCH>;

  const form = useForm<PostFormValues | PatchFormValues>({
    resolver: zodResolver(
      mode === "post"
        ? DestinationValidations.POST
        : DestinationValidations.PATCH
    ),
    defaultValues: {
      name: currentDestination?.name || "",
      address: currentDestination?.address || undefined,
      description: currentDestination?.description || "",
      districtId: currentDestination?.districtId || "",
      price: currentDestination?.price || 0,
      mapUrl: currentDestination?.mapUrl || "",
      categoryId: currentDestination?.categoryId || "",
      coverId: currentDestination?.coverId || undefined,
      isPublished: currentDestination?.isPublished || false,
    },
  });

  useEffect(() => {
    if (currentDestination) {
      setCoverPreview(currentDestination.cover?.url);
    }
  }, [form]);

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
    if (mode === "patch" && currentDestination?.name === values.name)
      values.name = undefined;
    setLoading(true);
    if (mode === "post") {
      toast.promise(
        (async () => {
          if (selectedFile) {
            const cover = await ImageRequests.POST(selectedFile);
            const res = await DestinationRequests.POST({
              ...values,
              coverId: cover.result.id,
            });
            if (res.errors)
              throw new Error(res.errors || "invalid credentials");
            return res;
          } else {
            const res = await DestinationRequests.POST({
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
            router.push("/admin/destinations");
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
            const res = await DestinationRequests.PATCH(
              {
                ...values,
                coverId: cover.result.id,
              },
              currentDestination?.id
            );
            if (res.errors)
              throw new Error(res.errors || "invalid credentials");
            return res;
          } else {
            const res = await DestinationRequests.PATCH(
              {
                ...values,
                coverId: coverPreview === null ? null : undefined,
              },
              currentDestination?.id
            );

            if (res.errors)
              throw new Error(res.errors || "invalid credentials");
            return res;
          }
        })(),
        {
          loading: "Updating..",
          success: () => {
            router.push("/admin/destinations");
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
          <div className="flex md:w-1/2 flex-col gap-8 justify-start items-stretch">
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
              name="mapUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Map Url</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Insert map url (google map)"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormDescription>
                    This is the map of the destination
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => {
                const { onChange, ...restField } = field;

                return (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        onChange={(event) => {
                          const value = event.target.value;
                          onChange(value === "" ? 0 : parseInt(value, 10));
                        }}
                        disabled={loading}
                        placeholder="Insert entering cost"
                        {...restField}
                        type="number"
                        min={0}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormDescription>
                      This is price for entering the destination. 0 For free
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
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

          <div className="flex md:w-1/2 flex-col gap-8 justify-start items-stretch">
            <FormField
              control={form.control}
              name="districtId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>District</FormLabel>
                  <Select
                    disabled={loading}
                    defaultValue={field.value || undefined}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select district" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Available</SelectLabel>
                        {districts.map((district) => (
                          <SelectItem key={district.id} value={district.id}>
                            {district.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    This is destination's district
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    disabled={loading}
                    defaultValue={field.value || undefined}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Available</SelectLabel>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    This is destination's category
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {coverPreview ? (
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
            ) : (
              <EmptyImage className={{ icon: "w-14 h-14" }} />
            )}

            {!coverPreview && (
              <div className="grid w-full items-center gap-3">
                <Label htmlFor="picture">Cover</Label>
                <Input
                  disabled={loading}
                  accept="image/*"
                  id="picture"
                  type="file"
                  onChange={handleFileChange}
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-2 items-center">
          <Button
            asChild
            disabled={loading}
            variant="secondary"
            className={cn("", loading && "pointer-events-none")}
          >
            <Link href="/admin/destinations">Cancel</Link>
          </Button>
          <Button disabled={loading} type="submit">
            {mode === "patch" ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
