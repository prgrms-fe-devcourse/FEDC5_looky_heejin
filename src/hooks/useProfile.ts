import { RootState } from "@/store";
import { profileActions } from "@/store/reducers/profileReducer";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export type TProfileState = {
  isMe: boolean;
  profileName: string;
  profileImage: string;
  profileCover: string;
};

export type PROFILE_ACTION =
  | { type: "SET_IS_ME"; isMe: boolean }
  | { type: "SET_NAME"; profileName: string }
  | { type: "SET_IMAGE"; profileImage: string }
  | { type: "SET_COVER"; profileCover: string };

export const useProfile = () => {
  const dispatch = useDispatch();

  const { isMe, profileName, profileImage, profileCover } = useSelector(
    ({ profile }: RootState) => profile
  );

  const setIsMe = useCallback(
    (isMe: boolean) => {
      console.log(isMe);
      dispatch(profileActions.profileReducer({ type: "SET_IS_ME", isMe }));
    },
    [dispatch]
  );

  const setProfileName = useCallback(
    (profileName: string) => {
      console.log(profileName);
      dispatch(
        profileActions.profileReducer({ type: "SET_NAME", profileName })
      );
    },
    [dispatch]
  );

  const setProfileImage = useCallback(
    (profileImage: string) => {
      console.log(profileImage);
      dispatch(
        profileActions.profileReducer({ type: "SET_IMAGE", profileImage })
      );
    },
    [dispatch]
  );

  const setProfileCover = useCallback(
    (profileCover: string) => {
      console.log(profileCover);
      dispatch(
        profileActions.profileReducer({ type: "SET_COVER", profileCover })
      );
    },
    [dispatch]
  );

  const context = {
    isMe,
    profileName,
    profileImage,
    profileCover,
    setProfileIsMe: (isMe: boolean) => setIsMe(isMe),
    setProfileName: (profileName: string) => setProfileName(profileName),
    setProfileImage: (profileImage: string) => setProfileImage(profileImage),
    setProfileCover: (profileCover: string) => setProfileCover(profileCover),
  };

  return context;
};
