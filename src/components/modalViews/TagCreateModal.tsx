import styled from "styled-components";
import tw from "twin.macro";

import { ModalLayout } from "../common/Modal";
import InputLabel from "../common/InputLabel";
import { Button } from "../common";
import { useUI } from "../common/uiContext";
import { useTags } from "@/hooks/useTags";
import { FieldErrors, useForm } from "react-hook-form";
import { ITag } from "@/types/post";
import { useEffect } from "react";

interface Props {
  isEdit?: boolean;
  id?: string;
  x: number;
  y: number;
}

interface ITagCreateModalProps {
  props?: Props;
}

interface ITagFormProps extends ITag {}

const TagCreateModal = ({ props }: ITagCreateModalProps) => {
  const { x, y, id, isEdit = false } = props as Props;

  const { closeModal } = useUI();
  const { addTag, deleteTag, tags } = useTags();

  const { register, handleSubmit, setValue } = useForm<ITagFormProps>({});

  useEffect(() => {
    if (!isEdit || !id) return;

    const oldTag = tags.find(tag => tag.id === id);

    if (oldTag) {
      setValue("brand", oldTag.brand ?? "");
      setValue("link", oldTag.link ?? "");
      setValue("product", oldTag.product ?? "");
    }
  }, []);

  const onValid = (data: ITagFormProps) => {
    if (isEdit && id) {
      deleteTag(id);
    }

    const newTag: ITag = {
      id: `${x}-${y}`,
      brand: data.brand,
      product: data.product,
      link: data.link,
      x,
      y,
    };

    addTag(newTag);

    closeModal();
  };
  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };

  const closeClickHander = () => {
    if (isEdit && id) deleteTag(id);
    closeModal();
  };

  return (
    <ModalLayout modalTitle={isEdit ? "태그 수정" : "새 태그 만들기"}>
      <section className="relative w-[300px] h-[350px] pt-8">
        <form
          className="flex flex-col space-y-4 w-full"
          onSubmit={handleSubmit(onValid, onInvalid)}
        >
          <InputWrapper>
            <InputLabel title="브랜드" />
            <input type="text" {...register("brand")} />
          </InputWrapper>
          <InputWrapper>
            <InputLabel title="상품명" />
            <input type="text" {...register("product")} />
          </InputWrapper>
          <InputWrapper>
            <InputLabel title="상품 링크" />
            <input type="text" {...register("link")} />
          </InputWrapper>
        </form>
        <div className="flex-row absolute bottom-0 w-full">
          <Button
            variant="flat"
            type="submit"
            onClick={handleSubmit(onValid, onInvalid)}
          >
            <span>{isEdit ? "수정" : "확인"}</span>
          </Button>
          <Button variant="flat" onClick={closeClickHander}>
            <span>{isEdit ? "삭제" : "취소"}</span>
          </Button>
        </div>
      </section>
    </ModalLayout>
  );
};

export default TagCreateModal;

const InputWrapper = styled.div`
  ${tw`space-y-2`}
`;
