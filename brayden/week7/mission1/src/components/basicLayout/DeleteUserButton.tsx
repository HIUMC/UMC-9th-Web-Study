import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Modal from "../ModalComponent/Modal";
import useDeleteMyInfo from "../../hooks/mutations/myInfo/useDeleteMyInfo";

const DeleteUserButton = () => {
  const { accessToken } = useAuth();
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const handleOpenDelete = () => setIsOpenDelete(true);
  const handleCloseDelete = () => setIsOpenDelete(false);

  const { mutate: deleteMyInfoMutate } = useDeleteMyInfo();

  const handleDeleteMyInfo = () => {
    deleteMyInfoMutate();
  };

  return (
    <>
      {accessToken && (
        <button
          className="mt-auto bg-black text-white py-2 px-3 rounded text-xs transition cursor-pointer"
          onClick={handleOpenDelete}
        >
          탈퇴하기
        </button>
      )}
      {isOpenDelete && (
        <Modal onClick={handleCloseDelete}>
          <div className="flex flex-col items-center w-lg z-100 my-30">
            <span className="text-xl text-white">정말 탈퇴하시겠습니까?</span>
            <div className="mt-10 w-xs justify-between flex">
              <button
                onClick={handleDeleteMyInfo}
                className="text-black rounded-sm bg-gray-200 w-25 h-8 cursor-pointer"
              >
                예
              </button>
              <button
                onClick={handleCloseDelete}
                className="text-white rounded-sm bg-pink-500 w-25 h-8 cursor-pointer"
              >
                아니오
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default DeleteUserButton;
