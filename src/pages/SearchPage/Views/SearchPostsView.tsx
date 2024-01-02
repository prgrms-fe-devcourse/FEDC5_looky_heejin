import { IUser } from "@/types";
import { useEffect } from "react";

interface IPostsProps {
  searchData: IUser[];
}

const SearchPostsView = ({ searchData }: IPostsProps) => {
  useEffect(() => {
    console.log("Posts:  ", searchData);
  }, [searchData]);

  return (
    <>
      <section>
        <div>게시글을 보여주세요</div>
      </section>
    </>
  );
};

export default SearchPostsView;
