import styled, { css } from "styled-components";
import media from "styled-media-query";

export const Wrapper = styled.main`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: ${theme.spacings.xxsmall};
    position: relative;
    width: 100%;
    min-height: 80vh;
    background-color: ${theme.colors.white};
    padding: ${theme.spacings.xxsmall};
    border-radius: ${theme.border.radius};
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.25));

    ${media.lessThan("medium")`
      min-height: 15rem;
    `}
  `}
`;

export type TTitle = {
  backgroundColor: string;
};

export const Title = styled.h2<TTitle>`
  ${({ theme, backgroundColor }) => css`
    width: 100%;
    text-align: left;
    background-color: ${backgroundColor};
    color: ${theme.colors.blue.dark};
    font-size: ${theme.font.sizes.medium};
    font-weight: ${theme.font.weight.bold};
    margin-bottom: ${theme.spacings.xxsmall};
    border-radius: ${theme.border.radius};
    padding: ${theme.spacings.xxsmall};
  `}
`;

export const AddMoreArea = styled.button`
  ${({ theme }) => css`
    background: transparent;
    width: 100%;
    padding: ${theme.spacings.xsmall} ${theme.spacings.medium};
    border: 0.3rem dashed ${theme.colors.gray.main};
    border-radius: ${theme.border.radius};
    cursor: pointer;
    transition: opacity 0.3s ease-in-out;
    &:hover {
      opacity: 0.7;
    }
    &:disabled {
      cursor: not-allowed;
    }
  `}
`;

export const PlusIcon = styled.img`
  ${({ theme }) => css`
    color: ${theme.colors.gray.main};
  `}
`;
