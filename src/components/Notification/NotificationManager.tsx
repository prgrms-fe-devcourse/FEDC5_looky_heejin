import React, { useEffect } from "react";
import * as _ from "lodash";

import { INotification } from "@/types/notification";
import { useNotification } from "@/hooks/useNotification";

const MOCK_DATA: INotification[] = [
  {
    seen: false,
    _id: "1",
    author: { image: "", fullName: "누군가" },
    user: "누군가",
    post: "1", // 포스트 id
    follow: null, // 사용자 id
    comment: null,
    message: null, // 메시지 id
    createdAt: "2024-01-05T10:26:00.457Z",
    updatedAt: "2024-01-05T10:26:00.457Z",
  },
  {
    seen: false,
    _id: "2",
    author: { image: "", fullName: "누군가" },
    user: "누군가",
    post: null, // 포스트 id
    follow: "1", // 사용자 id
    comment: null,
    message: null, // 메시지 id
    createdAt: "2024-01-05T08:26:00.457Z",
    updatedAt: "2024-01-05T08:26:00.457Z",
  },
  {
    seen: false,
    _id: "3",
    author: { image: "", fullName: "누군가" },
    user: "누군가",
    post: null, // 포스트 id
    follow: null, // 사용자 id
    comment: "1",
    message: null, // 메시지 id
    createdAt: "2024-01-05T11:26:00.457Z",
    updatedAt: "2024-01-05T11:26:00.457Z",
  },
  {
    seen: false,
    _id: "4",
    author: { image: "", fullName: "누군가" },
    user: "누군가",
    post: null, // 포스트 id
    follow: null, // 사용자 id
    comment: null,
    message: "1", // 메시지 id
    createdAt: "2024-01-05T15:26:00.457Z",
    updatedAt: "2024-01-05T15:26:00.457Z",
  },
];

const NotificationManager = () => {
  // TODO:
  // 1. 풀링 전략에 따라 알림을 패치 받는다
  // 2. 알림 데이터를 항목에 따라 분류한다. (일반 알림, 메시지)
  // 3. 알림은 늘 최신 순으로 보여준다.

  const { setNotification } = useNotification();

  const { message, common } = _.chain(MOCK_DATA)
    .orderBy(data => new Date(data.createdAt), "desc")
    .groupBy(data => (data.message ? "message" : "common"))
    .value();

  useEffect(() => {
    setNotification({ common, message });
  }, []);

  return null;
};

export default NotificationManager;
