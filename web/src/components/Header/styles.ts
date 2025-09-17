import styled from 'styled-components';

export const Container = styled.header`
  background: #D73035;
  height: 198px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1216px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .page-details {
    h1 {
      font-size: 32px;
      color: #FFFFFF;
    }

    h2 {
      color: #FFFFFF;
      font-weight: 400;
      font-size: 16px;
      opacity: 0.9;
      margin-top: 6px;
    }
  }
`;
