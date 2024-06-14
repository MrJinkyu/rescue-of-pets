"use client";

import { useState } from "react";

interface StoryCommentFormProps {
  handleSubmit: (text: string) => void;
}

export default function StoryCommentForm({
  handleSubmit,
}: StoryCommentFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setText(value);
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (text.trim() === "") {
      setIsLoading(false);
      return;
    }

    handleSubmit(text);
    setText("");
    setIsLoading(false);
  };
  return (
    <form onSubmit={onSubmit} className="flex items-center gap-3">
      <input
        placeholder="여기에 댓글을 입력하세요"
        name="payload"
        type="text"
        value={text}
        onChange={handleChange}
        className="bg-neutral-100 flex-1 px-3 py-2 rounded-sm border-none outline-none"
      />
      <button
        disabled={isLoading}
        className="bg-mainColor text-white px-3 py-2 rounded-sm"
      >
        입력
      </button>
    </form>
  );
}
