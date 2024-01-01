import { Button, Input } from "@/components/common";
import { Row } from "@/styles/GlobalStyle";
import Upload from "@/components/common/Upload";
import { Tag } from "./CreatePostPage.styles";
import { useUI } from "@/components/common/uiContext";
import { useTags } from "@/hooks/useTags";
import { FieldErrors, useForm } from "react-hook-form";
import styled from "styled-components";
import tw from "twin.macro";
import { ITag } from "@/types/post";
import { useRef } from "react";

interface ICreatePostFormProps {
  title: string;
  content?: string;
  file?: string;
}

interface IPostDataProps {
  title: string;
  content?: string;
  file?: string;
  tags?: ITag[];
}

const CreatePostPageView = () => {
  const { openModal, setModalView } = useUI();
  const { tags } = useTags();

  const tagWrapperRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ICreatePostFormProps>();

  const onValid = (data: ICreatePostFormProps) => {
    const postData: IPostDataProps = {
      title: data.title,
      content: data.content,
      tags,
      file: data.file,
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
          <div className="__textArea w-full h-[65%] bg-gray-400 mb-4">
            textarea
          </div>
          <div>
            <Button variant="neumorp">
              <span className="text-sm font-semibold">카테고리 선택</span>
            </Button>
            <Row className="mt-3 space-x-2">
              <div className="px-2 py-1 bg-[#B3B3B390] rounded-md text-sm">
                아웃도어
              </div>
              <div className="px-2 py-1 bg-[#B3B3B390] rounded-md text-sm">
                ootd
              </div>
              <div className="px-2 py-1 bg-[#B3B3B390] rounded-md text-sm">
                캐주얼
              </div>
              <div className="px-2 py-1 bg-[#B3B3B390] rounded-md text-sm">
                아메카지
              </div>
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
