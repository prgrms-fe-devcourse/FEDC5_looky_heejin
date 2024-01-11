import { FC, useRef, useEffect, useCallback, ReactNode } from "react";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import { ModalBackground } from "./Modal.styles";

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
    const modal = ref.current;

    if (modal) {
      disableBodyScroll(modal, { reserveScrollBarGap: true });
      window.addEventListener("keydown", handleKey);
    }
    return () => {
      clearAllBodyScrollLocks();
      window.removeEventListener("keydown", handleKey);
    };
  }, [handleKey]);

  return (
    <ModalBackground ref={ref} onClick={backgroundClickHandler}>
      {children}
    </ModalBackground>
  );
};

export default Modal;
