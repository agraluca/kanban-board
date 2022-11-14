import styled, { css } from "styled-components";

export const Wrapper = styled.section`
  ${({ theme }) => css`
    display: flex;
    gap: ${theme.spacings.xxsmall};
    align-items: flex-start;
    flex-direction: column;
    background: ${theme.colors.white};
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.25));
    border-radius: ${theme.border.radius};
    width: 100%;
    padding: ${theme.spacings.xxsmall};
  `}
`;

export const Header = styled.header`
  ${({ theme }) => css`
    display: flex;
    gap: ${theme.spacings.xsmall};
    width: 100%;
    justify-content: space-between;
    align-items: center;
  `}
`;

export const IconsWrapper = styled.span`
  ${({ theme }) => css`
    display: flex;
    gap: ${theme.spacings.xxsmall};
  `}
`;

export const Title = styled.h4`
  ${({ theme }) => css`
    color: ${theme.colors.blue.dark};
    font-size: ${theme.font.sizes.medium};
    font-weight: ${theme.font.weight.bold};
    padding: ${theme.spacings.xxsmall};
    border-radius: ${theme.border.radius};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `}
`;

export const Description = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.black};
    margin: ${theme.spacings.xxsmall};
    font-size: ${theme.font.sizes.small};
    line-height: 135%;
  `}
`;

export const Footer = styled.footer`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${theme.colors.black};
    background: ${theme.colors.gray.light};
    width: 100%;
    padding: ${theme.spacings.xxsmall};
    border-radius: 0 0 ${theme.border.radius} ${theme.border.radius};
  `}
`;

export const Tag = styled.h6`
  ${({ theme }) => css`
    text-transform: uppercase;
    font-size: ${theme.font.sizes.xsmall};
  `}
`;

export const Icon = styled.img`
  ${() => css`
    width: 2rem;
    height: 2rem;
  `}
`;

const arrowRotationModifiers = {
  left: () => css`
    transform: rotate(180deg);
  `,
  right: () => css`
    transform: rotate(0);
  `,
};

type TArrowIcon = {
  pos: "left" | "right";
};

export const ArrowIcon = styled.img<TArrowIcon>`
  ${({ pos }) => css`
    width: 2rem;
    height: 2rem;
    ${!!pos && arrowRotationModifiers[pos]()};
  `}
`;

export const TransparentButton = styled.button`
  ${() => css`
    display: flex;
    align-items: center;
    background: transparent;
    border: none;
    transition: opacity 0.3s ease-in-out;
    &:hover {
      opacity: 0.7;
    }

    &:disabled {
      cursor: not-allowed;
    }
  `}
`;
