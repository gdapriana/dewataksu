"use client";

import { UserRelation } from "@/utils/types";
import { useState } from "react";

export default function UsersTable() {
  const [users, setUsers] = useState<UserRelation[]>([]);
  return <div>table</div>;
}
