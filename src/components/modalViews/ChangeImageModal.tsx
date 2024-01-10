import { Button, Upload } from "../common";
import { ModalLayout } from "../common/Modal";
import { styled } from "styled-components";
import { useUI } from "../common/uiContext";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { _UPDATE_IMAGE } from "@/api/queries/profile";

interface IFileProps {
  isCover: boolean;
  image: File;
}

const UploadWrap = styled.div`
  width: 300px;
  height: 300px;
  aspect-ratio: 10 / 16;
`;

const ChangeImageModal = () => {
  const [image, setImage] = useState<File>();
  const { closeModal } = useUI();

  const mutation = useMutation({
    mutationFn: async (formData: IFileProps) => await _UPDATE_IMAGE(formData),
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
    if (image) {
      mutation.mutate({
        isCover: false,
        image,
      });
    }

    closeModal();
  };

  return (
    <ModalLayout>
      <section>
        <UploadWrap>
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