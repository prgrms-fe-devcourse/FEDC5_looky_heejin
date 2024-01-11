import { Avatar } from "@/components/common";
import { IUser } from "@/types";
import {
  ListItem,
  ListWrap,
  UserInfo,
} from "@/pages/SearchPage/SearchPage.styles";

interface IUsersProps {
  usersData: IUser[];
  onClick: (userId: string) => void;
}

const SearchUsersView = ({ usersData, onClick, ...props }: IUsersProps) => {
  if (!usersData) {
    return null;
  }

  return (
    <>
      <section>
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
            <div className="empty">찾는 검색 결과가 없습니다.</div>
          )}
        </ListWrap>
      </section>
    </>
  );
};

export default SearchUsersView;
