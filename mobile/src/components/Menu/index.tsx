import { FlatList } from 'react-native';
import { Text } from '../Text';
import { ProductContainer, ProductDetails, ProductImage, Separator, AddToCartButton } from './styles';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import { ProductModal } from '../ProductModal';
import { useState } from 'react';
import { IProduct } from '../../types/Product';

interface IMenuProps {
  onAddToCart: (product: IProduct) => void;
}

export function Menu({ onAddToCart }: IMenuProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  function handleOpenModal(product: IProduct) {
    setIsModalVisible(true);
    setSelectedProduct(product);
  }
  return (
    <>
      <ProductModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        product={selectedProduct}
        onAddToCart={onAddToCart}
      />
      <FlatList
        data={products}
        keyExtractor={product => product._id}
        style={{ marginTop: 32 }}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        ItemSeparatorComponent={Separator}
        renderItem={({item}) => (
          <ProductContainer onPress={() => handleOpenModal(item)}>
            <ProductImage
            source={{
              uri: `exp://192.168.0.115:3001/uploads/${item.imagePath}`,
            }}
            />
            <ProductDetails>
              <Text weight='600'>{item.name}</Text>
              <Text
                color='#666666'
                size={14}
                style={{ marginVertical:8 }}
              >
                {item.description}
              </Text>
              <Text size={14} weight='600'>
                {formatCurrency(item.price)}
                </Text>
            </ProductDetails>
            <AddToCartButton onPress={() => onAddToCart(item)}>
              <PlusCircle />
            </AddToCartButton>
          </ProductContainer>
        )}
      />
    </>
  );
}
