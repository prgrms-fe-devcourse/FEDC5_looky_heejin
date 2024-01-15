import React, {
  forwardRef,
  ButtonHTMLAttributes,
  useRef,
  MouseEvent,
  useCallback,
  ReactNode,
} from "react";
import { mergeRefs } from "react-merge-refs";
import cn from "clsx";

import { ButtonRipple, Disabled, Flat, Neumorp, Symbol } from "./Button.styles";
import rippleStyle from "./Button.module.css";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  className?: string;
  variant: "flat" | "neumorp" | "symbol" | "disabled";
  buttonColor?: string;
  textColor?: string;
  active?: boolean;
  type?: "submit" | "reset" | "button";
  children: ReactNode | string;
  width?: string | number;
  loading?: boolean;
  disabled?: boolean;
  useRipple?: boolean;
  rippleColor?: string;
  onClickHandler?: () => void;
  handlerDelay?: number;
}

const ButtonType = {
  flat: Flat,
  neumorp: Neumorp,
  symbol: Symbol,
  disabled: Disabled,
};

/**
 * @param variant 버튼의 테마를 지정 합니다
 * @param useRipple 리플 이팩트 적용 여부를 나타냅니다. neumorp 테마에서는 적용되지 않습니다.
 * @param handlerDelay 리플 이펙트 적용시 리플 이펙트 완료 후 클릭 이벤트를 실행시켜야 하는 경우를 대비하여 클릭 핸들러의 실행을 딜레이 시키는 용도로 사용됩니다. default = 0
 */
const Button: React.FC<ButtonProps> = forwardRef((props, buttonRef) => {
  const {
    className,
    variant = "flat",
    buttonColor,
    textColor,
    active,
    width,
    loading = false,
    disabled,
    useRipple = true,
    rippleColor,
    style = {},
    children,
    onClickHandler = () => null,
    handlerDelay = 0,
    ...rest
  } = props;

  const ButtonWrapper: React.ComponentType<any> = disabled
    ? ButtonType["disabled"]
    : ButtonType[variant];

  const ref = useRef<typeof ButtonWrapper>(null);
  const rippleRef = useRef<HTMLSpanElement>(null);

  const rootClassName = cn("px-4 py-4 rounded-md", {}, className);

  const createRipple = (event: MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = `${diameter}px`;
    circle.style.height = `${diameter}px`;
    circle.style.left = `${
      event.clientX - button.getBoundingClientRect().left - radius
    }px`;
    circle.style.top = `${
      event.clientY - button.getBoundingClientRect().top - radius
    }px`;

    circle.classList.add(rippleStyle.ripple);

    const existingRipple = button.querySelector(`.${rippleStyle.ripple}`);

    if (existingRipple) {
      existingRipple.remove();
    }

    rippleRef.current?.appendChild(circle);
  };

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      createRipple(event);
      setTimeout(() => onClickHandler(), handlerDelay);
    },
    [onClickHandler]
  );

  return (
    <ButtonWrapper
      aria-pressed={active}
      data-variant={variant}
      ref={mergeRefs([ref, buttonRef])}
      className={rootClassName}
      disabled={disabled}
      style={{
        width,
        ...style,
      }}
      onClick={useRipple ? handleClick : onClickHandler}
      $buttonColor={buttonColor}
      $textColor={textColor}
      $rippleColor={rippleColor}
      {...rest}
    >
      {!loading ? <>{children}</> : <span className="font-semibold">...</span>}
      {useRipple && variant !== "neumorp" && !disabled && (
        <ButtonRipple ref={rippleRef} className="ripple" />
      )}
    </ButtonWrapper>
  );
});

export default Button;
