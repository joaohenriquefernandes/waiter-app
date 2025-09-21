import { Text } from '../Text';
import { Container } from './styles';

interface IButtonProps {
  children: string;
  onPress: () => void;
  disabled?: boolean;
}

export function Button({children, onPress, disabled}: IButtonProps) {
  return (
    <Container onPress={onPress} disable={disabled}>
      <Text weight='600' color='#FFFFFF'>{children}</Text>
    </Container>
  );
}
