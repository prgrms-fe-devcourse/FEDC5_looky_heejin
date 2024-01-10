import styled from "styled-components";
import { FieldErrors, useForm } from "react-hook-form";
import { Button, Input, InputLabel } from "../common";
import { Col } from "@/styles/GlobalStyle";
import { useUI } from "../common/uiContext";
import { ModalLayout } from "../common/Modal";
import { NAME_VALIDATION } from "@/pages/ProfilePage/ProfilePage.const";
import { useMutation } from "@tanstack/react-query";
import { _UPDATE_NAME } from "@/api/queries/profile";
import { useProfile } from "@/hooks/useProfile";

interface INameFormProps {
  fullName: string;
  username?: string | null;
}

const Form = styled(Col)`
  justify-content: center;
  width: 300px;
  height: 300px;
`;

const InputWrap = styled.div`
  padding-bottom: 1rem;
`;

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
        <InputWrap>
          <InputLabel title="변경할 닉네임" help="2글자 이상" />
          <Input
            type="text"
            register={register("fullName", NAME_VALIDATION)}
            required={false}
          />
          {errors?.fullName && (
            <span style={{ color: "red" }}>{errors.fullName.message}</span>
          )}
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
