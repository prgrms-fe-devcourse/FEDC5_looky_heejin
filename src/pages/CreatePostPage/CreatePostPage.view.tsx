import { useEffect, useRef } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { FieldErrors, useForm } from "react-hook-form";

import { useNewPost } from "@/hooks/useNewPost";

import { Row } from "@/styles/GlobalStyle";
import { useUI } from "@/components/common/uiContext";
import { Button, Input, Upload } from "@/components/common";
import { Tag, TextArea } from "./CreatePostPage.styles";
import { useMutation } from "@tanstack/react-query";
import { _POST, rootAPI } from "@/api";
import { useNavigate } from "react-router-dom";

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
  const { tags, channelId, channelName, init: initNewPostData } = useNewPost();

  const navigate = useNavigate();

  const tagWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    rootAPI.defaults.headers["Content-Type"] = "multipart/form-data";

    return () => {
      initNewPostData();
      rootAPI.defaults.headers["Content-Type"] =
        "application/x-www-form-urlencoded";
    };
  }, []);

  useEffect(() => {
    setValue("channelId", channelId);
  }, [channelId]);

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
    });
  };

  const channelSelectButtonClickHandler = () => {
    setModalView("CHANNEL_SELECT_VIEW");
    openModal();
  };

  return (
    <div className="__container relative w-full h-full pt-[70px] pb-[70px]">
      <form
        onSubmit={handleSubmit(onValid, onInvalid)}
        className="relative w-full h-full flex flex-col"
        encType="multipart/form-data"
      >
        <section className="__upload w-full h-[50%] relative">
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
        </section>
        <section className="__form pt-4 h-[45%]">
          <InputWrapper>
            <Input
              type="text"
              register={register("title", { required: "제목을 입력해주세요" })}
              required={true}
              placeholder="제목을 입력해주세요."
            />
          </InputWrapper>
          <div className="__textArea w-full h-[65%] mb-4">
            <TextArea
              className="w-full shadow-sm"
              rows={6}
              placeholder="설명을 입력해주세요"
              {...register("content")}
            />
          </div>
          <div>
            <Button
              variant="neumorp"
              type="button"
              onClick={channelSelectButtonClickHandler}
            >
              <span className="text-sm font-semibold">채널 선택</span>
            </Button>
            <Row className="mt-3 space-x-2">
              {channelName && (
                <div className="px-2 py-1 bg-[#B3B3B390] rounded-md text-sm">
                  {channelName}
                </div>
              )}
            </Row>
          </div>
        </section>
      </form>
      <Button
        variant="symbol"
        className="absolute bottom-0"
        onClick={handleSubmit(onValid, onInvalid)}
        disabled={!watch("channelId") || !watch("file")}
      >
        <span className="font-semibold">포스터 작성</span>
      </Button>
    </div>
  );
};

export default CreatePostPageView;

const InputWrapper = styled.div`
  ${tw`space-y-2 mb-3`}
`;
