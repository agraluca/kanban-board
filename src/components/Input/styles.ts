import styled, { css, DefaultTheme } from "styled-components";
import { TInput } from ".";

export const InputWrapper = styled.section`
  ${({ theme }) => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${theme.spacings.xxsmall};
  `}
`;

const errorModifer = (theme: DefaultTheme) => css`
  color: ${theme.colors.red.main};
  border: 0.2rem solid ${theme.colors.red.main};
  &:focus {
    outline: none;
  }
`;

export const Input = styled.input<Pick<TInput, "error">>`
  ${({ theme, error }) => css`
    width: 100%;
    height: 3rem;
    background: ${theme.colors.white};
    border-radius: ${theme.border.smallRadius};
    font-size: ${theme.font.sizes.small};
    border: 0.2rem solid ${theme.colors.gray.light};
    outline: 0;
    padding: 0 ${theme.spacings.xxsmall};
    font-family: ${theme.font.family};
    appearance: none;

    &:disabled {
      cursor: not-allowed;
    }

    &::placeholder {
      color: ${theme.colors.gray.dark};
    }

    &:focus {
      outline: 0.2rem solid ${theme.colors.blue.main};
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
