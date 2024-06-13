"use client";

import { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useFormState } from "react-dom";
import SubmitButton from "../common/submit-button";
import { createReport } from "@/app/(add)/report/new/action";
import InputText from "../common/input-text";
import Textarea from "../common/textarea";
import LabelAndSelectBar from "../common/label-and-select-bar";
import {
  areaOptions,
  categoryOptions,
  speciesOptions,
} from "@/constants/options";
import { createStory } from "@/app/(add)/story/new/action";

export default function StoryForm() {
  const [options, setOptions] = useState({
    category: "기타",
    species: "모든 동물",
    area: "모든 지역",
  });
  const [preview, setPreview] = useState("");
  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    if (!files || !files[0]) {
      return;
    }
    const url = URL.createObjectURL(files[0]);
    setPreview(url);
  };
  const selectOption = (name: string, value: string) => {
    setOptions((prev) => ({ ...prev, [name]: value }));
  };
  const [state, dispatch] = useFormState(createStory, null);
  return (
    <form action={dispatch} className="flex flex-col gap-6 p-6">
      <div className="text-center mx-auto">
        <input
          type="file"
          name="photo"
          id="file"
          className="hidden"
          onChange={onImageChange}
          accept="image/*"
        />
        <label
          htmlFor="file"
          className="flex flex-col justify-center items-center size-32 rounded-sm bg-neutral-50/50 ring-neutral-300 ring-1 active:ring-mainColor active:bg-sky-50/50 bg-center bg-cover"
          style={{ backgroundImage: `url(${preview})` }}
        >
          {!preview && (
            <>
              <PhotoIcon className="size-14 text-neutral-400" />
              <span className="text-neutral-400">사진 추가하기</span>
            </>
          )}
        </label>
      </div>
      <InputText name="title" title="제목" errors={state?.fieldErrors.title} />
      <Textarea
        name="contents"
        title="내용"
        errors={state?.fieldErrors.contents}
      />
      <SubmitButton text="작성하기" />
      <LabelAndSelectBar
        title="구분"
        name="category"
        options={categoryOptions}
        selectValue={selectOption}
        value={options.category}
      />
      <LabelAndSelectBar
        title="지역"
        name="area"
        options={areaOptions}
        selectValue={selectOption}
        value={options.area}
      />
      <LabelAndSelectBar
        title="동물"
        name="species"
        options={speciesOptions}
        selectValue={selectOption}
        value={options.species}
      />
      <input
        type="text"
        name="category"
        className="hidden"
        value={options.category}
        onChange={() => {}}
      />
      <input
        type="text"
        name="area"
        className="hidden"
        value={options.area}
        onChange={() => {}}
      />
      <input
        type="text"
        name="species"
        className="hidden"
        value={options.species}
        onChange={() => {}}
      />
    </form>
  );
}
