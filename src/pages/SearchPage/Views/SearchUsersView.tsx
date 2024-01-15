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

  return (
    <>
      <ListWrap>
        {Array.isArray(usersData) && usersData.length > 0 ? (
          usersData.map(user => (
            <ListItem
              key={user._id}
              onClick={() => onClick(user._id)}
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
            찾는 사용자가 없습니다.
          </SearchEmptyView>
        )}
      </ListWrap>
    </>
  );
};

export default SearchUsersView;
