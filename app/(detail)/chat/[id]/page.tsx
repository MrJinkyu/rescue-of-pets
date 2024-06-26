import { getSession } from "@/session/getSession";
import { notFound } from "next/navigation";
import { getChatRoom, getInitMessages } from "./action";
import ChatMessageList from "@/components/(chat)/chat-message-list";
import { getCachedUserInfo } from "@/app/(pages)/mypage/action";

export default async function ChatDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const room = await getChatRoom(id);
  if (!room) {
    notFound();
  }
  const initMessageList = await getInitMessages(room.id);
  const session = await getSession();
  const loginUserId = session.id!;
  const otherUser = room.users.find((user) => user.id !== loginUserId);
  const otherUserInfo = otherUser
    ? await getCachedUserInfo(otherUser.id)
    : null;
  const loginUserInfo = await getCachedUserInfo(loginUserId);
  return (
    <ChatMessageList
      chatRoomId={room.id}
      initMessageList={initMessageList.reverse()}
      loginUserInfo={loginUserInfo!}
      otherUserInfo={otherUserInfo}
    />
  );
}
