import { FieldErrors, useForm } from "react-hook-form";
import { Button, Input } from "@/components/common";
import { useUI } from "@/components/common/uiContext";
import { ModalLayout } from "@components/common/Modal";
import { NAME_VALIDATION } from "@/pages/ProfilePage/ProfilePage.const";
import { useMutation } from "@tanstack/react-query";
import { _UPDATE_NAME } from "@/api/queries/profile";
import { useProfile } from "@/hooks/useProfile";
import {
  Form,
  InputWrap,
  ErrorContainer,
  SpanStyle,
} from "./ProfileModal.style";

interface INameFormProps {
  fullName: string;
  username?: string | null;
}

const EditNameModal = () => {
  const { setProfileName } = useProfile();
  const { closeModal } = useUI();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INameFormProps>();

  const mutation = useMutation({
    mutationFn: async (formData: INameFormProps) =>
      await _UPDATE_NAME(formData),
    onSuccess: data => {
      console.log("API UPDATE NAME 성공!");
      setProfileName(data.fullName);
    },
    onError: error => console.log("Error", error),
  });

  const onValid = (data: INameFormProps) => {
    const formData = {
      fullName: data.fullName,
      username: null,
    };
    mutation.mutate(formData);
    closeModal();
  };
  const onInvalid = (errors: FieldErrors) => {
    console.warn(errors);
  };

  return (
    <ModalLayout>
      <Form onSubmit={handleSubmit(onValid, onInvalid)}>
        <ErrorContainer>
          <span className="font-bold">닉네임 변경</span>
          {errors.fullName?.message && (
            <SpanStyle>{errors.fullName?.message}</SpanStyle>
          )}
        </ErrorContainer>
        <InputWrap>
          <Input
            type="text"
            register={register("fullName", NAME_VALIDATION)}
            required={false}
          />
        </InputWrap>
        <Button
          variant="symbol"
          type="submit"
          onClick={handleSubmit(onValid, onInvalid)}
        >
          변경
        </Button>
      </Form>
    </ModalLayout>
  );
};

export default EditNameModal;
