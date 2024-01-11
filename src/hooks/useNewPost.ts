import { RootState } from "@/store";
import { newPostActions } from "@/store/reducers";
import { ITag } from "@/types/post";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

export const useNewPost = () => {
  const dispatch = useDispatch();

  const { tags, channelId, channelName } = useSelector(
    ({ newPost }: RootState) => newPost
  );

  const setTags = useCallback(
    (tags: ITag[]) => {
      dispatch(newPostActions.newPostReducer({ type: "SET_TAGS", tags }));
    },
    [dispatch]
  );

  const addTag = useCallback(
    (tag: ITag) => {
      dispatch(newPostActions.newPostReducer({ type: "ADD_TAG", tag }));
    },
    [dispatch]
  );

  const deleteTag = useCallback(
    (tagId: string) => {
      dispatch(newPostActions.newPostReducer({ type: "DELETE_TAG", tagId }));
    },
    [dispatch]
  );

  const setChannel = useCallback(
    (channelId: string, channelName: string) => {
      dispatch(
        newPostActions.newPostReducer({
          type: "SET_CHANNEL",
          channelId,
          channelName,
        })
      );
    },
    [dispatch]
  );

  const init = useCallback(() => {
    dispatch(newPostActions.newPostReducer({ type: "INIT" }));
  }, [dispatch]);

  const context = {
    tags,
    channelId,
    channelName,
    setTags: (tags: ITag[]) => setTags(tags),
    addTag: (tag: ITag) => addTag(tag),
    deleteTag: (tagId: string) => deleteTag(tagId),
    setChannel: (channelId: string, channelName: string) =>
      setChannel(channelId, channelName),
    init: () => init(),
  };

  return context;
};
