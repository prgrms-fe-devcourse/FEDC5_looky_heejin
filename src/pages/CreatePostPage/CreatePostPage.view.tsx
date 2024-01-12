import { useEffect, useRef, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";

import { Row } from "@/styles/GlobalStyle";
import { useUI } from "@/components/common/uiContext";
import { Button, Input, Upload } from "@/components/common";
import {
  ChannelTag,
  CreatePostPageContainer,
  InputWrapper,
  Tag,
  TextArea,
  UploadSection,
} from "./CreatePostPage.styles";
import { useMutation } from "@tanstack/react-query";
import { _GET, _POST, rootAPI } from "@/api";
import { useNavigate } from "react-router-dom";
import { ITag } from "@/types/post";
import { isPending } from "@reduxjs/toolkit";

interface ICreatePostFormProps {
  title: string;
  content?: string;
  file: File;
  channelId: string;
}

interface IPostBodyData {
  title: string;
  image: File;
  channelId: string;
}

const CreatePostPageView = () => {
  const { openModal, setModalView } = useUI();
  const [channelName, setChannelName] = useState("");
  const [tags, setTags] = useState<ITag[]>([]);

  const navigate = useNavigate();

  const tagWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    rootAPI.defaults.headers["Content-Type"] = "multipart/form-data";

    return () => {
      // initNewPostData();
      rootAPI.defaults.headers["Content-Type"] =
        "application/x-www-form-urlencoded";
    };
  }, []);

  const mutation = useMutation({
    mutationFn: async (formData: IPostBodyData) =>
      await _POST("/posts/create", formData),
    onSuccess: () => {
      navigate(-1);
    },
    onError: data => console.log("Error", data),
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {},
  } = useForm<ICreatePostFormProps>();

  const onValid = (data: ICreatePostFormProps) => {
    // request body
    //title: String, <- 필요한 데이터를 JSON.stringfy 해서 넣음
    //image: Binary | null,
    //channelId: String
    const additionalData = JSON.stringify({
      title: data.title,
      content: data.content,
      tags,
    });

    const postData: IPostBodyData = {
      title: additionalData,
      image: data.file,
      channelId: data.channelId,
    };

    mutation.mutate(postData);
  };
  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };

  const postFileClickHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const nativeEvent = event.nativeEvent;

    const objectWidth = tagWrapperRef.current?.offsetWidth;
    const objectHeight = tagWrapperRef.current?.offsetHeight;

    setModalView("TAG_CREATE_VIEW");
    if (objectHeight && objectWidth) {
      openModal({
        x: (nativeEvent.offsetX / objectWidth) * 100,
        y: (nativeEvent.offsetY / objectHeight) * 100,
        tags,
        setTags,
      });
    }
  };

  const tagClickHandler = (id: string, x?: number, y?: number) => {
    setModalView("TAG_CREATE_VIEW");
    openModal({
      isEdit: true,
      id: id,
      x,
      y,
      tags,
      setTags,
    });
  };

  const channelSelectButtonClickHandler = () => {
    setModalView("CHANNEL_SELECT_VIEW");
    openModal({
      setChannelId: (data: string) => setValue("channelId", data),
      setChannelName: setChannelName,
    });
  };

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
