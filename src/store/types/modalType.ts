export type MODAL_VIEWS =
  | "INIT_VIEW"
  | "POST_EDIT_VIEW"
  | "POST_DETAIL_VIEW"
  | "TAG_CREATE_VIEW"
  | "CHANNEL_SELECT_VIEW"
  | "EDIT_NAME_VIEW"
  | "EDIT_PASSWORD_VIEW"
  | "EDIT_IMAGE_VIEW"
  | "CREATE_CHANNEL_VIEW"
  | "EDIT_COVERIMAGE_VIEW";

export type MODAL_ACTION =
  | {
      type: "OPEN_MODAL";
      props?: any;
    }
  | {
      type: "CLOSE_MODAL";
    }
  | {
      type: "SET_MODAL_VIEW";
      view: MODAL_VIEWS;
    };
