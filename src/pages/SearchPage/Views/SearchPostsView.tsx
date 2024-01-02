import { IPost } from "@/types";
import { useEffect } from "react";

interface IPostsProps {
  postsData: IPost[];
}

const SearchPostsView = ({ postsData }: IPostsProps) => {
  useEffect(() => {
    // console.log("Posts:  ", postsData);
  }, [postsData]);

  return (
    <>
      <section>
        <div>게시글을 보여주세요</div>
      </section>
    </>
  );
};

export default SearchPostsView;
