import { NestedComment } from "@/utils/types";
import { Easing } from "motion/react";

export const globalEase: Easing = [0.23, 1, 0.32, 1];
export const slugifySetting = {
  lower: true,
  strict: true,
  trim: true,
  replacement: "-",
  locale: "en",
};
export function formatNumber(
  value: number | null | undefined,
  digits = 1
): string {
  if (value === null || value === undefined || Number.isNaN(value)) return "-";

  const abs = Math.abs(value);

  const format = (num: number) => {
    const fixed = num.toFixed(digits);
    return fixed.replace(/\.0+$|(\.[0-9]*?)0+$/, "$1");
  };

  if (abs >= 1_000_000_000) {
    return `${value < 0 ? "-" : ""}${format(abs / 1_000_000_000)}B`;
  }
  if (abs >= 1_000_000) {
    return `${value < 0 ? "-" : ""}${format(abs / 1_000_000)}M`;
  }
  if (abs >= 1_000) {
    return `${value < 0 ? "-" : ""}${format(abs / 1_000)}k`;
  }
  return value.toString();
}

export function flattenReplies(comments: NestedComment[]): NestedComment[] {
  return comments.map((comment: NestedComment) => {
    let allReplies: NestedComment[] = [];

    function collectReplies(replies: NestedComment[]) {
      replies.forEach((reply) => {
        allReplies.push(reply);
        if (reply.replies && reply.replies.length > 0) {
          collectReplies(reply.replies);
        }
      });
    }

    collectReplies(comment.replies);
    return { ...comment, replies: allReplies } as NestedComment;
  });
}
