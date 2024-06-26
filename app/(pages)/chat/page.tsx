import { getSession } from "@/session/getSession";
import { getChatRoomList } from "./action";
import ChatRoomList from "@/components/(chat)/chat-room-list";
import EmptyText from "@/components/common/empty-text";

export default async function Chat() {
  const session = await getSession();
  const userId = session.id!;
  const chatRoomList = await getChatRoomList(userId);
  return (
    <div className="flex flex-col border-b-2 last:border-none border-neutral-500">
      {chatRoomList.length === 0 && (
        <EmptyText text="채팅 리스트가 비어있습니다!" />
      )}
      {chatRoomList.map((room) => (
        <ChatRoomList
          key={room.id}
          id={room.id}
          lastMessage={room.messages[0]?.payload ?? null}
          avatar={room.users[0]?.avatar ?? null}
          username={room.users[0]?.username ?? null}
          createdAt={room.createdAt}
        />
      ))}
    </div>
  );
}
