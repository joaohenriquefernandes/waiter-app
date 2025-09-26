import styled from 'styled-components';

export const Overlay = styled.div`
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4.5px);
  width: 100%;
  height: 100%;
  position: fixed;
`;

export const ModalBody = styled.div`
  background: #FFFFFF;
  width: 480px;
  padding: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    strong {
      font-size: 24px;
    }

    button {
      line-height: 0;
      background: transparent;
      border: 0;
    }
  }
`;

export const StatusContainer = styled.div`
  margin-top: 32px;

  small {
    font-size: 14px;
    opacity: 0.8;
  }

  div {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
  }
`;

export const OrderDetails = styled.div`
  margin-top: 32px;

  > strong {
    font-weight: 500;
    font-size: 14px;
    opacity: 0.8;
  }
`;

export const OrderItems = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Item = styled.div`
  display: flex;

  img {
    border-radius: 6px;
  }
`;

export const Quantity = styled.span`
  font-size: 14px;
  color: #666666;
  display: block;
  min-width: 20px;
  margin-left: 12px;
`;

export const ProductDetails = styled.div`
margin-left: 4px;
  > strong {
    display: block;
    margin-bottom: 4px;
  }

  > span {
    font-size: 14px;
    color: #666666;
  }
`;

export const Total = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;

  > span {
    font-weight: 500;
    font-size: 14px;
    opacity: 0.8;
  }
`;

export const Actions = styled.footer`
  display: flex;
  flex-direction: column;
  margin-top: 32px;

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .primary {
    background: #333333;
    border-radius: 48px;
    border: 0;
    color: #FFFFFF;
    padding: 12px 24px;
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: center;
  }

  .secondary {
    padding: 14px 24px;
    color: #D73035;
    font-weight: bold;
    border: 0;
    background: transparent;
    margin-top: 12px;
  }
`;
