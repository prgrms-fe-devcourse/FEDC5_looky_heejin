export type MODAL_VIEWS =
  | "INIT_VIEW"
  | "POST_EDIT_VIEW"
  | "POST_DETAIL_VIEW"
  | "TAG_CREATE_VIEW";

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
