import { useEffect } from "react";
import * as _ from "lodash";

import { useNotification } from "@/hooks/useNotification";
import { useQuery } from "@tanstack/react-query";
import { _GET } from "@/api";
import { NOTIFICATION } from "@/constants/queryKey";
import { useAuth } from "@/hooks/useAuth";

const NotificationManager = () => {
  const { isLogIn } = useAuth();
  const { data } = useQuery({
    queryKey: [NOTIFICATION],
    queryFn: async () => _GET("/notifications"),
    enabled: isLogIn,
    refetchInterval: 2000,
  });

  const { setNotification } = useNotification();

  useEffect(() => {
    const { message, common } = _.chain(data?.data)
      .orderBy(data => new Date(data.createdAt), "desc")
      .groupBy(data => (data.message ? "message" : "common"))
      .value();

    setNotification({ common, message });
  }, [data?.data]);

  return null;
};

export default NotificationManager;
