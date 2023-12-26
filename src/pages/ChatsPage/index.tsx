import { useUI } from "@/components/common/uiContext";

const ChatsPage = () => {
  const { openModal } = useUI();

  return (
    <div>
      <h2>Chats</h2>
      <button onClick={() => openModal()}>open Modal</button>
    </div>
  );
};

export default ChatsPage;
