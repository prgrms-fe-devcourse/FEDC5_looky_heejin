import { ReactNode, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import Icon from "../Icon/Icon";
import { PLUS_ICON } from "@/constants/icons";
import { Image } from "@/components/common";

interface IUploadProps {
  droppable?: boolean;
  clickable?: boolean;
  name?: string;
  accept?: string;
  value?: File;
  onChange?: (file: File) => void;
  children?: ReactNode;
  [key: string]: any;
}

const Upload = ({
  droppable = true,
  clickable = false,
  name,
  accept,
  value,
  onChange,
  children,
  ...rest
}: IUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState(value);
  const [dragging, setDragging] = useState(false);

  const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (files && files?.length > 0) {
      const changedFile = files[0];
      setFile(changedFile);
      onChange && onChange(changedFile);
    }
  };

  const filePreview = useMemo(() => {
    if (file) return URL.createObjectURL(file);
  }, [file]);

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

  const handleFileDrop = (event: DragEvent) => {
    if (!droppable) return;
    event.preventDefault();
    event.stopPropagation();

    const files = event?.dataTransfer?.files;

    if (files && files?.length > 0) {
      const changedFile = files[0];
      setFile(changedFile);
      onChange && onChange(changedFile);
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
        // value={value}
        onChange={handleFileChange}
      />
      <div
        style={{
          width: "100%",
          height: "100%",
          border: "2px dashed #aaa",
          borderColor: dragging ? "blue" : "#aaa",
        }}
      >
        {file ? (
          <Image
            src={filePreview ? filePreview : null}
            fill={true}
            style={{ objectFit: "contain" }}
          />
        ) : (
          "Click Icon or Drag file to this area to upload"
        )}
        {file && children}
        <div
          onClick={handleChooseFile}
          className="absolute bottom-6 right-6 bg-white p-2 shadow w-12 h-12 rounded-full flex justify-center items-center"
        >
          <Icon name={PLUS_ICON} weight={400} size={25} />
        </div>
      </div>
    </UploadContainer>
  );
};

export default Upload;

const UploadContainer = styled.div<any>`
  display: inline-block;
  cursor: pointer;
`;

const Input = styled.input<any>`
  display: none;
`;
