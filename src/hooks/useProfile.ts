import { RootState } from "@/store";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileActions } from "@/store/reducers/profileReducer";

export const useProfile = () => {
  const dispatch = useDispatch();

  const { isMe, profileName, profileImage, profileCover } = useSelector(
    ({ profile }: RootState) => profile
  );

  const setIsMe = useCallback(
    (isMe: boolean) => {
      dispatch(profileActions.profileReducer({ type: "SET_IS_ME", isMe }));
    },
    [dispatch]
  );

  const setProfileName = useCallback(
    (profileName: string) => {
      dispatch(
        profileActions.profileReducer({ type: "SET_NAME", profileName })
      );
    },
    [dispatch]
  );

  const setProfileImage = useCallback(
    (profileImage: string) => {
      dispatch(
        profileActions.profileReducer({ type: "SET_IMAGE", profileImage })
      );
    },
    [dispatch]
  );

  const setProfileCover = useCallback(
    (profileCover: string) => {
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
