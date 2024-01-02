import React, { useState } from "react";
import { CardContainer } from "./PostSimpleCard.styles";
import PostSimpleCardConst from "./PostSimpleCard.const";
import { Image } from "..";

const PostSimpleCard = () => {
  return (
    <>
      <CardContainer>
        <Image
          src={PostSimpleCardConst.data_example.image}
          width={200}
          height={300}
        />
      </CardContainer>
    </>
  );
};

export default PostSimpleCard;
