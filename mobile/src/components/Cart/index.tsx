import { FlatList, TouchableOpacity } from 'react-native';
import { ICartItem } from '../../types/CartItem';
import { Actions, Item, ProductContainer, Image, QuantityContainer, ProductDetails, Summary, TotalContainer } from './styles';
import { Text } from '../Text';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import { MinusCircle } from '../Icons/MinusCircle';
import { Button } from '../Button';
import { IProduct } from '../../types/Product';
import { OrderConfirmedModal } from '../OrderConfirmedModal';
import { useState } from 'react';
import { api } from '../../utils/api';

interface ICartProps {
  cartItems: ICartItem[];
  selectedTable: string
  onAdd: (product: IProduct) => void;
  onDecrement: (product: IProduct) => void;
  onConfirmOrder: () => void;
}

export function Cart({ cartItems, selectedTable, onAdd, onDecrement, onConfirmOrder }: ICartProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const total = cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.quantity * cartItem.product.price;
  }, 0);

  async function handleConfirmOrder() {
    setIsLoading(true);
    const payload = {
      table: selectedTable,
      products:cartItems.map((item) => ({
        product: item.product._id,
        quantity: item.quantity
      }))
    };
    api.post('/orders', payload);
    setIsLoading(false);
    setIsModalVisible(true);
  }

  function handleOk() {
    onConfirmOrder();
    setIsModalVisible(false);
  }

  return (
    <>
      <OrderConfirmedModal
        visible={isModalVisible}
        onOk={handleOk}
      />
      {cartItems.length > 0 && (
        <FlatList
          data={cartItems}
          keyExtractor={cartItem => cartItem.product._id}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 20, maxHeight: 200 }}
          renderItem={({item}) => (
            <Item>
              <ProductContainer>
                <Image
                  source={{
                    uri: `http://192.168.0.115:3001/uploads/${item.product.imagePath}`
                  }}
                />
                <QuantityContainer>
                  <Text size={14} color='#666666'>{item.quantity}x</Text>
                </QuantityContainer>
                <ProductDetails>
                  <Text size={14} weight='600'>{item.product.name}</Text>
                  <Text size={14} color='#666666' style={{ marginTop: 4 }}>{formatCurrency(item.product.price)}</Text>
                </ProductDetails>
              </ProductContainer>
              <Actions>
                <TouchableOpacity onPress={() => onAdd(item.product)} style={{ marginRight: 24 }}>
                  <PlusCircle />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onDecrement(item.product)}>
                  <MinusCircle />
                </TouchableOpacity>
              </Actions>
            </Item>
          )}
        />
      )}
      <Summary>
        <TotalContainer>
          {cartItems.length > 0 ? (
            <>
              <Text color='#666666'>Total</Text>
              <Text size={20} weight='600'>{formatCurrency(total)}</Text>
            </>
          ) : (
            <Text color='#999999'>Seu carrinho está vazio</Text>
          )}
        </TotalContainer>
        <Button
          disabled={cartItems.length === 0}
          onPress={handleConfirmOrder}
          loading={isLoading}
        >
          Confirmar pedido
        </Button>
      </Summary>
    </>
  );
}
