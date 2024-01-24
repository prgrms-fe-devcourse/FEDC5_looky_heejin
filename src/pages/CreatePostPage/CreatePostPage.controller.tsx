import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FieldErrors, useForm } from "react-hook-form";

import { _GET, _POST, rootAPI } from "@/api";
import { ITag } from "@/types/post";
import { useUI } from "@/components/common/uiContext";
import { notify } from "@/utils/toast";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import CreatePostPageView from "./CreatePostPage.view";
import { useCreatePostMutation } from "./CreatePostPage.model";

export interface ICreatePostFormProps {
  title: string;
  content?: string;
  file: File;
  channelId: string;
}

export interface IPostBodyData {
  title: string;
  image: File;
  channelId: string;
}

const CreatePostPageController = () => {
  const [_, setChannel] = useLocalStorage("ViewChannelObj");
  const { openModal, setModalView } = useUI();
  const [channelName, setChannelName] = useState("");
  const [tags, setTags] = useState<ITag[]>([]);

  const navigate = useNavigate();

  const tagWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    rootAPI.defaults.headers["Content-Type"] = "multipart/form-data";

    return () => {
      // initNewPostData();
      rootAPI.defaults.headers["Content-Type"] =
        "application/x-www-form-urlencoded";
    };
  }, []);

  const mutation = useCreatePostMutation({ setChannel, notify, navigate });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {},
  } = useForm<ICreatePostFormProps>();

  const onValid = (data: ICreatePostFormProps) => {
    // request body
    //title: String, <- 필요한 데이터를 JSON.stringfy 해서 넣음
    //image: Binary | null,
    //channelId: String
    const additionalData = JSON.stringify({
      title: data.title,
      content: data.content,
      tags,
    });

    const postData: IPostBodyData = {
      title: additionalData,
      image: data.file,
      channelId: data.channelId,
    };

    mutation.mutate(postData);
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
        tags,
        setTags,
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
      tags,
      setTags,
    });
  };

  const channelSelectButtonClickHandler = () => {
    setModalView("CHANNEL_SELECT_VIEW");
    openModal({
      setChannelId: (data: string) => setValue("channelId", data),
      setChannelName: setChannelName,
    });
  };

  return (
    <CreatePostPageView
      handleSubmit={handleSubmit}
      onValid={onValid}
      onInvalid={onInvalid}
      setValue={setValue}
      tagWrapperRef={tagWrapperRef}
      postFileClickHandler={postFileClickHandler}
      tags={tags}
      tagClickHandler={tagClickHandler}
      register={register}
      channelSelectButtonClickHandler={channelSelectButtonClickHandler}
      channelName={channelName}
      watch={watch}
      mutation={mutation}
    />
  );
};

export default CreatePostPageController;
