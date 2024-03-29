import { useMutation } from "@tanstack/react-query";

import { _POST } from "@/api";
import { IToastProps } from "@/utils/toast";

import { IPostBodyData } from "./CreatePostPage.controller";

interface IUseCreatePostMutationProps {
  setChannel: Function;
  notify: ({ type, text }: IToastProps) => void;
  navigate: (delta: number) => void;
}

export const useCreatePostMutation = ({
  setChannel,
  notify,
  navigate,
}: IUseCreatePostMutationProps) => {
  const mutation = useMutation({
    mutationFn: async (formData: IPostBodyData) =>
      await _POST("/posts/create", formData),
    onSuccess: data => {
      setChannel(JSON.stringify(data?.data.channel));
      notify({
        type: "success",
        text: "포스트를 성공적으로 생성했어요!",
      });
      navigate(-1);
    },
    onError: data => {
      notify({
        type: "error",
        text: "포스트 생성에 실패했어요!",
      });
      console.log("Error", data);
    },
  });

  return mutation;
};
