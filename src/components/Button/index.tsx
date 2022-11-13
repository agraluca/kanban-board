import { ReactNode } from "react";

import Spinner from "components/Spinner";

import * as S from "./styles";

type TButtonComponent = {
  children: ReactNode;
  size: "normal" | "fullWidth";
  colorType: "primary" | "danger";
  isSubmiting: boolean;
  disabled: boolean;
};

function Button({
  colorType = "primary",
  size = "normal",
  children,
  isSubmiting = false,
  disabled = false,
  ...rest
}: TButtonComponent) {
  return (
    <S.Button
      colorType={colorType}
      size={size}
      disabled={disabled || isSubmiting}
      {...rest}
    >
      {isSubmiting ? <Spinner size={18} /> : children}
    </S.Button>
  );
}

export default Button;
