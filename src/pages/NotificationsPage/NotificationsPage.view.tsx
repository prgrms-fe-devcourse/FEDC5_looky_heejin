import { useCallback, useEffect } from "react";

import { useNotification } from "@/hooks/useNotification";
import NotificationCard from "@/components/Notification/NotificationCard/NotificationCard";
import { INotification } from "@/types/notification";
import { useMutation } from "@tanstack/react-query";
import { _PUT } from "@/api";
import { useNavigate } from "react-router-dom";
import { useUI } from "@/components/common/uiContext";

const NotificationsPage = () => {
  const navigate = useNavigate();
  const { setModalView, openModal } = useUI();
  const { common, initCommonCount } = useNotification();

  const mutation = useMutation({
    mutationFn: async () => await _PUT("/notifications/seen"),
  });

  useEffect(() => {
    mutation.mutate();
    initCommonCount();

    return () => {
      mutation.mutate();
      initCommonCount();
    };
  }, []);

  const getType = useCallback(
    (data: INotification) => {
      if (data.comment) return "comment";
      else if (data.follow) return "follow";
      else if (data.like) return "like";
      return "post";
    },
    [common]
  );

  const cardClickHandler = useCallback(
    (data: INotification, isProfile?: boolean) => {
      const target = getType(data);
      if (isProfile || target === "follow") {
        navigate(`/profile/${data.author._id}`);
      } else {
        setModalView("POST_DETAIL_VIEW");
        openModal({ postId: data.post });
      }
    },
    []
  );

  return (
    <ul className="space-y-6 pt-8">
      {common?.map(data => (
        <NotificationCard
          key={data._id}
          type={getType(data)}
          data={data}
          onClickHandler={cardClickHandler}
        />
      ))}
    </ul>
  );
};

export default NotificationsPage;
