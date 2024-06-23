import { deleteSession } from "@/session/deleteSession";

export default async function LogoutButton() {
  return (
    <form action={deleteSession}>
      <button>로그아웃</button>
    </form>
  );
}
