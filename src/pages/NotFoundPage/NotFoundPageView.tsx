import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DELAY_TIME = 3;

const NotFoundPageView = () => {
  const [delay, setDelay] = useState(DELAY_TIME);

  const navigate = useNavigate();

  useEffect(() => {
    if (delay === 0) return;

    const intervalId = setInterval(() => {
      setDelay((delay: number) => delay - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // TODO:
  // 이전 페이지가 splash 라면 home 으로 이동
  if (delay === 0) navigate(-1);

  return (
    <div className="w-full h-full justify-center items-center">
      <span className="font-extrabold text-8xl -rotate-12">앗!</span>
      <p className="text-center font-bold text-2xl mt-8">
        요청하신 페이지를
        <br />
        찾지 못했어요
      </p>
      <p className="text-sm mt-4">{`${delay}초 후 이전 페이지로 이동할게요`}</p>
    </div>
  );
};

export default NotFoundPageView;
