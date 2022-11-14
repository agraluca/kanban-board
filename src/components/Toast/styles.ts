import styled, { css } from "styled-components";
import media from "styled-media-query";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    position: fixed;
    display: flex;
    flex-direction: column;
    gap: ${theme.spacings.xsmall};
    top: 2rem;
    right: 2rem;
    z-index: ${theme.layers.modal};

    ${media.lessThan("medium")`
      top: 0;
      right: 0;
      left: 0;
    `}
  `}
`;
