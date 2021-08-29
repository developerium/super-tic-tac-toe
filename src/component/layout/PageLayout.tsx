import React, { FC } from 'react';
import styled from 'styled-components';

interface PageProps {
  title?: string;
}

const Padd = styled.div`
  padding: 8px;
  height: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const PageLayout: FC<PageProps> = ({ title, children }) => (
  <Padd>
    <Content className="nes-container with-title is-centered is-rounded">
      <p className="title">{title}</p>

      {children}
    </Content>
  </Padd>
);
