import { getChatRoom, getInitMessages } from "@/app/(chat)/action";
import ChatMessageList from "@/components/(chat)/chat-message-list";
import { getSession } from "@/session/getSession";
import { notFound } from "next/navigation";

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
  return (
    <ChatMessageList
      initMessageList={initMessageList}
      loginUserId={loginUserId}
    />
  );
}
