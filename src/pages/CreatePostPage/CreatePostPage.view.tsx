import { RefObject } from "react";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import { ITag } from "@/types/post";

import { Row } from "@/styles/GlobalStyle";
import { Button, Input, Upload } from "@/components/common";
import {
  ChannelTag,
  CreatePostPageContainer,
  InputWrapper,
  Tag,
  TextArea,
  UploadSection,
} from "./CreatePostPage.styles";
import {
  ICreatePostFormProps,
  IPostBodyData,
} from "./CreatePostPage.controller";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface ICreatePostPageViewProps {
  handleSubmit: UseFormHandleSubmit<ICreatePostFormProps, undefined>;
  onValid: (data: ICreatePostFormProps) => void;
  onInvalid: (errors: FieldErrors) => void;
  setValue: UseFormSetValue<ICreatePostFormProps>;
  tagWrapperRef: RefObject<HTMLDivElement>;
  postFileClickHandler: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  tags: ITag[];
  tagClickHandler: (id: string, x?: number, y?: number) => void;
  register: UseFormRegister<ICreatePostFormProps>;
  channelSelectButtonClickHandler: () => void;
  channelName: string;
  watch: UseFormWatch<ICreatePostFormProps>;
  mutation: UseMutationResult<
    AxiosResponse<any, any> | undefined,
    Error,
    IPostBodyData,
    unknown
  >;
}

const CreatePostPageView = ({
  handleSubmit,
  onValid,
  onInvalid,
  setValue,
  tagWrapperRef,
  postFileClickHandler,
  tags,
  tagClickHandler,
  register,
  channelSelectButtonClickHandler,
  channelName,
  watch,
  mutation,
}: ICreatePostPageViewProps) => {
  return (
    <CreatePostPageContainer>
      <form
        onSubmit={handleSubmit(onValid, onInvalid)}
        className="relative w-full flex flex-col items-center mb-3"
        encType="multipart/form-data"
      >
        <UploadSection>
          <Upload
            onChange={file => setValue("file", file)}
            clickable={false}
            className="relative w-full h-full"
            accept="image/jpg, image/png, image/jpeg, image/webp, image/gif"
          >
            <div
              ref={tagWrapperRef}
              className="absolute top-0 left-0 w-full h-full"
              onClick={postFileClickHandler}
            />
            {tags.map(({ x, y, id }) => (
              <Tag
                key={id}
                x={x}
                y={y}
                onClick={() => tagClickHandler(id, x, y)}
              />
            ))}
          </Upload>
        </UploadSection>
        <section className="__form pt-4 w-full">
          <InputWrapper>
            <Input
              type="text"
              register={register("title", { required: "제목을 입력해주세요" })}
              required={true}
              placeholder="제목을 입력해주세요."
            />
          </InputWrapper>
          <TextArea
            className="w-full shadow-sm"
            rows={6}
            placeholder="설명을 입력해주세요"
            {...register("content")}
          />
          <Button
            variant="neumorp"
            type="button"
            onClick={channelSelectButtonClickHandler}
          >
            <span className="text-sm font-semibold">채널 선택</span>
          </Button>
          <Row className="mt-3 space-x-2 h-[30px]">
            {channelName && <ChannelTag>{channelName}</ChannelTag>}
          </Row>
        </section>
      </form>
      <Button
        variant="symbol"
        className="absolute bottom-0"
        onClick={handleSubmit(onValid, onInvalid)}
        disabled={
          !(watch("channelId") && watch("file") && watch("title")) ||
          mutation.isPending
        }
        loading={mutation.isPending}
      >
        <span className="font-semibold">포스터 작성</span>
      </Button>
    </CreatePostPageContainer>
  );
};

export default CreatePostPageView;
