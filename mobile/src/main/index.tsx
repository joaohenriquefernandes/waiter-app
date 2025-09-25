import { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { TableModal } from '../components/TableModal';
import { CategoriesContainer, CenteredContainer, Container, Footer, FooterContainer, MenuContainer } from './styles';
import { Cart } from '../components/Cart';
import { ICartItem } from '../types/CartItem';
import { IProduct } from '../types/Product';
import { Menu } from '../components/Menu';
import { ActivityIndicator } from 'react-native';
import { Empty } from '../components/Icons/Empty';
import { Text } from '../components/Text';
import { ICategory } from '../types/Category';
import { api } from '../utils/api';

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  useEffect(() => {
    Promise.all([
      api.get('/categories'),
      api.get('/products')
    ]).then(([categories, products]) => {
      setCategories(categories.data);
      setProducts(products.data);
      setIsLoading(false);
    });
  }, []);
  console.log(categories);
  console.log(products);
  console.log('LP', isLoadingProducts);
  console.log('L', isLoading);
  async function handleSelectCategory(categoryId: string) {
    const route = categoryId ? `/categories/${categoryId}/products` : '/products';
    setIsLoadingProducts(true);
    const {data} = await api.get(route);
    setProducts(data);
    setIsLoadingProducts(false);
  }

  function handleSaveTable(table: string) {
    setSelectedTable(table);
  }

  function handleResetOrder() {
    setSelectedTable('');
    setCartItems([]);
  }

  function handleAddToCart(product: IProduct) {
    if(!selectedTable) {
      setIsTableModalVisible(true);
    }
    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex((item) => item.product._id === product._id);
      if(itemIndex < 0) return [...prevState, { product, quantity: 1 }];
      const newCartItems = [...prevState];
      newCartItems[itemIndex] = {
        ...newCartItems[itemIndex],
        quantity: newCartItems[itemIndex].quantity + 1
      };
      return newCartItems;
    });
  }

  function handleDecrementCartItem(product: IProduct) {
    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex((item) => item.product._id === product._id);
      const item = prevState[itemIndex];
      const newCartItems = [...prevState];
      if(item.quantity === 1) {
        newCartItems.splice(itemIndex, 1);
        return newCartItems;
      }
      newCartItems[itemIndex] = {
        ...newCartItems[itemIndex],
        quantity: newCartItems[itemIndex].quantity - 1
      };
      return newCartItems;
    });
  }

  return (
    <>
      <Container>
        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleResetOrder}
        />
        {isLoading ? (
          <CenteredContainer>
            <ActivityIndicator color='#D73035' size='large' />
          </CenteredContainer>
        ) : (
          <>
            <CategoriesContainer>
              <Categories
                categories={categories}
                onSelectCategory={handleSelectCategory}
              />
            </CategoriesContainer>

            {isLoadingProducts ? (
              <CenteredContainer>
                <ActivityIndicator color='#D73035' size='large' />
              </CenteredContainer>
            ) : (
              <>
                {products.length > 0 ? (
                  <MenuContainer>
                    <Menu onAddToCart={handleAddToCart} products={products}/>
                  </MenuContainer>
                ) : (
                  <CenteredContainer>
                    <Empty />
                    <Text color='#666666' style={{ marginTop: 24 }}>Nenhum produto foi encontrado!</Text>
                  </CenteredContainer>
                )}
              </>
            )}
          </>
        )}
      </Container>

      <Footer>
        <FooterContainer>
          {!selectedTable && (
            <Button
              onPress={() => setIsTableModalVisible(true)}
              disabled={isLoading}
            >
              Novo Pedido
            </Button>
          )}
          {selectedTable && (
            <Cart
              selectedTable={selectedTable}
              cartItems={cartItems}
              onAdd={handleAddToCart}
              onDecrement={handleDecrementCartItem}
              onConfirmOrder={handleResetOrder}
            />
          )}
        </FooterContainer>
      </Footer>

      <TableModal
        visible={isTableModalVisible}
        onClose={() => setIsTableModalVisible(false)}
        onSave={handleSaveTable}
      />
    </>
  );
}
