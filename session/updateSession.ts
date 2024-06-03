import { getSession } from "./getSession";

export async function updateSession(userId: number) {
  const session = await getSession();
  session.id = userId;
  await session.save();
}
