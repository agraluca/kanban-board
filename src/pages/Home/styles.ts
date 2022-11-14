import styled, { css } from "styled-components";
import media from "styled-media-query";

export const Wrapper = styled.main`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    gap: ${theme.spacings.small};
    height: auto;
    margin-bottom: ${theme.spacings.medium};

    ${media.lessThan("medium")`
      flex-direction: column
    `}
  `}
`;
