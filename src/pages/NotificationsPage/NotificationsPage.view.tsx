import { useNotification } from "@/hooks/useNotification";
import React from "react";

const NotificationsPage = () => {
  const { common, message, commonUnseenCount, messageUnseenCount } =
    useNotification();

  console.log(commonUnseenCount);
  console.log(messageUnseenCount);

  return <div>NotificationsPage.view</div>;
};

export default NotificationsPage;
