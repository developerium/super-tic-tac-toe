import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PageLayout } from '../layout/PageLayout';

const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Info = styled.div`
  text-align: left;
`;

export const HomePage: FC = () => (
  <PageLayout title="Super Tic Tak Toe">
    <Content>
      <Info>
        <p>Welcome to</p>
        <p>our awesome game of tic tak toe</p>
        <p>on steroids!</p>
      </Info>

      <Link to="/game" className="nes-btn is-primary">
        Play !
      </Link>
    </Content>
  </PageLayout>
);
