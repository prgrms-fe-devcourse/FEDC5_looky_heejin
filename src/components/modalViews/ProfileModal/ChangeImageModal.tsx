import { useState } from "react";
import { rootAPI } from "@/api";
import { Button, Upload } from "@/components/common";
import { ModalLayout } from "@/components/common/Modal";
import { useUI } from "@/components/common/uiContext";
import { useMutation } from "@tanstack/react-query";
import { _UPDATE_IMAGE } from "@/api/queries/profile";
import { IUpdateImage } from "@/types/profile";
import { useProfile } from "@/hooks/useProfile";
import { UploadWrap } from "./ProfileModal.style";
import { notify } from "@/utils/toast";
import { useMe } from "@/hooks/useMe";

const ChangeImageModal = () => {
  const { setProfileImage, setProfileCover } = useProfile();
  const { id, userName, setMe } = useMe();
  const [image, setImage] = useState<File>();

  const { closeModal, modalView } = useUI();
  const [isCover] = useState(modalView === "EDIT_COVERIMAGE_VIEW");

  const mutation = useMutation({
    mutationFn: async (formData: IUpdateImage) => await _UPDATE_IMAGE(formData),
    onSuccess(data) {
      rootAPI.defaults.headers["Content-Type"] =
        "application/x-www-form-urlencoded";
      if (data.image) {
        if (id && userName) setMe({ id, userName, profilePhoto: data.image });
        setProfileImage(data.image);
        notify({
          type: "success",
          text: "프로필 이미지를 성공적으로 변경했습니다.",
        });
      }
      if (data.coverImage) {
        setProfileCover(data.coverImage);
        notify({
          type: "success",
          text: "커버 이미지를 성공적으로 변경했습니다.",
        });
      }
    },
    onError(error) {
      notify({
        type: "error",
        text: "이미지 변경에 실패했습니다.",
      });
      console.error("API 에러: ", error);
    },
  });

  const handleChangeFile = async (file: File) => {
    setImage(file);
  };

  const handleSubmit = () => {
    if (!image) return;
    rootAPI.defaults.headers["Content-Type"] = "multipart/form-data";

    if (modalView === "EDIT_IMAGE_VIEW") {
      mutation.mutate({
        isCover: false,
        image,
      });
    } else if (modalView === "EDIT_COVERIMAGE_VIEW") {
      mutation.mutate({
        isCover: true,
        image,
      });
    }

    closeModal();
  };

  return (
    <ModalLayout>
      <section>
        <UploadWrap $iscover={isCover.toString()}>
          <Upload
            onChange={handleChangeFile}
            style={{ position: "relative", width: "100%", height: "100%" }}
          />
        </UploadWrap>
        <Button variant="symbol" onClick={handleSubmit}>
          이미지 변경
        </Button>
      </section>
    </ModalLayout>
  );
};

export default ChangeImageModal;
