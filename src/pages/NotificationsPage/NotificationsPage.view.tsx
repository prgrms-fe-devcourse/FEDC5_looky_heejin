import { useCallback, useEffect } from "react";

import { useNotification } from "@/hooks/useNotification";
import NotificationCard from "@/components/Notification/NotificationCard/NotificationCard";
import { INotification } from "@/types/notification";
import { useMutation } from "@tanstack/react-query";
import { _PUT } from "@/api";

const NotificationsPage = () => {
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
      else if (data.follow) return "comment";
      else if (data.like) return "like";
      return "post";
    },
    [common]
  );

  return (
    <ul className="space-y-6 pt-8">
      {common?.map(data => (
        <NotificationCard key={data._id} type={getType(data)} data={data} />
      ))}
    </ul>
  );
};

export default NotificationsPage;
