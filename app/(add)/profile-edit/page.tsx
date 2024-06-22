import EditProfileForm from "@/components/(add)/edit-profile-form";
import AddTopBar from "@/components/common/add-top-bar";
import { getUserInfo } from "@/app/(detail)/story/[id]/action";
import { getSession } from "@/session/getSession";

export default async function ProfileEdit() {
  const session = await getSession();
  const loginUserId = session.id!;
  const userInfo = await getUserInfo(loginUserId);
  return (
    <div>
      <AddTopBar title="프로필 편집" />
      <EditProfileForm {...userInfo!} />
    </div>
  );
}
