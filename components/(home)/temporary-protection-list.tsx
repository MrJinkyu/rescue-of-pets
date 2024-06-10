"use client";

import { useEffect, useRef, useState } from "react";
import TemporaryProtectionCard from "./temporary-protection-card";
import { getMoreTemporaryProtections } from "@/app/(pages)/(home)/action";

interface TemporaryProtectionListProps {
  initList: {
    id: number;
    createdAt: Date;
    isActive: boolean;
    gender: string;
    species: string;
    detail: string | null;
    rescuePlace: string;
    area: string;
    photo: string;
  }[];
}

export default function TemporaryProtectionList({
  initList,
}: TemporaryProtectionListProps) {
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
          const nextPosts = await getMoreTemporaryProtections(page + 1);
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
  }, [page]);
  return (
    <>
      {posts.map((post) => (
        <TemporaryProtectionCard key={post.id} {...post} />
      ))}
      {!isLastPage && <span ref={trigger} className="w-full h-0"></span>}
    </>
  );
}
