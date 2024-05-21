const checkTime = {
  isSecond: (time: number) => time < 60000,
  isMinute: (time: number) => 60000 <= time && time < 3600000,
  isHour: (time: number) => 3600000 <= time && time < 86400000,
  isOverOneDay: (time: number) => 86400000 <= time,
};

const calcTime = {
  second: (time: number) => Math.floor(time / 1000),
  minute: (time: number) => Math.floor(time / 60000),
  hour: (time: number) => Math.floor(time / 3600000),
  day: (time: number) => Math.floor(time / 86400000),
};

export const parseDate = (timeData: string | Date, lang = "ko") => {
  const formatter = new Intl.RelativeTimeFormat(lang, {
    numeric: "always",
  });

  const passed: number = +new Date() - +new Date(timeData);

  if (passed < 1000) {
    return "방금";
  }
  if (checkTime.isSecond(passed)) {
    return formatter.format(-calcTime.second(passed), "second");
  }
  if (checkTime.isMinute(passed)) {
    return formatter.format(-calcTime.minute(passed), "minute");
  }
  if (checkTime.isHour(passed)) {
    return formatter.format(-calcTime.hour(passed), "hour");
  }
  if (checkTime.isOverOneDay(passed)) {
    return new Intl.DateTimeFormat(lang, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(timeData));
  }
};

export const parseTime = (timeData: string | Date, lang = "ko") => {
  const passed: number = +new Date() - +new Date(timeData);

  if (checkTime.isOverOneDay(passed)) {
    return new Intl.DateTimeFormat(lang, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(timeData));
  } else {
    return new Intl.DateTimeFormat("ko", { timeStyle: "short" }).format(
      new Date(timeData)
    );
  }
};
