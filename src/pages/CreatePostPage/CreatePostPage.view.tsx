import { Button } from "@/components/common";
import { Row } from "@/styles/GlobalStyle";
import Upload from "@/components/common/Upload";
import { Tag } from "./CreatePostPage.styles";
import { useUI } from "@/components/common/uiContext";
import { useTags } from "@/hooks/useTags";

const CreatePostPageView = () => {
  const { openModal, setModalView } = useUI();
  const { tags } = useTags();

  const postFileClickHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const nativeEvent = event.nativeEvent;

    setModalView("TAG_CREATE_VIEW");
    openModal({
      x: nativeEvent.offsetX,
      y: nativeEvent.offsetY,
    });
  };

  const tagClickHandler = (id: string, x?: number, y?: number) => {
    setModalView("TAG_CREATE_VIEW");
    openModal({
      isEdit: true,
      id: id,
      x,
      y,
    });
  };

  return (
    <div className="__container relative w-full h-full pt-[70px] pb-[70px]">
      <section className="__upload w-full h-[40vh] relative">
        <Upload
          onChange={file => console.log(file)}
          clickable={false}
          className="relative w-full h-full"
        >
          <div
            className="absolute top-0 left-0 w-full h-full"
            onClick={postFileClickHandler}
          />
          {tags.map(({ x, y, id }) => (
            <Tag
              key={id}
              x={x}
              y={y}
              onClick={() => tagClickHandler(id, x, y)}
            />
          ))}
        </Upload>
      </section>
      <section className="__form pt-4 h-[50vh]">
        <div className="__textArea w-full h-[65%] bg-gray-400 mb-4">
          textarea
        </div>
        <div>
          <Button variant="neumorp">
            <span className="text-sm font-semibold">카테고리 선택</span>
          </Button>
          <Row className="mt-3 space-x-2">
            <div className="px-2 py-1 bg-[#B3B3B390] rounded-md text-sm">
              아웃도어
            </div>
            <div className="px-2 py-1 bg-[#B3B3B390] rounded-md text-sm">
              ootd
            </div>
            <div className="px-2 py-1 bg-[#B3B3B390] rounded-md text-sm">
              캐주얼
            </div>
            <div className="px-2 py-1 bg-[#B3B3B390] rounded-md text-sm">
              아메카지
            </div>
          </Row>
        </div>
      </section>
      <Button variant="symbol" className="absolute bottom-0">
        <span className="font-semibold">포스터 작성</span>
      </Button>
    </div>
  );
};

export default CreatePostPageView;
