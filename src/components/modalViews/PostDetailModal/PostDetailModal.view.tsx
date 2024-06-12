import { _DELETE, _GET, _POST } from "@/api";
import { Avatar, ToolTip } from "@/components/common";
import Icon from "@/components/common/Icon";
import {
  CHAT_ICON,
  CLOSE_ICON,
  HEART_ICON,
  SEND_ICON,
  TRASH_ICON,
} from "@/constants/icons";

import {
  AvatarWrapper,
  CaptionWrapper,
  CloseIconWrapper,
  CommentChatWrapper,
  ContentDetail,
  ContentWrapper,
  FollowButton,
  HeartIconWrapper,
  HeartInImage,
  HeartWrapper,
  IconWrapper,
  IconsWrapper,
  ImageWrapper,
  InputWrapper,
  LikeCountSpan,
  PostDetailWrapper,
  ReplyButton,
  StyledImg,
  StyledInput,
  StyledSpan,
  Tag,
  TitleSpan,
  TrashIconWrapper,
  UserInfo,
  UserInfoWrapper,
  UserNameSpan,
  UserNameWrapper,
} from "./PostDetailModal.styles";

import { _CREATE_COMMENT, _DELETE_COMMENT } from "@/api/queries/comment";
import { _NOTIFY } from "@/api/queries/notify";
import { _CREATE_LIKE, _DELETE_LIKE } from "@/api/queries/like";
import { _FOLLOW, _UNFOLLOW } from "@/api/queries/follow";
import Comments from "./Comments";
import { ITag } from "@/types/post";
import React from "react";

interface IHeartAnimation {
  isShow: boolean;
  key: number;
}
interface IPostDetailModalViewProps {
  modalRef: any;
  handleProfile: () => void;
  profileImage: string;
  userName: string;
  userId: string;
  myId: string | null;
  handleDelete: () => void;
  isIFollowed: boolean;
  handleFollow: () => void;
  handleClose: () => void;
  heartAnimation: IHeartAnimation;
  tagClickHandler: (link?: string) => void;
  imageUrl: string;
  isContentDetail: boolean;
  content: string;
  title: string;
  handleContentDetail: () => void;
  handleLike: () => void;
  isILiked: boolean;
  likeCount: number;
  toggleShowComments: () => void;
  handleChat: () => void;
  register: any;
  handleSubmit: any;
  theme: any;
  tags: ITag[];
  onValid: any;
  onInvalid: any;
  comments: any;
  setComments: React.Dispatch<React.SetStateAction<string[]>>;
  isShowComments: boolean;
  setIsShowComments: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostDetailModalView = React.forwardRef<
  HTMLElement,
  IPostDetailModalViewProps
>(
  (
    {
      handleProfile,
      profileImage,
      userName,
      userId,
      myId,
      handleDelete,
      isIFollowed,
      handleFollow,
      handleClose,
      heartAnimation,
      tagClickHandler,
      imageUrl,
      isContentDetail,
      content,
      title,
      handleContentDetail,
      handleLike,
      isILiked,
      likeCount,
      toggleShowComments,
      handleChat,
      register,
      handleSubmit,
      theme,
      tags,
      onValid,
      onInvalid,
      comments,
      setComments,
      isShowComments,
      setIsShowComments,
    },
    modalRef
  ) => {
    return (
      <PostDetailWrapper ref={modalRef}>
        <UserInfoWrapper>
          <UserInfo tabIndex={0}>
            <AvatarWrapper onClick={handleProfile}>
              {profileImage ? (
                <Avatar src={profileImage} size="S" />
              ) : (
                <Avatar size="S"></Avatar>
              )}
            </AvatarWrapper>
            <UserNameWrapper onClick={handleProfile}>
              <UserNameSpan>{userName}</UserNameSpan>
            </UserNameWrapper>
          </UserInfo>
          {userId === myId ? (
            <TrashIconWrapper>
              <Icon name={TRASH_ICON} size="1.8rem" onClick={handleDelete} />
            </TrashIconWrapper>
          ) : (
            <FollowButton
              variant={isIFollowed ? "flat" : "symbol"}
              onClick={handleFollow}
            >
              {isIFollowed ? "팔로잉" : "팔로우"}
            </FollowButton>
          )}

          <CloseIconWrapper tabIndex={0}>
            <Icon
              name={CLOSE_ICON}
              size="1.8rem"
              weight={250}
              onClick={handleClose}
            />
          </CloseIconWrapper>
        </UserInfoWrapper>
        <ImageWrapper>
          {heartAnimation.isShow && (
            <HeartInImage key={heartAnimation.key}>
              <Icon
                name={HEART_ICON}
                fill={true}
                color={theme.symbol_color}
              ></Icon>
            </HeartInImage>
          )}
          {tags.map(({ x, y, id, brand, product, link }) => (
            <Tag
              style={{ cursor: "pointer" }}
              key={id}
              x={x}
              y={y}
              onClick={() => tagClickHandler(link)}
            >
              <ToolTip
                $direction="top"
                $options="hover"
                $tooltip={"브랜드: " + brand + "\\A" + "제품 명: " + product}
              >
                <Tag x={50} y={50} />
              </ToolTip>
            </Tag>
          ))}
          {imageUrl ? <StyledImg src={imageUrl} /> : null}
        </ImageWrapper>
        <CaptionWrapper>
          <IconsWrapper>
            {/* 추후 refactor 포인트 : className으로 바꾸기  */}
            <HeartWrapper>
              <HeartIconWrapper tabIndex={0}>
                <Icon
                  name={HEART_ICON}
                  onClick={handleLike}
                  fill={isILiked ? true : false}
                  color={isILiked ? theme.symbol_color : ""}
                  size="2.3rem"
                ></Icon>
              </HeartIconWrapper>

              <LikeCountSpan>
                {isILiked
                  ? likeCount !== 1
                    ? `회원님 외 ${likeCount - 1}명이 좋아합니다`
                    : "회원님이 이 게시글을 좋아합니다"
                  : likeCount !== 0
                    ? `${likeCount}명이 좋아합니다`
                    : `좋아요를 눌러보세요`}
                {/* {`${likeCount}명이 좋아합니다`} */}
              </LikeCountSpan>
            </HeartWrapper>
            <CommentChatWrapper>
              <IconWrapper>
                <Icon
                  tabIndex={0}
                  name={CHAT_ICON}
                  size="2rem"
                  onClick={toggleShowComments}
                />
              </IconWrapper>
              {userId !== myId ? (
                <IconWrapper>
                  <Icon
                    tabIndex={0}
                    name={SEND_ICON}
                    size="2.3rem"
                    onClick={handleChat}
                  />
                </IconWrapper>
              ) : null}
            </CommentChatWrapper>
          </IconsWrapper>
          <ContentWrapper>
            {isContentDetail ? (
              <StyledSpan>
                <TitleSpan>{title}</TitleSpan>
                <br />
                <span>
                  <p style={{ whiteSpace: "pre" }}>{content}</p>
                </span>
              </StyledSpan>
            ) : (
              <StyledSpan>
                <TitleSpan>{title}</TitleSpan>
                <br />
                {content.length > 50 ? (
                  <>
                    <span>
                      <span style={{ whiteSpace: "pre" }}>
                        {content.slice(0, 50)}
                      </span>
                    </span>
                    <ContentDetail tabIndex={0} onClick={handleContentDetail}>
                      {"  "}...더 보기
                    </ContentDetail>
                  </>
                ) : (
                  <span>
                    <p style={{ whiteSpace: "pre" }}>{content.slice(0, 50)}</p>
                  </span>
                )}
              </StyledSpan>
            )}
          </ContentWrapper>

          <Comments
            myId={myId}
            comments={comments}
            setComments={setComments}
            isShowComments={isShowComments}
            setIsShowComments={setIsShowComments}
          ></Comments>

          <form onSubmit={handleSubmit(onValid, onInvalid)}>
            <InputWrapper>
              <StyledInput
                kind="text"
                required={true}
                placeholder="댓글을 입력하세요"
                register={register("comment", {
                  required: "댓글을 입력해주세요",
                })}
              />
              <ReplyButton
                tabIndex={0}
                onClick={handleSubmit(onValid, onInvalid)}
              >
                게시
              </ReplyButton>
            </InputWrapper>
          </form>
        </CaptionWrapper>
      </PostDetailWrapper>
    );
  }
);

export default PostDetailModalView;
