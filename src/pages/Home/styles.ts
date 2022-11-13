import styled, { css } from "styled-components";

export const Wrapper = styled.main`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    gap: ${theme.spacings.small};
    height: auto;
    margin-bottom: ${theme.spacings.medium};
  `}
`;
