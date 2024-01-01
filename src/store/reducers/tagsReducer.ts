import { ITag } from "@/types/post";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TAGS_ACTION } from "../types/tagsType";

export type TTagsState = {
  tags: ITag[];
};

const initialState: TTagsState = {
  tags: [],
};

const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    tagsReducer: (state, action: PayloadAction<TAGS_ACTION>) => {
      switch (action.payload.type) {
        case "SET_TAGS": {
          return {
            tempTag: null,
            tags: action.payload.tags,
          };
        }
        case "ADD_TAG": {
          const newTag = action.payload.tag;
          const newTags = [...state.tags];
          const existTag = newTags.findIndex(tag => tag.id === newTag.id);

          if (existTag !== 1) {
            newTags.push(newTag);
            return { ...state, tags: newTags };
          } else {
            return { ...state };
          }
        }
        case "DELETE_TAG": {
          const deletedTagId = action.payload.tagId;
          const deletedTagIndex = state.tags.findIndex(
            tag => tag.id === deletedTagId
          );

          if (deletedTagIndex !== -1) {
            const newTags = [...state.tags];
            newTags.splice(deletedTagIndex, 1);
            return {
              ...state,
              tags: newTags,
            };
          } else {
            return {
              ...state,
            };
          }
        }
        case "INIT_TAGS": {
          return {
            tags: [],
            tempTag: null,
          };
        }
      }
    },
  },
});

export const tagsActions = tagsSlice.actions;

export default tagsSlice.reducer;
