import styled, { css, DefaultTheme } from "styled-components";
import { TToastMessage } from ".";

const toastColorModifiers = {
  default: (theme: DefaultTheme) => css`
    background: ${theme.colors.blue.main};
  `,
  success: (theme: DefaultTheme) => css`
    background: ${theme.colors.green};
  `,
  error: (theme: DefaultTheme) => css`
    background: ${theme.colors.red.main};
  `,
};

export const Toast = styled.div<Pick<TToastMessage, "type">>`
  ${({ theme, type }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${theme.spacings.xsmall} ${theme.spacings.medium};
    max-width: 30rem;
    width: 100%;
    color: ${theme.colors.white};
    box-shadow: 0px 20px 20px -16px rgba(0, 0, 0, 0.25);
    border-radius: ${theme.border.smallRadius};
    font-size: ${theme.font.sizes.medium};
    font-weight: ${theme.font.weight.bold};
    cursor: pointer;
    ${!!type && toastColorModifiers[type](theme)};
  `}
`;

export const Icon = styled.img`
  ${({ theme }) => css`
    margin-right: ${theme.spacings.xxsmall};
  `}
`;
