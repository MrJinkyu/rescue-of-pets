"use client";

import React, { useEffect, useRef, useState } from "react";
import StoryCard from "./story-card";
import { getMoreMyStory, getMoreStory } from "@/app/(pages)/story/action";

interface StoryListProps {
  initList: {
    title: string;
    photo: string | null;
    id: number;
    createdAt: Date;
    contents: string;
    user: {
      username: string;
      avatar: string | null;
    };
    _count: {
      comments: number;
      likes: number;
    };
  }[];
  isMypage?: boolean;
}

export default function StoryList({
  initList,
  isMypage = false,
}: StoryListProps) {
  const [posts, setPosts] = useState(initList);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const trigger = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        const element = entries[0];
        if (trigger.current && element.isIntersecting) {
          observer.unobserve(trigger.current);
          const nextPosts = isMypage
            ? await getMoreMyStory(page + 1)
            : await getMoreStory(page + 1);
          if (nextPosts.length !== 0) {
            setPosts((prev) => [...prev, ...nextPosts]);
            setPage((prev) => prev + 1);
          } else {
            setIsLastPage(true);
          }
        }
      },
      {
        rootMargin: "0px 0px -73px 0px",
      }
    );
    if (trigger.current) {
      observer.observe(trigger.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [page, isMypage]);

  return (
    <div
      className={`bg-neutral-100 flex flex-col gap-4 last-of-type:pb-4 ${
        isMypage ? "pt-[69px] px-4" : "p-4"
      }`}
    >
      {posts.map((post) => (
        <StoryCard key={post.id} {...post} />
      ))}
      {!isLastPage && <span ref={trigger} className="w-full" />}
    </div>
  );
}
