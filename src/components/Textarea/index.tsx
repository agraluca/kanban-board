import { ChangeEvent, TextareaHTMLAttributes, useState } from "react";
import * as S from "./styles";

export type TTextarea = {
  onTextareaChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  error: string;
  initialValue?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

function Textarea({
  onTextareaChange,
  placeholder = "Conteúdo...",
  error,
  initialValue,
  ...rest
}: TTextarea) {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.currentTarget.value);

    !!onTextareaChange && onTextareaChange(e);
  };
  return (
    <S.Wrapper>
      <S.Textarea
        error={error}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        {...rest}
      />
      {error && <S.Error>{error}</S.Error>}
    </S.Wrapper>
  );
}

export default Textarea;
