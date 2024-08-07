import { ReactNode, useRef, useState } from "react";
import styled from "styled-components";

import { PLUS_ICON } from "@/constants/icons";
import { Image as ImageComponent } from "@/components/common";
import Icon from "@/components/common/Icon";

interface IUploadProps {
  droppable?: boolean;
  clickable?: boolean;
  name?: string;
  accept?: string;
  onChange?: (file: File) => void;
  children?: ReactNode;
  [key: string]: any;
}

const Upload = ({
  droppable = true,
  clickable = false,
  name,
  accept,
  onChange,
  children,
  ...rest
}: IUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<string | null>();
  const [dragging, setDragging] = useState(false);

  const convertImageToWebp = (file: File) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);

        canvas.toBlob(blob => {
          if (blob) {
            const convertedImage = new File([blob], file.name.split(".")[0], {
              type: blob.type,
            });
            resolve(convertedImage);
          } else {
            reject(new Error("Image conversion failed"));
          }
        }, "image/webp");
      };
      img.onerror = reject;
    });
  };

  const convertFileToBase64 = (file: File) => {
    return new Promise<string>(resolve => {
      const reader = new FileReader();

      reader.onload = (event: ProgressEvent<FileReader>) => {
        const base64 = event.target?.result as string;
        resolve(base64);
      };

      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (files && files?.length > 0) {
      const changedFile = files[0];

      try {
        const base64 = await convertFileToBase64(changedFile);
        setFile(base64);
      } catch (error) {
        console.error(error);
      }

      onChange &&
        onChange(
          changedFile.type === "image/gif"
            ? changedFile
            : ((await convertImageToWebp(changedFile)) as File)
        );
    }
  };

  const handleChooseFile = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };

  const handleDragEnter = (event: DragEvent) => {
    if (!droppable) return;
    event.preventDefault();
    event.stopPropagation();

    if (event?.dataTransfer?.items && event.dataTransfer.items.length > 0) {
      setDragging(true);
    }
  };

  const handleDragLeave = (event: DragEvent) => {
    if (!droppable) return;
    event.preventDefault();
    event.stopPropagation();

    setDragging(false);
  };

  const handleDragOver = (event: DragEvent) => {
    if (!droppable) return;
    event.preventDefault();
    event.stopPropagation();
  };

  const handleFileDrop = async (event: DragEvent) => {
    if (!droppable) return;
    event.preventDefault();
    event.stopPropagation();

    const files = event?.dataTransfer?.files;

    if (files && files?.length > 0) {
      const changedFile = files[0];

      const base64 = await convertFileToBase64(changedFile);
      setFile(base64);

      onChange &&
        onChange(
          changedFile.type === "image/gif"
            ? changedFile
            : ((await convertImageToWebp(changedFile)) as File)
        );
    }
    setDragging(false);
  };

  return (
    <UploadContainer
      onClick={clickable ? handleChooseFile : undefined}
      onDrop={handleFileDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      {...rest}
    >
      <Input
        ref={inputRef}
        type="file"
        name={name}
        accept={accept}
        onChange={handleFileChange}
      />
      <UploadArea $dragging={dragging}>
        {file ? (
          <ImageComponent
            src={file}
            fill={true}
            style={{ objectFit: "cover" }}
            priority={true}
          />
        ) : (
          "추가 버튼을 누르거나 파일을 드롭하여 이미지를 업로드 하세요."
        )}
        {file && children}
        <div
          onClick={handleChooseFile}
          className="absolute bottom-6 right-6 bg-white p-2 shadow w-12 h-12 rounded-full flex justify-center items-center"
        >
          <Icon name={PLUS_ICON} weight={400} size={25} />
        </div>
      </UploadArea>
    </UploadContainer>
  );
};

export default Upload;

const UploadContainer = styled.div<any>`
  display: inline-block;
  cursor: pointer;
`;

const UploadArea = styled.div<any>`
  width: 100%;
  height: 100%;
  border: 2px dashed ${props => props.theme.gray_200};
  border-color: ${props =>
    props.$dragging ? props.theme.symbol_color : props.theme.gray_200};

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input<any>`
  display: none;
`;
