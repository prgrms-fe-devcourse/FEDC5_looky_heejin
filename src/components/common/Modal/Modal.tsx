import { FC, useRef, useEffect, useCallback, ReactNode } from "react";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import { ModalBackground, ModalContainer } from "./Modal.styles";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  onEnter?: () => void | null;
}

const Modal: FC<ModalProps> = ({ children, onClose }) => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        return onClose();
      }
    },
    [onClose]
  );

  const backgroundClickHandler = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    onClose();
  };

  useEffect(() => {
    // popstate 이벤트가 한번만 실행되도록 하기 위한 콜백함수
    const preventGoBack = () => {
      // history.pushState(null, "", location.href);
      onClose();
    };

    history.pushState(null, "", location.href);
    window.addEventListener("popstate", preventGoBack);

    return () => {
      window.removeEventListener("popstate", preventGoBack);
      console.log("Close");
    };
  }, []);

  useEffect(() => {
    const modalBackground = ref.current;

    if (modalBackground) {
      disableBodyScroll(modalBackground, { reserveScrollBarGap: true });
      window.addEventListener("keydown", handleKey);
    }
    return () => {
      clearAllBodyScrollLocks();
      window.removeEventListener("keydown", handleKey);
    };
  }, [handleKey]);

  return (
    <ModalContainer>
      <ModalBackground ref={ref} onClick={backgroundClickHandler} />
      {children}
    </ModalContainer>
  );
};

export default Modal;
