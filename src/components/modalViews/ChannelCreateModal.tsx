import { ModalLayout } from "../common/Modal";
import { useUI } from "../common/uiContext";
import styled from "styled-components";
import { ICreateChannelParams } from "@/types/channel";
import { useMutation } from "@tanstack/react-query";
import { _CREATE_CHANNEL } from "@/api/queries/createChannel";
import { notify } from "@/utils/toast";
import { FieldErrors, useForm } from "react-hook-form";
import { Button } from "../common";
import { Row } from "@/styles/GlobalStyle";
import { BORDER_BASE_WIDTH } from "@/constants/uiConstants";

const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 5px;
`;

const ErrorContainer = styled(Row)`
  font-size: 1.1rem;
  margin-top: 10px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const InputContainer = styled.input`
  color: ${props => props.theme.text_primary_color};
  background-color: ${props => props.theme.container_color};
  padding-left: 5px;
  font-size: 1.15rem;
  border-width: ${BORDER_BASE_WIDTH}px;
  border-color: transparent;
  border-radius: 0.375rem;
  width: 300px;
  margin: 10px 0;
  height: 50px;

  &:focus {
    border-color: ${props => props.theme.symbol_color};
    outline: none;
  }
`;

const SpanStyle = styled.span`
  font-size: 0.75rem;
  color: ${props => props.theme.symbol_color};
`;

const ChannelCreateModal = () => {
  const { closeModal } = useUI();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateChannelParams>();

  const mutation = useMutation({
    mutationFn: async (formData: ICreateChannelParams) =>
      await _CREATE_CHANNEL(formData),
    onSuccess(data) {
      console.log(data);
      notify({ type: "success", text: "채널 생성 성공!" });
      closeModal();
    },
    onError(error) {
      console.error("error: 채널 생성 실패", error);
    },
  });

  const onValid = (data: ICreateChannelParams) => {
    const formData = {
      authRequired: data.authRequired,
      description: data.description,
      name: data.name,
    };
    mutation.mutate(formData);
  };

  const onInvalid = (errors: FieldErrors) => {
    console.warn(errors);
  };

  return (
    <ModalLayout modalTitle="채널 추가">
      <FormContainer onSubmit={handleSubmit(onValid, onInvalid)}>
        <ErrorContainer>
          <span className="font-bold">채널 이름</span>
          {errors.name?.message && (
            <SpanStyle>{errors.name?.message}</SpanStyle>
          )}
        </ErrorContainer>
        <InputContainer
          type="text"
          placeholder="ex) 캐주얼"
          autoComplete="off"
          {...register("name", {
            required: { value: true, message: "이름은 반드시 필요해요!" },
            minLength: {
              value: 2,
              message: "너무 짧아요!",
            },
          })}
        />

        <ErrorContainer>
          <span className="font-bold">채널 설명</span>
          {errors.description?.message && (
            <SpanStyle>{errors.description?.message}</SpanStyle>
          )}
        </ErrorContainer>
        <InputContainer
          type="text"
          placeholder="ex) 캐주얼 룩북 채널입니다."
          autoComplete="off"
          {...register("description", {
            required: { value: true, message: "간단한 요약을 입력해주세요!" },
            minLength: {
              value: 2,
              message: "너무 짧아요!",
            },
          })}
          required={true}
        />

        <ErrorContainer>
          <span style={{ fontSize: "1rem" }} className="font-bold">
            채널을 인증된 사용자에게만 공개할까요?
          </span>
          {errors.authRequired?.message && (
            <SpanStyle>{errors.authRequired?.message}</SpanStyle>
          )}
        </ErrorContainer>
        <InputContainer
          style={{
            cursor: "pointer",
            width: "30px",
            height: "30px",
            marginBottom: "30px",
          }}
          type="checkbox"
          {...register("authRequired")}
        />
        <Button
          variant="symbol"
          type="submit"
          onClick={handleSubmit(onValid, onInvalid)}
        >
          채널 추가
        </Button>
      </FormContainer>
    </ModalLayout>
  );
};

export default ChannelCreateModal;
