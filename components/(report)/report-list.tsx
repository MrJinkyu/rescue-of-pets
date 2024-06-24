"use client";

import { getMoreMyReports, getMoreReports } from "@/app/(pages)/report/action";
import ReportCard from "./report-card";
import { useEffect, useRef, useState } from "react";

interface ReportListProps {
  initList: {
    id: number;
    createdAt: Date;
    isActive: boolean;
    missingPlace: string;
    species: string;
    detail: string | null;
    gender: string;
    photo: string;
    name: string;
    age: string;
    weight: string;
    color: string;
  }[];
  isMypage?: boolean;
}

export default function ReportList({
  initList,
  isMypage = false,
}: ReportListProps) {
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
            ? await getMoreMyReports(page + 1)
            : await getMoreReports(page + 1);
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
    <div className={`grid grid-cols-2 ${isMypage ? "pt-[53px]" : ""}`}>
      {posts.map((post) => (
        <ReportCard key={post.id} {...post} />
      ))}
      {!isLastPage && <span ref={trigger} className="w-full h-0"></span>}
    </div>
  );
}
