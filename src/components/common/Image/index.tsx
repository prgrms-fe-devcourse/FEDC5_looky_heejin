import { CSSProperties, useEffect, useState } from "react";

interface IImageProps {
  src: string | null;
  alt?: string;
  sizes?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  fill?: boolean;
  style?: CSSProperties;
  [key: string]: any;
}

/**
 * @param priority lazy 속성 적용 여부를 결정합니다. true 인 경우 해당 이미지를 lazy loading 하지 않습니다.
 * @param fill 이미지가 상위 요소를 채우도록 하는 옵션입니다. width, height 를 지정할 수 없는 경우 유용합니다. 단 상위 요소의 position 은 relative, fixed 중 하나이어야 합니다. Image 의 style 속성에 인라인으로 objectFit 지정해주어야 합니다. fill 이 true 가 아닌 경우 width, height 값을 주어야 합니다.
 *
 */
const Image = ({
  src,
  alt,
  priority = false,
  sizes,
  width,
  height,
  fill = false,
  style,
  ...props
}: IImageProps) => {
  if (!fill && (!width || !height)) {
    console.warn("fill 모드가 아닌 경우 width, height 를 필요로 합니다.");

    return null;
  }

  if (!src)
    return (
      <div
        style={{
          position: `${fill ? "absolute" : "relative"}`,
          top: `${fill && 0}`,
          left: `${fill && 0}`,
          width: `${fill ? "100%" : `${width}px`}`,
          height: `${fill ? "100%" : `${height}px`}`,
        }}
        className="bg-gray-500"
      />
    );

  return (
    <>
      {src && (
        <img
          alt={alt}
          src={src}
          // fetchPriority={priority ? "high" : "low"}
          loading={!priority ? "lazy" : undefined}
          // decoding={!priority ? "async" : undefined}
          sizes={sizes}
          {...props}
          style={{
            width: `${fill ? "100%" : `${width}px`}`,
            height: `${fill ? "100%" : `${height}px`}`,
            objectFit: fill ? "cover" : "none",
            ...style,
          }}
        />
      )}
    </>
  );
};

export default Image;
