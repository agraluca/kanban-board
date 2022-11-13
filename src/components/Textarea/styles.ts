import styled, { css, DefaultTheme } from "styled-components";
import { TTextarea } from ".";

export const Wrapper = styled.section`
  ${() => css`
    width: 100%;
    display: flex;
  `}
`;

const errorModifer = (theme: DefaultTheme) => css`
  color: ${theme.colors.red.main};
  border: 0.2rem solid ${theme.colors.red.main};
  &:focus {
    outline: none;
  }
`;

export const Textarea = styled.textarea<Pick<TTextarea, "error">>`
  ${({ theme, error }) => css`
    padding: ${theme.spacings.xxsmall};
    width: 100%;
    min-height: 5rem;
    background: transparent;
    border-radius: ${theme.border.smallRadius};
    border: 0.2rem solid ${theme.colors.gray.light};
    resize: none;

    &::placeholder {
      color: ${theme.colors.gray.dark};
    }

    &:focus {
      outline: 0.2rem solid ${theme.colors.blue.main};
    }

    &:disabled {
      cursor: not-allowed;
    }

    ${!!error && errorModifer(theme)}
  `}
`;

export const Error = styled.small`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xsmall};
    color: ${theme.colors.red.main};
  `}
`;
