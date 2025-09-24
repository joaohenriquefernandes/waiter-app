import { ActivityIndicator } from 'react-native';
import { Text } from '../Text';
import { Container } from './styles';

interface IButtonProps {
  children: string;
  disabled?: boolean;
  loading?: boolean;
  onPress: () => void;
}

export function Button({children, loading, onPress, disabled}: IButtonProps) {
  return (
    <Container onPress={onPress} disable={disabled || loading}>
      {!loading && (
        <Text weight='600' color='#FFFFFF'>{children}</Text>
      )}
      {loading && (
        <ActivityIndicator color='#FFFFFF' />
      )}
    </Container>
  );
}
