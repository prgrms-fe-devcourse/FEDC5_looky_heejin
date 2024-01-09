import { Button, Upload } from "../common";
import { ModalLayout } from "../common/Modal";
import styled from "styled-components";

const UploadWrap = styled.div`
  width: 300px;
  height: 300px;
  aspect-ratio: 10 / 16;
`;

const ChangeImageModal = () => {
  return (
    <ModalLayout>
      <section>
        <form>
          <UploadWrap>
            <Upload
              style={{ position: "relative", width: "100%", height: "100%" }}
            ></Upload>
          </UploadWrap>
          <Button variant="symbol">아바타 변경</Button>
        </form>
      </section>
    </ModalLayout>
  );
};

export default ChangeImageModal;
