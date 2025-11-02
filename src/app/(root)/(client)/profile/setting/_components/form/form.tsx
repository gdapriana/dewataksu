import { UserRelation } from "@/utils/types";
import { useState } from "react";

export default function ProfileForm({
  currentProfile,
}: {
  currentProfile: UserRelation;
}) {
  const [loading, setLoading] = useState<boolean>();
  const [coverPreview, setCoverPreview] = useState<string | null>();
  const [selectedFile, setSelectedFile] = useState<File>();

  return <div>ProfileForm</div>;
}
