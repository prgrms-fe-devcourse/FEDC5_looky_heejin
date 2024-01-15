import { useMe } from "@/hooks/useMe";
import { Button } from "../common";
import { useUI } from "../common/uiContext";

const { VITE_ADMIN_ID } = import.meta.env;

const Admin = () => {
  const { id } = useMe();
  const { setModalView, openModal } = useUI();

  const onClick = () => {
    setModalView("CREATE_CHANNEL_VIEW");
    openModal();
  };

  if (id === VITE_ADMIN_ID)
    return (
      <div style={{ margin: "10px 5px", marginBottom: "0" }}>
        <Button variant="symbol" onClick={onClick}>
          <span style={{ fontWeight: "bold" }}>채널 추가하기</span>
        </Button>
      </div>
    );
};

export default Admin;
