import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { styled } from "styled-components";

export interface IToastProps {
  text: string;
  type: "default" | "success" | "warning" | "error";
}

const autoClose = 3000;

export const notify = ({ type, text }: IToastProps) => {
  switch (type) {
    case "default":
      toast(text);
      break;
    case "success":
      toast.success(text);
      break;
    case "warning":
      toast.warning(text);
      break;
    case "error":
      toast.error(text);
      break;
  }
};

const ModifiedToast = styled(ToastContainer)`
  .Toastify__toast {
    flex-direction: row;
    font-size: 1.1rem;
    font-weight: 600;
    color: #fff;
  }

  .Toastify__toast-body {
    gap: 10px;
  }

  .Toastify__toast--default {
    background: rgba(251, 96, 96, 0.8);
  }

  .Toastify__toast--warning {
    background: rgba(176, 185, 48, 0.8);
  }

  .Toastify__toast--success {
    background: rgba(48, 173, 120, 0.8);
  }

  .Toastify__toast--error {
    background: rgba(224, 72, 82, 0.8);
  }
`;

const Toast = () => {
  return (
    <ModifiedToast
      position="top-right"
      autoClose={autoClose}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover
      theme="dark"
    />
  );
};

export default Toast;
