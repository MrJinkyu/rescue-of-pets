"use client";

import { PhotoIcon } from "@heroicons/react/24/solid";
import LabelAndSelectBar from "@/components/common/label-and-select-bar";
import { createTemporaryProtection } from "@/app/(add)/temporary-protection/new/action";
import { useFormState } from "react-dom";
import SubmitButton from "@/components/common/submit-button";
import { useState } from "react";
import InputText from "../common/input-text";
import Textarea from "../common/textarea";
import {
  areaOptions,
  detailCatOptions,
  detailDogOptions,
  genderOptions,
  speciesOptions,
} from "@/constants/options";

export default function TemporaryProtectionForm() {
  const [options, setOptions] = useState({
    gender: "미확인",
    species: "모든 동물",
    detail: "전체",
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
  const [state, dispatch] = useFormState(createTemporaryProtection, null);
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
              <span className="text-xs font-medium text-red-500">
                {state?.fieldErrors.photo}
              </span>
            </>
          )}
        </label>
      </div>
      <LabelAndSelectBar
        title="성별"
        name="gender"
        options={genderOptions}
        selectValue={selectOption}
        value={options.gender}
      />
      <div className="flex gap-4">
        <LabelAndSelectBar
          title="동물"
          name="species"
          options={speciesOptions}
          selectValue={selectOption}
          value={options.species}
        />
        {(options.species === "개" || options.species === "고양이") && (
          <LabelAndSelectBar
            title="품종"
            name="detail"
            options={
              options.species === "개" ? detailDogOptions : detailCatOptions
            }
            selectValue={selectOption}
            value={options.detail}
          />
        )}
      </div>
      <LabelAndSelectBar
        title="지역"
        name="area"
        options={areaOptions}
        selectValue={selectOption}
        value={options.area}
      />
      <InputText
        name="rescuePlace"
        title="장소"
        placeholder="구체적인 구조 장소를 적어주세요"
        errors={state?.fieldErrors.rescuePlace}
      />
      <Textarea
        name="description"
        title="내용"
        placeholder="구조 당시 상황 또는 눈에 띄는 특징을 적어주세요"
      />
      <input
        type="text"
        name="gender"
        className="hidden"
        value={options.gender}
        onChange={() => {}}
      />
      <input
        type="text"
        name="species"
        className="hidden"
        value={options.species}
        onChange={() => {}}
      />
      <input
        type="text"
        name="detail"
        className="hidden"
        value={options.detail}
        onChange={() => {}}
      />
      <input
        type="text"
        name="area"
        className="hidden"
        value={options.area}
        onChange={() => {}}
      />
      <SubmitButton text="작성하기" />
    </form>
  );
}
