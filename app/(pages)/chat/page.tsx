import { getSession } from "@/session/getSession";
import { getChatRoomList } from "./action";
import ChatRoomList from "@/components/(chat)/chat-room-list";

export default async function Chat() {
  const session = await getSession();
  const userId = session.id!;
  const chatRoomList = await getChatRoomList(userId);
  return (
    <div className="flex flex-col border-b-2 last:border-none border-neutral-500">
      {chatRoomList.map((room) => (
        <ChatRoomList
          key={room.id}
          id={room.id}
          lastMessage={room.messages[0].payload}
          avatar={room.users[0]?.avatar}
          username={room.users[0]?.username}
          createdAt={room.createdAt}
        />
      ))}
    </div>
  );
}
