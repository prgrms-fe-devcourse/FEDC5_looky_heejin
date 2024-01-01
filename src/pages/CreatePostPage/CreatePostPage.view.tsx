import { useEffect, useRef } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { FieldErrors, useForm } from "react-hook-form";

import { useNewPost } from "@/hooks/useNewPost";

import { Row } from "@/styles/GlobalStyle";
import { useUI } from "@/components/common/uiContext";
import { Button, Input, Upload } from "@/components/common";
import { Tag, TextArea } from "./CreatePostPage.styles";

interface ICreatePostFormProps {
  title: string;
  content?: string;
  file?: string;
}

interface IPostDataProps {
  title: string;
  image?: string;
  channelId: string;
}

const CreatePostPageView = () => {
  const { openModal, setModalView } = useUI();
  const { tags, channelId, channelName, init: initNewPostData } = useNewPost();

  const tagWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      initNewPostData();
    };
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ICreatePostFormProps>();

  const onValid = (data: ICreatePostFormProps) => {
    // request body
    //title: String, <- 필요한 데이터를 JSON.stringfy 해서 넣음
    //image: Binary | null,
    //channelId: String
    const JSONData = JSON.stringify({
      title: data.title,
      content: data.content,
      tags,
    });

    const postData: IPostDataProps = {
      title: JSONData,
      image: data.file,
      channelId,
    };

    console.log(postData);
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
      >
        <section className="__upload w-full h-[50%] relative">
          <Upload
            onChange={base64 => setValue("file", base64)}
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
