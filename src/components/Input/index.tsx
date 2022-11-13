import { ChangeEvent, InputHTMLAttributes, useState } from "react";

import * as S from "./styles";

export type TInput = {
  onInputChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  error: string;
  initialValue?: string;
} & InputHTMLAttributes<HTMLInputElement>;

function Input({
  onInputChange,
  type = "text",
  placeholder = "Título...",
  error,
  initialValue = "",
  ...rest
}: TInput) {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);

    !!onInputChange && onInputChange(e);
  };
  return (
    <S.InputWrapper>
      <S.Input
        error={error}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        {...rest}
      />
      {error && <S.Error>{error}</S.Error>}
    </S.InputWrapper>
  );
}

export default Input;
