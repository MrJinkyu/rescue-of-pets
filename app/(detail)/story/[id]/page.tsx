import { notFound } from "next/navigation";
import React from "react";

export default async function StoryDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    notFound();
  }
  return <div>StoryDetail</div>;
}
