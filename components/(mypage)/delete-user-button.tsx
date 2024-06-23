import { deleteUser } from "@/app/(add)/profile-edit/action";

export default async function DeleteUserButton() {
  return (
    <form action={deleteUser}>
      <button>회원탈퇴</button>
    </form>
  );
}
