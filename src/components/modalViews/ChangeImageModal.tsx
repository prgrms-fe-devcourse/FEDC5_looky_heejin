import { Button, Upload } from "../common";
import { ModalLayout } from "../common/Modal";
import { styled } from "styled-components";
import { useUI } from "../common/uiContext";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { _UPDATE_IMAGE } from "@/api/queries/profile";

interface IFileProps {
  isCover: boolean;
  image: any;
}

const UploadWrap = styled.div`
  width: 300px;
  height: 300px;
  aspect-ratio: 10 / 16;
`;

const ChangeImageModal = () => {
  const [image, setImage] = useState<string | ArrayBuffer>();
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

  // const convertFileToBinary = (file: File): Promise<string | ArrayBuffer> => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();

  //     reader.readAsBinaryString(file);

  //     reader.onloadend = () => {
  //       const binaryString = reader.result;
  //       if (binaryString) {
  //         resolve(binaryString);
  //       }
  //     };

  //     reader.onerror = reject;
  //   });
  // };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onloadend = () => {
        if (reader.result && typeof reader.result === "string") {
          const base64String = reader.result?.split(",")[1];
          resolve(base64String);
        }
      };

      reader.onerror = reject;
    });
  };

  const handleChangeFile = async (file: File) => {
    const converted = await convertFileToBase64(file);
    setImage(converted);
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
