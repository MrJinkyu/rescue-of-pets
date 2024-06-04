"use server";

import {
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR_MESSAGE,
} from "@/constants/password";
import prismaDB from "@/database/db";
import { redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from "bcrypt";
import { updateSession } from "@/session/updateSession";

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "닉네임은 문자열만 입력 가능합니다",
      })
      .trim(),
    email: z.string().trim().email().toLowerCase(),
    password: z
      .string()
      .trim()
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR_MESSAGE),
    password_confirm: z
      .string()
      .trim()
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR_MESSAGE),
  })
  .superRefine(async ({ username }, ctx) => {
    // 닉네임 중복검사
    const user = await prismaDB.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "이미 사용중인 닉네임입니다",
        path: ["username"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ email }, ctx) => {
    // 이메일 중복검사
    const user = await prismaDB.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "이미 사용중인 이메일입니다",
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .refine(
    ({ password, password_confirm }) => {
      return password === password_confirm;
    },
    {
      message: "비밀번호가 일치하지 않습니다",
      path: ["password_confirm"],
    }
  );

export async function createUser(_: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    password_confirm: formData.get("password_confirm"),
  };
  const results = await formSchema.safeParseAsync(data);
  if (!results.success) {
    console.log(results.error.flatten());
    return results.error.flatten();
  } else {
    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(results.data.password, 12);
    // 유저 생성
    const user = await prismaDB.user.create({
      data: {
        username: results.data.username,
        email: results.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
    updateSession(user.id);
    redirect("/");
  }
}
