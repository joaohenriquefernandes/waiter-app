import { FlatList } from 'react-native';
import { Text } from '../Text';
import { Category, Icon } from './styles';

export function Categories() {
  const categories: any[] = [];
  return (
    <FlatList
      data={categories}
      keyExtractor={category => category._id}
      showsHorizontalScrollIndicator={false}
      horizontal
      contentContainerStyle={{ paddingRight: 24 }}

      renderItem={({item}) => (
        <Category>
          <Icon>
            <Text size={14} weight='600'>{item.icon}</Text>
          </Icon>
          <Text size={14} weight='600'>{item.name}</Text>
        </Category>
      )}
    />
  );
}
