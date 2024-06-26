import EditProfileForm from "@/components/(add)/edit-profile-form";
import AddTopBar from "@/components/common/add-top-bar";
import { getSession } from "@/session/getSession";
import LogoutButton from "@/components/(mypage)/logout-button";
import DeleteUserButton from "@/components/(mypage)/delete-user-button";
import { getCachedUserInfo } from "@/app/(pages)/mypage/action";

export default async function ProfileEdit() {
  const session = await getSession();
  const loginUserId = session.id!;
  const userInfo = await getCachedUserInfo(loginUserId);
  return (
    <div>
      <AddTopBar title="프로필 편집" />
      <EditProfileForm {...userInfo!} />
      <div className="absolute bottom-6 left-0 right-0 mx-auto w-full max-w-screen-sm pr-6 flex items-center justify-end *:text-neutral-500">
        <LogoutButton />
        <span className="mx-4">|</span>
        <DeleteUserButton loginUserId={loginUserId} />
      </div>
    </div>
  );
}
