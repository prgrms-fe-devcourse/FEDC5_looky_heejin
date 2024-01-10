import { Button, Upload } from "../common";
import { ModalLayout } from "../common/Modal";
import { styled } from "styled-components";
import { useUI } from "../common/uiContext";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { _UPDATE_IMAGE } from "@/api/queries/profile";
import { IUpdateImage } from "@/types/profile";

const UploadWrap = styled.div<{ iscover: boolean }>`
  width: 300px;
  aspect-ratio: ${props => (props.iscover ? 10 / 16 : 1 / 1)};
`;

const ChangeImageModal = () => {
  const [image, setImage] = useState<File>();

  const { closeModal, modalView } = useUI();
  const [isCover] = useState(modalView === "EDIT_COVERIMAGE_VIEW");

  const mutation = useMutation({
    mutationFn: async (formData: IUpdateImage) => await _UPDATE_IMAGE(formData),
    onSuccess(data) {
      console.log("API 데이터: ", data);
    },
    onError(error) {
      console.error("API 에러: ", error);
    },
  });

  const handleChangeFile = async (file: File) => {
    setImage(file);
  };

  const handleSubmit = () => {
    if (!image) return;

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
        <UploadWrap iscover={isCover}>
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
