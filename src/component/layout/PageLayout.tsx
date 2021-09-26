import React, { FC } from 'react';
import styled from 'styled-components';

interface PageProps {
  title?: string;
}

const Root = styled.div`
  padding: 8px;
  height: 98%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const PageLayout: FC<PageProps> = ({ title, children }) => (
  <Root>
    <Content className="nes-container with-title is-centered is-rounded">
      <p className="title">{title}</p>

      {children}
    </Content>
  </Root>
);
