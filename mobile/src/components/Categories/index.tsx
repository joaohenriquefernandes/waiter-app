import { FlatList } from 'react-native';
import { Text } from '../Text';
import { Category, Icon } from './styles';
import { useState } from 'react';
import { ICategory } from '../../types/Category';

interface ICategoriesProps {
  categories: ICategory[];
  onSelectCategory: (categoryId: string) => Promise<void>;
}

export function Categories({ categories, onSelectCategory }: ICategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState('');

  function handleSelectCategory(categoryId: string) {
    const category = selectedCategory === categoryId ? '' : categoryId;
    onSelectCategory(category);
    setSelectedCategory(category);
  }

  return (
    <FlatList
      data={categories}
      keyExtractor={category => category._id}
      showsHorizontalScrollIndicator={false}
      horizontal
      contentContainerStyle={{ paddingRight: 24 }}
      renderItem={({item}) => {
        const isSelected = selectedCategory === item._id;
        return (
          <Category onPress={() => handleSelectCategory(item._id)}>
            <Icon>
              <Text opacity={isSelected ? 1 : 0.5}>
                {item.icon}
              </Text>
            </Icon>
            <Text size={14} weight='600'>
              {item.name}
            </Text>
          </Category>
        );
      }}
    />
  );
}
