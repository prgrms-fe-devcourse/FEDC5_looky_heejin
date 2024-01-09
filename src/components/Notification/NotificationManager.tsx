import React, { useEffect } from "react";
import * as _ from "lodash";

import { useNotification } from "@/hooks/useNotification";
import { useQuery } from "@tanstack/react-query";
import { _GET } from "@/api";
import { NOTIFICATION } from "@/constants/queryKey";
import { useAuth } from "@/hooks/useAuth";

const NotificationManager = () => {
  const { isLogIn } = useAuth();
  // TODO:
  // 1. 풀링 전략에 따라 알림을 패치 받는다
  // 2. 알림 데이터를 항목에 따라 분류한다. (일반 알림, 메시지)
  // 3. 알림은 늘 최신 순으로 보여준다.
  const { data } = useQuery({
    queryKey: [NOTIFICATION],
    queryFn: async () => _GET("/notifications"),
    enabled: isLogIn,
    refetchInterval: 30 * 1000,
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
