"use server";

import bcrypt from "bcrypt";
import {
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR_MESSAGE,
} from "@/constants/password";
import prismaDB from "@/database/db";
import { z } from "zod";
import { updateSession } from "@/session/updateSession";
import { redirect } from "next/navigation";

async function checkEmailExists(email: string) {
  const user = await prismaDB.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user);
}

const formSchema = z.object({
  email: z
    .string()
    .trim()
    .email()
    .toLowerCase()
    .refine(checkEmailExists, "존재하지 않는 이메일입니다"),
  password: z
    .string()
    .trim()
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR_MESSAGE),
});

export async function loginUser(_: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const results = await formSchema.safeParseAsync(data);
  if (!results.success) {
    return results.error.flatten();
  } else {
    const user = await prismaDB.user.findUnique({
      where: {
        email: results.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    const validatePassword = await bcrypt.compare(
      results.data.password,
      user!.password ?? "test"
    );
    if (validatePassword) {
      await updateSession(user!.id);
      redirect("/");
    } else {
      return {
        fieldErrors: {
          email: [],
          password: ["이메일 또는 비밀번호가 유효하지 않습니다"],
        },
      };
    }
  }
}
