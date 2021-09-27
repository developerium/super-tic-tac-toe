import React, { FC } from 'react';
import styled from 'styled-components';

interface PageProps {
  title?: string;
  isGameLayout?: boolean;
}

interface RootProps {
  isGameLayout?: boolean;
}

const Root = styled.div<RootProps>`
  padding: 8px;
  max-width: 900px;
  margin: auto;

  ${({ isGameLayout }) =>
    !isGameLayout &&
    `
     height: 98%;
  `}
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const PageLayout: FC<PageProps> = ({ title, isGameLayout, children }) => (
  <Root isGameLayout={isGameLayout}>
    <Content className="nes-container with-title is-centered is-rounded">
      <p className="title">{title}</p>

      {children}
    </Content>
  </Root>
);
