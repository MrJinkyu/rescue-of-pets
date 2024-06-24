"use client";

import { deleteUser } from "@/app/(add)/profile-edit/action";
import { useState } from "react";
import ConfirmModal from "../common/confirm-modal";

export default function DeleteUserButton({
  loginUserId,
}: {
  loginUserId: number;
}) {
  const [openModal, setOpenModal] = useState(false);
  const openConfirmModal = () => {
    setOpenModal(true);
  };
  const closeConfirmModal = () => {
    setOpenModal(false);
  };
  const confirmOnClick = async () => {
    await deleteUser(loginUserId);
  };
  return (
    <div>
      <button onClick={openConfirmModal}>회원탈퇴</button>
      {openModal && (
        <ConfirmModal
          text="회원탈퇴 시 데이터가 삭제되며 다시 복구할 수 없습니다. 정말 탈퇴하시겠어요?"
          yes="네, 회원 탈퇴에 동의합니다."
          no="취소"
          confirmOnClick={confirmOnClick}
          closeConfirmModal={closeConfirmModal}
        />
      )}
    </div>
  );
}
