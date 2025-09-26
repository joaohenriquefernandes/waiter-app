import { useState } from 'react';
import type { IOrder } from '../../types/IOrder';
import { Board, OrdersContainer } from './styles';
import { OrderModal } from '../OrderModal';
import { api } from '../../utils/api';
import { toast } from 'react-toastify';

interface IOrdersBoardProps {
  icon: string;
  title: string;
  orders: IOrder[]
  onCancelOrder: (orderId: string) => void;
  onChangeOrderStatus: (orderId: string, status: IOrder['status']) => void;
}

export function OrdersBoard({ icon, title, orders, onCancelOrder, onChangeOrderStatus }: IOrdersBoardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleOpenModal(order: IOrder) {
    setIsModalVisible(true);
    setSelectedOrder(order);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
    setSelectedOrder(null);
  }

  async function handleChangeOrderStatus() {
    setIsLoading(true);
    const status = selectedOrder?.status === 'WAITING' ? 'IN_PRODUCTION' : 'DONE';
    await api.patch(`/orders/${selectedOrder!._id}`,{ status });
    toast.success(`O pedido da mesa ${selectedOrder?.table} teve o status alterado!`);
    onChangeOrderStatus(selectedOrder!._id, status);
    setIsLoading(false);
    setIsModalVisible(false);
  }

  async function handleCancelOrder() {
    setIsLoading(true);
    await api.delete(`/orders/${selectedOrder!._id}`);
    toast.success(`O pedido da mesa ${selectedOrder?.table} foi cancelado!`);
    setIsLoading(false);
    setIsModalVisible(false);
    onCancelOrder(selectedOrder!._id);
  }

  return (
    <Board>
      <OrderModal
        isLoading={isLoading}
        visible={isModalVisible}
        order={selectedOrder}
        onClose={handleCloseModal}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleChangeOrderStatus}
      />
      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>

      {orders.length > 0 && (
        <OrdersContainer>
          {orders.map((order) => (
            <button type='button' key={order._id} onClick={() => handleOpenModal(order)}>
              <strong>Mesa {order.table}</strong>
              <span>{order.products.length} itens</span>
            </button>
          ))}
        </OrdersContainer>
      )}
    </Board>
  );
}
