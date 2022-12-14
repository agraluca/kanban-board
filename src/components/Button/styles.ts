import styled, { css, DefaultTheme } from "styled-components";

const buttonSizeModifiers = {
  normal: () => css`
    width: auto;
  `,
  fullWidth: () => css`
    width: 100%;
  `,
};

const buttonColorModifiers = {
  primary: (theme: DefaultTheme) => css`
    background: ${theme.colors.blue.main};
    &:hover {
      background: ${theme.colors.blue.light};
    }
    &:active {
      background: ${theme.colors.blue.dark};
    }
  `,
  danger: (theme: DefaultTheme) => css`
    background: ${theme.colors.red.main};
    &:hover {
      background: ${theme.colors.red.light};
    }
    &:active {
      background: ${theme.colors.red.dark};
    }
  `,
};

type TButon = {
  size: "normal" | "fullWidth";
  colorType: "primary" | "danger";
};

export const Button = styled.button<TButon>`
  ${({ theme, size, colorType }) => css`
    ${!!size && buttonSizeModifiers[size]()};
    ${!!colorType && buttonColorModifiers[colorType](theme)};
    color: ${theme.colors.white};
    border: none;
    border-radius: ${theme.border.radius};
    font-size: ${theme.font.sizes.medium};
    font-weight: ${theme.font.weight.bold};
    padding: ${theme.spacings.xsmall};
    height: 5rem;
    transition: background 0.2s ease-in;

    &:disabled {
      background: ${theme.colors.disabled};
      cursor: not-allowed;
    }
  `}
`;
