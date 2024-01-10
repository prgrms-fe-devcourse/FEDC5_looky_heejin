import { FieldErrors, useForm } from "react-hook-form";
import { Button, Input, InputLabel } from "../common";
import styled from "styled-components";
import { Col } from "@/styles/GlobalStyle";
import { useMutation } from "@tanstack/react-query";
import { _UPDATE_PASSWORD } from "@/api/queries/profile";
import { ModalLayout } from "../common/Modal";
import PasswordConst from "@/pages/SignInPage/SignInPage.const";
import { useUI } from "../common/uiContext";
import { useEffect } from "react";

interface IPasswordForm {
  password: string;
  passwordCheck: string;
}

const Form = styled(Col)`
  justify-content: center;
  width: 300px;
  height: 300px;
`;

const InputWrap = styled.div`
  padding-bottom: 1rem;
`;

const EditPasswordModal = () => {
  const { closeModal } = useUI();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<IPasswordForm>();

  const mutation = useMutation({
    mutationFn: async (updatedValue: string) =>
      await _UPDATE_PASSWORD({ password: updatedValue }),
    onError: error => console.log("Error", error),
  });

  useEffect(() => {
    if (
      watch("password") !== watch("passwordCheck") &&
      watch("passwordCheck")
    ) {
      setError("passwordCheck", {
        type: "password-mismatch",
        message: "비밀번호가 일치하지 않습니다!",
      });
    } else {
      clearErrors("passwordCheck");
    }
  }, [watch("password"), watch("passwordCheck")]);

  const onValid = (data: IPasswordForm) => {
    mutation.mutate(data?.password);
    closeModal();
  };
  const onInvalid = (errors: FieldErrors) => {
    console.warn(errors);
  };

  return (
    <ModalLayout>
      <Form onSubmit={handleSubmit(onValid, onInvalid)}>
        <InputWrap>
          <InputLabel title="변경할 비밀번호" help="8글자 이상" />
          <Input
            type="password"
            register={register(
              "password",
              PasswordConst.PASSWORD_VALIDATION_OPTION
            )}
            required={false}
          />
          {errors.password ? (
            <span style={{ color: "red" }}>{errors.password.message}</span>
          ) : null}
        </InputWrap>
        <InputWrap>
          <InputLabel title="변경할 비밀번호 확인" />
          <Input
            type="password"
            register={register(
              "passwordCheck",
              PasswordConst.PASSWORD_CHECK_VALIDATION_OPTION
            )}
            required={false}
          />
          {errors.passwordCheck ? (
            <span style={{ color: "red" }}>{errors.passwordCheck.message}</span>
          ) : null}
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

export default EditPasswordModal;
