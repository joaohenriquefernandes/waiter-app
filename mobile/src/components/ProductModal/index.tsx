import { FlatList, Modal } from 'react-native';
import { IProduct } from '../../types/Product';
import { CloseButton, Footer, FooterContainer, Header, Image, Ingredient, IngredientsContainer, ModalBody, PriceContainer } from './styles';
import { Close } from '../Icons/Close';
import { Text } from '../Text';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../Button';

interface IProductModal {
  visible: boolean;
  product: IProduct | null;
  onClose: () => void;
  onAddToCart: (product: IProduct) => void;
}

export function ProductModal({ visible, product, onClose, onAddToCart }: IProductModal) {
  if(!product) {
    return null;
  }

  function handleAddToCart() {
    onAddToCart(product!);
    onClose();
  }

  return (
    <Modal
      visible={visible}
      animationType='slide'
      presentationStyle='pageSheet'
      onRequestClose={onClose}
    >
      <Image
        source={{
          uri: `exp://192.168.0.115:3001/uploads/${product.imagePath}`
        }}
      >
        <CloseButton onPress={onClose}>
          <Close />
        </CloseButton>
      </Image>
      <ModalBody>
        <Header>
          <Text size={24} weight='600'>{product.name}</Text>
          <Text color='#666666' style={{ marginTop: 8 }}>{product.description}</Text>
        </Header>
        {product.ingredients.length > 0 && (
          <IngredientsContainer>
            <Text weight='600' color='#666666'>Ingredientes</Text>
            <FlatList
              data={product.ingredients}
              keyExtractor={ingredient => ingredient._id}
              showsVerticalScrollIndicator={false}
              style={{ marginTop: 16 }}
              renderItem={({item}) => (
                <Ingredient>
                  <Text>{item.icon}</Text>
                  <Text size={14} color='#666666' style={{ marginLeft: 20 }}>{item.name}</Text>
                </Ingredient>
              )}
            />
          </IngredientsContainer>
        )}
      </ModalBody>
      <Footer>
        <FooterContainer>
          <PriceContainer>
            <Text color='#666666'>Preço</Text>
            <Text size={20} weight='600'>{formatCurrency(product.price)}</Text>
          </PriceContainer>
          <Button onPress={handleAddToCart}>Adicionar ao pedido</Button>
        </FooterContainer>
      </Footer>
    </Modal>
  );
}
