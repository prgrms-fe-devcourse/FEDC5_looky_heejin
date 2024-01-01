import { ITag } from "@/types/post";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { NEW_POST_ACTION } from "../types/newPostType";

export type TTagsState = {
  tags: ITag[];
  channelId: string;
  channelName: string;
};

const initialState: TTagsState = {
  tags: [],
  channelId: "",
  channelName: "",
};

const newPostSlice = createSlice({
  name: "newPost",
  initialState,
  reducers: {
    newPostReducer: (state, action: PayloadAction<NEW_POST_ACTION>) => {
      switch (action.payload.type) {
        case "SET_TAGS": {
          return {
            ...state,
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
        case "SET_CHANNEL": {
          return {
            ...state,
            channelId: action.payload.channelId,
            channelName: action.payload.channelName,
          };
        }
        case "INIT": {
          return {
            tags: [],
            channelId: "",
            channelName: "",
          };
        }
      }
    },
  },
});

export const newPostActions = newPostSlice.actions;

export default newPostSlice.reducer;
