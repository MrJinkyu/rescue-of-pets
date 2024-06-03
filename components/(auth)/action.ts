"use server";
import {
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR_MESSAGE,
} from "@/constants/password";
import { error } from "console";
import { z } from "zod";

const phoneSchema = z
  .string()
  .trim()
  .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR_MESSAGE);

interface actionState {
  token: boolean;
}

async function smsLogin(prevState: actionState, formData: FormData) {
  const phone = formData.get("phone");
  const token = formData.get("token");

  if (!prevState.token) {
    const phoneResult = phoneSchema.safeParse(phone);
    if (!phoneResult.success) {
      return {
        token: false,
        error: phoneResult.error.flatten(),
      };
    }
  } else {
  }
}
