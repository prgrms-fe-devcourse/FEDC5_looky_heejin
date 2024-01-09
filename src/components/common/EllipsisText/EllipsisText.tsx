import React from "react";
import cn from "clsx";

import styled from "styled-components";

interface Props {
  context: string;
  className?: string;
  lineClamp?: number;
  lineHeight?: number;
  [key: string]: any;
}

const EllipsisText: React.FC<Props> = ({
  context,
  className,
  lineClamp = 2,
  lineHeight,
  ...rest
}) => {
  const rootClassName = cn("", {}, className);

  return (
    <EllipsisP
      className={rootClassName}
      $lineClamp={lineClamp}
      $lineHeight={lineHeight}
      {...rest}
    >
      {context}
    </EllipsisP>
  );
};

export default EllipsisText;

const EllipsisP = styled.p<any>`
  position: relative;
  display: -webkit-box;
  -webkit-line-clamp: ${props => props.$lineClamp};
  -webkit-box-orient: vertical;
  line-height: ${props =>
    props.$lineHeight ? props.$lineHeight : 1 * props.$lineClamp}rem;
  word-wrap: break-word;
  text-overflow: ellipsis;
  overflow: hidden;
`;
