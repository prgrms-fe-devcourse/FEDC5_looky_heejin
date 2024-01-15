import { useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";

import { ModalLayout } from "@/components/common/Modal";
import InputLabel from "@/components/common/InputLabel";
import { Button, Input } from "@/components/common";
import { useUI } from "@/components/common/uiContext";
import { FieldErrors, useForm } from "react-hook-form";
import { ITag } from "@/types/post";

interface ModalProps {
  isEdit?: boolean;
  id?: string;
  x: number;
  y: number;
  tags: ITag[];
  setTags: Function;
}

interface ITagCreateModalProps {
  props?: ModalProps;
}

interface ITagFormProps extends ITag {}

const TagCreateModal = ({ props }: ITagCreateModalProps) => {
  const { x, y, id, isEdit = false, tags, setTags } = props as ModalProps;

  const { closeModal } = useUI();

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

  const getTagsWithOutDeletedTag = (targetId: string) => {
    const targetIndex = tags.findIndex(tag => tag.id === targetId);

    if (targetIndex !== -1) {
      const newTags = [...tags];
      newTags.splice(targetIndex, 1);

      return newTags;
    } else return tags;
  };

  const onValid = (data: ITagFormProps) => {
    let newTags = tags;
    if (isEdit && id) {
      newTags = getTagsWithOutDeletedTag(id);
    }

    const newTag: ITag = {
      id: `${x}-${y}`,
      brand: data.brand,
      product: data.product,
      link: data.link,
      x,
      y,
    };

    setTags([...newTags, newTag]);

    closeModal();
  };
  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };

  const closeClickHander = () => {
    if (isEdit && id) {
      const newTags = getTagsWithOutDeletedTag(id);
      setTags(newTags);
    }
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
            <Input type="text" register={register("brand")} required={false} />
          </InputWrapper>
          <InputWrapper>
            <InputLabel title="상품명" />
            <Input
              type="text"
              register={register("product")}
              required={false}
            />
          </InputWrapper>
          <InputWrapper>
            <InputLabel title="상품 링크" />
            <Input type="text" register={register("link")} required={false} />
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
