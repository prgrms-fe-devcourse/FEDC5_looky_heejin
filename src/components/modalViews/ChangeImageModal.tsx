import { Button, Upload } from "../common";
import { ModalLayout } from "../common/Modal";
import { styled } from "styled-components";
import { useUI } from "../common/uiContext";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { _UPDATE_IMAGE } from "@/api/queries/profile";
import { IUpdateImage } from "@/types/profile";

interface IModalProps {
  onSubmit: (image: File) => void;
}

const UploadWrap = styled.div`
  width: 300px;
  height: 300px;
  aspect-ratio: 10 / 16;
`;

const ChangeImageModal = ({ onSubmit }: IModalProps) => {
  const [image, setImage] = useState<File>();
  const { closeModal } = useUI();

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
    if (image) {
      mutation.mutate({
        isCover: false,
        image,
      });

      onSubmit(image);
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
