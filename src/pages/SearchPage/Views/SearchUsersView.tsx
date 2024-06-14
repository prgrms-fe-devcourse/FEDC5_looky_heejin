import { Avatar } from "@/components/common";
import { IUser } from "@/types";
import {
  ListItem,
  ListWrap,
  UserInfo,
} from "@/pages/SearchPage/SearchPage.styles";
import { SearchEmptyView } from ".";

interface IUsersProps {
  usersData: IUser[];
  onClick: (userId: string) => void;
  onTagClick: (clickedKeyword: string) => void;
}

const SearchUsersView = ({
  usersData,
  onClick,
  onTagClick,
  ...props
}: IUsersProps) => {
  if (!usersData) {
    return null;
  }

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLElement>,
    userId: string
  ) => {
    if (event.key === "Enter") {
      onClick(userId);
    }
  };

  return (
    <>
      <ListWrap>
        {Array.isArray(usersData) && usersData.length > 0 ? (
          usersData.map(user => (
            <ListItem
              key={user._id}
              role="link"
              tabIndex={0}
              aria-label={`${user.fullName} 프로필 화면으로 이동하기`}
              onClick={() => onClick(user._id)}
              onKeyDown={event => handleKeyDown(event, user._id)}
              {...props}
            >
              <Avatar size="S" src={user.image} />
              <UserInfo>
                <span>{user.fullName}</span>
              </UserInfo>
            </ListItem>
          ))
        ) : (
          <SearchEmptyView onTagClick={onTagClick}>
            <strong>찾는 사용자가 없습니다.</strong>
          </SearchEmptyView>
        )}
      </ListWrap>
    </>
  );
};

export default SearchUsersView;
