"use server";

import { PHONE_REGEX, PHONE_REGEX_ERROR_MESSAGE } from "@/constants/phone";
import prismaDB from "@/database/db";
import { redirect } from "next/navigation";
import { z } from "zod";
import crypto from "crypto";
import { updateSession } from "@/session/updateSession";
import { TOKEN_MAX_LENGRH, TOKEN_MIN_LENGRH } from "@/constants/token";

const phoneSchema = z
  .string()
  .trim()
  .regex(PHONE_REGEX, PHONE_REGEX_ERROR_MESSAGE);

const tokenSchema = z.coerce
  .number()
  .min(TOKEN_MIN_LENGRH)
  .max(TOKEN_MAX_LENGRH)
  .refine(tokenExists, "인증 번호가 유효하지 않습니다");

async function getRandomTokenValue() {
  const token = crypto.randomInt(TOKEN_MIN_LENGRH, TOKEN_MAX_LENGRH).toString();
  const exists = await prismaDB.sMSToken.findUnique({
    where: {
      token,
    },
    select: {
      id: true,
    },
  });
  if (exists) {
    return getRandomTokenValue();
  } else {
    return token;
  }
}

async function tokenExists(token: number) {
  const exists = await prismaDB.sMSToken.findUnique({
    where: {
      token: token.toString(),
    },
    select: {
      id: true,
    },
  });
  return Boolean(exists);
}

interface ActionState {
  token: boolean;
}

export async function smsLogin(prevState: ActionState, formData: FormData) {
  const phone = formData.get("phone");
  const token = formData.get("token");
  if (!prevState.token) {
    const result = phoneSchema.safeParse(phone);
    if (!result.success) {
      console.log(result.error.flatten());
      return {
        token: false,
        error: result.error.flatten(),
      };
    } else {
      // 이전 모든 토큰값 삭제
      await prismaDB.sMSToken.deleteMany({
        where: {
          user: {
            phone: result.data,
          },
        },
      });
      // 랜덤한 값 생성
      const randomTokenValue = await getRandomTokenValue();
      // 토큰 생성 + 유저 연결 or 유저 생성
      await prismaDB.sMSToken.create({
        data: {
          token: randomTokenValue,
          user: {
            connectOrCreate: {
              where: {
                phone: result.data,
              },
              create: {
                username: crypto.randomBytes(10).toString("hex"),
                phone: result.data,
              },
            },
          },
        },
      });
      return {
        token: true,
      };
    }
  } else {
    const result = await tokenSchema.safeParseAsync(token);
    if (!result.success) {
      return {
        token: true,
        error: result.error.flatten(),
      };
    } else {
      const token = await prismaDB.sMSToken.findUnique({
        where: {
          token: result.data.toString(),
        },
        select: {
          id: true,
          userId: true,
        },
      });
      updateSession(token!.userId);
      await prismaDB.sMSToken.delete({
        where: {
          id: token!.id,
        },
      });
      redirect("/");
    }
  }
}
