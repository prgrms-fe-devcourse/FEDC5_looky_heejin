import { Avatar } from "@/components/common";
import { Col, Row } from "@/styles/GlobalStyle";
import { IUser } from "@/types";
import styled from "styled-components";

interface IUsersProps {
  searchData: IUser[];
  onClick: (userId: string) => void;
}

const ListWrap = styled(Col)``;

const ListItem = styled(Row)`
  margin-top: 1rem;
  align-items: center;
`;

const UserInfo = styled.div`
  padding-left: 0.5rem;
  flex-grow: 1;
`;

const SearchUsersView = ({ searchData, onClick }: IUsersProps) => {
  if (!searchData) {
    return null;
  }

  return (
    <>
      <section>
        <ListWrap>
          {Array.isArray(searchData) && searchData.length > 0 ? (
            searchData.map(user => (
              <ListItem key={user._id} onClick={() => onClick(user._id)}>
                <Avatar size="S" shape="circle" src={user.image} />
                <UserInfo>{user.fullName}</UserInfo>
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
