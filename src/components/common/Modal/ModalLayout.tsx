import { FC, useRef, useEffect, useCallback } from "react";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

import { useUI } from "@/components/common/uiContext";
import {
  ModalLayoutHeader,
  ModalLayoutContainer,
  ModalHeaderTitle,
  ModalHeaderButton,
  ModalContantWrapper,
} from "./Modal.styles";

// import FocusTrap from "@lib/focus-trap";

interface ModalLayoutProps {
  className?: string;
  children?: any;
  modalTitle?: string;
  handleClose?: () => void | null;
  onEnter?: () => void | null;
}

const ModalLayout: FC<ModalLayoutProps> = ({
  className,
  children,
  handleClose,
  modalTitle = "",
}) => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

  const { closeModal } = useUI();

  const _handleClose = () => {
    handleClose && handleClose();
    closeModal();
  };

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        return _handleClose();
      }
    },
    [handleClose, closeModal]
  );

  useEffect(() => {
    const modal = ref.current;

    if (modal) {
      disableBodyScroll(modal, { reserveScrollBarGap: false });
      window.addEventListener("keydown", handleKey);
    }
    return () => {
      clearAllBodyScrollLocks();
      window.removeEventListener("keydown", handleKey);
    };
  }, [handleKey]);

  return (
    <ModalLayoutContainer ref={ref} role="dialog" className={className}>
      <ModalLayoutHeader>
        <ModalHeaderTitle>{modalTitle}</ModalHeaderTitle>
      </ModalLayoutHeader>
      <ModalHeaderButton
        onClick={() => _handleClose()}
        aria-label="Close panel"
      >
        {/* Close Button Icon */}
        <div className="h-6 w-6 rounded-full bg-gray-400">X</div>
      </ModalHeaderButton>
      <ModalContantWrapper>{children}</ModalContantWrapper>
    </ModalLayoutContainer>
  );
};

export default ModalLayout;
