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
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.gray_200};
  }
`;

const UserInfo = styled(Col)`
  flex-grow: 1;
  padding-left: 0.5rem;
  height: 100%;
  justify-content: center;
`;

const SearchUsersView = ({ searchData, onClick, ...props }: IUsersProps) => {
  if (!searchData) {
    return null;
  }

  return (
    <>
      <section>
        <ListWrap>
          {Array.isArray(searchData) && searchData.length > 0 ? (
            searchData.map(user => (
              <ListItem
                key={user._id}
                onClick={() => onClick(user._id)}
                {...props}
              >
                <Avatar size="S" shape="circle" src={user.image} />
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
