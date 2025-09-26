import { Actions, Item, ModalBody, OrderDetails, OrderItems, Overlay, ProductDetails, Quantity, StatusContainer, Total } from './styles';
import closeIcon from '../../assets/images/close-icon.svg';
import type { IOrder } from '../../types/IOrder';
import { formatCurrency } from '../../utils/formatCurrency';
import { useEffect } from 'react';

interface IOrderModalProps {
  visible: boolean;
  order: IOrder | null
  isLoading: boolean;
  onClose: () => void;
  onCancelOrder: () => void
  onChangeOrderStatus: () => void;
}

export function OrderModal({
    visible,
    order,
    isLoading,
    onClose,
    onCancelOrder,
    onChangeOrderStatus
  }: IOrderModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if(event.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if(!visible || !order) {
    return null;
  }

  const total = order.products.reduce((acc, { product, quantity }) => {
    return acc + (product.price * quantity);
  }, 0);

  return (
    <Overlay>
      <ModalBody>
        <header>
          <strong>Mesa {order.table}</strong>
          <button type='button' onClick={onClose}>
            <img src={closeIcon} alt="Icone de fechar" />
          </button>
        </header>
        <StatusContainer>
          <small>Status do Pedido</small>
          <div>
            <span>
              {order.status === 'WAITING' && '🕒'}
              {order.status === 'IN_PRODUCTION' && '👨‍🍳'}
              {order.status === 'DONE' && '✅'}
            </span>
            <strong>
              {order.status === 'WAITING' && 'Fila de espera'}
              {order.status === 'IN_PRODUCTION' && 'Em preparação'}
              {order.status === 'DONE' && 'Pronto'}
            </strong>
          </div>
        </StatusContainer>
        <OrderDetails>
          <strong>Itens</strong>
          <OrderItems>
            {order.products.map(({ _id, product, quantity }) => (
            <Item key={_id}>
              <img
                src={`http://localhost:3000/uploads/${product.imagePath}`}
                alt={product.name}
                width={56}
                height={28.51}
              />

              <Quantity>{quantity}x</Quantity>
              <ProductDetails>
                <strong>{product.name}</strong>
                <span>{formatCurrency(product.price)}</span>
              </ProductDetails>
            </Item>
          ))}
          </OrderItems>
          <Total>
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </Total>
        </OrderDetails>
        <Actions>
          {order.status !== 'DONE' && (
            <button
              type='button'
              className='primary'
              disabled={isLoading}
              onClick={onChangeOrderStatus}
            >
              <span>
                {order.status === 'WAITING' && '👨‍🍳'}
                {order.status === 'IN_PRODUCTION' && '✅'}
              </span>
              <strong>
                {order.status === 'WAITING' && 'Iniciar Produção'}
                {order.status === 'IN_PRODUCTION' && 'Concluir Pedido'}
              </strong>
            </button>
          )}
          <button
            type='button'
            className='secondary'
            disabled={isLoading}
            onClick={onCancelOrder}
          >
            Cancelar Pedido
          </button>
        </Actions>
      </ModalBody>
    </Overlay>
  );
}
