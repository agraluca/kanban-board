import check from "assets/images/check-circle.svg";
import x from "assets/images/x-circle.svg";

import { KeyboardEvent, useEffect } from "react";

import * as S from "./styles";

export type TToastMessage = {
  type: "default" | "success" | "error";
  message: string;
  duration: number;
  handleRemoveToast: () => void;
};

export default function ToastMessage({
  type = "success",
  message = "default",
  duration,
  handleRemoveToast,
}: TToastMessage) {
  const icon = {
    error: {
      src: x,
      alt: "Error",
    },
    success: {
      src: check,
      alt: "Success",
    },
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLImageElement>) => {
    if (["Enter", "Space"].includes(event.code)) {
      handleRemoveToast();
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(handleRemoveToast, duration ?? 3000);
    return () => clearTimeout(timeoutId);
  }, [duration, handleRemoveToast]);

  return (
    <S.Toast
      type={type}
      onClick={handleRemoveToast}
      onKeyPress={handleKeyPress}
    >
      {type !== "default" && (
        <S.Icon src={icon[type]?.src} alt={icon[type]?.alt} />
      )}
      {message}
    </S.Toast>
  );
}
