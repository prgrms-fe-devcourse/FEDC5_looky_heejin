import { RootState } from "@/store";
import { tagsActions } from "@/store/reducers";
import { ITag } from "@/types/post";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

export const useTags = () => {
  const dispatch = useDispatch();

  const { tags } = useSelector(({ tags }: RootState) => tags);

  const setTags = useCallback(
    (tags: ITag[]) => {
      dispatch(tagsActions.tagsReducer({ type: "SET_TAGS", tags }));
    },
    [dispatch]
  );

  const addTag = useCallback(
    (tag: ITag) => {
      dispatch(tagsActions.tagsReducer({ type: "ADD_TAG", tag }));
    },
    [dispatch]
  );

  const deleteTag = useCallback(
    (tagId: string) => {
      dispatch(tagsActions.tagsReducer({ type: "DELETE_TAG", tagId }));
    },
    [dispatch]
  );

  const initTags = useCallback(() => {
    dispatch(tagsActions.tagsReducer({ type: "INIT_TAGS" }));
  }, [dispatch]);

  const context = {
    tags,
    setTags: (tags: ITag[]) => setTags(tags),
    addTag: (tag: ITag) => addTag(tag),
    deleteTag: (tagId: string) => deleteTag(tagId),
    initTags: () => initTags(),
  };

  return context;
};
