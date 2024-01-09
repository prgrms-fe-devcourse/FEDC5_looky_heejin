import { FieldErrors, useForm } from "react-hook-form";
import { Button, Input, InputLabel } from "../common";
import styled from "styled-components";
import { Col } from "@/styles/GlobalStyle";
import { useUI } from "../common/uiContext";
import { NAME_VALIDATION } from "@/pages/ProfilePage/ProfilePage.const";
import { useMutation } from "@tanstack/react-query";
import { _UPDATE_NAME } from "@/api/queries/profile";
import { ModalLayout } from "../common/Modal";

interface INameFormProps {
  fullName: string;
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
  const { closeModal } = useUI();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INameFormProps>();

  const mutation = useMutation({
    mutationFn: async (updatedName: string) =>
      await _UPDATE_NAME({ fullName: updatedName }),
    onSuccess: data => {
      console.log("API UPDATE NAME 성공!");
      console.log(data.fullName);
    },
    onError: error => console.log("Error", error),
  });

  const onValid = (data: INameFormProps) => {
    mutation.mutate(data.fullName);
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
