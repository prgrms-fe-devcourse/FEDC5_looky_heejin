import { useEffect } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { _UPDATE_PASSWORD } from "@/api/queries/profile";
import { Button, Input } from "@/components/common";
import { ModalLayout } from "@/components/common/Modal";
import { useUI } from "@/components/common/uiContext";
import { sha256Encrypt } from "@/utils/crypto";
import PasswordConst from "@/pages/SignInPage/SignInPage.const";
import {
  Form,
  InputWrap,
  ErrorContainer,
  SpanStyle,
} from "./ProfileModal.style";

interface IPasswordForm {
  password: string;
  passwordCheck: string;
}

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
    onSuccess: data => {
      if (data === "Password updated successfully.") {
        alert(`비밀번호 변경 성공!`);
      }
    },
    onError: error => {
      alert(`비밀번호 변경 실패`);
      console.log("Error", error);
    },
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
    const encryptionPassword = sha256Encrypt(data.password);
    mutation.mutate(encryptionPassword);
    closeModal();
  };
  const onInvalid = (errors: FieldErrors) => {
    console.warn(errors);
  };

  return (
    <ModalLayout>
      <Form onSubmit={handleSubmit(onValid, onInvalid)}>
        {/* <InputLabel title="변경할 비밀번호" help="8글자 이상" /> */}
        <ErrorContainer>
          <span className="font-bold">비밀번호 변경</span>
          {errors.password?.message && (
            <SpanStyle>{errors.password?.message}</SpanStyle>
          )}
        </ErrorContainer>
        <InputWrap>
          <Input
            type="password"
            register={register(
              "password",
              PasswordConst.PASSWORD_VALIDATION_OPTION
            )}
            required={false}
          />
        </InputWrap>
        <ErrorContainer>
          <span className="font-bold">비밀번호 확인</span>
          {errors.passwordCheck?.message && (
            <SpanStyle>{errors.passwordCheck?.message}</SpanStyle>
          )}
        </ErrorContainer>
        <InputWrap>
          <Input
            type="password"
            register={register(
              "passwordCheck",
              PasswordConst.PASSWORD_CHECK_VALIDATION_OPTION
            )}
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

export default EditPasswordModal;
